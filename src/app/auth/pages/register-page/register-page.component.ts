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
        newToken,
        token
      } = datos;
      console.log("Nuevo Token - "+newToken);
      console.log("Token original - "+token);
      console.log("Bono Seleccionado - "+bono);
      this.authService.saveClient(datos).pipe(
        switchMap(res => {
          console.log(res);
          this.idCreated = res.id;
          return this.authService.saveToken(token, newToken, this.idCreated);
        })
      ).subscribe({
        next: (response) => {
          alert('Cliente registrado correctamente. ID: ' + response.id_cliente);
        },
        error: (err) => {
          console.error('Error al registrar cliente:', err);
          alert('Ocurrió un error al registrar el cliente.');
        }
      });

    } 
}
