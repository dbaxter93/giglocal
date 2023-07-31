import { Injectable } from '@angular/core';
import { Artist } from '../artist';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private artists?: Artist[];
  // private baseURL: string = "http://localhost:4200";
  private baseURL: string = "959928giglocalspringboot-env.eba-fhf797fe.us-west-2.elasticbeanstalk.com/artists";

  postHeaders = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  getAllArtists(): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>(this.baseURL+"/displayAll").pipe(
      map( res => {
        this.artists = res;
        return this.artists;
      }),
      catchError(this.handleError)
    );
  }

  getArtistByID(id: number): Observable<Artist | undefined> {
    if(!this.artists){
      return this.getAllArtists().pipe(
        map(() => this.artists?.find(user => user.id == id)),
        catchError(this.handleError)
      );
    } else {
        return of(this.artists.find(user => user.id == id));
    }
  }

  postArtist(user: Artist): Observable<Artist> {
    return this.httpClient.post<Artist>(this.baseURL+"/save", user, this.postHeaders).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  putArtist(user: Artist): Observable<Artist> {
    return this.httpClient.put<Artist>(this.baseURL+"/update", user, this.postHeaders).pipe(
      map(res => res),
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
