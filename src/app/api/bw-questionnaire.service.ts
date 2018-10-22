import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BWService {

  private bwUrl: string;

  constructor(private http: HttpClient) {
    this.bwUrl = `${environment.apiUrl}/bw-questionnaires`;
  }

  public save(companyId: string): Observable<any> {
    return this.http.post(`${this.bwUrl}/companies/${companyId}`, {});
  }

  public delete(bwId: string): Observable<any> {
    return this.http.delete(`${this.bwUrl}/${bwId}`);
  }

  public findByCompany(companyId: string): Observable<any> {
    return this.http.get(`${this.bwUrl}/companies/${companyId}`);
  }

  public closeDiagnosis(bwId: string): Observable<any> {
    return this.http.put(`${this.bwUrl}/${bwId}/close`, {});
  }

  public savePersonalDiagnosis(diagnosisId: string, diagnosis: any): Observable<any> {
    return this.http.post(`${this.bwUrl}/${diagnosisId}/personal`, diagnosis);
  }

  public updatePersonalDiagnosis(diagnosisId: string, diagnosis: any): Observable<any> {
    return this.http.put(`${this.bwUrl}/${diagnosisId}/personal/${diagnosis.id}`, diagnosis);
  }

  public findByUserId(id: string): Observable<any> {
    return this.http.get(`${this.bwUrl}/personal/${id}`);
  }

}
