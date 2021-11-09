import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

import { LoaderComponent } from './loader/loader.component';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [TranslateModule, CommonModule, MatDialogModule, MatButtonModule],
  declarations: [LoaderComponent, DialogContentComponent],
  exports: [LoaderComponent],
})
export class SharedModule {}
