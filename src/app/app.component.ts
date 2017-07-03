import { Component, Renderer } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MFPStarterIonic {
  rootPage: any = TabsPage;
  private authHandler: any

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private renderer: Renderer,
    public alertCtrl: AlertController
  ) {

    // register mfp init function after plugin loaded 
    renderer.listenGlobal('document', 'mfpjsloaded', () => {
      console.log('--> MobileFirst API plugin init complete');
      this.MFPInitComplete();
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  // MFP Init complete function / mfp plugin loaded
  MFPInitComplete() {
    console.log('--> MFPInitComplete function called')
    WL.Logger.config({ level: 'DEBUG' }) // default app log level 
    
    WL.Logger.updateConfigFromServer(); // get Log level from app config on MFP Server 
    WL.Logger.status().then(status => console.log('--> WL-logger status: ' , status ))

    this.authInit()  // register a ChallengeHandler callback for security check

    // this.rootPage = TabsPage;  // wait for mfp before display any page  
  }

  authInit() {
    console.log('--> authInit function called')

    // https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WL.Client.AbstractChallengeHandler.html#handleChallenge
    this.authHandler = WL.Client.createSecurityCheckChallengeHandler("UserLogin")  // UserLogin Security Adapter needed 
    this.authHandler.handleChallenge = ((response: any) => {
      console.log('--> AuthHandler.handleChallenge called');

      if (response.errorMsg) {
        var msg = response.errorMsg + ' <br> Remaining attempts: ' + response.remainingAttempts;
        console.log('--> AuthHandler.handleChallenge ERROR: ' + msg);
      }

      let prompt = this.alertCtrl.create({
        title: 'Login',
        message: msg,
        inputs: [
          {
            name: 'username',
            placeholder: 'user'
          },
          {
            name: 'password',
            placeholder: 'pw',
            type: 'password'
          },
        ],
        buttons: [
          {
            text: 'Login',
            handler: data => {
              console.log('--> AuthHandler.handleChallenge try Login for', data.username);
              this.authHandler.submitChallengeAnswer(data);
            }
          }
        ]
      });
      prompt.present();

    })
  }

}