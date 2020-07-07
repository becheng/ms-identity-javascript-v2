// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html

// BCheng Update: change the object variables to use  'let' instead 'const' so they may be updated for B2B logins
let msalConfig = {
    auth: {
        clientId: "Enter_the_Application_Id_Here",
        authority: "Enter_the_Multi-tenant_Login_Endpoint_Here",
        redirectUri: "Enter_the_Redirect_Uri_Here"
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
let loginRequest = {
    scopes: ["openid", "profile", "User.Read", "User.Read.All"]
};

// Add here scopes for access token to be used at MS Graph API endpoints.
let tokenRequest = {
    //scopes: ["User.Read", "Mail.Read", "User.Read.All"],
    scopes: ["User.Read", "User.Read.All"],
    forceRefresh: false // set this to "true" if you would like to skip a cached token and go to the server
};
