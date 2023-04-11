import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { UnidadesService } from '../service/unidades.service';
import { Productos } from 'src/app/models/productos';
import { Unidades } from 'src/app/models/unidad';

@Component({
  selector: 'app-borrar-unidades',
  templateUrl: './borrarUnidades.component.html'
})
export class BorrarUnidadesComponent implements OnInit {

  unidadActualizado = new Unidades();
  filtroUnidades: Unidades = new Unidades;
  unidades: Unidades[] = [];

  @Input() unidadSeleccionado: any;
  constructor(private unidadesService: UnidadesService, private modalService: NgbModal,public notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.unidadActualizado = this.unidadSeleccionado;
  }

  filtrar() {
    this.unidades = [];
    this.unidadesService.listaUnidades().subscribe(res => {
      if (res.length > 0) {
        this.notificationService.showInfo("Si se encontraron Resultados", "Consulta Finalizada");
        res.forEach(item => {
          if (this.filtroUnidades.ID_UNIDAD != undefined && 
            this.filtroUnidades.DESCRIPCION_UNIDAD == undefined && 
            item.ID_UNIDAD == this.filtroUnidades.ID_UNIDAD) {
            this.unidades.push(item);
          }
          if (this.filtroUnidades.DESCRIPCION_UNIDAD != undefined && 
            this.filtroUnidades.ID_UNIDAD == undefined && 
            item.DESCRIPCION_UNIDAD == this.filtroUnidades.DESCRIPCION_UNIDAD) {
            this.unidades.push(item);
          }
          if (this.filtroUnidades.ID_UNIDAD != undefined && 
            this.filtroUnidades.DESCRIPCION_UNIDAD != undefined) {
            if (item.ID_UNIDAD == this.filtroUnidades.ID_UNIDAD && 
              item.DESCRIPCION_UNIDAD == this.filtroUnidades.DESCRIPCION_UNIDAD) {
              this.unidades.push(item);
            }
          }
          else {
            this.unidades.push(item);
          }
        });
      }
      else{
        this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
      }
    });
  }


  eliminar() {
    console.log("Input", this.unidadSeleccionado);
    console.log("Actualizado", this.unidadActualizado);
    this.Cerrar();
    this.notificationService.showSuccess("Datos Eliminados Correctamente!!", "Cliente Eliminado")
  }
  Cerrar(){
    this.modalService.dismissAll('Save click');
    this.filtrar();
  }
}
