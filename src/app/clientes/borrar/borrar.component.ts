import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Clientes } from '../../models/clientes';
import { ClientesService } from '../service/clientes.service';
import { NotificationService } from 'src/app/alerta/notification.service';

@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.component.html'
})
export class BorrarComponent implements OnInit {

  clienteActualizado = new Clientes();
  filtroCliente: Clientes = new Clientes;
  clientes: Clientes[] = [];

  @Input() clienteSeleccionado: any;
  constructor(private clienteService: ClientesService, private modalService: NgbModal,public notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.clienteActualizado = this.clienteSeleccionado;
  }

  filtrar() {
    this.clientes = [];
    this.clienteService.listaClientes().subscribe(res => {
      res.forEach(item => {
        if (this.filtroCliente.CEDULA != undefined && this.filtroCliente.EMAIL == undefined && item.CEDULA == this.filtroCliente.CEDULA) {
          this.clientes.push(item);
        }
        if (this.filtroCliente.EMAIL != undefined && this.filtroCliente.CEDULA == undefined && item.EMAIL == this.filtroCliente.EMAIL) {
          this.clientes.push(item);
        }
        if (this.filtroCliente.CEDULA != undefined && this.filtroCliente.EMAIL != undefined) {
          if (item.CEDULA == this.filtroCliente.CEDULA && item.EMAIL == this.filtroCliente.EMAIL) {
              this.clientes.push(item);
          }
        }
        else {
          this.clientes.push(item);
        }
      });
    });
  }


  eliminar() {
    console.log("Input", this.clienteSeleccionado);
    console.log("Actualizado", this.clienteActualizado);
    this.Cerrar();
    this.notificationService.showSuccess("Datos Eliminados Correctamente!!", "Cliente Eliminado")
  }
  Cerrar(){
    this.modalService.dismissAll('Save click');
    this.filtrar();
  }
}
