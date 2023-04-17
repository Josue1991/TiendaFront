import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadosService } from '../service/estados-service';
import { NotificationService } from 'src/app/alerta/notification.service';
import { Estado } from 'src/app/models/estados';

@Component({
  selector: 'app-crear-estados',
  templateUrl: './crear-estados.component.html'
})
export class CrearEstadosComponent {
  estadoNuevo: Estado = new Estado;

  constructor(private modalService: NgbModal,
    public estadosService: EstadosService,
    public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  crear() {
    this.estadosService.crearEstado(this.estadoNuevo).subscribe((data) => {
      if (data) {
        console.log(data)
        this.notificationService.showSuccess("Datos Ingresados Correctamente!!", "Unidad Agregada");
      }
    });
    this.modalService.dismissAll('Save click');
  }
  Cerrar() {
    this.modalService.dismissAll('Save click');
  }
}
