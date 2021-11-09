import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileState } from './file.reducer';

const getFileState = createFeatureSelector<FileState>('files');

export const isDataLoaded = createSelector(getFileState, (state) => state.isLoadedData);

export const currentItems = createSelector(getFileState, (state) => state.currentItems);

export const isAddFolderToggle = createSelector(getFileState, (state) => state.toggleAddFolder);

export const isFileInformationToggle = createSelector(getFileState, (state) => state.toggleFileInfo);

export const currentChoosenFile = createSelector(getFileState, (state) => state.currentFileInfo);

export const getPathTracer = createSelector(getFileState, (state) => state.folderNavigation);

export const currentFolder = createSelector(getFileState, (state) => state.currentFolder);
