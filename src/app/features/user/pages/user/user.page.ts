import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

import { DocumentService } from '../../services/document.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { CreateUpdatesDocumentsComponent } from './components/create-updates-documents/create-updates-documents.component';
import { Subscription } from 'rxjs';
import { PresentToastService } from 'src/app/utils/services/present-toast.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {


  private userSubscription: Subscription | undefined;


  listDocuments: any[] = [];
  user_id!: number;
  objectUser!: any;
  constructor(
    private modalCtrl: ModalController,
    private _ds: DocumentService,
    private loadingCtrl: LoadingController,
    private _as: AuthService,
    private alerController: AlertController,
    private _t: PresentToastService
  ) { 
    //TODO: Reactive local
    // this._as.getCurrentUserSubject.subscribe(( res: any ) => {
    this.loadDataUser();
    
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


  loadDataUser(){
    this._as.$getCurrentUserSubject.subscribe((res: any) => {
      console.log("RESSSS: ", res);
      
      if(res instanceof Object){
        let objEmpty = Object.keys(res).length === 0;
        if(objEmpty == true){
          let localData = JSON.parse(localStorage.getItem('user')!) || null;
          console.log( "LOCAL STOREAGE: ", localData ); //TODO: RESSS = {} && 
          
          if(localData != null){           
             this.user_id = localData.user_id;                          
          }
        }else{          
          this.user_id = res.user_id;//TODO: CORREGIR ESTO                      
        }        
      }else{
        console.log("No es object");        
      }
    })


  }

  async ngOnInit(): Promise<void> {
    await this.getUser();
    await this.getDocuments();

  }

  onClickDelete( document_id: number){
    console.log("Delete");
    this.alerController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar este registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Eliminar');
            this._ds.deleteDocumentsById( document_id ).subscribe({
              next: ( resp ) => {
                if( resp.status ){
                  this._t.presentToastController( resp.message, 'danger', 'rocket');
                  this.getDocuments();
                  return;
                }
              }
            })

            // Coloca aquí la lógica para eliminar el registro
          }
        }
      ]
    }).then(alert => alert.present());
  }

  getUser(): Promise<void>{
    // this.user_id = this._as.getUserStorage();
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
    this._ds.loadDocumentsByUser( this.user_id ).subscribe({
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
      component: CreateUpdatesDocumentsComponent,
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
      component: CreateUpdatesDocumentsComponent,
      mode: 'md',
      componentProps: {
        params_user_id: this.user_id
        
      }
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
