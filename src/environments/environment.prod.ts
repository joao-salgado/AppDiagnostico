export const environment = {
  production: true,
  apiUrl: 'http://api.not-defined.com.br',

  tokenWhitelistedDomains: [ /api.not-defined.com.br/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/, /\/company-processes/]
};
