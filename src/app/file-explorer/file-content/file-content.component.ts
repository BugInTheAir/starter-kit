import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyFile } from '@app/@shared/models/file';
import { PathTracer } from '@app/@shared/models/PathTracer';
import { Stack } from 'stack-typescript';

@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrls: ['./file-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileContentComponent {
  defaultRoot = 'Document';
  @Input() isDataLoaded?: boolean | null;
  @Input() currentFiles?: MyFile[] | null;
  @Input() currentFolder?: MyFile | null;
  @Input() isAddFolderToggle?: boolean | null;
  @Input() navigationTracer?: Stack<PathTracer> | null;
  @Output() contextMenuClick = new EventEmitter<any>();
  @Output() disableContextClick = new EventEmitter();
  @Output() onCreateFolderClick = new EventEmitter<string>();
  @Output() onToggleOpenFileInfo = new EventEmitter<string>();
  @Output() onGoBackEvent = new EventEmitter();
  folderNameFormControl = new FormControl();
  rightClickEvent(event: any) {
    this.contextMenuClick.emit(event);
  }
  disableContextMenu() {
    this.disableContextClick.emit();
  }
  onCreateFolder() {
    var value = this.folderNameFormControl.value;
    this.folderNameFormControl.setValue('');
    this.onCreateFolderClick.emit(value);
  }
  onFileClick(event: any) {
    this.onToggleOpenFileInfo.emit(event);
  }
  goBackToPreviousFolderBtnClick() {
    this.onGoBackEvent.emit();
  }
}
