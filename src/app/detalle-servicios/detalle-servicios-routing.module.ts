import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleServiciosComponent } from './detalleServicio-form/detalle-servicios.component';
import { CrearDetalleServicioComponent } from './crear-detalleServicio/crear-detalleServicio.component';
import { EditarDetalleServicioComponent } from './editar-detalleServicio/editar-detalleServicio.component';

const routes: Routes = [
  {path : 'detalleServicio/ver', component : DetalleServiciosComponent},
  {path : 'detalleServicio/crear', component : CrearDetalleServicioComponent},
  {path : 'detalleServicio/editar', component : EditarDetalleServicioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleServiciosRoutingModule { }
