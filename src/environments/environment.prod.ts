export const environment = {
  production: true,
  apiUrl: 'https://api-diagnosis.herokuapp.com',
  authorization: 'Basic Z3JraFp4Z0RUdHR3SERiTTpxU3lhR2FUd0RxZ21NcHN5bnZkYg==',

  tokenWhitelistedDomains: ['api-diagnosis.herokuapp.com'],
  tokenBlacklistedRoutes: [new RegExp('\/oauth\/token')]
};
