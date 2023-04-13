import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { Unidades } from 'src/app/models/unidad';
import { UnidadesService } from '../service/unidades.service';

@Component({
  selector: 'app-crear-unidades',
  templateUrl: './crear-unidades.component.html'
})
export class CrearUnidadesComponent implements OnInit {

  unidadNuevo: Unidades = new Unidades;

  constructor(private modalService: NgbModal,
    public unidadService: UnidadesService,
    public notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  
  crear(){ 
    this.unidadService.crearUnidad(this.unidadNuevo).subscribe((data) => {
      if (data) {
        console.log(data)
        this.notificationService.showSuccess("Datos Ingresados Correctamente!!", "Unidad Agregada");
      }
    });    
    this.modalService.dismissAll('Save click');
  }
  Cerrar(){
    this.modalService.dismissAll('Save click');
  }
}
