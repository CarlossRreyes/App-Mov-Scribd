import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/features/category/services/category.service';
import { Category } from 'src/app/features/category/interfaces/category.interface';
import { PresentToastService } from 'src/app/utils/services/present-toast.service';
import { ToolService } from 'src/app/utils/services/tool.service';
import { DocumentService } from '../../services/document.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-create-update-document',
  templateUrl: './create-update-document.component.html',
  styleUrls: ['./create-update-document.component.scss'],
})
export class CreateUpdateDocumentComponent  implements OnInit {
  formDocument!: FormGroup;
  listCatetories: Category[] = [];

  files: File[] = [];
  activeFile: boolean = false;

  listStates: any[] = [
    {
      id: 1,
      name: 'Activo',
      value: 'A'
    },
    {
      id: 2,
      name: 'Inactivo',
      value: 'I'
    },
  ];

  listTypePermission: any[] = [
    {
      id: 1,
      name: 'Acceso a descarga',
      value: 1
    },
    {
      id: 2,
      name: 'Denegar',
      value: 0
    },
  ]

  user_id!: number;

  dataSelected: any;
  constructor(
    private modalCtrl: ModalController,
    private _fb: FormBuilder,
    private _cs: CategoryService,
    private _ts: PresentToastService,
    private _tos: ToolService,
    private _as: AuthService,
    private _ds: DocumentService,
    private navParams: NavParams,
    private loadingCtrl: LoadingController
  ) {
    this.user_id = this._as.getUserStorage();
    console.log("user_id: ", this.user_id);
  }

  ngOnInit() {
    this.initForm();
    this.getCategories();
    this.setDocument();

    
  }

  initForm() {
    this.formDocument = this._fb.group({
      
      name: ['', [ Validators.required ]],
      description: ['', [ Validators.required ]],
      rute: ['', ],
      file: [''],
      date_upload: [''],
      type: ['', ],
      category_id: [ '', [ Validators.required ]],      
      state: ['', [ Validators.required ]],
      download_permission: ['', [ Validators.required ]],
    
    });
  }

  setDocument(){

    if( this.navParams.get('keyDocument') === undefined ){
      return;
    }
    this.dataSelected = this.navParams.get('keyDocument');
    console.log("Data selected: ", this.dataSelected);
    
    

    const { category_id, document_id } = this.dataSelected;
    const { 
      name,
      description,
      rute,
      file,
      user_id,
      date_upload,
      type ,
      image,
      download_permission,
      state
    } = document_id;

    

    const data = { category_id, name, description, rute, file, date_upload, type, state, user_id, image, download_permission };
    console.log("Data: ", data );
    if( file !== undefined ){
      this.loadFile( file )
    }

    this.formDocument.patchValue( data );    
  }


  loadFile( file: string ){
    if( file === '' ) return;
    this._tos.showFile( file ).subscribe({
      next: ( blob ) => {
        console.log( "File del ARCHIVO: ", file );
        // const myFile = new File( [blob], `${ this._tos.viewUrlFile }/${ file }`, { type: 'application/pdf'})
        // const myFile = new File([blob], file,);
        const fileType = this.getFileType(file);
        const myFile = new File([blob], file, { type: fileType });
        this.files.push( myFile )
        this.activeFile = true
        
      }
    })
  }

  fieldsValidate(field: string){
    return this.formDocument.get(field)?.invalid && this.formDocument.get(field)?.touched && this.formDocument.get(field)?.dirty;
  }

  onSelect( event: any ){
    console.log( "Select: ", event );
    const addedFiles: File[] = event.addedFiles;

    if( addedFiles.length === 0 ){
      this._ts.presentToastController( 'Archivo no valido.', 'warning', 'alert-circle');      
      return;
    }
    
    const file = addedFiles[0];
    // if (!(file.type === 'application/pdf' || file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
    //   this._ts.presentToastController('Archivo no válido. Solo se permiten archivos PDF y DOC.', 'warning', 'alert-circle');
    //   return;
    // }
    const validFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];


    if (!validFileTypes.includes(file.type) && !(file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
      this._ts.presentToastController('Archivo no válido. Solo se permiten archivos PDF, DOC y DOCX.', 'warning', 'alert-circle');
      return;
    }

    if( !this.activeFile ){
      this.files.push( ...event.addedFiles );
      this.activeFile = true;
      this.formDocument.get('file')?.setValue( event.addedFiles[0].name );
    } else {
      this._ts.presentToastController( 'Solo se permite un archivo.', 'warning', 'alert-circle');      
    }


    console.log("file: ", this.files[0].type);
    
  }

  async registerDocument( data: any ){
    console.log(data);
    let boolean: boolean = false;
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'circles'
    });
    loading.present();
    this._ds.saveDocument( data ).subscribe({
      next: ( resp ) => {
        if( !resp.status ){
          this._ts.presentToastController( resp.message , 'danger', 'alert-circle'); 
          return;     
        }
        boolean = true;
        this._ts.presentToastController( resp.message , 'success', 'rocket'); 

      }, 
      error: ( err ) => {
        console.log(err);
        
      },
      complete: () => {
        loading.dismiss();
        return this.modalCtrl.dismiss( boolean , 'confirm');
      }
    })
    

  }

  onRemove( event: any ){
    this.files.splice( this.files.indexOf( event ), 1 );
    this.activeFile = false;
    this.formDocument.get('file')?.setValue('');
  }

  async updateDocument( data: any ){
    console.log("DATA A EDITARAAAAAA: ", data, );
    console.log("FILES: ", this.files);
    
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'circles'
    });
    let boolean: boolean = false;
    loading.present();
    this._ds.updateDocument( data ).subscribe({
      next: ( resp ) => {
        if( !resp.status ){
          this._ts.presentToastController( resp.message , 'danger', 'alert-circle'); 
          return;     
        }
        boolean = true;
        this._ts.presentToastController( resp.message , 'success', 'rocket'); 

      }, 
      error: ( err ) => {
        console.log(err);
        
      },
      complete: () => {
        loading.dismiss();
        return this.modalCtrl.dismiss( boolean , 'confirm');
      }
    })
    

  }

  getFileType(fileName: string): string {
    const fileExtension = fileName.split('.').pop()!.toLowerCase();
  
    switch (fileExtension) {
      case 'pdf':
        return 'application/pdf';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      // Puedes agregar más casos según las extensiones de archivos que manejes
      default:
        // Si la extensión no coincide con las conocidas, puedes usar un tipo de archivo genérico
        return 'application/octet-stream';
    }
  }

  saveUpdateDocument(){


    if(this.formDocument.invalid) return;
    if( this.dataSelected ){
      const form: any = {
        ...this.formDocument.value,
        document_id: this.dataSelected.document_id.document_id,
        user_id: this.dataSelected.document_id.user_id,
        image: this.dataSelected.document_id.image,
        // download_permission: this.dataSelected.document_id.download_permission
      };

      let data = this.dataToJson( form );

      console.log("Editar objeto: ", data  );
      console.log("Editar form: ", form   );


      if( data.file === '' || data.file === 'fisica1.pdf' ){
        console.log("INSERTAR SIN LA IMAGEN");
        this.updateDocument( data );
      } else {
        console.log("INSERTAR CON LA IMAGEN");
        
        this._tos.uploadFile( this.files ).subscribe({
          next: ( resp ) => {
            if( !resp.status ){
              this._ts.presentToastController( resp.message , 'danger', 'alert-circle'); 
              return;     
            }
            this.updateDocument( data );
            const index = this.files[0].name.indexOf( data.file ?? '', 1 );
            this.files.splice( index, 1 );
            this.activeFile = false;
  
          }, 
          error: ( err ) => {
            console.log("Error: ", err );
            
          },
          complete: () => {
  
          }
        })
  
      }
      
    }else{
      const form = this.formDocument.value;
      const data = this.dataToJson( form );
      console.log("Crear",  data );
      
      if( data.file === '' || data.file === 'fisica1.pdf' ){
        this.registerDocument( data );
      } else {
        this._tos.uploadFile( this.files ).subscribe({
          next: ( resp ) => {
            if( !resp.status ){
              this._ts.presentToastController( resp.message , 'danger', 'alert-circle'); 
              return;     
            }
            this.registerDocument( data );
            const index = this.files[0].name.indexOf( data.file ?? '', 1 );
            this.files.splice( index, 1 );
            this.activeFile = false;
  
          }, 
          error: ( err ) => {
            console.log("Error: ", err );
            
          },
          complete: () => {
  
          }
        })
  
      }

    }
  }

  dataToJson( form: any ){

    const fileTypeMapping: Record<string, string> = {
      'application/pdf': 'PDF',
      'application/msword': 'DOC',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOC',      
    };

    // let fileType = this.files[0].type || '';
    // console.log("TIPO: ", fileTypeMapping[this.files[0].type]);
    // console.log("TIPO imagen: ", this.files[0].type);
    
    let fileType = this.files.length === 0 ? 'Sin definir' : fileTypeMapping[this.files[0].type]; //TODO: CORREGIR ESTO
    // let fileType = this.files.length === 0 ? 'PDF' : fileTypeMapping[this.files[0].type] || 'PDF'; //TODO: CORREGIR ESTO

    if( form.document_id ){
      console.log("JSON PARA ACTUALIZAR");
      
      //TODO: Update
      return  {
        document_id: form.document_id,
        name: form.name,
        description: form.description,
        state: form.state,
        user_id: form.user_id,
        category_id: form.category_id,
        date_upload: new Date(),
        file: form.file === '' ? 'fisica1.pdf' : form.file,
        // rute: `files/${this.files[0].name}`,
        rute: this.files.length === 0 ? 'files/fisica1.pdf': this.files[0].name,
        type: fileType,
        image: this.files.length === 0 ? `others.png`: `${ fileType }.png` ?? 'others.png',
        download_permission: form.download_permission
        // image: form.image === null ? 'others.png' : form.image
        // type: form.type
        // type: this.files[0].type

      }
    }

    return {
      name: form.name,
      description: form.description,
      state: form.state,
      user_id: this.user_id,
      category_id: form.category_id,
      date_upload: new Date(),
      file: form.file === '' ? 'fisica1.pdf' : form.file,
      rute: this.files.length === 0 ? 'files/fisica1.pdf': this.files[0].name,
      // type: fileTypeMapping[fileType] || fileType
      type: fileType,
      image:  this.files.length === 0 ? `others.png`: `${ fileType }.png` ?? 'others.png',
      download_permission: form.download_permission
      // image: fileType === 'PDF' ? 'pdf.png' : 'word.png'
    }
    
  }

  

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  getCategories(){
    this._cs.loadCategories().subscribe({
      next: (resp) => {
        if( !resp.status ){

          return;
        }
        this.listCatetories = resp.data;
      }, 
      error: ( err ) => {

      }, 
      complete: () => {

      }
    })
  }

}
