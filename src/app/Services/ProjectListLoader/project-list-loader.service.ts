import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectDetails } from '../../Interfaces/common-interfaces';
import { ProjectData } from '../../Classes/common-classes';
import { BehaviorSubject, of } from 'rxjs';
import { DataLoaderService } from '../DataLoader/data-loader.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectListLoaderService {

  url: string = '/allcontracts';
  projectDetailsList: ProjectDetails[] | undefined;
  projectList: ProjectData[] | undefined;
  myProjectList: ProjectData[] | undefined;
  // private messageSource = new BehaviorSubject('projectTreeView');
  // projectLoadedMsg = this.messageSource.asObservable();


  private isDataLoadingInProgress: boolean = false;

  constructor(private http: HttpClient, private dataLoader: DataLoaderService) {
    //this.loadData();
  }


  loadDataFromServer(callback: any) {
    this.dataLoader.getItems(this.url).subscribe((x: any) => {
      this.setProjectData(x);
      callback();
    })
  }

  setProjectData(res: any) {
    this.isDataLoadingInProgress = true;
    this.projectList = [];
    this.myProjectList = [];

    this.projectDetailsList = res as ProjectDetails[];
      if (this.projectDetailsList != undefined) {
        this.projectDetailsList.forEach((x: ProjectDetails) => {
          let data = new ProjectData(x);
          this.projectList?.push(data);

          if (x.isMyProject) {
            this.myProjectList?.push(data);
          }
        });
      }

      this.isDataLoadingInProgress = false;
  }

  getAllProjectDataList() : any[] {
    if (!this.isDataLoadingInProgress) {
      if (this.projectList != null) {
        return this.projectList.sort((a, b) => a.projectName?.localeCompare(b.projectName));
      }
    }

    return [];
  }

  getMyProjectDataList() : any[] {
    if (!this.isDataLoadingInProgress) {
      if (this.myProjectList != null) {
        return this.myProjectList.sort((a, b) => a.projectName?.localeCompare(b.projectName));
      }
    }

    return [];
  }

  // publish(message: string) {
  //   this.messageSource.next(message)
  // }
}