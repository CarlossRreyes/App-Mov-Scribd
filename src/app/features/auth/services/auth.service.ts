import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<{}>({});
  // getCurrentUserSubject = this.currentUserSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<{}>({});
  $getCurrentUserSubject = this.currentUserSubject.asObservable();

  userLoggedIn = new EventEmitter<boolean>();


  // **************API URL****************
  API_URL = environment.api_url;

  constructor(
    private http: HttpClient,
    private _r: Router
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

  logOut(){
    localStorage.clear();
    // this.userLoggedIn.emit(false);
    this.currentUserSubject.next({});
    this._r.navigate(['/auth']);

    
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
          // this.userLoggedIn.emit(true);
          const user = {
            user_id: resp.data.user_id,
            email: resp.data.email
          }

          this.currentUserSubject.next( user );
          localStorage.setItem('user', JSON.stringify( resp.data ) );
          
        }
    }));
  }
}
