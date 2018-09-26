import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserTypeService {

  private typeUrl: string;

  constructor(private http: HttpClient) {
    this.typeUrl = `${environment.apiUrl}/user-types`;
  }

  public findAll(): Observable<any> {
    return this.http.get(this.typeUrl);
  }

}
