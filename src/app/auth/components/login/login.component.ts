import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

/**
 * Componente de login.
 * Permite a los usuarios iniciar sesión mediante un formulario.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  /** Formulario reactivo para manejar los datos de login. */
  loginForm: FormGroup;

  /** Referencia al componente del modal para mostrar mensajes de error. */
  @ViewChild('modal') modal!: ModalComponent;

  /** * Constructor del componente.
   * @param fb - FormBuilder para construir el FormGroup.
   * @param router - Router para la navegación.
   * @param authService - Servicio de autenticación.
   */
  constructor( private fb: FormBuilder,  private router: Router,  private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Método para obtener el control de email del formulario.
   * @returns FormControl - Control de email.
   */
  get email() {
    return this.loginForm.get('email');
  }

  /**
   * Método para obtener el control de password del formulario.
   * @returns FormControl - Control de password.
   */
   get password() {
    return this.loginForm.get('password');
  }

  /**
   * Método que se ejecuta al enviar el formulario.
   * Autentica al usuario y redirige a la página de éxito o muestra un mensaje de error.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({email, password}).subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/success']);
        } else {
          this.modal.openModal();
        }
      });
    }
  }

  loginGoogle(){
    console.log("clic en login()-google")
  }
}
