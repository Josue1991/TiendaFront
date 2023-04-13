import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Clientes } from '../../models/clientes';
import { NotificationService } from 'src/app/alerta/notification.service';
import { ProductosService } from '../service/productos.service';
import { Productos } from 'src/app/models/productos';
import { ProductoInventario } from 'src/app/models/productoInventario';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html'
})
export class EditarProductosComponent implements OnInit {

  productoActualizado = new ProductoInventario();
  filtroProducto: Productos = new Productos;
  productos: Productos[] = [];

  @Input() productoSeleccionado: any;
  constructor(private productosService: ProductosService, 
    private modalService: NgbModal, 
    public notificationService: NotificationService,
    private productoService: ProductosService) {
  }


  ngOnInit(): void {
    this.productoActualizado = this.productoSeleccionado;
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


  actualizar() {
    this.productoService.editarProducto(this.productoActualizado).subscribe((data) => {
      if (data) {
        console.log(data)
        this.notificationService.showSuccess("Datos Actualizados Correctamente!!", "Producto Actualizado");
        this.filtrar();
      }
    });
    this.Cerrar();

  }
  Cerrar() {
    this.modalService.dismissAll('Save click');
    this.filtrar();
  }
}
