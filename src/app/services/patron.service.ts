import { Injectable } from '@angular/core';
import { Patron } from '../patron';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatronService {

  private patrons: Patron[];
  // private baseURL: string = "http://localhost:4200";
  private baseURL: string = "959928giglocalspringboot-env.eba-fhf797fe.us-west-2.elasticbeanstalk.com/patrons";

  postHeaders = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
    this.patrons = [
      new Patron(2, "Testing", "Testerson", "", null)
    ];
  }

  getAllPatrons(): Observable<Patron[]> {
    return this.httpClient.get<Patron[]>(this.baseURL+"/displayAll").pipe(
      map( res => {
        this.patrons = res;
        return this.patrons;
      }),
      catchError(this.handleError)
    );
  }

  getPatronByID(id: number):Patron | undefined {
    return this.patrons.find(user => user.id == id);
  }

  postPatron(user: Patron): Observable<Patron> {
    return this.httpClient.post<Patron>(this.baseURL+"/save", user, this.postHeaders).pipe(
      map( res => res),
      catchError(this.handleError)
    );
  }

  putPatron(user: Patron): Observable<Patron> {
    return this.httpClient.put<Patron>(this.baseURL+"/update", user, this.postHeaders).pipe(
      map( res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message. Alter this to make more granular responses depending on error code.
    return throwError(() => new Error('Error; please try again later.'))
  }
}
