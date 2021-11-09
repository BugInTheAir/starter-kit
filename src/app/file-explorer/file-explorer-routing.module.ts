import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { FileExplorerComponent } from './file-explorer.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/file-explorer', pathMatch: 'full' },
    { path: 'file-explorer', component: FileExplorerComponent, data: { title: marker('FileExplorer') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class FileExplorerRoutingModule {}
