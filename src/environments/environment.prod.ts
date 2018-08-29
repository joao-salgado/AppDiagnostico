export const environment = {
  production: true,
  apiUrl: 'https://api-diagnosis.herokuapp.com/',

  tokenWhitelistedDomains: [ /api-stage-diagnosis/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/, /\/company-processes/]
};
