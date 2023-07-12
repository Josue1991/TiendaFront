import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosFormComponent } from './servicios-form/servicios-form.component';
import { CrearServicioComponent } from './crear-servicios/crear-servicio.component';
import { EditarDetalleServicioComponent } from '../detalle-servicios/editar-detalleServicio/editar-detalleServicio.component';
import { BorrarServicioComponent } from './borrar-servicios/borrar-servicio.component';

const routes: Routes = [
  {path : 'servicio/ver', component : ServiciosFormComponent},
  {path : 'servicio/crear', component : CrearServicioComponent},
  {path : 'servicio/editar', component : EditarDetalleServicioComponent},
  {path : 'servicio/borrar', component : BorrarServicioComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
