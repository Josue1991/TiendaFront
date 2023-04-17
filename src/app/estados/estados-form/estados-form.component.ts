import { Component } from '@angular/core';
import { Estado } from 'src/app/models/estados';
import { EstadosService } from '../service/estados-service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados-form.component.html'
})
export class EstadosFormComponent {

  estados: Estado[] = [];
  closeResult: string = '';
  estadoSeleccionado?: Estado = new Estado;
  filtroEstados: Estado = new Estado;

  constructor(private estadosService: EstadosService,
    private modalService: NgbModal,
    public notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.estados = [];
  }
  filtrar() {
    this.estados = [];
    this.estadosService.listaEstados().subscribe(res => {
      if (res.length > 0) {
        this.notificationService.showInfo("Si se encontraron Resultados", "Consulta Finalizada");
        res.forEach(item => {
          debugger
          if (this.filtroEstados.ID_ESTADO != undefined &&
            this.filtroEstados.DESCRIPCION_ESTADO == undefined &&
            item.ID_ESTADO == this.filtroEstados.ID_ESTADO) {
            this.estados.push(item);
          }
          if (this.filtroEstados.ID_ESTADO == undefined &&
            this.filtroEstados.DESCRIPCION_ESTADO != undefined &&
            item.DESCRIPCION_ESTADO?.localeCompare(this.filtroEstados.DESCRIPCION_ESTADO)) {
            this.estados.push(item);
          }
          if (this.filtroEstados.ID_ESTADO == undefined &&
            this.filtroEstados.DESCRIPCION_ESTADO == undefined ) {
            this.estados.push(item);
          }
        });
      }
      else {
        this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
      }
    });
  }

  open(content: any, idObjeto: Estado) {
    this.filtroEstados = new Estado;
    this.estadoSeleccionado = idObjeto;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCrear(content: any) {
    this.filtroEstados = new Estado;
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
    this.estados = [];
    this.filtroEstados = new Estado;
  }
}
