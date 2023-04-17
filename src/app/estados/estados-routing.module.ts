import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadosFormComponent } from './estados-form/estados-form.component';
import { CrearEstadosComponent } from './crear-estados/crear-estados.component';
import { EditarEstadosComponent } from './editar-estados/editar-estados.component';
import { BorrarEstadosComponent } from './borrar-estados/borrar-estados.component';

const routes: Routes = [
  {path : 'estados/ver', component : EstadosFormComponent},
  {path : 'estados/crear', component : CrearEstadosComponent},
  {path : 'estados/editar', component : EditarEstadosComponent},
  {path : 'estados/borrar', component : BorrarEstadosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadosRoutingModule { }
