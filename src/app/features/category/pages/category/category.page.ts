import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {


  listCategories: any[] =[]

  constructor(
    private _cs: CategoryService
  ) { }

  ngOnInit() {
    this.getAllCategories();
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
