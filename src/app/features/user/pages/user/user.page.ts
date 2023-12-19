import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CreateUpdateDocumentComponent } from '../../components/create-update-document/create-update-document.component';
import { DocumentService } from '../../services/document.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {


  listDocuments: any[] = [];
  user_id!: number;
  objectUser!: any;
  constructor(
    private modalCtrl: ModalController,
    private _ds: DocumentService,
    private loadingCtrl: LoadingController,
    private _as: AuthService
  ) { 
    
  }

  async ngOnInit(): Promise<void> {
    await this.getDocuments();
    await this.getUser();

  }

  getUser(): Promise<void>{
    this.user_id = this._as.getUserStorage();
    return new Promise<void>( (resolve, reject ) => {
      this._ds.loadUserById( this.user_id ).subscribe({
        next: ( resp ) => {
          console.log( resp );
          this.objectUser = resp.data;
          resolve();
        }, 
        error: ( err ) => {
          reject();
        }, 
        complete: () => {
  
        }
      })

    })
    
  }


  async getDocuments(){

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'circles'
    });
    loading.present();
    this._ds.loadDocumentsByUser( 1 ).subscribe({
      next: ( resp ) => {
        if( !resp.status ){

          return;
        }
        console.log( resp );
        this.listDocuments = resp.data;
      }, 
      error: ( err ) => {

      }, 
      complete: () => {
        loading.dismiss();
      }
    })
  }


  async onClickEdit( data: any ){
    console.log( "Editar: ", data );
    const modal = await this.modalCtrl.create({
      component: CreateUpdateDocumentComponent,
      mode: 'md',
      componentProps: {
        
        keyDocument: data ,
      }
    });
    modal.present();

    const { data: any, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      if( data ){
        this.getDocuments();
      }
    }
    
  }

  async onClickRegister(){
    const modal = await this.modalCtrl.create({
      component: CreateUpdateDocumentComponent,
      mode: 'md',
      // componentProps: {
        
        
      // }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      if( data){
        this.getDocuments();
      }
    }

  }

}
