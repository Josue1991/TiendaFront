import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private url = "https://localhost:44321/api/Empleados";

  constructor(private http: HttpClient) { }
  listaEmpleados(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.url+"/listar");
  }
}