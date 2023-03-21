import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { ProductosService } from '../service/productos.service';
import { Productos } from 'src/app/models/productos';

@Component({
  selector: 'app-borrar-productos',
  templateUrl: './borrarProductos.component.html'
})
export class BorrarProductosComponent implements OnInit {

  productoActualizado = new Productos();
  filtroProducto: Productos = new Productos;
  productos: Productos[] = [];

  @Input() productoSeleccionado: any;
  constructor(private productosService: ProductosService, private modalService: NgbModal,public notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.productoActualizado = this.productoSeleccionado;
  }

  filtrar() {
    this.productos = [];
    this.productosService.listaProductos().subscribe(res => {
      if (res.length > 0) {
        this.notificationService.showInfo("Si se encontraron Resultados", "Consulta Finalizada");
        res.forEach(item => {
          if (this.filtroProducto.ID_PRODUCTO != undefined && this.filtroProducto.DESCRIPCION_PRODUCTO == undefined && item.ID_PRODUCTO == this.filtroProducto.ID_PRODUCTO) {
            this.productos.push(item);
          }
          if (this.filtroProducto.DESCRIPCION_PRODUCTO != undefined && this.filtroProducto.ID_PRODUCTO == undefined && item.DESCRIPCION_PRODUCTO == this.filtroProducto.DESCRIPCION_PRODUCTO) {
            this.productos.push(item);
          }
          if (this.filtroProducto.ID_PRODUCTO != undefined && this.filtroProducto.DESCRIPCION_PRODUCTO != undefined) {
            if (item.ID_PRODUCTO == this.filtroProducto.ID_PRODUCTO && item.DESCRIPCION_PRODUCTO == this.filtroProducto.DESCRIPCION_PRODUCTO) {
              this.productos.push(item);
            }
          }
          else {
            this.productos.push(item);
          }
        });
      }
      else{
        this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
      }
    });
  }


  eliminar() {
    console.log("Input", this.productoSeleccionado);
    console.log("Actualizado", this.productoActualizado);
    this.Cerrar();
    this.notificationService.showSuccess("Datos Eliminados Correctamente!!", "Cliente Eliminado")
  }
  Cerrar(){
    this.modalService.dismissAll('Save click');
    this.filtrar();
  }
}
