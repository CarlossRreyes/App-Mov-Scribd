import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view-repository',
  templateUrl: './view-repository.component.html',
  styleUrls: ['./view-repository.component.scss'],
})
export class ViewRepositoryComponent  implements OnInit {
  d: any;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if( this.navParams.get('keyDocument') === undefined ){
      return;
    }
    this.d = this.navParams.get('keyDocument');
    console.log("Data selected: ", this.d);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }



}
