import { CanActivateChildFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const onlyLoggedUserGuard: CanActivateChildFn = (childRoute, state) => {
  const auth= inject(AuthService);
  const router = inject(Router)
  if (!auth.token){ /**el ! da el resultado opuesto o sea si da true, con el ! da false */
    const newPath = router.parseUrl("/login");
      return new RedirectCommand(newPath, {
        skipLocationChange: true,
      });
  }
  return true;
};
