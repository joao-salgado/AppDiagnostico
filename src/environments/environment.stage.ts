export const environment = {
  production: true,
  apiUrl: 'https://api-stage-diagnosis.herokuapp.com',
  authorization: 'Basic ckc2R0NIRTkzald6d3ZLVDp0bTQ0TDJwcENIM1A2S1Z2ejhuYQ',

  tokenWhitelistedDomains: [ new RegExp(/api-stage-diagnosis/) ],
  tokenBlacklistedRoutes: [new RegExp(/\/oauth\/token/), new RegExp(/\/company-processes/)]
};
