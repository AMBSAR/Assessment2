import { Injectable, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserDataList, User} from '../../Interfaces/common-interfaces'
import { DataLoaderService } from '../DataLoader/data-loader.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticatorService {

  //serverURL: string = 'http://localhost:3000';
  //url: string = '/assets/JSON_Files/AllUserList.json';
  validUserList : UserDataList | undefined;
  loggedInUser: User | null = null;
  
  constructor(private http: HttpClient, private dataLoader: DataLoaderService) { 
    //this.loadData();
  }

  // loadData() {
  //   this.http.get<UserDataList>(this.url).subscribe((res) => {
  //     this.validUserList = res;
  //   });
  // }

  getUserData(userName: string, password: string) {
    // if (password == userName + 'online') {
    //   if (this.validUserList != null && this.validUserList.users != null && this.validUserList.users.length > 0) {
    //     const result = this.validUserList.users.find(x => x.ssoid === userName);

    //     if (result != undefined) {
    //       return result;
    //     }
    //   }
    //}

// this.http.get<UserDataList>(this.serverURL + this.loginUrl).subscribe((res) => {
//       this.validUserList = res;
//     });

    this.dataLoader.login(userName, password).subscribe((x: any) => {
      return x;
    })
  }

  setCurrentUser(userData: User) {
    this.loggedInUser = userData
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  clearLoginData() {
    this.loggedInUser = null;
  }
}
