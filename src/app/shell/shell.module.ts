import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';

import { I18nModule } from '@app/i18n';
import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { StoreModule } from '@ngrx/store';
import { headerReducer } from './header/state/header.reducer';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    MatMenuModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    TranslateModule,
    NgbModule,
    AuthModule,
    I18nModule,
    RouterModule,
    StoreModule.forFeature('header', headerReducer),
  ],
  declarations: [HeaderComponent, ShellComponent],
})
export class ShellModule {}
