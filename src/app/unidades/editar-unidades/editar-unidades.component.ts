import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { UnidadesService } from '../service/unidades.service';
import { Unidades } from 'src/app/models/unidad';

@Component({
  selector: 'app-editar-unidades',
  templateUrl: './editar-unidades.component.html'
})
export class EditarUnidadesComponent implements OnInit {

  unidadesActualizado = new Unidades();
  filtroUnidades: Unidades = new Unidades;
  unidades: Unidades[] = [];

  @Input() unidadSeleccionado: any;
  constructor(private unidadesService: UnidadesService, private modalService: NgbModal,public notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.unidadesActualizado = this.unidadSeleccionado;
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


  actualizar() {
    this.notificationService.showSuccess("Datos Actualizados Correctamente!!", "Cliente Actualizado")
    this.Cerrar();
    
  }
  Cerrar(){
    this.modalService.dismissAll('Save click');
    this.filtrar();
  }
}
