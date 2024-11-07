import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';

/**
 * Servicio de autenticación.
 * Proporciona métodos para manejar el estado de autenticación de los usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /** Indica si el usuario está autenticado. */
  private isLoggedIn = false;

  /**
   * Método para autenticar al usuario.
   * Comprueba las credenciales y actualiza el estado de autenticación.
   * @param user - objeto que contine email y password.
   * @returns Observable<boolean> - Un observable que emite `true` si las credenciales son válidas, `false` en caso contrario.
   */
  login(user: User): Observable<boolean> {
    const isValidUser = user.email === 'test@example.com' && user.password === '123456'; // Credenciales deberian obtenerse de back
    this.isLoggedIn = isValidUser;
    return of(isValidUser).pipe(delay(500));
  }

  /**
   * Método para verificar si el usuario está autenticado.
   * @returns boolean - `true` si el usuario está autenticado, `false` en caso contrario.
   */
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
