import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/map';


@Injectable()
export class PostProvider {

  constructor() {
    console.log('--> PostProvider constructor');
  }

  load(p1, p2) {
    console.log('--> PostProvider called');

    // https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WLResourceRequest.html
    const resourceRequest = new WLResourceRequest("/adapters/MFPStarterIonicAdapter/postData", WLResourceRequest.POST);
    let formParams = { "params": `['${p1}','${p2}']` }
    console.log('--> PostProvider formParams:  ', formParams);

    return Observable.fromPromise(resourceRequest.sendFormParameters(formParams) as any);     
  }
  
}