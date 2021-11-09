import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MyFile } from '@app/@shared/models/file';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss'],
})
export class FileFormComponent {
  defaultFile: any = undefined;
  supportTypes: string[] = ['Excel'];
  constructor(public dialogRef: MatDialogRef<FileFormComponent>) {}
  onCloseClick() {
    this.dialogRef.close();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.defaultFile = file;
    }
  }
}
