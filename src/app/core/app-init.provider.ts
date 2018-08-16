import { UserService } from './../api/user.service';
import { UserLoggedService } from './user-logged.service';
import { AuthService } from './security/auth.service';

export function onAppInit(auth: AuthService, userService: UserService, userLoggedService: UserLoggedService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve) => {
      if (auth.jwtPayload) {
        userService.findById(auth.jwtPayload.id)
          .then(userAppSaved => {
            console.log(userAppSaved);
            userLoggedService.updateUserLogged(userAppSaved);
            resolve();
          });
      } else {
        resolve();
      }
    });
  };
}
