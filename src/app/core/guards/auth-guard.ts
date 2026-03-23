import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtStorageService } from '../../domains/security/services/jwt-storage.service';

export const authGuard: CanActivateFn = () => {
  const jwtStorageService = inject(JwtStorageService);
  const router = inject(Router);

  const token = jwtStorageService.getAccessToken();

  if (!token || isTokenExpired(token)) {
    jwtStorageService.clear();
    router.navigate(['/auth']);
    return false;
  }

  return true;
};

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() > exp;
  } catch {
    return true;
  }
}
