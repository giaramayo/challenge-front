import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './modules/material.module';
import { CargandoComponent } from './component/cargando/cargando.component';
import { ConfirmacionComponent } from './component/confirmacion/confirmacion.component';
import { DialogSnackbarComponent } from './component/dialog-snackbar/dialog-snackbar.component';
import { DialogFormClienteComponent } from './component/dialog-form-cliente/dialog-form-cliente.component';
import { ClimaComponent } from './pages/clima/clima.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HomeComponent,
    CargandoComponent,
    ConfirmacionComponent,
    DialogSnackbarComponent,
    DialogFormClienteComponent,
    ClimaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
