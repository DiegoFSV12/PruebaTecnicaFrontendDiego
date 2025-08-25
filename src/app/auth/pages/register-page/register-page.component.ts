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
      console.log(newToken);
      console.log(token);
      this.authService.saveClient(datos).pipe(
        switchMap(res => {
          console.log(res.id);
          this.idCreated = res.id;
          return this.authService.saveToken(token, newToken, this.idCreated);
        })
      ).subscribe(tokenRes => {
        console.log('Token guardado en la base de datos');
        alert(`Cliente registrado con exito con ID : ${tokenRes.id_cliente}`);
      });

    } 
}
