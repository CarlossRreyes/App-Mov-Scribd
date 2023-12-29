import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-view-documents-by-category',
  templateUrl: './view-documents-by-category.component.html',
  styleUrls: ['./view-documents-by-category.component.scss'],
})
export class ViewDocumentsByCategoryComponent  implements OnInit {
  category_id: any;
  listAllDocuments: any[] = [];

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private _cs: CategoryService
  ) { }
  
  ngOnInit() {
    if( this.navParams.get('keyDocument') === undefined ){
      return;
    }
    this.category_id = this.navParams.get('keyDocument');
    console.log("Data selected: ", this.category_id);

    this.loadDocumentsByIdCategory( this.category_id)
  }



  loadDocumentsByIdCategory( id: any ){
    this._cs.loadDocumentsByIdCategory( id ).subscribe({
      next: ( resp ) => {
        if( resp.status ){
          this.listAllDocuments = resp.data
          console.log(resp.data);
          
        }
      }, 
      error: ( err ) => {

      },
      complete: () => {

      }
    })

  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
