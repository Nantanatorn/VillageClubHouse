import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

/**
 * Requires a valid login. If route data has `roles`, the user's role must match one (case-insensitive).
 * On the server (SSR) there is no localStorage, so the decision is left to the browser.
 */
export const authGuard: CanActivateFn = (route) => {
  if (!isPlatformBrowser(inject(PLATFORM_ID))) return true;

  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    auth.logout();
    return router.createUrlTree(['/login']);
  }

  const roles: string[] | undefined = route.data?.['roles'];
  if (roles?.length) {
    const role = auth.getRole()?.toLowerCase();
    if (!role || !roles.some(r => r.toLowerCase() === role)) {
      return router.createUrlTree(['/login']);
    }
  }
  return true;
};
