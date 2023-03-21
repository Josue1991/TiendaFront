import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Clientes } from '../../models/clientes';
import { NotificationService } from 'src/app/alerta/notification.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent implements OnInit {
  
  clienteNuevo: Clientes = new Clientes

  constructor(private modalService: NgbModal,public notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  crear(){
    this.notificationService.showSuccess("Datos Actualizados Correctamente!!", "Cliente Actualizado");
    this.modalService.dismissAll('Save click');
  }
  Cerrar(){
    this.modalService.dismissAll('Save click');
  }

}
