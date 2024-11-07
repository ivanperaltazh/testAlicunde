
import { inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

/**
 * Guard de autenticación.
 * Previene el acceso a rutas protegidas si el usuario no está autenticado.
 * @returns {boolean} - `true` si el usuario está autenticado, de lo contrario redirige a la página de inicio y retorna `false`.
 */
export const authGuard = () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (authService.isAuthenticated()) {
      return true;
    } else {
        router.navigate(['/']);
      return false;
    }

}
