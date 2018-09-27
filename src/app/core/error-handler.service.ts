import { LogoutService } from './security/logout.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse  } from '@angular/common/http';

import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router,
    private logoutService: LogoutService
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {

      switch (errorResponse.status) {
        case 404:
          msg = 'Não encontrado';
          this.router.navigate(['/404']);
          break;
        case 403:
          msg = 'Você não tem permissão para executar esta ação';
          break;
        case 401:
          msg = 'Você não tem permissão para executar esta ação';
          this.logoutService.logout();
          break;
      }

      try {
        msg = errorResponse.error[0].msgUser;
      } catch (e) { }

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
    }

    if (!!msg) {
      this.toasty.error(msg);
    }

  }

}
