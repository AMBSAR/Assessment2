import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { ProjectData } from '../../../../../Classes/common-classes';
import { KENDO_SVGICON } from '@progress/kendo-angular-icons';
import {
  xIcon, bellIcon, arrowDownIcon, moreHorizontalIcon, searchIcon,
  handleResizeIcon, gearIcon, arrowLeftIcon, arrowRightIcon,
  chevronDownIcon,
  chevronLeftIcon,
  chevronRightIcon
} from '@progress/kendo-svg-icons';
import { FormsModule } from '@angular/forms';
import { KENDO_LABEL, KENDO_LABELS } from '@progress/kendo-angular-label';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { DataLoaderService } from '../../../../../Services/DataLoader/data-loader.service';
import { EventManagerService } from '../../../../../Services/EventManager/event-manager.service';
import { FiscalWeekData, FWSummaryData, ISPOActivityData, ISPOTabularDataList, SummaryData } from '../../../../../Interfaces/common-interfaces';
//import { KENDO_GRID, GridComponent, GridDataResult, DataStateChangeEvent, KENDO_GRID_SHARED } from '@progress/kendo-angular-grid';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { Icon_NotificationImportant, Icon_FullScreen, Icon_ExitFullScreen, Icon_More_Vertical, Icon_UserList, Icon_Drag, Icon_Link } from '../../../../../Common/CustomIcons/Icons';
import { CommonModule } from '@angular/common';
import { KENDO_CHECKBOX, KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { loadTranslations } from '@angular/localize';
import { GridModule, KENDO_GRID } from '@progress/kendo-angular-grid';
// import {
//   DataBindingDirective,
//   KENDO_GRID_EXCEL_EXPORT,
//   KENDO_GRID_PDF_EXPORT,
// } from "@progress/kendo-angular-grid";

@Component({
  selector: 'app-ispo-dashboard',
  standalone: true,
  //imports: [KENDO_SVGICON, FormsModule, KENDO_GRID, KENDO_LABEL, KENDO_BUTTONS, KENDO_DROPDOWNS],
  imports: [KENDO_SVGICON, FormsModule, KENDO_LABEL, KENDO_BUTTONS, KENDO_CHECKBOX, GridModule,
    KENDO_DROPDOWNS, CommonModule, KENDO_TEXTBOX, KENDO_LABELS],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ispo-dashboard.component.html',
  styleUrl: './ispo-dashboard.component.scss'
})
export class IspoDashboardComponent implements OnInit {
  // data
  SelectedProjects: ProjectData[] | null = null;
  HasAnyNotification: boolean = true;
  public ShowNotification: boolean = true;
  private tempTabularData: ISPOActivityData[] = [];
  public TabularData: ISPOActivityData[] = [];
  public FiscalWeekData: any[] = [];
  private FiscalWeekDataTemp: any[] = [];
  private SummaryData: any;
  public DocumentTypeSelectionList: any[] = [];
  public FWStart: number = 0;
  public FWEnd: number = 0;
  public ActivityCount: number = 0;
  public searchText: string = '';
  public showFilterActivitiesView: boolean = true;
  public prevShowFilterActivitiesViewValue: boolean = false;
  public showTabularDataInFullScreen: boolean = false;
  public projectNameText: string = '';

  // input List
  viewTypes: string[] = ["Individual", "Office", "Project"];
  DocumentTypes: string[] = ['a', 'b', 'c'];
  Funcitons: string[] = ['a', 'b', 'c'];
  StatusList: string[] = ["Completed", "Backlog", "Open"];
  ActivityTypeList: string[] = ["510", "560", "590"];
  FinishByList: string[] = ["Late Finish", "Early Finish"];
  DateTypeList: string[] = ["Late Finish Date", "Early Finish Date"];

  public selectedViewType: string = '';
  public selectedFunctions: string = '';
  public selectedDocumentTypes: string = '';
  public selectedStatusList: string = '';
  public selectedActivityTypes: string = '';
  public selectedFinishBy: string = '';
  public selectedDateType: string = '';

  public selectedCols: number[] = [];

  // icons
  public bellIcon = Icon_NotificationImportant;
  public closeIcon = xIcon;
  public downArrow = chevronDownIcon;
  public moreHorizontalIcon = moreHorizontalIcon;
  public searchIcon = searchIcon;
  public fullScreenIcon = Icon_FullScreen;
  public settingsIcon = gearIcon;
  public leftArrowButton = chevronLeftIcon;
  public rightArrowButton = chevronRightIcon;
  public fullScreenExitIcon = Icon_ExitFullScreen;


  public gridData: any[] = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 }
  ];


  constructor(private eventManager: EventManagerService, private dataLoader: DataLoaderService) { }

  ngOnInit(): void {
    this.eventManager.eventHandler.subscribe((msg: string) => {
      this.notifyEvent(msg);
    });

    this.dataLoader.dataLoadedEventMgr.subscribe((msg: string) => {
      this.notifyEvent(msg);
    });
  }

  notifyEvent(message: string) {
    if (message === "PROJECT_SELECTION_CHANGED") {
      this.onProjectSelectionChanged();
    }
    // else if (message === "ISPO_TABULARDATA_LOADED") {
    //   this.setTabularData();
    // }
    // else if (message === "ISPO_FW_DATA_LOADED") {
    //   this.setFWData();
    // }
    // else if (message === "ISPO_SUMMARY_DATA_LOADED") {
    //   this.setSummaryData();
    //   this.reloadTabularData();
    // }
  }

  onProjectSelectionChanged() {
    let fullProjectList = this.dataLoader.getSelectedProjects();
    this.SelectedProjects = fullProjectList?.length != undefined && fullProjectList?.length >= 1 ? fullProjectList : null;
    let text = this.SelectedProjects?.map(p => p.projectName).join(', ');
    this.projectNameText = text != undefined ? text : '';
    this.reloadFullData();
  }

  reloadFullData() {
    this.loadSummaryData();
    this.loadFWSummaryData();
  }

  loadFWSummaryData() {
    this.dataLoader.loadISPOFWData(this.onFWSummaryDataLoaded.bind(this));
  }

  setFWData(data: any) {
    let fwData = data;
    this.FiscalWeekData = [];
    //let fwData = this.dataLoader.getISPOFWData();

    if (fwData != undefined) {
      let fwSummary: FWSummaryData = fwData as FWSummaryData;
      this.FiscalWeekDataTemp = fwSummary.summary.weeklydatacount;

      if (this.FiscalWeekDataTemp?.length > 0) {
        this.FiscalWeekDataTemp.forEach(x => x.weekText = "");
        let todayItemIndex = this.FiscalWeekDataTemp.findIndex((x: any) => (x as FiscalWeekData).fiscalWeek == "Today");

        if (todayItemIndex == -1) {
          todayItemIndex = 0;
        }
        else {
          this.FiscalWeekDataTemp[todayItemIndex + 1].weekText = "(This Week)";
          this.FiscalWeekDataTemp[todayItemIndex + 2].weekText = "(Next Week)";
        }
        this.FWStart = todayItemIndex;
        this.FWEnd = todayItemIndex + 4;
        this.setFWDataToShow(this.FWStart, this.FWEnd);
      }
    }
  }

  onFWSummaryDataLoaded(response: any) {
    this.setFWData(response);
  }

  loadSummaryData() {
    this.dataLoader.loadISPOSummaryData(this.onSummaryDataLoaded.bind(this))
    this.reloadTabularData();
  }

  onSummaryDataLoaded(response: any) {
    this.setSummaryData(response);
  }

  reloadTabularData() {
    this.dataLoader.loadISPOTabularData(this.onTabularDataLoaded.bind(this))
  }

  onTabularDataLoaded(response: any) {
    this.setTabularData(response);
  }

  setTabularData(data: any) {
    //let fullTabularData : ISPOTabularDataList = this.dataLoader.getISPOTabularData();
    let fullTabularData: ISPOTabularDataList = data;
    this.tempTabularData = fullTabularData?.activities;
    this.TabularData = this.tempTabularData;
    this.ActivityCount = this.TabularData?.length;
  }

  setFWDataToShow(start: number, end: number) {
    this.FiscalWeekData = this.FiscalWeekDataTemp.slice(start, end);
  }

  canEnableFWPrev() {
    return this.FiscalWeekData == undefined || this.FWStart == 0;
  }

  canEnableFWNext() {
    return this.FiscalWeekData == undefined || (this.FWEnd + 1) == this.FiscalWeekDataTemp.length;
  }

  onPrevFW() {
    this.FWStart -= 4;

    if (this.FWStart < 0) {
      this.FWStart = 0;
    }

    this.FWEnd = this.FWStart + 4;

    this.setFWDataToShow(this.FWStart, this.FWEnd);
  }

  onNextFW() {
    this.FWEnd += 4;

    if (this.FWEnd >= this.FiscalWeekDataTemp.length) {
      this.FWEnd = this.FiscalWeekDataTemp.length - 1;
    }

    this.FWStart = this.FWEnd - 4;

    this.setFWDataToShow(this.FWStart, this.FWEnd);
  }

  setSummaryData(data: any) {
    //let tempData : SummaryData = this.dataLoader.getISPOSummaryData();
    let tempData: SummaryData = data;
    this.SummaryData = tempData?.summary;
    this.DocumentTypeSelectionList = [
      { ID: 1, Label: 'Total Documents', Count: this.SummaryData?.total, isSelected: false },
      { ID: 2, Label: 'Backlogs', Count: this.SummaryData?.backlog, isSelected: false },
      { ID: 3, Label: 'Forecast', Count: this.SummaryData?.opencount, isSelected: false },
      { ID: 4, Label: 'Not Acknowledged', Count: this.SummaryData?.opencount, isSelected: false },
      { ID: 5, Label: 'Step', Count: this.SummaryData?.opencount, isSelected: false },
      { ID: 6, Label: 'RuleStream', Count: this.SummaryData?.opencount, isSelected: false }
    ];
  }

  onDocumentTypeClicked(item: any) {
    item.isSelected = true;
    this.DocumentTypeSelectionList.forEach(x => {
      if (x.ID != item.ID) {
        x.isSelected = false;
      }
    });
  }

  searchTable() {
    const term = this.searchText.toLowerCase();
    this.TabularData = this.tempTabularData.filter(item =>
      item.PROJECT_ID.toLowerCase().includes(term) || item.ACTIVITY_NAME.toLowerCase().includes(term)
    );
  }

  onFiscalWeek(index: any) {
    let actualIndex = this.FWStart + index as number;
    this.reloadTabularData();
  }

  onFilterSelectionChange() {
    this.reloadTabularData();
  }

  onViewTypeSelectionChanged() {
    this.reloadFullData();
  }

  public isSelected(value: string): boolean {
    return this.selectedViewType.includes(value);
  }

  onCloseNotification() {
    this.ShowNotification = false;
  }

  isTabularDataAvailable() {
    return this.ActivityCount > 0;
  }

  toggleFilterActivities() {
    this.showFilterActivitiesView = !this.showFilterActivitiesView;
  }

  toggleTabularDataFullScreenMode() {
    this.showTabularDataInFullScreen = !this.showTabularDataInFullScreen;

    if (this.showTabularDataInFullScreen) {
      this.prevShowFilterActivitiesViewValue = this.showFilterActivitiesView;
      this.showFilterActivitiesView = false;
    }
    else {

      if (this.prevShowFilterActivitiesViewValue && !this.showFilterActivitiesView) {
        this.showFilterActivitiesView = this.prevShowFilterActivitiesViewValue;
      }
    }

    this.eventManager.setProjectSelection
    this.eventManager.publish(this.showTabularDataInFullScreen ? "FULL_SCREEN_MODE" : "EXIT_FULL_SCREEN_MODE");
  }

  onClearFilter() {
    this.selectedActivityTypes = "";
    this.selectedDateType = "";
    this.selectedDocumentTypes = "";
    this.selectedFinishBy = "";
    this.selectedFunctions = "";
    this.selectedStatusList = "";
    this.selectedViewType = "";
  }

  onSelectionChange(event: any): void {
    this.selectedCols = event.selectedRows.map((row: { dataItem: { id: any; }; }) => row.dataItem.id);
  }

  getSelectedText(selectedItems: string[]): string {
    // const selected = this.items
    //   .filter(i => this.selectedItems.includes(i.value))
    //   .map(i => i.text);
    //selectedItemString: string = selectedItems?.length > 0 ? (selectedItems[0] + (selectedItems.length > 1 ? (selectedItems.length - 1).toString() : "")) : "";
    return 'Select items...';
  }
}
