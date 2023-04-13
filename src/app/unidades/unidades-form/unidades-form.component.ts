import { Component } from '@angular/core';
import { Unidades } from 'src/app/models/unidad';
import { UnidadesService } from '../service/unidades.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';

@Component({
  selector: 'app-unidades-form',
  templateUrl: './unidades-form.component.html'
})
export class UnidadesFormComponent {

  unidades: Unidades[] = [];
  closeResult: string = '';
  unidadSeleccionado?: Unidades = new Unidades;
  filtroUnidades: Unidades = new Unidades;

  constructor(private unidadesService: UnidadesService,
    private modalService: NgbModal,
    public notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.unidades = [];
  }
  filtrar() {
    this.unidades = [];
    this.unidadesService.listaUnidades().subscribe(res => {
      if (res.length > 0) {
        this.notificationService.showInfo("Si se encontraron Resultados", "Consulta Finalizada");
        res.forEach(item => {
          debugger
          if (this.filtroUnidades.ID_UNIDAD != undefined &&
            this.filtroUnidades.DESCRIPCION_UNIDAD == undefined &&
            item.ID_UNIDAD == this.filtroUnidades.ID_UNIDAD) {
            this.unidades.push(item);
          }
          if (this.filtroUnidades.ID_UNIDAD == undefined &&
            this.filtroUnidades.DESCRIPCION_UNIDAD != undefined &&
            item.DESCRIPCION_UNIDAD?.localeCompare(this.filtroUnidades.DESCRIPCION_UNIDAD)) {
            this.unidades.push(item);
          }
          if (this.filtroUnidades.ID_UNIDAD == undefined &&
            this.filtroUnidades.DESCRIPCION_UNIDAD == undefined ) {
            this.unidades.push(item);
          }
        });
      }
      else {
        this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
      }
    });
  }

  open(content: any, idObjeto: Unidades) {
    this.filtroUnidades = new Unidades;
    this.unidadSeleccionado = idObjeto;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCrear(content: any) {
    this.filtroUnidades = new Unidades;
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
    this.unidades = [];
    this.filtroUnidades = new Unidades;
  }

}
