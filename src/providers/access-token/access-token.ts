import { Injectable } from '@angular/core';

@Injectable()
export class AccessTokenProvider {

  accessToken: any

  constructor() {
    console.log('--> AccessTokenProvider constructor');
  }

  load(scope) {
    console.log('--> AccessTokenProvider called');
    return new Promise( (resolve,reject) => {

      // https://mobilefirstplatform.ibmcloud.com/api-ref/wl-client-js-apidoc/html/refjavascript-client/html/WLAuthorizationManager.html  
      WLAuthorizationManager.obtainAccessToken(scope)
        .then(accessToken => {
          console.log('--> AccessTokenProvider obtainAccessToken:  Success ', accessToken.scope);
          resolve (accessToken)
        }, error => {
          console.log('--> AccessTokenProvider obtainAccessToken:  ERROR HTTP status', error.status);
          console.log('--> AccessTokenProvider obtainAccessToken:  ERROR ', error.responseText);
          reject (error)
        })

    })
  }
}