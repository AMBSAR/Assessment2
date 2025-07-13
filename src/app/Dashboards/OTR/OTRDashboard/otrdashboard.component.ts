import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KENDO_ICONS } from "@progress/kendo-angular-icons";
import { moreHorizontalIcon} from '@progress/kendo-svg-icons';
import { chevronDoubleLeftIcon, chevronRightIcon} from '@progress/kendo-svg-icons';
import { ProjectTreeComponent } from '../ProjectTree/project-tree/project-tree.component';
import { KENDO_TABSTRIP } from '@progress/kendo-angular-layout';
import { KENDO_LABEL } from '@progress/kendo-angular-label';
import { SelectEvent } from "@progress/kendo-angular-layout";
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { EventManagerService } from '../../../Services/EventManager/event-manager.service';
import { Icon_LeftArrow } from '../../../Common/CustomIcons/Icons';

@Component({
  selector: 'app-otrdashboard',
  standalone: true,
  imports: [RouterOutlet, KENDO_ICONS, ProjectTreeComponent, KENDO_TABSTRIP, KENDO_LABEL, KENDO_BUTTONS],
  templateUrl: './otrdashboard.component.html',
  styleUrl: './otrdashboard.component.scss'
})
export class OTRDashboardComponent implements OnInit {
public moreHorizontalIcon = moreHorizontalIcon;
public collapseIcon = Icon_LeftArrow;
public rightIcon = chevronRightIcon;

public selectedTabIndex: number = 0; 
projectListTypes: string[] = ["All", "My", "Fav"];
public projectListType: string;
public showTreeView: boolean = true;

private fullScreenMode: boolean = false;

constructor(private eventManager: EventManagerService) {
  this.projectListType = this.projectListTypes.at(0) as string;
}

onTabSelect(e: SelectEvent){
  this.selectedTabIndex = e.index;
  }

  ngOnInit(): void {
    this.eventManager.eventHandler.subscribe((msg: string) => {
      this.notifyEvent(msg);
    });

    this.projectListType = this.projectListTypes.at(this.selectedTabIndex) as string;
    this.eventManager.setMainDashboard("OTR");
    this.eventManager.publish("MAIN_DASHBOARD_SELECTION_CHANGED");
  }

  notifyEvent(message: string) {
    if (message === "TOGGLE_PROJECT_TREEVIEW") {
        this.toggleProjectTreeView();
    }
    if(message == "FULL_SCREEN_MODE") {
      this.fullScreenMode = true;
    }
    if(message == "EXIT_FULL_SCREEN_MODE") {
      this.fullScreenMode = false;
    }
  }
  
  toggleProjectTreeView() {
    this.showTreeView = !this.showTreeView;
  }

  onCollapseTreeView() {
    this.showTreeView = false;
  }

  canShowTreeView(){
    return !this.fullScreenMode && this.showTreeView;
  }
}
