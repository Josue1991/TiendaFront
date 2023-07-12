import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { Productos } from 'src/app/models/productos';
import { ProductoInventario } from 'src/app/models/productoInventario';
import { ProductosService } from 'src/app/productos/service/productos.service';
import { DetalleServiciosService } from '../service/detalleServicio.service';
import { DetalleServicio } from 'src/app/models/detalle-servicio';

@Component({
    selector: 'app-editar-detalle-servicio',
    templateUrl: './editar-detalleServicio.component.html'
})
export class EditarDetalleServicioComponent implements OnInit {

    detalleServicioActualizado = new DetalleServicio();
    filtroProducto: Productos = new Productos;
    productos: Productos[] = [];
    detalles: DetalleServicio[] = [];
    filtroDetalleServicio: DetalleServicio = new DetalleServicio;
    productoSeleccionada: number = 0;

    @Input() detalleServicioSeleccionado: any;
    constructor(private productosService: ProductosService,
        private modalService: NgbModal,
        public notificationService: NotificationService,
        private productoService: ProductosService,
        private detallesServicioService: DetalleServiciosService) {
    }


    ngOnInit(): void {
        this.detalleServicioActualizado = this.detalleServicioSeleccionado;
        this.listaProductos();
    }

    listaProductos() {
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
    filtrar() {
        this.detalles = [];
        this.detallesServicioService.listaDetallesServicios().subscribe(res => {
            if (res.length > 0) {
                this.notificationService.showInfo("Si se encontraron Resultados", "Consulta Finalizada");
                res.forEach(item => {
                    debugger
                    if (this.filtroDetalleServicio.ID_DETALLESERVICIO != undefined &&
                        this.filtroDetalleServicio.ID_SERVICIO == undefined &&
                        item.ID_DETALLESERVICIO == this.filtroDetalleServicio.ID_DETALLESERVICIO) {
                        this.detalles.push(item);
                    }
                    if (this.filtroDetalleServicio.ID_DETALLESERVICIO == undefined &&
                        this.filtroDetalleServicio.ID_SERVICIO != undefined &&
                        item.ID_SERVICIO == this.filtroDetalleServicio.ID_SERVICIO) {
                        this.detalles.push(item);
                    }
                    if (this.filtroDetalleServicio.ID_DETALLESERVICIO == undefined &&
                        this.filtroDetalleServicio.ID_SERVICIO == undefined) {
                        this.detalles.push(item);
                    }
                });
            }
            else {
                this.notificationService.showError("No se han encotrado datos!!", "Consulta Finalizada");
            }
        });
    }

    actualizar() {
        this.detalleServicioActualizado.ID_PRODUCTO = this.productoSeleccionada;
        this.detallesServicioService.editarDetalleServicios(this.detalleServicioActualizado).subscribe((data) => {
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
