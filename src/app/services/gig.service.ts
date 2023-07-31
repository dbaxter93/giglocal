import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Gig } from '../gig';

@Injectable({
  providedIn: 'root'
})
export class GigService {

  private gigs?: Gig[];
  // private baseURL: string = "http://localhost:4200";
  private baseURL: string = "959928giglocalspringboot-env.eba-fhf797fe.us-west-2.elasticbeanstalk.com/gigs";
  
  postHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
    this.gigs = [
      new Gig(1, "Seeking string quintet for wedding", "", "String Quintet", "Chicago, IL", new Date(), "", true)
    ]
  }

  getAllGigs(): Observable<Gig[]> {
    return this.httpClient.get<Gig[]>(this.baseURL).pipe(
      map( res => {
        this.gigs = res;
        return this.gigs;
      }),
      catchError(this.handleError)
    );
  }

  postGig(gig: Gig): Observable<Gig> {
    return this.httpClient.post<Gig>(this.baseURL+"/save", gig, this.postHeaders).pipe(
      map( res => res),
      catchError(this.handleError)
    );
  }

  putGig(gig: Gig): Observable<Gig> {
    return this.httpClient.put<Gig>(this.baseURL+"/update", gig, this.postHeaders).pipe(
      map( res => res),
      catchError(this.handleError)
    );
  }

  getGigById(id: number): Observable<Gig | undefined> {
    if(!this.gigs){
      return this.getAllGigs().pipe(
        map(() => this.gigs?.find(gig=>gig.id == id)),
        catchError(this.handleError)
      );
    } else {
      return of(this.gigs.find(gig=>gig.id == id));
    }
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Error; please try again later.'))
  }

}
