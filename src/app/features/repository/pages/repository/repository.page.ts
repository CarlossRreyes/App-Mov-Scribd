import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ViewRepositoryComponent } from './components/view-repository/view-repository.component';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.page.html',
  styleUrls: ['./repository.page.scss'],
})
export class RepositoryPage implements OnInit {


  listAllDocuments: any[] = [];

  constructor(
    private _rs: RepositoryService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getAllDocuments();
  }

  async getAllDocuments(){

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'circles'
    });
    loading.present();
    this._rs.loadAllDocuments( ).subscribe({
      next: ( resp ) => {
        if( !resp.status ){

          return;
        }
        console.log( resp );
        this.listAllDocuments = resp.data;
      }, 
      error: ( err ) => {

      }, 
      complete: () => {
        loading.dismiss();
      }
    })
  }

  async onClickView( data: any){
    const modal = await this.modalCtrl.create({
      component: ViewRepositoryComponent,
      mode: 'md',
      componentProps: {
        
        keyDocument: data ,
      }
    });
    modal.present();

    // const { data, role } = await modal.onWillDismiss();
    // if (role === 'confirm') {
    //   if( data){
    //     this.getDocuments();
    //   }
    // }

  }






  

  register(){
    
  }

}
