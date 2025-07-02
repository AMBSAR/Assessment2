import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
// import { KENDO_SVGICON } from '@progress/kendo-svg-icons';
import { KENDO_ICONS } from "@progress/kendo-angular-icons";
import { sortDescIcon, commentIcon, questionCircleIcon, bellIcon, chevronRightIcon } from '@progress/kendo-svg-icons';
import { EventManagerService } from './../../../Services/EventManager/event-manager.service';
import { Icon_Menu, Icon_Notifications, Icon_ChangeDashboard, Icon_Logout } from '../../../Common/CustomIcons/Icons';
import { User } from '../../../Interfaces/common-interfaces';
import { DataLoaderService } from '../../../Services/DataLoader/data-loader.service'
import { UserAuthenticatorService } from '../../../Services/Authenticator/user-authenticator.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [KENDO_ICONS, CommonModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})


export class DashboardHeaderComponent implements OnInit {
  SelectedMainDashboard: String = '';

  //public unOrderedListIcon = sortDescIcon;
  public unOrderedListIcon = Icon_Menu;
  public messagesIcon = commentIcon;
  public helpIcon = questionCircleIcon;
  //public notificationIcon = bellIcon;
  public notificationIcon = Icon_Notifications;
  public changeDashboardIcon = Icon_ChangeDashboard;
  public logoutIcon = Icon_Logout;
  public rightArrowIcon = chevronRightIcon;
  isProfilePicBtnClick : boolean= false;

  LoggedInUserImage: string = '';
  showNotification: boolean = true;
  NotificationCount: number = 1;
  public LoggedInUser: any;
  public canShowProfileView = false;
  
  @ViewChild('dashboardProfileView') profileViewElement!: ElementRef<HTMLInputElement>;
  @ViewChild('ProfileViewSmallView') profileViewBtnElement!: ElementRef<HTMLInputElement>;

  constructor(private eventManager: EventManagerService, 
              private userData: UserAuthenticatorService, 
              private router: Router) {}

  ngOnInit(): void {
    this.eventManager.eventHandler.subscribe(msg => {
      this.notifyEvent(msg);
    });

    this.LoggedInUser = this.userData.getLoggedInUser();
    this.LoggedInUserImage = (this.LoggedInUser as User).emailId;
  }

  notifyEvent(message: string) {
    if (message === "MAIN_DASHBOARD_SELECTION_CHANGED") {
        this.SelectedMainDashboard = this.eventManager.getMainDashboard();
    }
  }

  onChangeDashboardClicked() {

  }

  onLogout() {
    this.userData.clearLoginData();
    this.router.navigate(['/login']);
  }

  getUserName() {
    return (this.LoggedInUser as User).firstName + " " + (this.LoggedInUser as User).lastName;
  }

  onProfileIconClicked() {
    this.isProfilePicBtnClick = true;
    this.canShowProfileView = !this.canShowProfileView;
  }

  getFirstLetter() {
    return (this.LoggedInUser as User).firstName.charAt(0).toUpperCase() + (this.LoggedInUser as User).lastName.charAt(0).toUpperCase();
  }

   @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.isProfilePicBtnClick) {
      this.isProfilePicBtnClick = false;
    }
    else if (this.profileViewElement?.nativeElement !== event.target ) {
      this.canShowProfileView = false;
    }
  }
}
