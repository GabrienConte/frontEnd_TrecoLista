import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsuarioService);
    const router = inject(Router);

    if (userService.isAdmin()) {
      return true;
    } else {
      return router.createUrlTree(['/unauthorized']);
    }
};
