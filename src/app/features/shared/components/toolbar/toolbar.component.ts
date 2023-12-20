import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { PresentToastService } from 'src/app/utils/services/present-toast.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent  implements OnInit {

  constructor(
    private _r: Router,
    private _ts: PresentToastService,
    private _as: AuthService
  ) { }

  ngOnInit() {}



  onClick(){
    this._as.logOut();
    // localStorage.clear();
    // this._ts.presentToastController('Gracias por usar scribdd', 'success', 'heart');
    // this._r.navigate(['/auth']);
  }

}
