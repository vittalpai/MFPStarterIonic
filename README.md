This is a starter template for [IBM MobleFirst](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/cordova-tutorials/) and [Ionic (V3 typescript)](http://ionicframework.com/docs/) projects.

## How to use this template

*You can run this mobile app without installing your own MobileFirst DevelomentKit/Server by using my demo-mfpserver on Bluemix (this may change in the future)*. **However is recommended to install your own server locally using the FREE MobileFirst Developer Kit**

See [MobileFirst Developer Kit - Installation guide](https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/installation-configuration/development/mobilefirst/)  


### Prereq 

You need some basic [Ionic](http://ionicframework.com/docs/) knowlage and the ionic cli installed.

Also Android Stuido (or Xcode on Mac) is needed for the device emulators

```bash
npm install -g ionic 
npm install -g cordova
```

clone the repository, cd into and run (the run commnand should also install the needed plugins):

```bash
ionic cordova resources android
ionic cordova platform add android@latest
ionic cordova run android -emulator
```
### Todo

- extend docu

### Changelog

- 20170612 - first public Version
- 20170630 - update mfp / cordova 7 support
 


