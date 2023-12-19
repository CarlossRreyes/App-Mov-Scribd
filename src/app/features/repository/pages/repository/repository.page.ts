import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { LoadingController } from '@ionic/angular';

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


  

  register(){
    
  }

}
