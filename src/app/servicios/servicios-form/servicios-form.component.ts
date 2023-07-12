import { Component } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServiciosService } from '../service/serivicios.Service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios-form.component.html'
})
export class ServiciosFormComponent {
  servicios: Servicio[] = [];
  closeResult: string = '';
 servicioSeleccionado?: Servicio = new Servicio;
  filtroServicio: Servicio = new Servicio;

  constructor(private serviciosService: ServiciosService,
    private modalService: NgbModal,
    public notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.servicios = [];
  }
  filtrar() {
    this.servicios = [];
    this.serviciosService.listaServicios().subscribe(res => {
      if (res.length > 0) {
        this.notificationService.showInfo("Si se encontraron Resultados", "Consulta Finalizada");
        res.forEach(item => {
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

  open(content: any, idObjeto: Servicio) {
    this.filtroServicio = new Servicio;
    this.servicioSeleccionado = idObjeto;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCrear(content: any) {
    this.filtroServicio = new Servicio;
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
    this.servicios = [];
    this.filtroServicio = new Servicio;
  }

}
