import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from '../service/productos.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { ProductoInventario } from 'src/app/models/productoInventario';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html'
})

export class ProductosFormComponent implements OnInit {

  productos: ProductoInventario[] = [];
  closeResult: string = '';
  productoSeleccionado?: ProductoInventario = new ProductoInventario;
  filtroProducto: Productos = new Productos;

  constructor(private productosService: ProductosService, private modalService: NgbModal, public notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.productos = [];
  }
  filtrar() {
    this.productos = [];
    this.productosService.listaProductos().subscribe(res => {
      if (res.length > 0) {
        this.notificationService.showInfo("Se han encontraron: " + res.length + " Resultados", "Consulta Finalizada");
        res.forEach(item => {
          if (this.filtroProducto.ID_PRODUCTO != undefined &&
            this.filtroProducto.DESCRIPCION_PRODUCTO == undefined &&
            item.ID_PRODUCTO == this.filtroProducto.ID_PRODUCTO) {
            this.productos.push(item);
          }
          if (this.filtroProducto.DESCRIPCION_PRODUCTO != undefined &&
            this.filtroProducto.ID_PRODUCTO == undefined &&
            item.DESCRIPCION_PRODUCTO?.localeCompare(this.filtroProducto.DESCRIPCION_PRODUCTO)) {
            this.productos.push(item);
          }
          if (this.filtroProducto.ID_PRODUCTO == undefined &&
            this.filtroProducto.DESCRIPCION_PRODUCTO == undefined) {
            this.productos.push(item);
          }
        });
      }
      else {
        this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
      }
    });
  }

  open(content: any, idObjeto: Productos) {
    this.filtroProducto = new Productos;
    this.productoSeleccionado = idObjeto;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCrear(content: any) {
    this.filtroProducto = new Productos;
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
