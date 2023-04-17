import { Component, Input } from '@angular/core';
import { Estado } from 'src/app/models/estados';
import { EstadosService } from '../service/estados-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';

@Component({
  selector: 'app-editar-estados',
  templateUrl: './editar-estados.component.html'
})
export class EditarEstadosComponent {
  estadoActualizado = new Estado();
  filtroEstado: Estado = new Estado;
  estados: Estado[] = [];

  @Input() estadoSeleccionado: any;
  constructor(private estadosService: EstadosService, 
    private modalService: NgbModal, 
    public notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.estadoActualizado = this.estadoSeleccionado;
  }

  filtrar() {
    this.estados = [];
    this.estadosService.listaEstados().subscribe(res => {
      if (res.length > 0) {
        this.notificationService.showInfo("Si se encontraron Resultados", "Consulta Finalizada");
        res.forEach(item => {
          debugger
          if (this.filtroEstado.ID_ESTADO != undefined &&
            this.filtroEstado.DESCRIPCION_ESTADO == undefined &&
            item.ID_ESTADO == this.filtroEstado.ID_ESTADO) {
            this.estados.push(item);
          }
          if (this.filtroEstado.ID_ESTADO == undefined &&
            this.filtroEstado.DESCRIPCION_ESTADO != undefined &&
            item.DESCRIPCION_ESTADO?.localeCompare(this.filtroEstado.DESCRIPCION_ESTADO)) {
            this.estados.push(item);
          }
          if (this.filtroEstado.ID_ESTADO == undefined &&
            this.filtroEstado.DESCRIPCION_ESTADO == undefined) {
            this.estados.push(item);
          }
        });
      }
      else {
        this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
      }
    });
  }

  actualizar() {
    this.estadosService.editarEstado(this.estadoSeleccionado).subscribe((data) => {
      if (data) {
        console.log(data)
        this.notificationService.showSuccess("Datos Actualizados Correctamente!!", "estado Actualizado");
      }
    });
    this.Cerrar();
  }
  Cerrar() {
    this.modalService.dismissAll('Save click');
    this.filtrar();
  }
}
