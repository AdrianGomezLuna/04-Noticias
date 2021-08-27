import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../pages/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlines = 0;

  constructor(private http: HttpClient) { }

  getTopHeadlines() {
    this.headlines++;
    // eslint-disable-next-line max-len
    return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=c8dc81aa05c145b89d63123af110a184&page=${ this.headlines }`);
  }

  getTopHeadlinesCategoria(categoria: string) {
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=c8dc81aa05c145b89d63123af110a184`);
  }
}
