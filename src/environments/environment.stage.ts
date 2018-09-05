export const environment = {
  production: true,
  apiUrl: 'https://api-stage-diagnosis.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp(/api-stage-diagnosis/) ],
  tokenBlacklistedRoutes: [new RegExp(/\/oauth\/token/), new RegExp(/\/company-processes/)]
};
