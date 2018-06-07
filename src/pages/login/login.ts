import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AccessTokenProvider } from '../../providers/access-token/access-token';

import { TabsPage } from '../../pages/tabs/tabs';

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

  //navParams
  authHandler: any
  isChallenged: boolean
  msg: string

  constructor(
    private accessToken: AccessTokenProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    console.log('--> LoginPage constructor')
    this.authHandler = navParams.get('authHandler');
    this.isChallenged = navParams.get('isChallenged');
    this.msg = navParams.get('msg');
    console.log('--> LoginPage authHandler: ', this.authHandler)
    console.log('--> LoginPage isChallenged: ', this.isChallenged)
    console.log('--> LoginPage msg: ', this.msg)
  }

  ionViewWillLeave() {
  
  }

  login() {

    // https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/authentication-and-security/user-authentication/javascript/
    if (this.isChallenged) {
      console.log('--> LoginPage userLoginChallengeHandler called')
      this.authHandler.submitChallengeAnswer({ 'username': this.username, 'password': this.password });
      this.navCtrl.setRoot(TabsPage)  // should normaly switch back to calling component - not implemented right now


    } else {
      console.log('--> LoginPage WLAuthorizationManager.login called');

      WLAuthorizationManager.login("UserLogin", { 'username': this.username, 'password': this.password })
        .then(response => {
          console.log('-->  login: Success', response);
          this.loginResult = "login: Success"

        }, error => {
          console.log('-->  login: ERROR: ', error);
          this.loginResult = 'login: ERROR: ' + JSON.stringify(error, null, 2)
        })

      console.log('--> LoginPage accessToken.load called');
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
}
