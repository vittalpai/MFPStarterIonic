import { Injectable } from '@angular/core';

@Injectable()
export class DataAdapterProvider {

  constructor() {
    console.log('--> DataAdapterProvider constructor');
  }

  load() {
    console.log('--> DataAdapterProvider called');

    // https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WLResourceRequest.html
    const resourceRequest = new WLResourceRequest("/adapters/MFPStarterIonicAdapter/getData", WLResourceRequest.GET);


    return new Promise((resolve, reject) => {
      resourceRequest.send() //https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WLResourceRequest.html#send
        .then(response => {
          console.log('--> DataAdapterProvider resourceRequest:  Success ', response);
          resolve(response)
        }, error => {
          console.log('--> DataAdapterProvider resourceRequest:  ERROR HTTP status', error.status);
          console.log('--> DataAdapterProvider resourceRequest:  ERROR ', error.responseText);
          reject(error)
        })

    })
  }
}