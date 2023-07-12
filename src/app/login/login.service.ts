import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { Usuarios } from '../models/usuarios';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from '../models/token';
import { UserProfile } from './userProfile';
import { FileToUpload } from '../models/FileToUpload';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  invalidLogin?: boolean;
  private url = "https://localhost:44321/api/Login";
  private urlEmpleado = "https://localhost:44321/api/Empleados";
  private apiDownloadUrl: string;
  private apiUploadUrl: string;
  private apiFileUrl: string;


  constructor(private httpClient: HttpClient) {
    this.apiDownloadUrl = this.url + '/download';
    this.apiUploadUrl = this.url + '/upload';
    this.apiFileUrl = this.url;

  }
  userProfile = new BehaviorSubject<UserProfile | null>(null);
  jwtService: JwtHelperService = new JwtHelperService();


  Login(payload: Usuarios): Observable<any> {
    return this.httpClient
      .post(this.url + '/Login', payload)
      .pipe(
        map((data) => {
          var token = data as TokenModel;
          var userInfo = this.jwtService.decodeToken(
            token.access_token
          ) as UserProfile;
          this.userProfile.next(userInfo);
          return data;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }
  RegistrarEmpleado(payload: Usuarios) {
    return this.httpClient.post(this.urlEmpleado + '/CrearEmpleados', payload);
  }

  public downloadFile(file: Blob): Observable<HttpEvent<Blob>> {
    return this.httpClient.get<HttpEvent<Blob>>(`${this.apiDownloadUrl}?file=${file}`)
  }

  public getFiles(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiFileUrl);
  }

  uploadFile(file: FileToUpload): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<FileToUpload>(this.urlEmpleado + '/Upload', file, httpOptions);
  }



}
