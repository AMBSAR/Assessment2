import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SVGIcon, menuIcon, anchorIcon, tableIcon, folderAddIcon, folderIcon, checkOutlineIcon, myspaceIcon, gearIcon, logoutIcon } from '@progress/kendo-svg-icons';
import { UserAuthenticatorService } from '../../../Services/Authenticator/user-authenticator.service';
import { Router } from '@angular/router';
import { DrawerItem, DrawerSelectEvent, KENDO_LAYOUT } from "@progress/kendo-angular-layout";
import { Icon_Device_hub, Icon_Apps, Icon_Engineering, Icon_Folder, Icon_FolderManaged, Icon_Settings, Icon_Verified } from "../../../Common/CustomIcons/Icons";
import {
  KENDO_ICONS,
  ICON_SETTINGS,
  IconSettingsService,
  IconsService,
} from "@progress/kendo-angular-icons";
import { EventManagerService } from '../../../Services/EventManager/event-manager.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [KENDO_ICONS, CommonModule, RouterModule, KENDO_LAYOUT],
  providers: [
    IconSettingsService,
    IconsService,
    {
      provide: ICON_SETTINGS,
      useValue: { type: "font" },
    },
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})

export class NavigationBarComponent {

  constructor(private authService: UserAuthenticatorService, private router: Router, private eventManager: EventManagerService) { }
  public expanded = false;
  public contractListIcon: SVGIcon = Icon_Device_hub;
  public projectInfoIcon: SVGIcon = Icon_Apps;
  public operationIcon: SVGIcon = Icon_FolderManaged;
  public qualityIcon: SVGIcon = Icon_Folder;
  public enggIcon: SVGIcon = Icon_Verified;
  public privilegeIcon: SVGIcon = Icon_Engineering;
  public controlPanelIcon: SVGIcon = Icon_Settings;
  public selectedIndex = 1;


  home = { text: 'ContractList', svgIcon: this.contractListIcon, router: '' };
  items = [
    // { text: 'ContractList', svgIcon: tableIcon, router: '#' },
    // { text: 'ProjectInfo', svgIcon: tableIcon, router: '/main/OTR/ProjectInfo' },
    // { text: 'Operations', svgIcon: folderAddIcon, router: '/main/OTR/Operations' },
    // { text: 'Quality', svgIcon: folderIcon, router: '/main/OTR/Quality' },
    // { text: 'Engineering', svgIcon: checkOutlineIcon, router: '/main/OTR/Engineering' },
    // { text: 'Privilege', svgIcon: myspaceIcon, router: '/Privilege' },
    // { text: 'ControlPanel', svgIcon: gearIcon, router: '/ControlPanel' },
    // { text: 'Logout', svgIcon: logoutIcon, router: '/login' }
    // { text: 'ContractList', svgIcon: 'device_hub', router: '#' },
    // { text: 'ProjectInfo', svgIcon: 'apps', router: '/main/OTR/ProjectInfo' },
    // { text: 'Operations', svgIcon: 'folder_managed', router: '/main/OTR/Operations', selected: true },
    // { text: 'Quality', svgIcon: 'folder', router: '/main/OTR/Quality' },
    // { text: 'Engineering', svgIcon: 'verified', router: '/main/OTR/Engineering' },
    // { text: 'Privilege', svgIcon: 'engineering', router: '/Privilege' },
    // { text: 'ControlPanel', svgIcon: 'settings', router: '/ControlPanel' }
    { text: 'ProjectInfo', svgIcon: this.projectInfoIcon, router: '/main/OTR/ProjectInfo' },
    { text: 'Operations', svgIcon: this.operationIcon, router: '/main/OTR/Operations', selected: true },
    { text: 'Quality', svgIcon: this.qualityIcon, router: '/main/OTR/Quality' },
    { text: 'Engineering', svgIcon: this.enggIcon, router: '/main/OTR/Engineering' },
    { text: 'Privilege', svgIcon: this.privilegeIcon, router: '/Privilege' },
    { text: 'ControlPanel', svgIcon: this.controlPanelIcon, router: '/ControlPanel' }
  ];

  dashboardSelected(index: number, link: string) {
    if (link === '') {
      this.eventManager.publish("TOGGLE_PROJECT_TREEVIEW");
    }
    else {
      this.selectedIndex = index
    }
  }

  public onSelect(event: any): void {
    //this.selectedIndex = event.selectedIndex;
    if (event.item.router == '') {
      this.eventManager.publish("TOGGLE_PROJECT_TREEVIEW");
    }
    else {
      this.router.navigate([event.item.router]);
    }
  }
}
