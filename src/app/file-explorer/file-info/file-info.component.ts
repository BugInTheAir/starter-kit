import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '@app/@shared/components/dialog-content/dialog-content.component';
import { MyFile } from '@app/@shared/models/file';

@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.component.scss'],
})
export class FileInfoComponent {
  @Input() theChoosenFile: MyFile | null;
  @Input() isFileInformationToggle?: boolean | null;
  @Output() updateFileEvent = new EventEmitter<string>();
  @Output() closeFileInformationEvent = new EventEmitter();
  @Output() deleteFileEvent = new EventEmitter<string>();
  @Input() dialog: MatDialog | undefined;
  fileNameForm = new FormControl();
  constructor() {
    this.theChoosenFile = {
      CreateBy: '',
      ID: '-1',
      CreateDate: '',
      ModifiedDate: '',
      Name: '',
      FolderID: '',
      Type: -1,
      ModifiedBy: '',
    };
  }
  updateBtnClick() {
    if (
      this.theChoosenFile !== null &&
      this.theChoosenFile !== undefined &&
      this.fileNameForm.value !== null &&
      this.fileNameForm.value != ''
    ) {
      this.updateFileEvent.emit(
        this.fileNameForm.value +
          (this.theChoosenFile.Name.split('.').length == 1 ? '' : '.' + this.theChoosenFile.Name.split('.')[1])
      );
      this.fileNameForm = new FormControl('');
    }
  }
  toggleCloseFileInformation() {
    this.closeFileInformationEvent.emit();
  }
  deleteBtnClick() {
    if (this.dialog) {
      let ref = this.dialog.open(DialogContentComponent, {
        data: 'Do you want to delete this item ?',
      });
      ref.afterClosed().subscribe((data) => {
        if (data === true) {
          this.deleteFileEvent.emit(this.theChoosenFile?.ID);
        }
      });
    }
  }
}
