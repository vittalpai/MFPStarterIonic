import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AdapterPage } from './adapter';

@NgModule({
  declarations: [
    AdapterPage
  ],
  imports: [
    IonicPageModule.forChild(AdapterPage),
  ]
})
export class AdapterPageModule { }
