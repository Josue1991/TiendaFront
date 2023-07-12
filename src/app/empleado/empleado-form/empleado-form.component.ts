import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from '../service/empleado.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html'
})
export class EmpleadoFormComponent implements OnInit {
  empleados: Empleado[] = [];
  closeResult: string = '';
  empleadoseleccionado?: Empleado = new Empleado;
  filtroEmpleado: Empleado = new Empleado;

  constructor(private empleadoservice: EmpleadoService, private modalService: NgbModal, public notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.empleados = [];
  }
  filtrar() {
    this.empleados = [];
    this.empleadoservice.listaEmpleados().subscribe(res => {
      if (res.length > 0) {
        this.notificationService.showInfo("Si se encontraron Resultados", "Consulta Finalizada");
        res.forEach(item => {
          if (this.filtroEmpleado.DNI_EMPLEADO != undefined || this.filtroEmpleado.NOMBRE_EMPLEADO != undefined) {
            if (this.filtroEmpleado.DNI_EMPLEADO != undefined && this.filtroEmpleado.NOMBRE_EMPLEADO == undefined && item.DNI_EMPLEADO == this.filtroEmpleado.DNI_EMPLEADO) {
              this.empleados.push(item);
            }
            if (this.filtroEmpleado.NOMBRE_EMPLEADO != undefined && this.filtroEmpleado.DNI_EMPLEADO == undefined && item.NOMBRE_EMPLEADO == this.filtroEmpleado.NOMBRE_EMPLEADO) {
              this.empleados.push(item);
            }
            if (this.filtroEmpleado.DNI_EMPLEADO != undefined && this.filtroEmpleado.NOMBRE_EMPLEADO != undefined) {
              if (item.DNI_EMPLEADO == this.filtroEmpleado.DNI_EMPLEADO && item.NOMBRE_EMPLEADO == this.filtroEmpleado.NOMBRE_EMPLEADO) {
                this.empleados.push(item);
              }
            }
          }
          else {
            this.empleados.push(item);
          }
        });
      }
      else {
        this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
      }
    });
  }

  open(content: any, idObjeto: Empleado) {
    this.filtroEmpleado = new Empleado;
    this.empleadoseleccionado = idObjeto;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCrear(content: any) {
    this.filtroEmpleado = new Empleado;
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

}
