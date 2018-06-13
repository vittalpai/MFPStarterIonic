import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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


    return new Promise((resolve, reject) => {
      resourceRequest.sendFormParameters(formParams) //https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WLResourceRequest.html#send
        .then(response => {
          console.log('--> PostResourceProvider resourceRequest:  Success ', response);
          resolve(response)
        }, error => {
          console.log('--> PostResourceProvider resourceRequest:  ERROR HTTP status', error.status);
          console.log('--> PostResourceProvider resourceRequest:  ERROR ', error.responseText);
          reject(error)
        })
      });
    
  }
  
}