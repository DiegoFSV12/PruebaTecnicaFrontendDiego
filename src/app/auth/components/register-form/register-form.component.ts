import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Client } from '../../interfaces/auth.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-register-form',
  standalone: false,
  templateUrl: './register-form.component.html',
  styleUrl: `./register-form.component.css`
})
export class RegisterFormComponent implements OnInit{
  public bonos:string[]=["100 Giros gratis","Apuesta gratis S/30","30 Fichas gratis", "Sin bono"];
  public activarformulario1:boolean = true;
  public activarformulario2:boolean = false;
  public bonoSeleccionado = 0;

  @Output()
  public sendClient:EventEmitter<Client> = new EventEmitter;

  constructor(
    private authService:AuthService,
  ){}

  ngOnInit(): void {

    this.clientForm.get('FechaNacimiento')?.valueChanges.subscribe(value => {
    if (value) {
      const fecha = new Date(value);
      const fechaSQL = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
      this.clientForm.get('FechaNacimiento')?.setValue(fechaSQL, { emitEvent: false });
    }
  });

    this.authService.generateToken()
    .subscribe(token => {
      this.clientForm.get("oldToken")?.setValue(token.token);
      this.clientForm.get("token")?.setValue(token.token);
    })
  }
  

  public clientForm = new FormGroup({     
        bono: new FormControl(this.bonos[this.bonoSeleccionado]),
        Tipo_Documento: new FormControl(''),    
        Num_Documento: new FormControl(''),
        Nombres: new FormControl(''),       
        Apellidos: new FormControl(''),
        FechaNacimiento: new FormControl<string>(''),
        oldToken: new FormControl(''),      
        token: new FormControl(''),        
  });

  public mostrarFormulario(){
    this.activarformulario1= false;
    this.activarformulario2= true;
  }

  public seleccionarBono(bono:number){
    this.bonoSeleccionado = bono;
    console.log(this.bonos[this.bonoSeleccionado]);
  }

  sendData(): void {
  if (this.clientForm.valid) {
    const fechaNacimiento = this.clientForm.value.FechaNacimiento;
    if (fechaNacimiento) {
      const nacimiento = new Date(fechaNacimiento);
      const hoy = new Date();
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      if (edad < 18) {
        console.log("EL USUARIO ES MENOR DE EDAD");
        return;
      }
    }
    this.sendClient.emit(this.clientForm.value as Client); 
  }
}
}
