import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KENDO_TABSTRIP, SelectEvent } from '@progress/kendo-angular-layout';
import {
  KENDO_PROGRESSBARS,
  ProgressColor,
} from "@progress/kendo-angular-progressbar";
import { IspoDashboardComponent } from '../ISPO/ispo-dashboard/ispo-dashboard.component';
import { PageTBDComponent } from '../../../page-tbd/page-tbd.component';

@Component({
  selector: 'app-operations-dashboard',
  standalone: true,
  imports: [KENDO_TABSTRIP, KENDO_PROGRESSBARS, IspoDashboardComponent],
  templateUrl: './operations-dashboard.component.html',
  styleUrl: './operations-dashboard.component.scss'
})

export class OperationsDashboardComponent {
  LastUploadedDate:string = '04 Feb 2025';
  YTD_Value: number = 72;
  selectedTabIndex: number = 0;



  onTabSelect(e: SelectEvent){
  this.selectedTabIndex = e.index;
    }
}
