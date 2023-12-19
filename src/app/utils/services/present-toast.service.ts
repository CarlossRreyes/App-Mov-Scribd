import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PresentToastService {

  constructor(
    private toastCtrl: ToastController
  ) { }


  async presentToastController(message: string, color: string, icono: string){
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
      icon: icono,
      cssClass: ".icon{align-item: right}"
      
    });

    (await toast).present()
  }
}
