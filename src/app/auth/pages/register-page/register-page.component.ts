import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Client } from '../../interfaces/auth.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: `./register-page.component.css`
})
export class RegisterPageComponent {
  private idCreated:number=0;
    constructor(
      private authService:AuthService,
    ){}

    recibirDatos(datos: Client): void {
      const {
        bono,
        Tipo_Documento,
        Num_Documento,
        Nombres,
        Apellidos,
        FechaNacimiento,
        oldToken,
        token
      } = datos;
      this.authService.saveClient(datos).pipe(
        switchMap(res => {
          console.log(res.id);
          this.idCreated = res.id;
          return this.authService.saveToken(oldToken, token, this.idCreated);
        })
      ).subscribe(tokenRes => {
        console.log('Token guardado:', tokenRes);
      });

    } 
}
