import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unidades } from 'src/app/models/unidad';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  private url = "https://localhost:44321/api/Unidad";

  constructor(private http: HttpClient) { }
  listaUnidades(): Observable<Unidades[]>{
    return this.http.get<Unidades[]>(this.url+"/listarUnidades");
  }
  crearUnidad(elemento: Unidades): Observable<any>{
    return this.http.post(this.url+"/insertarUnidad", elemento);
  }
}
