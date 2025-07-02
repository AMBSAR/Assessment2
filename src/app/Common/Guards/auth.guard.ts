import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core'
import { UserAuthenticatorService } from '../../Services/Authenticator/user-authenticator.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(UserAuthenticatorService);
  const loggedUser = authService.getLoggedInUser();

  if (loggedUser != null) {
    return true;
  }
  else
  {
    router.navigate(['/login']);
    return false;
  }

};
