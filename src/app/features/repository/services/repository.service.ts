import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  // **************API URL****************
  API_URL = environment.api_url;

  constructor(
    private http: HttpClient
  ) { }

  loadAllDocuments(){
    const url = `${this.API_URL}/loadAllDocuments`;
    // console.log( url );
    
    return this.http.get<any>( url );
  }
}
