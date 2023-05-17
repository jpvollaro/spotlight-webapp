import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

export class RoleResolver {
  hasRole: Subject<boolean> = new Subject();
  role = '';

  constructor(private authService: AuthService) {
    this.authService.current().subscribe(user => {});
    this.authService.authEvent.subscribe(user => {
      this.hasRole.next(
        this.role && user && user.roles && user.roles.indexOf(this.role) > -1
      );
    });
  }

  setRole(role: string) {
    this.role = role;
  }
}
