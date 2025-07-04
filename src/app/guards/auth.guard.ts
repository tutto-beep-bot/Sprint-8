import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const _authService = inject(AuthService);
  const router = inject(Router);

  return _authService.isAuthResolved$.pipe(
    take(1),
    switchMap(() => _authService.user$.pipe(take(1))),
    map(user => {
      if(user) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
