import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { ClientesModule } from './clientes/clientes.module';
import { CrearComponent } from './clientes/crear/crear.component';
import { EditarComponent } from './clientes/editar/editar.component';
import { CrearProductosComponent } from './productos/crear-productos/crear-productos.component';
import { EditarProductosComponent } from './productos/editar-productos/editar-productos.component';
import { ProductosFormComponent } from './productos/productos-form/productos-form.component';
import { ProductosModule } from './productos/productos.module';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    ClientesFormComponent,
    CrearComponent,
    EditarComponent,
    ProductosFormComponent,
    CrearProductosComponent,
    EditarProductosComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClientesModule,
    ProductosModule,
    LoginModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
