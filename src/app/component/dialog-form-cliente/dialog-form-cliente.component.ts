import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '../../interface/cliente.interfaces';
import { ClientesService } from '../../service/clientes.service';

@Component({
  selector: 'app-dialog-form-cliente',
  templateUrl: './dialog-form-cliente.component.html',
  styleUrls: ['./dialog-form-cliente.component.scss']
})
export class DialogFormClienteComponent {

  public cliente: any;
  public titulo: string;
  public formCliente: FormGroup;
  public hoy = new Date();

  constructor(public dialogRef: MatDialogRef<DialogFormClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    private clienteService: ClientesService) {
    this.cliente = data;
    this.titulo = data.id ? 'Modificar Cliente' : 'Agregar Cliente';
    this.formCliente = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      fecha_nacimiento: new FormControl('', Validators.required),
      domicilio: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('',  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'))
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  guardar() {
    if (this.data.id)
      this.modificar();
    else
      this.crear();
  }

  modificar() {
    let body = {
      id: this.cliente.id, 
      nombre: this.formCliente.get('nombre')?.value,
      apellido: this.formCliente.get('apellido')?.value,
      fecha_nacimiento: this.formCliente.get('fecha_nacimiento')?.value,
      domicilio: this.formCliente.get('domicilio')?.value,
      telefono: this.formCliente.get('telefono')?.value,
      email: this.formCliente.get('email')?.value
    }

    this.clienteService.modificar(this.cliente.id, body)
      .subscribe(resp => {
        this.dialogRef.close(resp);
      });
  }

  crear() {
    let body = {
      nombre: this.formCliente.get('nombre')?.value,
      apellido: this.formCliente.get('apellido')?.value,
      fecha_nacimiento: this.formCliente.get('fecha_nacimiento')?.value,
      domicilio: this.formCliente.get('domicilio')?.value,
      telefono: this.formCliente.get('telefono')?.value,
      email: this.formCliente.get('email')?.value
    }
    this.clienteService.crear(body)
      .subscribe(resp => {
        this.dialogRef.close(resp);
      });
  }
}
