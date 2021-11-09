import { MyFile } from '@app/@shared/models/file';
import { FileDetail, FileResponse } from '@app/@shared/models/response-file';
import { createAction, props } from '@ngrx/store';
var FILE_EXPLORER = '[File Explorer]';
export const inidataSuccess = createAction(`${FILE_EXPLORER} Init data successfully`, props<{ files: FileResponse }>());
export const createFileSuccess = createAction(
  `${FILE_EXPLORER} Create file successfully`,
  props<{ files: FileDetail[] }>()
);
export const updateFileSuccess = createAction(
  `${FILE_EXPLORER} Update file successfully`,
  props<{ file: FileDetail }>()
);
export const deleteFileSuccess = createAction(`${FILE_EXPLORER} Delete file successfully`, props<{ id: string }>());
export const addFolderSuccess = createAction(
  `${FILE_EXPLORER} Add folder successfully`,
  props<{ files: FileDetail[] }>()
);
export const deleteFolderSuccess = createAction(`${FILE_EXPLORER} Delete folder successfully`, props<{ id: string }>());
export const diveDownToFolderSuccess = createAction(
  `${FILE_EXPLORER} Dive down to folder successfully`,
  props<{ file: FileResponse }>()
);
export const goBackToPreviousFolderSuccess = createAction(
  `${FILE_EXPLORER} Go back to prev folder successfully`,
  props<{ file: FileResponse }>()
);
