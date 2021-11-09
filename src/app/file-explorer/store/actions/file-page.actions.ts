import { MyFile } from '@app/@shared/models/file';
import { UpdateFileRequest } from '@app/@shared/models/update-file,';
import { createAction, props } from '@ngrx/store';

var FILE_EXPLORER = '[File Explorer]';
export const initData = createAction(`${FILE_EXPLORER} Init data`);

export const toggleAddFolder = createAction(`${FILE_EXPLORER} Toggle add folder`);

export const addNewFolder = createAction(
  `${FILE_EXPLORER} Add new folder`,
  props<{ name: string; currentRootId?: string }>()
);

export const toggleFileInformation = createAction(`${FILE_EXPLORER} Toggle file information`, props<{ id: string }>());

export const toggleCloseFileInformation = createAction(`${FILE_EXPLORER} Toggle close file information`);

export const createFile = createAction(`${FILE_EXPLORER} Create file`, props<{ newFile: any; currentRoot?: string }>());

export const backToPreviousFolder = createAction(`${FILE_EXPLORER} Back to previous folder`);

export const updateFile = createAction(
  `${FILE_EXPLORER} Update file`,
  props<{ ID: string; updateFile: UpdateFileRequest }>()
);

export const deleteFile = createAction(`${FILE_EXPLORER} Delete file`, props<{ id: string }>());

export const deleteFolder = createAction(`${FILE_EXPLORER} Delete folder`, props<{ id: string }>());

export const diveDownToFolder = createAction(`${FILE_EXPLORER} Dive down to folder`, props<{ id: string }>());

export const goBackToPreviousFolder = createAction(
  `${FILE_EXPLORER} Go back to previous folder`,
  props<{ id: string }>()
);
