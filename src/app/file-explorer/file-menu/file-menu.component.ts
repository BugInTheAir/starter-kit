import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-menu',
  templateUrl: './file-menu.component.html',
  styleUrls: ['./file-menu.component.scss'],
})
export class FileMenuComponent {
  @Input() x = 0;
  @Input() y = 0;
  @Output() toggleAddFile = new EventEmitter();
  @Output() toggleAddFolder = new EventEmitter();
  constructor() {}

  addFolderClick() {
    this.toggleAddFolder.emit();
  }
  addFileClick() {
    this.toggleAddFile.emit();
  }
}
