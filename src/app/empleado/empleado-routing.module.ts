import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarComponent } from './editar/editar.component';
import { EmpleadoFormComponent } from './empleado-form/empleado-form.component';

const routes: Routes = [
  { path: 'empleado/ver', component: EmpleadoFormComponent },
  { path: 'empleado/editar', component: EditarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
