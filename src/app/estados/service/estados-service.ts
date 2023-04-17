import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from 'src/app/models/estados';
import { Unidades } from 'src/app/models/unidad';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private url = "https://localhost:44321/api/Estado";

  constructor(private http: HttpClient) { }
  listaEstados(): Observable<Estado[]>{
    return this.http.get<Estado[]>(this.url+"/listarEstados");
  }
  crearEstado(elemento: Estado): Observable<any>{
    return this.http.post(this.url+"/IngresarEstado", elemento);
  }
  editarEstado(elemento: Estado): Observable<any>{
    return this.http.post(this.url+"/EditarEstado", elemento);
  }
}
