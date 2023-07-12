import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { DetalleServiciosService } from '../service/detalleServicio.service';
import { DetalleServicio } from 'src/app/models/detalle-servicio';
import { ProductosService } from 'src/app/productos/service/productos.service';
import { Productos } from 'src/app/models/productos';
import { Servicio } from 'src/app/models/servicio';

@Component({
  selector: 'app-crear-detalle-servicio',
  templateUrl: './crear-detalleServicio.component.html'
})
export class CrearDetalleServicioComponent implements OnInit {

  detalleServicioNuevo: DetalleServicio = new DetalleServicio;
  productos: Productos[] = [];
  productosAux: Productos[] = [];
  productoSeleccionada: number = 0;
  servicioCabecera = new Servicio();
  detalles: DetalleServicio[] = [];
  filtroDetalleServicio: DetalleServicio = new DetalleServicio;

  @Input() servicioSeleccionado: any;
  constructor(private modalService: NgbModal,
    public detalleServicioService: DetalleServiciosService,
    public notificationService: NotificationService,
    private productoService: ProductosService) { }

  ngOnInit(): void {
    this.servicioCabecera = this.servicioSeleccionado;
    this.listaProductos();
    this.servicioCabecera.DETALLESERVICIO = [];
  }

  listaProductos() {
    this.productos = [];
    this.productoService.listaTodo().subscribe(res => {
      console.log(res)
      res.forEach(item => {
        this.productos.push(item);
      });
    });
    this.productos.map(detalle => {
      detalle.seleccionado = 0;
      return detalle;
    });
    this.productosAux = this.productos;
  }


  crear() {
    this.servicioCabecera = this.servicioSeleccionado;
    var item = new DetalleServicio();
    item.ID_PRODUCTO = this.productoSeleccionada;
    item.CANTIDAD_DETALLE = this.detalleServicioNuevo.CANTIDAD_DETALLE;
    item.seleccionado = 1;
    this.detalles.push(item);
    this.productos.map(detalle => {
      if (detalle.ID_PRODUCTO == item.ID_PRODUCTO)
        detalle.seleccionado = 1;
      else
        detalle.seleccionado = 0;
      return detalle;
    });
    this.productos = this.productos.filter(x => x.seleccionado == 0);
    this.productoSeleccionada = 0;
    this.detalleServicioNuevo.CANTIDAD_DETALLE = 0;
    if (this.productos.length == 0)
      this.notificationService.showInfo("No tienen mas productos para este servicio", "Productos Insuficientes");
  }

  Quitar(item: Productos) {

    this.detalles.map(items => {
      if (items.ID_PRODUCTO == item.ID_PRODUCTO)
        items.seleccionado = 0;
      else
        items.seleccionado = 1;
      return items;
    })
    this.detalles = this.detalles.filter(x => x.seleccionado == 1);
    console.log(this.detalles)
    this.AgregarProducto(item);

  }

  AgregarProducto(item: Productos) {
    this.productosAux.forEach(p => {
      if (p.ID_PRODUCTO == item.ID_PRODUCTO) {
        p.seleccionado = 0;
      }
      else {
        p.seleccionado = 1;
      }
      this.productos.push(p);
    });
    this.productos = this.productos.filter(x => x.seleccionado == 1);
    console.log(this.productos);

  }

  guardar() {
    this.servicioCabecera.DETALLESERVICIO = this.detalles.filter(x => x.seleccionado == 1);
    console.log(this.servicioCabecera)
  }

  Cerrar() {
    this.modalService.dismissAll('Save click');
  }
}
