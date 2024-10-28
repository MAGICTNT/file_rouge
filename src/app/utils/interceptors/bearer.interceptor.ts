import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsersService } from '../services/users/users.service';

export const bearerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(UsersService).getToken();

  if (token) {
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  return next(req);
};
