import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Clientes } from '../../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  
  private url = "https://localhost:44321/api/Clientes";

  constructor(private http: HttpClient) { }
  listaClientes(): Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.url+"/listar");
  }
  crearCliente(cliente: Clientes): Observable<any>{
    return this.http.post(this.url+"/insertarCliente", cliente);
  }
}
