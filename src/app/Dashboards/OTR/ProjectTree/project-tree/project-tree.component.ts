import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { KENDO_ICONS } from "@progress/kendo-angular-icons";
import { arrowRightIcon } from '@progress/kendo-svg-icons';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_LABELS } from '@progress/kendo-angular-label';
import { KENDO_TREEVIEW, TreeItem } from '@progress/kendo-angular-treeview'
import { KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { chevronRightIcon, searchIcon, starOutlineIcon, starIcon, chevronDownIcon } from '@progress/kendo-svg-icons';
//import { ProjectListLoaderService } from '../../../../Services/project-list-loader.service';
import { JobData, ProjectData, TrainData } from '../../../../Classes/common-classes';
import { Observable } from 'rxjs/internal/Observable';
import { async, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { KENDO_INDICATORS, LoaderType, LoaderThemeColor, LoaderSize, } from "@progress/kendo-angular-indicators";
import { DataLoaderService } from '../../../../Services/DataLoader/data-loader.service';
import { EventManagerService } from '../../../../Services/EventManager/event-manager.service';
import { ProjectListLoaderService } from '../../../../Services/ProjectListLoader/project-list-loader.service';
import { Icon_Favourite } from '../../../../Common/CustomIcons/Icons';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-project-tree',
  standalone: true,
  imports: [KENDO_INPUTS, KENDO_ICONS, KENDO_BUTTONS, KENDO_LABELS, KENDO_TREEVIEW,
    KENDO_TEXTBOX, FormsModule, KENDO_INDICATORS, CommonModule],
  templateUrl: './project-tree.component.html',
  styleUrl: './project-tree.component.scss'
})

export class ProjectTreeComponent implements OnInit {

  @Input()
  Type: string = 'All';

  count = 100;
  value = "input value";
  public arrowRightIcon = arrowRightIcon;
  public rightIcon = chevronRightIcon;
  public downIcon = chevronDownIcon;
  public searchIcon = searchIcon;
  public favouriteIcon = Icon_Favourite;
  public notFavouriteIcon = Icon_Favourite;
  public searchText: string = '';
  url: string = '/allcontracts';

  public ProjectDataList: any[] = [];
  private projectDataListTemp: any[] = [];
  private selectedProjects: any[] = [];
  public selectedKeys: any[] = [];

  public expandedKeys: any[] = ["0", "1"];

  public checkedKeys: any[] = [];

  public isDataLoading = false;
  public selectedItem: any = null


  constructor(private projectDataLoader: ProjectListLoaderService, private dataLoader: DataLoaderService, private eventMgr: EventManagerService) { }

  public loaderType: LoaderType = <LoaderType>"pulsing";
  public loaderSize: LoaderSize = <LoaderSize>"medium";

  onAdvancedSearch() {
  }

  ngOnInit(): void {
    this.isDataLoading = true;
    if (this.projectDataListTemp?.length == 0) {
    this.projectDataLoader.loadDataFromServer(this.onProjectDataLoaded.bind(this));
    }
    else {
      this.onProjectDataLoaded();
    }
    this.eventMgr.eventHandler.subscribe((msg: string) => {

      this.onNotify(msg);
    });
  }

  async onProjectDataLoaded() {

    this.isDataLoading = true;
    if (this.Type === 'All') {
      this.projectDataListTemp = await this.projectDataLoader.getAllProjectDataList();
    }
    else if (this.Type === 'My') {
      this.projectDataListTemp = await this.projectDataLoader.getMyProjectDataList();
    }
    else if (this.Type === 'Fav') {
      this.projectDataListTemp = await this.projectDataLoader.getFavouriteProjectDataList();
    }

    await this.applySearch();
    this.isDataLoading = false;

    this.selectedProjects = [];
    this.dataLoader.setProjectSelection(this.selectedProjects);
    this.dataLoader.publish("PROJECT_SELECTION_CHANGED");
  }

  async reloadFavProjects() {
    this.isDataLoading = true;
    if (this.Type === 'Fav') {
      this.projectDataListTemp = await this.projectDataLoader.getFavouriteProjectDataList();
    }

    await this.applySearch();
    this.isDataLoading = false;
  }

  public hasChildren = (item: any) => {
    if (item.Items !== undefined) {
      return item.Items != null && item.Items.length > 0;
    }
    else if (item instanceof ProjectData) {
      return item.trains != null && item.trains.length > 0;
    }
    else if (item instanceof TrainData) {
      return item.jobNumbers != null && item.jobNumbers.length > 0;
    }
    else if (item instanceof JobData) {
      return false;
    }

    return false;
  }

  public children = (dataitem: any): Observable<any[]> => of(dataitem.Items || dataitem.trains || dataitem.jobNumbers);

  public fetchChildren = (item: any) => {

    if (item instanceof ProjectData) {
      return of(item.trains);
    }
    else if (item instanceof TrainData) {
      return of(item.jobNumbers);
    }
    else if (item instanceof JobData) {
      return of([]);
    }

    return of([]);
  };

  public fetchText = (item: any): string => {

    if (item instanceof ProjectData) {
      return item.projectName;
    }
    else if (item instanceof TrainData) {
      return item.trainName;
    }
    else if (item instanceof JobData) {
      return item.jobNumber;
    }

    return '';
  };

  public getFavouriteIcon = (item: any) => {
    if (item instanceof ProjectData) {
      return item.isFavourite ? this.favouriteIcon : this.notFavouriteIcon;
    }
    else if (item instanceof TrainData) {
      return '';
    }
    else if (item instanceof JobData) {
      return item.isFavourite ? this.favouriteIcon : this.notFavouriteIcon;
    }

    return '';
  }

  public isTrainData(item: any) {
    return !this.showFavouriteIcon(item);
  }

  public showFavouriteIcon = (item: any) => {

    if (item instanceof TrainData) {
      return false;
    }
    else if (this.isParentItem(item)) {
      return false;
    }

    return true;
  }

  public getProjectCount(): number {
    return this.ProjectDataList?.length;
  }

  async searchTree() {
    await this.applySearch();
  }

  applySearch() {
    this.isDataLoading = true;

    if (this.searchText != undefined && this.searchText != '') {
      if (this.projectDataListTemp?.length > 0) {
        this.ProjectDataList = [];
        let curItems: { Name: string; Items: any[] } = { Name: "Current Items", Items: [] };
        let pastItems: { Name: string; Items: any[] } = { Name: "Past Items", Items: [] };

        this.projectDataListTemp.forEach((x: any) => {
          if (x.projectName != undefined && (x.projectName as string).includes(this.searchText)) {

            if (x.isActive) {
              curItems.Items.push(x);
            }
            else {
              pastItems.Items.push(x);
            }
          }
        });

        if (curItems.Items.length > 0) {
          this.ProjectDataList.push(curItems);
        }
        if (pastItems.Items.length > 0) {
          this.ProjectDataList.push(pastItems);
        }
      }
    }
    else {
      this.ProjectDataList = this.projectDataListTemp;
    }

    this.isDataLoading = false;
  }

  public onSelectionChange(event: any): void {

    let index = parseInt(event.item.index);
    let project = this.ProjectDataList.at(index);

    if (this.checkedKeys.indexOf(event.item.index) > -1) {
      if (project.Items !== undefined) {
        this.selectedProjects.push(project.Items);
      }
      else {
        this.selectedProjects.push(project);
      }
    }
    else {
      if (project.Items !== undefined) {
        let projIndex = this.selectedProjects.indexOf(project.Items[0]);
        this.selectedProjects.splice(projIndex, project.Items.length);
      }
      else {
        let projIndex = this.selectedProjects.indexOf(project);
        if (projIndex > -1) {
          this.selectedProjects.splice(projIndex);
        }
      }
    }

    // let strIndex: any = index;
    // if (this.checkedKeys.findIndex(strIndex) > 0) {
    //   this.selectedProjects.push(project);
    // }
    // else {
    //   let itemIndex = this.selectedProjects.findIndex(project);
    //   if (itemIndex > -1) {
    //     this.selectedProjects.splice(itemIndex);
    //   }
    //}

    this.dataLoader.setProjectSelection(this.selectedProjects);
    this.dataLoader.publish("PROJECT_SELECTION_CHANGED");
  }

  setProjectSelectionList() {

  }

  onNotify(msg: string) {
  }

  public onNodeClick(item: any): void {
    this.selectedItem = item;
  }

  public isSelected(item: any): boolean {
    return this.selectedItem === item;
  }

  isJobItem(item: any): boolean {
    try {
      return item.jobNumber !== undefined;
    } catch (error) {
      return false;
    }
  }

  isTrainItem(item: any): boolean {
    try {
      return item.trainId !== undefined;
    } catch (error) {
      return false;
    }
  }

  isParentItem(item: any): boolean {
    try {
      return item.Items !== undefined;
    } catch (error) {
      return false;
    }
  }

  isChecked(item: any) {
    return !item.isChecked;
  }

  onCheck(item: any, event: any) {
    //item.isChecked = item.isChecked
    this.onSelectionChange(event);
  }

  onFavouriteBtnClick(item: any) {
    item.isFavourite = !item.isFavourite;
    this.projectDataLoader.setItemFavourite(item, item.isFavourite);

    if (this.Type === 'Fav') {
      this.reloadFavProjects();
    }
  }
}