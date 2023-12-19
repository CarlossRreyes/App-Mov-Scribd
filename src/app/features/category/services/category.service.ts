import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // **************API URL****************
  API_URL = environment.api_url;

  constructor(
    private http: HttpClient
  ) { }


  loadCategories(){
    const url = `${this.API_URL}/loadCategories`;
    return this.http.get<any>( url );
  }
}
