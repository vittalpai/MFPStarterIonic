import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AccessTokenProvider } from '../../providers/access-token/access-token';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AccessTokenProvider]
})
export class LoginPage {

  username: string
  password: string
  resultScope: string
  loginResult: string

  constructor(
    private accessToken: AccessTokenProvider
  ) {
    console.log('--> LoginPage constructor')
  }

  ionViewWillLeave() {
    WL.Analytics.send();
  }

  login() {

    // https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/authentication-and-security/user-authentication/javascript/
    WLAuthorizationManager.login("UserLogin", { 'username': this.username, 'password': this.password })
      .then(response => {
        console.log('-->  login: Success', response);
        this.loginResult = "login: Success"

      }, error => {
        console.log('-->  login: ERROR: ', error);
        this.loginResult = 'login: ERROR: ' + JSON.stringify(error, null, 2)
      })

    const scope: string = "UserLogin"  //NEW REQUESTED OAuth SCOPE: "UserLogin" (same name as security check)

    this.accessToken.load(scope)  // AccessTokenProvider
      .then((token: any) => {
        console.log('-->  accessToken.load:   Success ', token);
        this.resultScope = 'Success!  Scope: ' + token.scope
      }, error => {
        console.log('-->  accessToken.load:  ERROR HTTP status', error.status);
        console.log('-->  accessToken.load:  ERROR ', error.responseText);
        this.resultScope = 'ERROR!  status: ' + error.status + ' ' + error.responseText
      })

  }

}
