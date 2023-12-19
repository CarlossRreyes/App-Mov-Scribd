import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  // **************API URL****************
  API_URL = environment.api_url;

  constructor(
    private http: HttpClient
  ) { }


  objectToFormData(obj: any, form?: any, namespace?: any) {
    let fd: any = form || new FormData();
    let formKey: any;
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }

      }
    }
    return fd;
  }


  saveDocument( data: any ){
    const url = `${this.API_URL}/createDocument`;
    return this.http.post<any>( url, this.objectToFormData( data ) );
  }

  updateDocument( data: any ){
    const url = `${this.API_URL}/editDocument`;
    console.log("edit: ", url );
    
    return this.http.post<any>( url, this.objectToFormData( data ) );
  }


  loadDocumentsByUser( user_id: number ){
    const url = `${this.API_URL}/loadDocumentsByUser/${user_id }`;
    // console.log( url );
    
    return this.http.get<any>( url );
  }
  
  loadUserById( user_id: number ){
    const url = `${this.API_URL}/loadUserById/${user_id }`;
    // console.log( url );
    
    return this.http.get<any>( url );
  }


  
}
