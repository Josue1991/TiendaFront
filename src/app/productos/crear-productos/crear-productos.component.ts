import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerta/notification.service';
import { ProductoInventario } from 'src/app/models/productoInventario';
import { Productos } from 'src/app/models/productos';
import { Unidades } from 'src/app/models/unidad';
import { UnidadesService } from 'src/app/unidades/service/unidades.service';
import { ProductosService } from '../service/productos.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html'
})
export class CrearProductosComponent implements OnInit {

  productoNuevo: ProductoInventario = new ProductoInventario;
  unidades: Unidades[] = [];
  unidadSeleccionada: number = 0;

  constructor(private modalService: NgbModal,
    public notificationService: NotificationService,
    private unidadesService: UnidadesService,
    private productoService: ProductosService) { }

  ngOnInit(): void {
    this.filtrar()
  }

  filtrar() {
    this.unidades = [];

    this.unidadesService.listaUnidades().subscribe(res => {
      res.forEach(item => {
        this.unidades.push(item);
      });
    });

  }
  crear() {
    this.productoNuevo.ID_UNIDAD = this.unidadSeleccionada;
    this.productoService.crearProducto(this.productoNuevo).subscribe((data) => {
      if (data) {
        console.log(data)
        this.notificationService.showSuccess("Datos Ingresados Correctamente!!", "Unidad Agregada");
      }
    });
    this.modalService.dismissAll('Save click');
  }
  Cerrar() {
    this.modalService.dismissAll('Save click');
  }
}
function subscribe(arg0: (data: any) => void) {
  throw new Error('Function not implemented.');
}

