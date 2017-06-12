import { Injectable } from '@angular/core';

@Injectable()
export class UnprotectedResourceProvider {

  constructor() {
    console.log('--> UnprotectedResourceProvider constructor');
  }

  load() {
    console.log('--> UnprotectedResourceProvider called');

    // https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WLResourceRequest.html
    const resourceRequest = new WLResourceRequest("/adapters/MFPStarterIonicAdapter/hello", WLResourceRequest.GET);

    return new Promise((resolve, reject) => {
      resourceRequest.send() //https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WLResourceRequest.html#send
        .then(response => {
          console.log('--> UnprotectedResourceProvider resourceRequest:  Success ', response);
          resolve(response)
        }, error => {
          console.log('--> UnprotectedResourceProvider resourceRequest:  ERROR HTTP status', error.status);
          console.log('--> UnprotectedResourceProvider resourceRequest:  ERROR ', error.responseText);
          reject(error)
        })

    })
  }
}