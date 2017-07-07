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
    // for the first root page WL may not has jet loaded 
    // since we did not wait for MFPInitComplete() before display the root_page
    WL.Analytics.send();  
  }

  callMFP() {
    WL.Analytics.log({ "func": 'callMFP' });

    // URL just read from config.xml no server call 
    WL.App.getServerUrl(url => {
      console.log('--> MFPServer - connecting to:  ', url);
      this.mfpserverurl = url;
    }, error => {
      console.log('-->  getServerUrl: ERROR ', error);
      this.mfpserverurl = 'ERROR: ' + error.status
    })

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