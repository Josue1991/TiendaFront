import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { Productos } from 'src/app/models/productos';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html'
})
export class CrearProductosComponent implements OnInit {

  productoNuevo: Productos = new Productos;

  constructor(private modalService: NgbModal,public notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  crear(){
    this.notificationService.showSuccess("Datos Actualizados Correctamente!!", "Producto Actualizado");
    this.modalService.dismissAll('Save click');
  }
  Cerrar(){
    this.modalService.dismissAll('Save click');
  }
}
