import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { inject } from '@angular/core';

export const isAdminGuard: CanActivateFn = (route, state) => {
  if (!inject(UsersService).isAdmin()) {
    inject(Router).navigate(['/']);
    return false;
  }
  return true;
};
