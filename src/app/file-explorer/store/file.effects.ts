import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from './file.reducer';
import * as FilePageActions from './actions/file-page.actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import * as FileApiActions from './actions/file-api.actions';
import { FileService } from '@app/@shared/services/file.service';
@Injectable()
export class FileEffects {
  constructor(private action$: Actions, private store: Store<State>, private fileService: FileService) {}
  initFiles$ = createEffect(() => {
    return this.action$.pipe(
      ofType(FilePageActions.initData),
      switchMap(() => this.fileService.getFilesAtRoot().pipe(map((files) => FileApiActions.inidataSuccess({ files }))))
    );
  });
  createFiles$ = createEffect(() => {
    return this.action$.pipe(
      ofType(FilePageActions.createFile),
      switchMap((action) =>
        this.fileService
          .createFile(action.newFile, action.currentRoot)
          .pipe(map((files) => FileApiActions.createFileSuccess({ files })))
      )
    );
  });
  updateFile$ = createEffect(() => {
    return this.action$.pipe(
      ofType(FilePageActions.updateFile),
      switchMap((action) =>
        this.fileService
          .updateFile(action.ID, action.updateFile)
          .pipe(map((file) => FileApiActions.updateFileSuccess({ file })))
      )
    );
  });
  deleteFile$ = createEffect(() => {
    return this.action$.pipe(
      ofType(FilePageActions.deleteFile),
      switchMap((action) =>
        this.fileService
          .deleteFile(action.id)
          .pipe(map((file) => FileApiActions.deleteFileSuccess({ id: file.fileID })))
      )
    );
  });
  deleteFolder$ = createEffect(() => {
    return this.action$.pipe(
      ofType(FilePageActions.deleteFolder),
      switchMap((action) =>
        this.fileService
          .deleteFolder(action.id)
          .pipe(map((folder) => FileApiActions.deleteFolderSuccess({ id: folder.fileID })))
      )
    );
  });
  addFolder$ = createEffect(() => {
    return this.action$.pipe(
      ofType(FilePageActions.addNewFolder),
      switchMap((action) =>
        this.fileService
          .addFolder(action.name, action.currentRootId)
          .pipe(map((folder) => FileApiActions.addFolderSuccess({ files: folder })))
      )
    );
  });
  diveDownToFolder$ = createEffect(() => {
    return this.action$.pipe(
      ofType(FilePageActions.diveDownToFolder),
      mergeMap((action) =>
        this.fileService
          .getFilesAtFolder(action.id)
          .pipe(map((files) => FileApiActions.diveDownToFolderSuccess({ file: files })))
      )
    );
  });
  goBackToPreviousFolder$ = createEffect(() => {
    return this.action$.pipe(
      ofType(FilePageActions.goBackToPreviousFolder),
      mergeMap((action) =>
        this.fileService
          .getFilesAtFolder(action.id)
          .pipe(map((files) => FileApiActions.goBackToPreviousFolderSuccess({ file: files })))
      )
    );
  });
}
