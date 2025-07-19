import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAuthenticatorService } from '../../Services/Authenticator/user-authenticator.service';
import { User } from '../../Interfaces/common-interfaces';
import { DataLoaderService } from '../../Services/DataLoader/data-loader.service';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs'
import { KENDO_LABELS } from '@progress/kendo-angular-label'
import { KENDO_CHECKBOX } from '@progress/kendo-angular-inputs';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KENDO_INDICATORS, LoaderType, LoaderThemeColor, LoaderSize, } from "@progress/kendo-angular-indicators";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [KENDO_INPUTS, KENDO_LABELS, KENDO_CHECKBOX, KENDO_BUTTONS, ReactiveFormsModule, CommonModule,
            KENDO_INDICATORS, MatFormFieldModule, MatDialogModule],
            //, MatInputModule, MatButtonModule, MatDialogModule
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})

export class LoginViewComponent implements OnInit {

  registeredUsers: any[] = [{
    userName: '',
    password: ''
  }];

  public loaderType: LoaderType = <LoaderType>"pulsing";
  public loaderSize: LoaderSize = <LoaderSize>"medium";

  showLoader = false;
  showMessage = false;
  Message = '';
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: UserAuthenticatorService, private dataLoader: DataLoaderService) {

    this.loginForm = this.fb.group(
      {
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        isRememberMeSelected: new FormControl(false)
      }
    )
  }

  onLogin() {
    this.showLoader = true;
    this.showMessage = false;
    let user = this.loginForm.value.userName;
    let pwd = this.loginForm.value.password;
    let rememberData = this.loginForm.value.isRememberMeSelected;

    if (!this.loginForm.valid) {
      this.Message = "UserName and Password fields are mandatory";
      this.showLoader = false;
      this.showMessage = true;
    }
    else {
      //let userData = await firstValueFrom(this.authService.getUserData(user, pwd));
      // this.authService.getUserData(user, pwd).subscribe((x: any) => {
      //   if (x != undefined) {
      //     userData = x;
      //   }
      // });
      this.dataLoader.login(user, pwd).subscribe((x: any) => {
        this.isLoginSuccess(x, rememberData, user, pwd);
      });
    }
  }

  saveUserData(user: string, password: string) {

    let registerUserObj: any = {
      userName: '',
      password: ''
    };

    registerUserObj.userName = user;
    registerUserObj.password = password;

    const userData = this.registeredUsers?.find(x => x.userName === user);

    if (userData == undefined) {
      this.registeredUsers.push(registerUserObj);
      localStorage.setItem('loggedInUsers', JSON.stringify(this.registeredUsers));
    }
  }

  ngOnInit(): void {
    const localData = localStorage.getItem("loggedInUsers");
    if (localData != null) {
      this.registeredUsers = JSON.parse(localData);
    }
  }

  getPassword(user: string) {
    const userData = this.registeredUsers?.find(x => x.userName === user);

    if (userData != undefined) {
      return userData.password;
    }
  }

  autoPopulatePassword() {
    let user = this.loginForm.value.userName;
    let pwd = this.loginForm.value.password;
    let isSave = this.loginForm.value.isRememberMeSelected;

    if (user != undefined && (pwd == '' || pwd == undefined)) {
      this.loginForm.setValue({ userName: user, password: this.getPassword(user), isRememberMeSelected: isSave });
    }
  }

  isLoginSuccess(x: any, rememberData: boolean, user: string, pwd: string) {
    let userData = x;
    try {
      if (userData != null && userData != undefined && userData.ssoid != undefined) {
        this.authService.setCurrentUser(userData);
        this.showLoader = false;

        if (rememberData) {
          this.saveUserData(user, pwd);
        }
        
        this.router.navigate(['/main']);
      }
      else {
        if (this.loginForm.valid) {
          this.Message = "Invalid UserName or Password";
        }
        else {
          this.Message = "UserName and Password fields are mandatory";
        }
        this.showLoader = false;
        this.showMessage = true;
      }
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      this.Message = "Invalid UserName or Password";
      this.showLoader = false;
      this.showMessage = true;
    }
  }

  isErrorMsgDisplayed() {
    return (this.loginForm.get('userName')?.hasError('required') && this.loginForm.get('userName')?.touched || 
    this.loginForm.get('password')?.hasError('required') && this.loginForm.get('password')?.touched);
  }
}

