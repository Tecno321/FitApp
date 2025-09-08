import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
  standalone: false,
})
export class CrearUsuarioPage implements OnInit {

  usuario: any={
    nombre:"",
    email:"",
    contrasena:"",
    confiContrasena:"",
    telefono:"" 
  }
  field: string="";
  constructor(private router:Router ,public toastController:ToastController) { }

  ngOnInit() {
  }

  crearUsuario(){
    if (this.validateModel(this.usuario)) {
      if(this.usuario.contrasena == this.usuario.confiContrasena){
        let navigationExtras : NavigationExtras = {
          state: {usuario: this.usuario}
        };
        this.router.navigate(['/iniciar-sesion'], navigationExtras);
      }else{this.presentToast("middle","Error: Las contraseñas no coinciden",3000)}
    }else{
      if(this.field.includes("confi")){
        this.field=this.field.replace("confi","confirmar ")
      }if(this.field.includes("contrasena") || this.field.includes("Contrasena")){
        this.field=this.field.replace("contrasena","contraseña")
        this.field=this.field.replace("Contrasena","contraseña")
      }
      this.presentToast("middle","Error: Falta "+this.field,3000)
    }
  }

  validateModel(model: any){
    for (let [key, value] of Object.entries(model)) {
      if (value == "") {
        this.field = key;
        return false;
    }
      if (key === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(value))) {
          this.field = "un email valido";
          return false;
        }
      }
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
