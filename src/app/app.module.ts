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
    BorrarEstadosComponent
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
