import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { BorrarComponent } from './borrar/borrar.component';

const routes: Routes = [
  {path : 'cliente/ver', component : ClientesFormComponent},
  {path : 'cliente/crear', component : CrearComponent},
  {path : 'cliente/editar', component : EditarComponent},
  {path : 'cliente/borrar', component : BorrarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
