import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Clientes } from '../../models/clientes';
import { ClientesService } from '../service/clientes.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html'
})
export class ClientesFormComponent implements OnInit {

  clientes: Clientes[] = [];
  closeResult: string = '';
  clienteSeleccionado?: Clientes = new Clientes;
  filtroCliente: Clientes = new Clientes;

  constructor(private clienteService: ClientesService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.clientes = [];
    this.filtrar();
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

  open(content: any, idObjeto: Clientes) {    
    this.filtroCliente = new Clientes;
    this.clienteSeleccionado = idObjeto;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCrear(content: any) {
    this.filtroCliente = new Clientes;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
    this.filtrar();      
  }
  Cerrar(){
    this.modalService.dismissAll('Save click');
  }

}
