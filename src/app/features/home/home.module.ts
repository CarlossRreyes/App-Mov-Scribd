import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IonicModule } from '@ionic/angular';

import { TabsComponent } from './components/tabs/tabs.component';



@NgModule({
  declarations: [
    TabsComponent,
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule
  ],
  exports: [
    
  ]
})
export class HomeModule { }
