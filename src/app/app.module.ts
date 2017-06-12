import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MFPStarterIonic } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AccessTokenProvider } from '../providers/access-token/access-token';
import { UnprotectedResourceProvider } from '../providers/unprotected-resource-adapter/unprotected-resource-adapter';
import { JsonTestProvider } from '../providers/json-test/json-test';
import { DataAdapterProvider } from '../providers/data-adapter/data-adapter';

@NgModule({
  declarations: [
    MFPStarterIonic,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MFPStarterIonic)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MFPStarterIonic,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AccessTokenProvider,
    UnprotectedResourceProvider,
    JsonTestProvider,
    DataAdapterProvider
  ]
})
export class AppModule { }
