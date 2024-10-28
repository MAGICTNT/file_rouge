import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  if (!inject(UsersService).getToken()) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
