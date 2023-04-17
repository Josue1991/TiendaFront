import { Component, Input } from '@angular/core';
import { Estado } from 'src/app/models/estados';
import { EstadosService } from '../service/estados-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';

@Component({
  selector: 'app-borrar-estados',
  templateUrl: './borrar-estados.component.html'
})
export class BorrarEstadosComponent {
  estadoActualizado = new Estado();
  filtroEstados: Estado = new Estado;
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
          if (this.filtroEstados.ID_ESTADO != undefined &&
            this.filtroEstados.DESCRIPCION_ESTADO == undefined &&
            item.ID_ESTADO == this.filtroEstados.ID_ESTADO) {
            this.estados.push(item);
          }
          if (this.filtroEstados.DESCRIPCION_ESTADO != undefined &&
            this.filtroEstados.ID_ESTADO == undefined &&
            item.DESCRIPCION_ESTADO == this.filtroEstados.DESCRIPCION_ESTADO) {
            this.estados.push(item);
          }
          if (this.filtroEstados.ID_ESTADO != undefined &&
            this.filtroEstados.DESCRIPCION_ESTADO != undefined) {
            if (item.ID_ESTADO == this.filtroEstados.ID_ESTADO &&
              item.DESCRIPCION_ESTADO == this.filtroEstados.DESCRIPCION_ESTADO) {
              this.estados.push(item);
            }
          }
          else {
            this.estados.push(item);
          }
        });
      }
      else {
        this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
      }
    });
  }


  eliminar() {
    console.log("Input", this.estadoSeleccionado);
    console.log("Actualizado", this.estadoActualizado);
    this.Cerrar();
    this.notificationService.showSuccess("Datos Eliminados Correctamente!!", "Estado Eliminado")
  }
  Cerrar() {
    this.modalService.dismissAll('Save click');
    this.filtrar();
  }
}
