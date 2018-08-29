import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './../core/error-handler.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private errorHandlerService: ErrorHandlerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).catch((err: HttpErrorResponse) => {
      this.errorHandlerService.handle(err);
      return Observable.throw(err);
    });
  }

}
