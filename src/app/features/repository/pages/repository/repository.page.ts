import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ViewRepositoryComponent } from './components/view-repository/view-repository.component';
import { Browser } from '@capacitor/browser';

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

  async onClickViewDocument( rute: string ){
    console.log("To: ", rute );
    await Browser.open({ url: `https://appinvestigacionanahi.000webhostapp.com/api-scribd/files/${ rute }` });
    
  }

  handleRefresh( event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.getAllDocuments()
    }, 3000);
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
