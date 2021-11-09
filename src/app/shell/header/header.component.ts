import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService } from '@app/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuHidden = true;
  @Input() isLoggedIn: boolean | undefined | null;
  @Input() userName: string | undefined | null;
  @Input() userFullname: string | undefined | null;
  @Output() btnLogginClicked = new EventEmitter<void>();
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  btnLoginClick() {
    this.btnLogginClicked.emit();
  }
}
