import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AccessTokenProvider } from '../../providers/access-token/access-token';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AccessTokenProvider]
})
export class HomePage {

  mfpserverurl: string;
  result: string

  constructor(
    public navCtrl: NavController,
    private accessToken: AccessTokenProvider
  ) { 
    console.log('--> HomePage constructor')
  }

  ionViewWillLeave() {

  }

  callMFP() {
    const scope: string = ""  //empty = DEFAULT_SCOPE: "RegisteredClient" 

    this.accessToken.load(scope)  // AccessTokenProvider
      .then((token: any) => {
        console.log('-->  accessToken.load:   Success ', token);
        this.result = 'Success!  Scope: ' + token.scope
      }, error => {
        console.log('-->  accessToken.load:  ERROR HTTP status', error.status);
        console.log('-->  accessToken.load:  ERROR ', error.responseText);
        this.result = 'ERROR!  status: ' + error.status + ' ' + error.responseText
      })
  }

}