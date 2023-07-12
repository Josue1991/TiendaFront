import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { Unidades } from 'src/app/models/unidad';
import { ServiciosService } from '../service/serivicios.Service';
import { Servicio } from 'src/app/models/servicio';

@Component({
  selector: 'app-borrar-servicio',
  templateUrl: './borrar-servicio.component.html'
})
export class BorrarServicioComponent implements OnInit {

  servicioActualizado = new Servicio();
  filtroServicio: Servicio = new Servicio;
  servicios: Servicio[] = [];

  @Input() servicioSeleccionado: any;
  constructor(private serviciosService: ServiciosService, private modalService: NgbModal,public notificationService: NotificationService) {
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


  eliminar() {
    console.log("Input", this.servicioSeleccionado);
    console.log("Actualizado", this.servicioActualizado);
    this.Cerrar();
    this.notificationService.showSuccess("Datos Eliminados Correctamente!!", "Cliente Eliminado")
  }
  Cerrar(){
    this.modalService.dismissAll('Save click');
    this.filtrar();
  }
}
