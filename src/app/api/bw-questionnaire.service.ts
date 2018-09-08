import { BWHttp } from './../core/security/bw-http.service';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BWService {

  private bwUrl: string;

  constructor(private authHttp: BWHttp) {
    this.bwUrl = `${environment.apiUrl}/bw-questionnaires`;
  }

  public save(companyId: string): Observable<any> {
    return this.authHttp.post(`${this.bwUrl}/companies/${companyId}`, {});
  }

  public delete(bwId: string): Observable<any> {
    return this.authHttp.delete(`${this.bwUrl}/${bwId}`);
  }

  public findByCompany(companyId: string): Observable<any> {
    return this.authHttp.get(`${this.bwUrl}/companies/${companyId}`);
  }

  public closeDiagnosis(bwId: string): Observable<any> {
    return this.authHttp.put(`${this.bwUrl}/${bwId}/close`, {});
  }

}
