import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductosComponent } from './crear-productos/crear-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';

const routes: Routes = [
  {path : 'producto/ver', component : ProductosFormComponent},
  {path : 'producto/crear', component : CrearProductosComponent},
  {path : 'producto/editar', component : EditarProductosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
