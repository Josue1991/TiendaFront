import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleServicio } from 'src/app/models/detalle-servicio';
import { Servicio } from 'src/app/models/servicio';

@Injectable({
  providedIn: 'root'
})
export class DetalleServiciosService {

  private url = "https://localhost:44321/api/Servicios";

  constructor(private http: HttpClient) { }
  listaDetallesServicios(): Observable<DetalleServicio[]>{
    return this.http.get<DetalleServicio[]>(this.url+"/ListarServicios");
  }
  crearDetalleServicio(elemento: DetalleServicio): Observable<any>{
    return this.http.post(this.url+"/InsertarDetalleServicios", elemento);
  }
  editarDetalleServicios(elemento: DetalleServicio): Observable<any>{
    return this.http.post(this.url+"/EditarDetalleServicios", elemento);
  }
}