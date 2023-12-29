import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ModalController } from '@ionic/angular';
import { ViewDocumentsByCategoryComponent } from './view-documents-by-category/view-documents-by-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {


  listCategories: any[] =[]

  constructor(
    private _cs: CategoryService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  async onClickView( data: any){
    const modal = await this.modalCtrl.create({
      component: ViewDocumentsByCategoryComponent,
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

  getAllCategories(){
    this._cs.loadCategories().subscribe({
      next: ( resp ) => {
        if( !resp.status){
          return;
        }
        console.log(resp);
        
        this.listCategories = resp.data;
      },
      error: ( err ) => {

      },
      complete: () => {

      }
    })
  }

}
