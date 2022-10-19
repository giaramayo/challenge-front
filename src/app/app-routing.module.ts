import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { ClimaComponent } from './pages/clima/clima.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent},
  { path: 'clientes', component: ClientesComponent},
  { path: 'clima', component: ClimaComponent},
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
