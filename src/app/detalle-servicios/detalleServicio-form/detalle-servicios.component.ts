import { Component } from '@angular/core';
import { DetalleServicio } from 'src/app/models/detalle-servicio';
import { DetalleServiciosService } from '../service/detalleServicio.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';

@Component({
  selector: 'app-detalle-servicios',
  templateUrl: './detalle-servicios.component.html'
})
export class DetalleServiciosComponent {
  detalles: DetalleServicio[] = [];
  closeResult: string = '';
  detalleServicioSeleccionado?: DetalleServicio = new DetalleServicio;
  filtroDetalleServicio: DetalleServicio = new DetalleServicio;

  constructor(private detallesServicioService: DetalleServiciosService,
    private modalService: NgbModal,
    public notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.detalles = [];
  }
  filtrar() {
    this.detalles = [];
    this.detallesServicioService.listaDetallesServicios().subscribe(res => {
      if (res.length > 0) {
        this.notificationService.showInfo("Si se encontraron Resultados", "Consulta Finalizada");
        res.forEach(item => {
          debugger
          if (this.filtroDetalleServicio.ID_DETALLESERVICIO != undefined &&
            this.filtroDetalleServicio.ID_SERVICIO == undefined &&
            item.ID_DETALLESERVICIO == this.filtroDetalleServicio.ID_DETALLESERVICIO) {
            this.detalles.push(item);
          }
          if (this.filtroDetalleServicio.ID_DETALLESERVICIO == undefined &&
            this.filtroDetalleServicio.ID_SERVICIO != undefined &&
            item.ID_SERVICIO == this.filtroDetalleServicio.ID_SERVICIO) {
            this.detalles.push(item);
          }
          if (this.filtroDetalleServicio.ID_DETALLESERVICIO == undefined &&
            this.filtroDetalleServicio.ID_SERVICIO == undefined ) {
            this.detalles.push(item);
          }
        });
      }
      else {
        this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
      }
    });
  }

  open(content: any, idObjeto: DetalleServicio) {
    this.filtroDetalleServicio = new DetalleServicio;
    this.detalleServicioSeleccionado = idObjeto;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCrear(content: any) {
    this.filtroDetalleServicio = new DetalleServicio;
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
  Cerrar() {
    this.modalService.dismissAll('Save click');
  }
  limpiarFiltros(){
    this.detalles = [];
    this.filtroDetalleServicio = new DetalleServicio;
  }

}
