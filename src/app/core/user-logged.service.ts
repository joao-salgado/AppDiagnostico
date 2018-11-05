import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserLoggedService {
  private userLoggedBehavior = new BehaviorSubject('');

  public currentUserLogged = this.userLoggedBehavior.asObservable();

  private role: number;

  public updateUserLogged(item: any) {
    this.role = item.userGroup.id;
    this.userLoggedBehavior.next(JSON.stringify(item));
  }

  public isAdmin(): boolean {
    return this.role === 1;
  }

  public isCollaborator(): boolean {
    return this.role === 2;
  }

  public isRearcher(): boolean {
    return this.role === 3;
  }

}
