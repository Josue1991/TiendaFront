import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from 'src/app/models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private url = "https://localhost:44321/api/Servicios";

  constructor(private http: HttpClient) { }
  listaServicios(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(this.url+"/ListarServicios");
  }
  crearServicio(elemento: Servicio): Observable<any>{
    return this.http.post(this.url+"/InsertarServicios", elemento);
  }
  editarServicios(elemento: Servicio): Observable<any>{
    return this.http.post(this.url+"/EditarServicios", elemento);
  }
}
