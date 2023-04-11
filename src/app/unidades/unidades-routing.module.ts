import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadesFormComponent } from './unidades-form/unidades-form.component';
import { CrearUnidadesComponent } from './crear-unidades/crear-unidades.component';
import { EditarUnidadesComponent } from './editar-unidades/editar-unidades.component';
import { BorrarUnidadesComponent } from './borrar-unidades/borrarUnidades.component';

const routes: Routes = [
  {path : 'unidad/ver', component : UnidadesFormComponent},
  {path : 'unidad/crear', component : CrearUnidadesComponent},
  {path : 'unidad/editar', component : EditarUnidadesComponent},
  {path : 'unidad/borrar', component : BorrarUnidadesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesRoutingModule { }
