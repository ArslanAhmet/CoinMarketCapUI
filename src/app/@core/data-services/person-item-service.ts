import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AssetItem, PersonItem } from '../../shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonItemService {
  private personsUrl = '';

  constructor(private http: HttpClient) {
    this.personsUrl = environment.server + 'assets/';
   }

  getPersonItems(): Observable<PersonItem[]> {
    return this.http.get<PersonItem[]>(this.personsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createPersonItem(person: PersonItem): Observable<PersonItem> {
    console.log('personsUrl: ' + this.personsUrl)
    console.log('person : ' + JSON.stringify(person));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // PersonItem Id must be null for the Web API to assign an Id
    const newPersonItem = { ...person, id: null };
    return this.http.post<PersonItem>(this.personsUrl, newPersonItem, { headers })
      .pipe(
        tap(data => console.log('createPersonItem: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createAssetItem(asset: AssetItem): Observable<AssetItem> {
    console.log('assetsUrl: ' + this.personsUrl)
    console.log('asset : ' + JSON.stringify(asset));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // AssetItem Id must be null for the Web API to assign an Id
    const newAssetItem = { ...asset, id: null };
    return this.http.post<AssetItem>(this.personsUrl, newAssetItem, { headers })
      .pipe(
        tap(data => console.log('createassetItem: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deletePersonItem(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.personsUrl}/${id}`;
    return this.http.delete<PersonItem>(url, { headers })
      .pipe(
        tap(data => console.log('deletePersonItem: ' + id)),
        catchError(this.handleError)
      );
  }

  updatePersonItem(person: PersonItem): Observable<PersonItem> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.personsUrl}/${person.id}`;
    return this.http.put<PersonItem>(url, person, { headers })
      .pipe(
        tap(() => console.log('updatePersonItem: ' + person.id)),
        // Return the person on an update
        map(() => person),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
