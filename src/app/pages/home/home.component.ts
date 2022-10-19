import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export const CLIENTE_URL = "/clientes"
export const CLIMA_URL = "/clima"


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public clienteGrupo: string;
  public clima: string;

  constructor(private router: Router) { 
    this.clienteGrupo = 'assets/clientes-grup.jpg';
    this.clima = 'assets/clima.jpg';
  }

  ngOnInit(): void {
  }

  consultarCliente(){
    this.router.navigateByUrl(CLIENTE_URL);
  }

  consultarClima(){
    this.router.navigateByUrl(CLIMA_URL);
  }
}
