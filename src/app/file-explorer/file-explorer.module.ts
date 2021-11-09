import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '@shared';
import { FileExplorerRoutingModule } from './file-explorer-routing.module';
import { FileExplorerComponent } from './file-explorer.component';
import { ToolBarComponent } from './tool-bar/tool-bar/tool-bar.component';
import { FileContentComponent } from './file-content/file-content.component';
import { StoreModule } from '@ngrx/store';
import { fileReducer } from './store/file.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FileEffects } from './store/file.effects';
import { FileFormComponent } from './file-form/file-form.component';
import { FileMenuComponent } from './file-menu/file-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileInfoComponent } from './file-info/file-info.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FileExplorerRoutingModule,
    StoreModule.forFeature('files', fileReducer),
    EffectsModule.forFeature([FileEffects]),
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatGridListModule,
  ],
  declarations: [
    FileExplorerComponent,
    ToolBarComponent,
    FileContentComponent,
    FileFormComponent,
    FileMenuComponent,
    FileInfoComponent,
  ],
  providers: [],
})
export class FileExplorerModule {}
