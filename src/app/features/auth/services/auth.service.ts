import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


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

  getUserStorage() {
    return JSON.parse( localStorage.getItem('user')!) || undefined;

  }

  signIn( credentials: any ){
    const url = `${this.API_URL}/login`;
    return this.http.post<any>( url, this.objectToFormData( credentials ) )
    .pipe(
      // catchError(this.errorHandilings.handleHttpError), 
      // take(1),
      tap( ( resp ) => { 
        if( resp.status ){
          console.log( resp );
          localStorage.setItem('user', resp.data );
          
        }
    }));
  }
}
