import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, from, throwError } from 'rxjs';
import { API_URL } from '../env';
import { Wordcount } from './wordcount.model';
import { catchError } from 'rxjs/internal/operators';

@Injectable()
export class WordcountSevice {

  constructor(private http: HttpClient) {
  }

  getJobId(url: string): Observable<any> {
    const body = JSON.stringify({url : url})

    return this.http.post(`${API_URL}/execute`, body, { responseType: 'text' })
    .pipe(
      catchError( err => {
          return throwError(err.message || 'Error: Unable to complete request.');
      })
    );
  }

  getResults(jobId: string): Observable<any> {
    return this.http.get<string[]>(`${API_URL}/results/${jobId}`, { observe: 'response', responseType: 'json' })
    .pipe(
      catchError( err => {
          return throwError(err.message || 'Error: Unable to complete request.');
      })
    );
  }
}