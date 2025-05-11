import { inject, Injectable, linkedSignal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserStore } from '../state/stores/user.store';


/**
 * Servicio de autenticación.
 * Proporciona métodos para manejar el estado de autenticación de los usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly userStore = inject(UserStore);
  // Signals computados
  readonly user = this.userStore.user;
  /** Indica si el usuario está autenticado. */
    isLoggedIn = linkedSignal(this.userStore.isLoggedIn);

  /**
   * Método para autenticar al usuario.
   * Comprueba las credenciales y actualiza el estado de autenticación.
   * @param user - objeto que contine email y password.
   * @returns Observable<boolean> - Un observable que emite `true` si las credenciales son válidas, `false` en caso contrario.
   */
  login(user: User): Observable<boolean> {
    const isValidUser = user.email === 'test@example.com' && user.password === '123456'; // Credenciales deberian obtenerse de back
    this.userStore.setUser(user);
    this.isLoggedIn.set(isValidUser);
    return of(isValidUser).pipe(delay(500));
  }

  /**
   * Método para verificar si el usuario está autenticado.
   * @returns boolean - `true` si el usuario está autenticado, `false` en caso contrario.
   */
  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }


  logout() {
    this.userStore.clearUser();
  }
}


