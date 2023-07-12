import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { Servicio } from 'src/app/models/servicio';
import { ServiciosService } from '../service/serivicios.Service';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicios.component.html'
})
export class EditarServicioComponent implements OnInit {

  servicioActualizado = new Servicio();
  filtroServicio: Servicio = new Servicio;
  servicios: Servicio[] = [];

  @Input() servicioSeleccionado: any;
  constructor(private serviciosService: ServiciosService, private modalService: NgbModal, public notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.servicioActualizado = this.servicioSeleccionado;
  }

  filtrar() {
    this.servicios = [];
    this.serviciosService.listaServicios().subscribe(res => {
      if (res.length > 0) {
        this.notificationService.showInfo("Si se encontraron Resultados", "Consulta Finalizada");
        res.forEach(item => {
          debugger
          if (this.filtroServicio.ID_SERVICIO != undefined &&
            this.filtroServicio.DESCRIPCION_SERVICIO == undefined &&
            item.ID_SERVICIO == this.filtroServicio.ID_SERVICIO) {
            this.servicios.push(item);
          }
          if (this.filtroServicio.ID_SERVICIO == undefined &&
            this.filtroServicio.DESCRIPCION_SERVICIO != undefined &&
            item.DESCRIPCION_SERVICIO?.localeCompare(this.filtroServicio.DESCRIPCION_SERVICIO)) {
            this.servicios.push(item);
          }
          if (this.filtroServicio.ID_SERVICIO == undefined &&
            this.filtroServicio.DESCRIPCION_SERVICIO == undefined ) {
            this.servicios.push(item);
          }
        });
      }
      else {
        this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
      }
    });
  }


  actualizar() {
    this.serviciosService.editarServicios(this.servicioActualizado).subscribe((data) => {
      if (data) {
        console.log(data)
        this.notificationService.showSuccess("Datos Actualizados Correctamente!!", "Unidad Actualizada");
      }
    });
    this.Cerrar();
  }
  Cerrar() {
    this.modalService.dismissAll('Save click');
    this.filtrar();
  }
}
