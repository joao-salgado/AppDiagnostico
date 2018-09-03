import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StaticJsonService {

  constructor(private http: HttpClient) {
  }

  public getJson(path: string): Observable<any> {
    return this.http.get(path);
  }

}
