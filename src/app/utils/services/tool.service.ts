import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToolService {


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

  uploadFile( file: any ){
    // console.log("data file service: ", this.objectToFormData( file ));
    const formData = new FormData();
    if( file ){
      for(let i = 0; i < file.length; i++){
        formData.append('file', file[i], file[i].name);
      }
    }
    console.log("formData: ", formData);
    
    
    const url = `${this.API_URL}/uploadFile`;
    return this.http.post<any>( url, formData );
  }
  
  showFile( file: string ){
    const url = `${this.API_URL}/getFile/${ file }`;
    return this.http.get( url, { responseType: 'blob' } );
  }

  get viewUrlFile(): string {
    return `${ this.API_URL }/getFile`;
  }

  getFile( file: string ){
    const url = `${ this.API_URL }/getFile/${ file }`;
    return url;
  }



}
