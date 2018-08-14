import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserLoggedService {
  private userLoggedBehavior = new BehaviorSubject('');

  public currentUserLogged = this.userLoggedBehavior.asObservable();

  public updateUserLogged(item: any) {
    this.userLoggedBehavior.next(JSON.stringify(item));
  }

}
