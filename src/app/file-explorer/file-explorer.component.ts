import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileState } from './store/file.reducer';
import * as FilePageActions from './store/actions/file-page.actions';
import {
  currentChoosenFile,
  currentFolder,
  currentItems,
  getPathTracer,
  isAddFolderToggle,
  isDataLoaded,
  isFileInformationToggle,
} from './store';
import { Observable } from 'rxjs';
import { MyFile } from '@app/@shared/models/file';
import { goBackToPreviousFolder, toggleAddFolder } from './store/actions/file-page.actions';
import { MatDialog } from '@angular/material/dialog';
import { FileFormComponent } from './file-form/file-form.component';
import { Stack } from 'stack-typescript';
import { PathTracer } from '@app/@shared/models/PathTracer';
import { DEFAULT_FOLDER, FileType } from '@app/@shared/utils/FileType';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
})
export class FileExplorerComponent implements OnInit {
  isDataLoaded$: Observable<boolean> | undefined;
  currentItems$: Observable<MyFile[]> | undefined;
  isAddFolderToggled$: Observable<boolean> | undefined;
  isFileInformationToggle$: Observable<boolean> | undefined;
  theChoosenFile$: Observable<MyFile> | undefined;
  currentFolder$: Observable<MyFile | undefined> | undefined;
  folderNavigation$: Observable<Stack<PathTracer>> | undefined;
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  constructor(private store: Store<FileState>, public matDialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(FilePageActions.initData());
    this.currentItems$ = this.store.select(currentItems);
    this.isDataLoaded$ = this.store.select(isDataLoaded);
    this.isAddFolderToggled$ = this.store.select(isAddFolderToggle);
    this.isFileInformationToggle$ = this.store.select(isFileInformationToggle);
    this.theChoosenFile$ = this.store.select(currentChoosenFile);
    this.folderNavigation$ = this.store.select(getPathTracer);
    this.currentFolder$ = this.store.select(currentFolder);
  }
  onrightClick(event: any) {
    this.contextmenuX = event.clientX;
    this.contextmenuY = event.clientY;
    this.contextmenu = true;
  }
  disableContextMenu() {
    this.contextmenu = false;
  }
  toggleAddFolder() {
    this.disableContextMenu();
    this.store.dispatch(toggleAddFolder());
  }
  onCreateFolder(name: string) {
    if (name == '') {
      this.store.dispatch(toggleAddFolder());
    } else {
      let rootFolderId = this.getValue(this.store.select(currentFolder)) as MyFile;
      this.store.dispatch(
        FilePageActions.addNewFolder({ name, currentRootId: rootFolderId === undefined ? undefined : rootFolderId.ID })
      );
    }
  }
  toggleCloseFileInformation() {
    this.store.dispatch(FilePageActions.toggleCloseFileInformation());
  }
  toggleOpenFileInformation(id: string) {
    let currentFile = this.getValue(this.store.select(currentChoosenFile)) as MyFile;
    if (currentFile.Type == FileType.Folder) {
      this.store.dispatch(FilePageActions.diveDownToFolder({ id: currentFile.ID }));
    }
    this.store.dispatch(FilePageActions.toggleFileInformation({ id }));
  }
  getValue(obj: Observable<any>) {
    let value: any;
    obj.subscribe((v) => (value = v));
    return value;
  }
  updateChoosenFile(newName: string) {
    if (newName !== '' && newName !== null) {
      this.store.dispatch(
        FilePageActions.updateFile({
          ID: (this.getValue(this.theChoosenFile$ as any) as MyFile).ID,
          updateFile: {
            FileName: newName,
          },
        })
      );
    }
  }
  deleteChoosenFile(id: string) {
    let currentFile = this.getValue(this.store.select(currentChoosenFile)) as MyFile;
    if (currentFile.Type === FileType.File) {
      this.store.dispatch(FilePageActions.deleteFile({ id: id }));
    } else if (currentFile.Type === FileType.Folder) {
      this.store.dispatch(FilePageActions.deleteFolder({ id: id }));
    }
  }
  toggleCreateFile() {
    this.disableContextMenu();
    let ref = this.matDialog.open(FileFormComponent);
    ref.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        let folder = this.getValue(this.store.select(currentFolder));
        if (folder) {
          this.store.dispatch(FilePageActions.createFile({ newFile: data, currentRoot: folder.ID }));
        } else {
          this.store.dispatch(FilePageActions.createFile({ newFile: data, currentRoot: undefined }));
        }
      }
    });
  }
  goBackToPreviousFolderClick() {
    console.log('in');
    let preivousFolders = [...this.getValue(this.store.select(getPathTracer))];
    let folder = preivousFolders.pop();
    if (folder.folderID === DEFAULT_FOLDER) {
      this.store.dispatch(FilePageActions.initData());
    } else {
      this.store.dispatch(FilePageActions.goBackToPreviousFolder({ id: folder.folderID }));
    }
  }
}
