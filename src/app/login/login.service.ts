import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios';
import { NotificationService } from '../alerta/notification.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    invalidLogin?: boolean;
    private url = "https://localhost:44321/api/Login";

    constructor(private router: Router, private http: HttpClient, public notificationService: NotificationService) { }

    Login(usuario: Usuarios) {
        this.http.post(this.url + "/validarUsuario", usuario, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }).subscribe({
            next: (response) => {
                const token = (<any>response).token;
                localStorage.setItem("jwt", token);
                this.invalidLogin = false;
                this.notificationService.showSuccess("Usuario valido!!", "Bienvenido");
                this.router.navigate(["/"]);
            },
            error: () => {
                this.invalidLogin = true;
                this.router.navigate(["/login"]);
                this.notificationService.showError("Usuario Invalido!!", "Usuario Incorrecto");
            }
        });
    }
}
