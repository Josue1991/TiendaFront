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
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BorrarComponent } from './clientes/borrar/borrar.component';
import { BorrarProductosComponent } from './productos/borrar-productos/borrarProductos.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MenuComponent } from './menu/menu.component';
import { UnidadesFormComponent } from './unidades/unidades-form/unidades-form.component';
import { BorrarUnidadesComponent } from './unidades/borrar-unidades/borrarUnidades.component';
import { EditarUnidadesComponent } from './unidades/editar-unidades/editar-unidades.component';
import { CrearUnidadesComponent } from './unidades/crear-unidades/crear-unidades.component';
import { UnidadesModule } from './unidades/unidades.module';
import { EstadosFormComponent } from './estados/estados-form/estados-form.component';
import { EstadosModule } from './estados/estados.module';
import { CrearEstadosComponent } from './estados/crear-estados/crear-estados.component';
import { EditarEstadosComponent } from './estados/editar-estados/editar-estados.component';
import { BorrarEstadosComponent } from './estados/borrar-estados/borrar-estados.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ServiciosFormComponent } from './servicios/servicios-form/servicios-form.component';
import { DetalleServiciosComponent } from './detalle-servicios/detalleServicio-form/detalle-servicios.component';
import { CrearServicioComponent } from './servicios/crear-servicios/crear-servicio.component';
import { BorrarServicioComponent } from './servicios/borrar-servicios/borrar-servicio.component';
import { EditarServicioComponent } from './servicios/editar-servicios/editar-servicios.component';
import { CrearDetalleServicioComponent } from './detalle-servicios/crear-detalleServicio/crear-detalleServicio.component';
import { EditarDetalleServicioComponent } from './detalle-servicios/editar-detalleServicio/editar-detalleServicio.component';
import { ServiciosModule } from './servicios/servicios.module';
import { DetalleServiciosModule } from './detalle-servicios/detalle-servicios.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { EmpleadoFormComponent } from './empleado/empleado-form/empleado-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientesFormComponent,
    CrearComponent,
    EditarComponent,
    BorrarComponent,
    ProductosFormComponent,
    CrearProductosComponent,
    EditarProductosComponent,
    BorrarProductosComponent,
    LoginComponent,
    MenuComponent,
    UnidadesFormComponent,
    CrearUnidadesComponent,
    EditarUnidadesComponent,
    BorrarUnidadesComponent,
    EstadosFormComponent,
    CrearEstadosComponent,
    EditarEstadosComponent,
    BorrarEstadosComponent,
    FacturacionComponent,
    ServiciosFormComponent,
    CrearServicioComponent,
    EditarServicioComponent,
    BorrarServicioComponent,
    DetalleServiciosComponent,
    CrearDetalleServicioComponent, 
    EditarDetalleServicioComponent, 
    EmpleadoFormComponent,
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
    UnidadesModule,  
    EstadosModule,
    ServiciosModule,
    DetalleServiciosModule,
    EmpleadoModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('tokens');
        },
        allowedDomains: ["https://localhost:44321/api/"],
        disallowedRoutes: ["https://localhost:44321/api/"],
      },
    }),  
    ToastrModule.forRoot()    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
