import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { UnprotectedResourceProvider } from '../../providers/unprotected-resource-adapter/unprotected-resource-adapter';
import { JsonTestProvider } from '../../providers/json-test/json-test';
import { DataAdapterProvider } from '../../providers/data-adapter/data-adapter';


@IonicPage()
@Component({
  selector: 'page-adapter',
  templateUrl: 'adapter.html'
})
export class AdapterPage {

  unprotected: string;
  data: string;
  jsonTest: string;

  constructor(
    public navCtrl: NavController,
    private ref: ChangeDetectorRef,
    private unprotectedResource: UnprotectedResourceProvider,
    private jsonTestResource: JsonTestProvider,
    private dataResource: DataAdapterProvider
  ) { 
    console.log('--> AdapterPage constructor')
  }

  getUnprotected() {
    WL.Analytics.log({ "func": 'getUnprotected' });

    this.unprotectedResource.load()
      .then((response: any) => {
        console.log('-->  unprotectedResource.load:   Success ', response);
        this.unprotected = response.responseJSON.result;
      }, error => {
        console.log('-->  unprotectedResource.load:  ERROR HTTP status', error.status);
        console.log('-->  unprotectedResource.load:  ERROR ', error.responseText);
        this.unprotected = 'ERROR!  status: ' + error.status + ' ' + error.responseText
      })
  }

  getData() {
    WL.Analytics.log({ "func": 'getData' });

    this.dataResource.load()
      .then((response: any) => {
        console.log('-->  dataResource.load:   Success ', response);
        this.data = JSON.stringify(response.responseJSON, null, 2);
      }, error => {
        console.log('-->  dataResource.load:  ERROR HTTP status', error.status);
        console.log('-->  dataResource.load:  ERROR ', error.responseText);
        this.data = 'ERROR!  status: ' + error.status + ' ' + error.responseText
      });
  }

  getJsonTest_Promise() {
    WL.Analytics.log({ "func": 'getJsonTest' });

    this.jsonTestResource.load_Promise()
      .then((response: any) => {
        console.log('-->  jsonTestResource.load_Promise:   Success ', response);
        this.jsonTest = JSON.stringify(response.responseJSON, null, 2);
      }, error => {
        console.log('-->  jsonTestResource.load_Promise:  ERROR HTTP status', error.status);
        console.log('-->  jsonTestResource.load_Promise:  ERROR ', error.responseText);
        this.jsonTest = 'ERROR!  status: ' + error.status + ' ' + error.responseText
      })

  }

  getJsonTest_rxjs() {
    WL.Analytics.log({ "func": 'getJsonTest' });

    this.jsonTestResource.load_rxjs()
      .subscribe(response => {
        console.log('-->  jsonTestResource.load_rxjs.subscribe:  Success ', response);
        this.jsonTest = JSON.stringify(response.responseJSON, null, 2)
        this.ref.detectChanges();
      }, error => {
        console.log('-->  jsonTestResource.load_rxjs.subscribe:  ERROR HTTP status', error.status);
        console.log('-->  jsonTestResource.load_rxjs.subscribe:  ERROR ', error.responseText);
        this.jsonTest = 'ERROR!  status: ' + error.status + ' ' + error.responseText
        this.ref.detectChanges();
      })

  }

}