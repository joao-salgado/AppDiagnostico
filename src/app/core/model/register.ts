export class UserAccountRegister {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone: string;
  birthdate: string;
  sex: string;
  meta: any;
  active: boolean;
  startWork: string;
  userGroup: {
    id: string;
  };
  userType: {
    id: string;
  };

  constructor(userGroup = '2', name?, userType?) {
    this.name = name;
    this.userGroup = {id: userGroup};
    this.userType = {id: userType};
    this.meta = {};
    this.active = true;
  }

}

export class CompanyRegister {
  name: string;
  companyProcess: {
    id: string;
  };
  userAccount: Array<UserAccountRegister>;

  constructor() {
    this.companyProcess = {id: undefined};
    this.userAccount = new Array<UserAccountRegister>();
    this.userAccount.push(new UserAccountRegister('1'));
  }
}
