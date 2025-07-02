import { Component, viewChild } from '@angular/core';
import {IEPModuleData} from '../../../Classes/common-classes'
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import {Router} from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-iepmain-dashboard',
  standalone: true,
  imports: [NavigationBarComponent, DashboardHeaderComponent, RouterOutlet],
  templateUrl: './iepmain-dashboard.component.html',
  styleUrl: './iepmain-dashboard.component.scss'
})
export class IEPMainDashboardComponent {

  moduleList : IEPModuleData[] = [
    { Icon:'/assets/Images/npi_icon.png', ModuleName: 'NPD', RouterLink: '/NPD'},
    { Icon:'/assets/Images/otr_icon.png', ModuleName: 'OTR', RouterLink: '/OTR'} 
  ];

   constructor(private router: Router){}

  onModuleSelect(link: string) {
    this.router.navigate([link]);
  }
}
