import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { ServiciosService } from '../service/serivicios.Service';
import { Servicio } from 'src/app/models/servicio';
import { DetalleServicio } from 'src/app/models/detalle-servicio';
import { DetalleServiciosService } from 'src/app/detalle-servicios/service/detalleServicio.service';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html'
})
export class CrearServicioComponent implements OnInit {

  servicioNuevo: Servicio = new Servicio;
  servicioSeleccionado?: Servicio = new Servicio;
  closeResult: string = '';
  detallesServicio: DetalleServicio[] = []
  filtroDetalleServicio: DetalleServicio = new DetalleServicio;
  habilitarDetalles: Boolean = false;

  constructor(private modalService: NgbModal,
    public serviciosService: ServiciosService,
    public detalleServiciosService: DetalleServiciosService,
    public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

 
  Cerrar() {
    this.modalService.dismissAll('Save click');
  }

  open() {
    this.servicioSeleccionado = this.servicioNuevo;
    this.habilitarDetalles = true;
  }

   filtrar() {
    this.detallesServicio = [];
    this.detalleServiciosService.listaDetallesServicios().subscribe(res => {
      if (res.length > 0) {
        this.notificationService.showInfo("Si se encontraron Resultados", "Consulta Finalizada");
        res.forEach(item => {
          debugger
          if (this.filtroDetalleServicio.ID_SERVICIO != undefined &&
            this.filtroDetalleServicio.ID_DETALLESERVICIO == undefined &&
            item.ID_DETALLESERVICIO == this.filtroDetalleServicio.ID_DETALLESERVICIO) {
            this.detallesServicio.push(item);
          }
          if (this.filtroDetalleServicio.ID_SERVICIO == undefined &&
            this.filtroDetalleServicio.ID_DETALLESERVICIO != undefined &&
            item.ID_DETALLESERVICIO == this.filtroDetalleServicio.ID_DETALLESERVICIO) {
            this.detallesServicio.push(item);
          }
          if (this.filtroDetalleServicio.ID_SERVICIO == undefined &&
            this.filtroDetalleServicio.ID_DETALLESERVICIO == undefined) {
            this.detallesServicio.push(item);
          }
        });
      }
      else {
        this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
      }
    });
  }

}
