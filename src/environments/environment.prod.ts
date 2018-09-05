export const environment = {
  production: true,
  apiUrl: 'https://api-diagnosis.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp(/api-diagnosis/) ],
  tokenBlacklistedRoutes: [new RegExp(/\/oauth\/token/), new RegExp(/\/company-processes/)]
};
