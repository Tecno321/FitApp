import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  crearCuenta(){
    this.router.navigate(['/crear-usuario']);
  }

  iniciarSesion(){
    this.router.navigate(['/iniciar-sesion']);
  }

}
