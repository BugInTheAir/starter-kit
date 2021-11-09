import { Byte } from '@angular/compiler/src/util';

export interface FileResponse {
  rootFile: string;
  rootFileName: string;
  files: FileDetail[];
}

export interface FileDetail {
  fileID: string;
  fileName: string;
  modifiedBy: string;
  modifiedDate: string;
  rowVersion: Byte[];
  fileLocation: string;
  createdDate: string;
  createdBy: string;
}
