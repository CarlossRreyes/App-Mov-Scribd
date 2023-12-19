import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Credentials } from '../../interfaces/auth.interface';
import { LoadingController } from '@ionic/angular';
import { PresentToastService } from 'src/app/utils/services/present-toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  signInForm!: FormGroup;

  constructor(
    private _as: AuthService,
    public _fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private _ts: PresentToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.signInForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  
  fieldsValidate(field: string){
    return this.signInForm.get(field)?.invalid && this.signInForm.get(field)?.touched && this.signInForm.get(field)?.dirty;
  }

  async loadSignIn(){
    if (this.signInForm.invalid) return;
    if (this.signInForm.valid) {
      const loading = await this.loadingCtrl.create({
        message: 'Cargando...',
        spinner: 'circles'
      });
      const data : Credentials = this.signInForm.value; 
      loading.present();
      this._as.signIn( data ).subscribe({
        next: ( resp ) => {
          if( !resp.status ){
            this._ts.presentToastController( resp.message, 'warning', 'alert-circle');
            return;
          }
          this._ts.presentToastController( resp.message, 'success', 'rocket');
         console.log(resp);
         this.router.navigate(['/home']);
         
        }, 
        error: ( err ) => {
          
        },
        complete: () => { 
          loading.dismiss();
        }
      })
    }    
  }

}
