import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, scheduled } from 'rxjs';
import { MyFile } from '../models/file';
import { MOCKED_DATA } from '../mocked_data/mocked-data';
import { MockAuthenticationService } from '@app/auth/authentication.service.mock';
import { delay } from 'rxjs/operators';
import { FileDetail, FileResponse } from '../models/response-file';
import { UpdateFileRequest } from '../models/update-file,';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private productsUrl = '/File/';
  constructor(private http: HttpClient) {}
  getFilesAtRoot(): Observable<FileResponse> {
    return this.http.get<FileResponse>(`${this.productsUrl}`);
  }
  getFilesAtFolder(folderId: string): Observable<FileResponse> {
    return this.http.get<FileResponse>(`${this.productsUrl}/${folderId}/files`);
  }
  createFile(file: any, currentRoot?: string): Observable<FileDetail[]> {
    const formData = new FormData();
    formData.append('FilesInRootFolder', file);
    if (currentRoot !== undefined) {
      formData.append('RootFolder', currentRoot);
    }
    return this.http.post<FileDetail[]>(`${this.productsUrl}upload-files-or-folders`, formData);
  }
  updateFile(id: string, fileToUpdate: UpdateFileRequest): Observable<FileDetail> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<FileDetail>(`${this.productsUrl}/${id}/update-file`, JSON.stringify(fileToUpdate), {
      headers,
    });
  }
  deleteFile(id: string): Observable<FileDetail> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<FileDetail>(`${this.productsUrl}/${id}/delete-file`, { headers });
  }
  addFolder(name: string, currentRoot?: string): Observable<FileDetail[]> {
    const formData = new FormData();
    formData.append('ChildFolder', name);
    if (currentRoot !== undefined) {
      formData.append('RootFolder', currentRoot);
    }
    return this.http.post<FileDetail[]>(`${this.productsUrl}upload-files-or-folders`, formData);
  }
  deleteFolder(id: string): Observable<FileDetail> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<FileDetail>(`${this.productsUrl}/${id}/delete-folder`, { headers });
  }
}
