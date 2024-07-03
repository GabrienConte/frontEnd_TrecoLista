import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  private imageUrl: string = environment.imageUrl;

  constructor() { }

  getImagemUrl(fileName: string) {
    return `${this.imageUrl}/${fileName}`;
  }
}
