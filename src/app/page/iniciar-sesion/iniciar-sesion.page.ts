import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
  standalone: false,
})
export class IniciarSesionPage implements OnInit {

  mdl_email:String = "";
  mdl_contrasena:String = "";
  principio: any={
    nombre:"",
    email:"",
    telefono:"" 
  }

  field: string="";
  constructor(private router:Router,public toastController:ToastController) { }

  ngOnInit() {
    let extra = this.router.getCurrentNavigation();
    if(extra?.previousNavigation){
      if(extra.extras.state){
        this.principio=extra.extras.state['usuario']
        this.mdl_email=this.principio.email
      }
    }
  }

  iniciarSesion(){
    if (this.validar()){
        this.router.navigate(['/home']);
    }else{
      this.presentToast("middle","Error: Falta "+this.field,3000)
    }
  }
  
  validar(){
    if (this.mdl_email == ""){
      this.field = "email"
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(this.mdl_email))) {
          this.field = "un email valido";
          return false;
        }
    if (this.mdl_contrasena == ""){
          this.field= "contraseña"
          return false;
        }
        
     return true;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg:string, duration?:number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration?duration:2500,
      position: position,
    });

    await toast.present();
  }

}
