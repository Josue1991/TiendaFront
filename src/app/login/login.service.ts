import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { Usuarios } from '../models/usuarios';
import { NotificationService } from '../alerta/notification.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from '../models/token';
import { UserProfile } from './userProfile';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    invalidLogin?: boolean;
    private url = "https://localhost:44321/api/Login";

    constructor(private httpClient: HttpClient) {}
    userProfile = new BehaviorSubject<UserProfile | null>(null);
    jwtService: JwtHelperService = new JwtHelperService();
   
    Login(payload: Usuarios) {
      return this.httpClient
        .post(this.url+'/Login', payload)
        .pipe(
          map((data) => {
            var token = data as TokenModel;
   
            localStorage.setItem('tokens', JSON.stringify(token));
   
            var userInfo = this.jwtService.decodeToken(
              token.access_token
            ) as UserProfile;   
            this.userProfile.next(userInfo);   
            return true;
          }),
          catchError((error) => {
            console.log(error);
            return of(false);
          })
      );
    }
}
