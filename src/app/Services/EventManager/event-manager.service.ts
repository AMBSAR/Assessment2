import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectData } from '../../Classes/common-classes';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  private mainDashboard = '';
  private selectedProject: ProjectData | null = null;

  private messageSource = new BehaviorSubject('MessageService');
  eventHandler = this.messageSource.asObservable();
  
  constructor() { }

  publish(message: string) {
    this.messageSource.next(message)
  }

  setMainDashboard(selection: string) {
    this.mainDashboard = selection;
  }

  getMainDashboard() {
    return this.mainDashboard;
  }

  setProjectSelection(selection: ProjectData | null) {
    this.selectedProject = selection;
  }

  getProjectSelection() {
    return this.selectedProject;
  }
}
