import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Artist } from '../artist';
import { throwError, of } from 'rxjs';

import { ArtistService } from './artist.service';

describe('ArtistService', () => {
  let service: ArtistService;
  let baseURL: string = "http://localhost:4200";
  let fakeArtists: Artist[] = [
    new Artist(1, 'Testing', 'Testsalot', 'myusername', null, null)
  ];
  let postedArtist = new Artist(1, 'Testing', 'Testsalot', 'myusername', null, null);

  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient',['get', 'post', 'put']);
    httpClientSpy.get.and.returnValue(of(fakeArtists));
    httpClientSpy.post.and.returnValue(of(postedArtist));
    httpClientSpy.put.and.returnValue(of(postedArtist));

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(ArtistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getArtistByID should make get request to all artists if local artist array is empty', () => {
    service.getArtistByID(1).subscribe(
      () => expect(httpClientSpy.get).toHaveBeenCalledWith(baseURL+"/artists")
    );
  });

  it('getArtistByID should search the local artists array if it has artists', () => {
    service.getAllArtists().subscribe(
      () => {
        service.getArtistByID(1).subscribe(
          res => expect(res).toEqual(fakeArtists[0])
        )
      }
    )
  });

  it('given I call the postArtist method, it should make a POST call to the correct URL and return an Artist', () => {
    // Act
    service.postArtist(fakeArtists[1]).subscribe(
      // Assert
      res => expect(res).toEqual(postedArtist)
    );

    // Assert
    expect(httpClientSpy.post).toHaveBeenCalledWith(baseURL+"/artists", fakeArtists[1], jasmine.any(Object));
  });

  it('should handle 3- 4- and 500 series errors from http requests using the handleError function', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

    service.getAllArtists().subscribe({
      next: users => done.fail('expected an error'),
      error: error => {
        expect(error.message).toEqual('Error; please try again later.');
        done();
      }
    })
  });

});
