import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { BehaviorSubject, Observable, timeout } from 'rxjs';
import { FiscalWeekData, ISPOTabularDataList, SummaryData, ColumnList, FWSummaryData } from '../../Interfaces/common-interfaces';

@Injectable({
  providedIn: 'root'
})

export class DataLoaderService {

  serverURL: string = 'http://localhost:3000';
  LOGIN_URL: string = '/login';
  ISPO_Tabular_URL: string = '/ispoTabularData';
  ISPO_FW_URL: string = '/ispoFwSummary';
  ISPO_SUMMARY_URL: string = '/isposummary';
  // ISPO_COLUMNS_URL: string = '/assets/JSON_Files/ISPOSummaryData.json';
  // ISPO_Tabular_URL: string = '/assets/JSON_Files/ISPO_TabularData.json';
  // ISPO_FW_URL: string = '/assets/JSON_Files/ISPOFiscalWeekData.json';
  // ISPO_SUMMARY_URL: string = '/assets/JSON_Files/ISPOSummaryData.json';
  // ISPO_COLUMNS_URL: string = '/assets/JSON_Files/ISPOSummaryData.json';

  private messageSource = new BehaviorSubject('projectTreeView');
  dataLoadedEventMgr = this.messageSource.asObservable();

  private ISPOTabularData: ISPOTabularDataList | undefined;
  private ISPOFWData: FWSummaryData | undefined
  private ISPOSummaryData: SummaryData | undefined;
  private ISPOTabularColumns: ColumnList | undefined;
  private SelectedProjects: any[] | undefined;

  constructor(private http: HttpClient) { 
    this.dataLoadedEventMgr.subscribe(msg => {
      this.onNotify(msg);
    });
  }

  getFullURL(url:string) {
    return this.serverURL + url;
  }

login(user: string, pwd: string) : Observable<any> {
  console.log(user,pwd);
  const params = new HttpParams()
      .set('user', user)
      .set('pwd', pwd);
    // this.http.get(this.getFullURL(this.LOGIN_URL),{params}).pipe(timeout(60000)).subscribe((res) => {
    //   console.log("Response Received - " + res);
    //   return res
    // });
     return this.http.get(this.getFullURL(this.LOGIN_URL), { params }).pipe(timeout(60000));
}

getItems(api: string): Observable<any> {
  return this.http.get(this.getFullURL(api));
}

postItem(api: string, payload: any): Observable<any> {
  return this.http.post(this.getFullURL(api), payload);
}

getData(api: string): Observable<any> {
  return this.http.get(this.getFullURL(api));
}

getAsync(api: string, callback: any) {
  this.getData(api).subscribe((res: any) => {
      callback(res);
    });
}

  loadISPOTabularData(callback: any) {
    //this.ISPOTabularData = undefined;

    // this.http.get<any>(this.ISPO_Tabular_URL).subscribe((res) => {
    //   this.ISPOTabularData = res;

    //   this.publish("ISPO_TABULARDATA_LOADED");
    // });
    this.getData(this.ISPO_Tabular_URL).subscribe((res: any) => {
      // this.ISPOTabularData = res;
      // this.publish("ISPO_TABULARDATA_LOADED");
      callback(res);
    });
  }

  getISPOTabularData() : any {
      return this.ISPOTabularData;
    }

    loadISPOFWData(callback: any) {
    //this.ISPOFWData = undefined;

    // this.http.get<any>(this.ISPO_FW_URL).subscribe((res) => {
    //   this.ISPOFWData = res;

    //   this.publish("ISPO_FW_DATA_LOADED");
    // });
    this.getData(this.ISPO_FW_URL).subscribe((res: any) => {
      //this.ISPOFWData = res;
      //this.publish("ISPO_FW_DATA_LOADED");
      callback(res);
    });
  }

  getISPOFWData() : any {
      return this.ISPOFWData;
    }

    loadISPOSummaryData(callback: any) {
    //this.ISPOSummaryData = undefined;

//     this.http.get<any>(this.ISPO_SUMMARY_URL).subscribe((res) => {
//       this.ISPOSummaryData = res;
// debugger
//      // this.publish("ISPO_SUMMARY_DATA_LOADED");
//     });
  this.getData(this.ISPO_SUMMARY_URL).subscribe((res: any) => {
      //this.ISPOSummaryData = res;
      // let data: any = res;
      // this.publish("ISPO_SUMMARY_DATA_LOADED");
      callback(res);
    })
  }

  getISPOSummaryData() : any {
      return this.ISPOSummaryData;
    }

    setProjectSelection(selectedProjects: any[]) {
      this.SelectedProjects = selectedProjects;
    }

    getSelectedProjects() {
      return this.SelectedProjects;
    }

  publish(message: string) {
    this.messageSource.next(message)
  }

  onNotify(msg: string){
    // if (msg == "LOAD_ISPO_TABULARDATA") {
    //     this.loadISPOTabularData();
    // }
    // else if(msg == "LOAD_ISPO_FWDATA") {
    //   this.loadISPOFWData(this.onGetISPOFWData);
    // }
    // else if(msg == "LOAD_ISPO_SUMMARY_DATA") {
    //   this.loadISPOSummaryData();
    // }
  }
}