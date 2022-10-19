import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmacionComponent } from 'src/app/component/confirmacion/confirmacion.component';
import { ClientesService } from 'src/app/service/clientes.service';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';
import { DialogFormClienteComponent } from '../../component/dialog-form-cliente/dialog-form-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public dataSource: any;
  public cargando: boolean;
  public displayedColumns: string[] = ['id', 'nomApe', 'fecha', 'domicilio', 'tel', 'email', 'modif', 'elim'];


  constructor(private clienteService: ClientesService,
              public _snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.cargando = true;
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getAll().subscribe(resp => {
      if (resp.status)
        this.dataSource = new MatTableDataSource(resp.result);
    },
      err => {
        console.log(err);
        this.cargando = false;
      },
      () => {
        this.cargando = false;
      });
  }


  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(element: any) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      data: {
        msj: `¿Está seguro que desea eliminar el cliente ${element.nombre} ${element.apellido}?`,
        titulo: "Eliminar"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.elimitarCliente(element.id)
    });
  }

  elimitarCliente(id: number) {
    this.cargando = true;
    this.clienteService.eliminar(id)
      .subscribe(resp => {
        if (resp.result === 1) {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'done', mensaje: "Se elimino con exito al cliente indicado.", titulo: 'Eliminado' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-ok"]
          });
        }
      },
        () => {
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: "Ocurrió un error al eliminar el cliente indicado", titulo: 'Error' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-err"]
          });
          this.cargando = false;
        },
        () => {
          this.getClientes();
        });
  }

  modificar(element: any) {
    element.titulo = 'Modificar Tratamiento';
    const dialogRef = this.dialog.open(DialogFormClienteComponent, {
      width: '300px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClientes();
        this._snackBar.openFromComponent(DialogSnackbarComponent, {
          data: { icono: 'done', mensaje: result.msg, titulo: 'Modificado' },
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "bottom",
          panelClass: ["snack-bar-ok"]
        });
      }

    });
  }

  agregar() {
    const nuevo = {
      nombre: '',
      apellido: '',
      fecha_nacimiento: '',
      domicilio: '',
      telefono: '',
      email: '',
      titulo: 'Agregar Cliente'
    }

    const dialogRef = this.dialog.open(DialogFormClienteComponent, {
      width: '300px',
      data: nuevo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.openFromComponent(DialogSnackbarComponent, {
          data: { icono: 'done', mensaje: result.msg, titulo: 'Guardar' },
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "bottom",
          panelClass: ["snack-bar-ok"]
        });
        this.getClientes();
      }
    });
  }


}
