import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from 'src/app/models/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = "https://localhost:44321/api/Producto";

  constructor(private http: HttpClient) { }
  listaProductos(): Observable<Productos[]>{
    return this.http.get<Productos[]>(this.url+"/listar");
  }
  crearProducto(producto: Productos): Observable<any>{
    return this.http.post(this.url+"/ingresarProducto", producto);
  }
}
