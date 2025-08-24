import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Client } from '../interfaces/auth.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
    private getToken:string = environments.generateToken;
    private updateToken:string = environments.updateToken;
    private newClient:string = environments.registerClient;

    constructor(private http: HttpClient) { }

    generateToken(): Observable<{ id: string, token:string }> {
        return this.http.get<{ id: string, token:string }>(`${this.getToken}`);
    }

    saveToken(oldToken:string, newToken:string, id:number):Observable<{token: string, newToken: string, id_cliente: number}>{
        return this.http.post<{token: string, newToken: string, id_cliente: number}>(`${this.updateToken}`,{
            "token": oldToken,
            "newToken": newToken,
            "id_cliente": id
        });
    }

    saveClient(client:Client):Observable<{message:string, id: number}>{
        return this.http.post<{message:string, id: number}>(`${this.newClient}`,client);
    }

}