import { Component } from '@angular/core';

@Component({
  selector: 'auth-register-form',
  standalone: false,
  templateUrl: './register-form.component.html',
  styleUrl: `./register-form.component.css`
})
export class RegisterFormComponent {
  public bonos:string[]=["100 Giros gratis","Apuesta gratis S/30","30 Fichas gratis", "Sin bono"];
  public activarformulario1:boolean = true;
  public activarformulario2:boolean = false;
  public bonoSeleccionado = 0;

  public mostrarFormulario(){
    this.activarformulario1= false;
    this.activarformulario2= true;
  }

  public seleccionarBono(bono:number){
    this.bonoSeleccionado = bono;
    console.log(this.bonos[this.bonoSeleccionado]);
  }
}
