import { MyFile } from '@app/@shared/models/file';
import { createReducer, on } from '@ngrx/store';
import * as AppState from '../../state/state';
import {
  addFolderSuccess,
  createFileSuccess,
  deleteFileSuccess,
  deleteFolderSuccess,
  diveDownToFolderSuccess,
  goBackToPreviousFolderSuccess,
  inidataSuccess,
  updateFileSuccess,
} from './actions/file-api.actions';
import {
  addNewFolder,
  initData,
  toggleAddFolder,
  toggleCloseFileInformation,
  toggleFileInformation,
} from './actions/file-page.actions';
import { Stack } from 'stack-typescript';
import { PathTracer } from '@app/@shared/models/PathTracer';
import { DEFAULT_FOLDER, FileType } from '@app/@shared/utils/FileType';
import { FileDetail, FileResponse } from '@app/@shared/models/response-file';

export interface State extends AppState.State {
  files: FileState;
}

export interface FileState {
  isLoadedData: boolean;
  currentItems: MyFile[];
  currentFolder?: MyFile;
  toggleAddFolder: boolean;
  toggleFileInfo: boolean;
  currentFileInfo: MyFile;
  folderNavigation: Stack<PathTracer>;
}

const initialState: FileState = {
  isLoadedData: false,
  currentItems: [],
  currentFolder: undefined,
  toggleAddFolder: false,
  toggleFileInfo: false,
  currentFileInfo: {
    ID: '-1',
    CreateDate: '',
    ModifiedDate: '',
    Name: '',
    FolderID: '',
    Type: -1,
    ModifiedBy: '',
    CreateBy: '',
  },
  folderNavigation: new Stack<PathTracer>(),
};

export function fileReducer(state: any, action: any) {
  return _fileReducer(state, action);
}
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const _fileReducer = createReducer<FileState>(
  initialState,
  on(initData, (state): FileState => {
    return {
      ...state,
      isLoadedData: false ? !state.isLoadedData : state.isLoadedData,
    };
  }),
  on(inidataSuccess, (state, payload): FileState => {
    var newItems: MyFile[] = [];
    var myFiles = payload.files.files as FileDetail[];
    myFiles.forEach((element) => {
      newItems.push({
        CreateDate: element.modifiedDate,
        ModifiedBy: element.modifiedBy,
        FolderID: undefined,
        ModifiedDate: element.modifiedDate,
        ID: element.fileID,
        Name: element.fileName,
        Type: element.fileLocation === '' ? FileType.Folder : FileType.File,
        CreateBy: element.createdBy,
      });
    });
    return {
      ...state,
      isLoadedData: true,
      currentItems: newItems,
      folderNavigation: new Stack<PathTracer>(),
      currentFolder: undefined,
    };
  }),
  on(toggleAddFolder, (state): FileState => {
    return {
      ...state,
      toggleAddFolder: !state.toggleAddFolder,
    };
  }),
  on(addFolderSuccess, (state, action): FileState => {
    let updatedList = [...state.currentItems];
    action.files.forEach((element) => {
      let newFolder: MyFile = {
        FolderID: state.currentFolder?.FolderID,
        CreateDate: element.createdDate,
        ModifiedDate: element.modifiedDate,
        ModifiedBy: element.modifiedBy,
        Name: element.fileName,
        Type: FileType.Folder,
        ID: element.fileID,
        CreateBy: element.createdBy,
      };
      updatedList.push(newFolder);
    });
    return {
      ...state,
      currentItems: updatedList,
      toggleAddFolder: false,
    };
  }),
  on(toggleCloseFileInformation, (state): FileState => {
    return {
      ...state,
      toggleFileInfo: false,
    };
  }),
  on(toggleFileInformation, (state, action): FileState => {
    let currentFile = state.currentItems.find((x) => x.ID === action.id);
    return {
      ...state,
      toggleFileInfo: true,
      currentFileInfo:
        currentFile != null
          ? currentFile
          : {
              CreateBy: '',
              ID: '-1',
              CreateDate: '',
              ModifiedDate: '',
              Name: '',
              FolderID: '',
              Type: -1,
              ModifiedBy: '',
            },
    };
  }),

  on(deleteFileSuccess, (state, action): FileState => {
    let newItems = [...state.currentItems];
    newItems = state.currentItems.filter((file) => file.ID != action.id);
    return {
      ...state,
      toggleFileInfo: false,
      currentFileInfo: {
        ID: '-1',
        CreateDate: '',
        ModifiedDate: '',
        Name: '',
        FolderID: '',
        Type: -1,
        ModifiedBy: '',
        CreateBy: '',
      },
      currentItems: newItems,
    };
  }),
  on(createFileSuccess, (state, action): FileState => {
    var newFiles = [...state.currentItems];
    action.files.forEach((element) => {
      newFiles.push({
        Type: element.fileLocation === '' ? FileType.Folder : FileType.File,
        CreateDate: element.createdDate,
        ModifiedDate: element.modifiedDate,
        ModifiedBy: element.modifiedBy,
        ID: element.fileID,
        Name: element.fileName,
        CreateBy: element.createdBy,
      });
    });
    return {
      ...state,
      currentItems: newFiles,
    };
  }),
  on(updateFileSuccess, (state, action): FileState => {
    const newFile: MyFile = {
      FolderID: state.currentFolder?.FolderID,
      CreateDate: action.file.createdDate,
      ModifiedDate: action.file.modifiedDate,
      ModifiedBy: action.file.modifiedBy,
      Type: action.file.fileLocation == '' ? FileType.Folder : FileType.File,
      Name: action.file.fileName,
      ID: action.file.fileID,
      CreateBy: action.file.createdBy,
    };
    let newItems = state.currentItems.map((item) => (item.ID === newFile.ID ? newFile : item));
    return {
      ...state,
      currentItems: newItems,
    };
  }),
  on(diveDownToFolderSuccess, (state, action): FileState => {
    let newNav = [...state.folderNavigation];
    newNav.push({
      folderID: state.currentFolder?.ID === undefined ? DEFAULT_FOLDER : state.currentFolder?.ID,
      folderName: state.currentFolder?.Name === undefined ? DEFAULT_FOLDER : state.currentFolder?.Name,
    });
    var newItems: MyFile[] = [];
    var myFiles = action.file.files as FileDetail[];
    myFiles.forEach((element) => {
      newItems.push({
        CreateDate: element.modifiedDate,
        ModifiedBy: element.modifiedBy,
        FolderID: action.file.rootFile,
        ModifiedDate: element.modifiedDate,
        ID: element.fileID,
        Name: element.fileName,
        Type: element.fileLocation === '' ? FileType.Folder : FileType.File,
        CreateBy: element.createdBy,
      });
    });
    return {
      ...state,
      folderNavigation: new Stack(...newNav),
      currentItems: newItems,
      currentFolder: {
        CreateBy: '',
        CreateDate: '',
        ModifiedDate: '',
        Name: action.file.rootFileName,
        ModifiedBy: '',
        ID: action.file.rootFile,
        Type: FileType.Folder,
      },
      currentFileInfo: {
        ID: '-1',
        CreateDate: '',
        ModifiedDate: '',
        Name: '',
        FolderID: '',
        Type: -1,
        ModifiedBy: '',
        CreateBy: '',
      },
      toggleFileInfo: false,
    };
  }),
  on(goBackToPreviousFolderSuccess, (state, action): FileState => {
    let newNav = [...state.folderNavigation];
    newNav.pop();
    var newItems: MyFile[] = [];
    var myFiles = action.file.files as FileDetail[];
    myFiles.forEach((element) => {
      newItems.push({
        CreateDate: element.modifiedDate,
        ModifiedBy: element.modifiedBy,
        FolderID: action.file.rootFile,
        ModifiedDate: element.modifiedDate,
        ID: element.fileID,
        Name: element.fileName,
        Type: element.fileLocation === '' ? FileType.Folder : FileType.File,
        CreateBy: element.createdBy,
      });
    });
    return {
      ...state,
      currentItems: newItems,
      currentFolder: {
        CreateBy: '',
        CreateDate: '',
        ModifiedDate: '',
        Name: action.file.rootFileName,
        ModifiedBy: '',
        ID: action.file.rootFile,
        Type: FileType.Folder,
      },
      currentFileInfo: {
        ID: '-1',
        CreateDate: '',
        ModifiedDate: '',
        Name: '',
        FolderID: '',
        Type: -1,
        ModifiedBy: '',
        CreateBy: '',
      },
      folderNavigation: new Stack<PathTracer>(...newNav),
      toggleFileInfo: false,
    };
  }),
  on(deleteFolderSuccess, (state, action): FileState => {
    let newItems = [...state.currentItems];
    newItems = state.currentItems.filter((file) => file.ID != action.id);
    return {
      ...state,
      toggleFileInfo: false,
      currentFileInfo: {
        ID: '-1',
        CreateDate: '',
        ModifiedDate: '',
        Name: '',
        FolderID: '',
        Type: -1,
        ModifiedBy: '',
        CreateBy: '',
      },
      currentItems: newItems,
    };
  })
);
