---
page_type: sample
languages:
- javascript
products:
- msal
description: "A simple JavaScript Single-Page Application using the Auth Code flow w/ PKCE"
urlFragment: "ms-identity-javascript-v2"
---

# Multi-tenant AAD SPA with B2B Logins
This is a Proof of Concept (PoC) forked from [Azure-Samples/ms-identity-javascript-v2](https://github.com/Azure-Samples/ms-identity-javascript-v2) that demostrates how an app can support Azure AD (AAD) multi-tenant logins (i.e. work accounts from other AAD tenants) and B2B Guest logins. 

## Key PoC Concepts
- [ ] Use of separate AAD tenant to serve as control pane for B2B users for the app.
- [ ] Use of application specific roles defined in the registered AAD app's manifest.
- [ ] Emit those app roles as role claims within the OIDC id_token.
- [ ] Support SSO of work accounts (i.e. use of commmon endpoint) and B2B guest users (i.e. use of tenant specific endpoint) within the same app.
- [ ] Demostrate admin consent framework to accept the permissions of an app to access a tenant.
- [ ] Demostrate B2B users (without federation) request of the one time passcode to sign on to the app. 
- [ ] Use of MS Graph to retrieve logged in user's profile for both B2B and Multi-tenant users.
- [ ] Use of MS Graph to the retrieve all users within an user's org which is only applicable for multi-tenant logins.  By design, the users endpoint ` https://graph.microsoft.com/v1.0/users` is not available for B2B guest accounts.

## Login Scenarios 
- [ ] 1. A user logins to the app from another AAD tenant, 
- [ ] 2. A B2B guest user without federation logins to the app, 
- [ ] 3. A B2B guest user with federation logins to the app    

## AAD Tenant Considerations
Consider the following configurations and settings for your own AAD tenent or providing this as education to your customers, when providing consent of multi-tenant applications.  
- [ ] In preview, AAD now supports a admin consent workflow if enabled, see [docs](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/configure-admin-consent-workflow).
- [ ] To enforce that a user must be assigned to an app, go to  *Enterprise App* > *Properties* and set *User assignment required* to **Yes**.  Otherwise by default, all users of tenant will have access to the app. 
- [ ] In preview, the B2B passcode invitation process can be enabled, see [docs](https://docs.microsoft.com/en-us/azure/active-directory/b2b/one-time-passcode) so invited guests with federation of their IDP will recieve a passcode to sign on the app.  Upon log in, users will be prompted to provide a proper password.  

# MSAL 2.x JavaScript Sample Application

A simple vanilla JavaScript single-page application which demonstrates how to configure [MSAL.JS 2.x](https://www.npmjs.com/package/@azure/msal-browser) to login, logout, and acquire an access token for a protected resource such as Microsoft Graph API. This version of the MSAL.js library uses the Authorization Code flow w/ PKCE.

## Contents

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `app`             | Contains sample source files               |
| `authPopup.js`    | Main authentication logic resides here (using Popup flow).            |
| `authRedirect.js` | Use this instead of `authPopup.js` for authentication with redirect flow.   |
| `authConfig.js`   | Contains configuration parameters for a Multi-tenant login for the sample. |
| `authConfig-b2bOverride.js`   | Contains configuration parameters for a B2B login for the sample. |
| `graph.js`        | Provides a helper function for calling MS Graph API.   |
| `graphConfig.js`  | Contains API endpoints for MS Graph.       |
| `ui.js`           | Contains UI logic.                         |
| `index.html`      |  Contains the UI of the sample.            |
| `.gitignore`      | Define what to ignore at commit time.      |
| `changelog.md`    | List of changes to the sample.             |
| `CODE_OF_CONDUCT.md` | Code of Conduct information.            |
| `CONTRIBUTING.md` | Guidelines for contributing to the sample. |
| `package.json`    | Package manifest for npm.                   |
| `README.md`       | This README file.                          |
| `LICENSE`         | The license for the sample.                |
| `SECURITY.md`     | Security disclosures.                      |
| `server.js`     | Implements a simple Node server to serve index.html.  |

## Prerequisites

[Node](https://nodejs.org/en/) must be installed to run this sample.

## Setup

1. [Register a new application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the [Azure Portal](https://portal.azure.com). Ensure that the application is enabled for the [authorization code flow with PKCE](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow). This will require that you redirect URI configured in the portal is of type `SPA`.
2. Open the [/app/authConfig.js](./app/authConfig.js) file and provide the required configuration values for Multi-tenant logins.
3. Open the [/app/authConfig-b2bOverride.js](./app/authConfig-b2bOverride.js) file and provide the required configuration values for B2B logins.
4. On the command line, navigate to the root of the repository, and run `npm install` to install the project dependencies via npm.

## Running the sample

1. Configure authentication and authorization parameters:
   1. Open `authConfig.js`
   2. Replace the string `"Enter_the_Application_Id_Here"` with your app/client ID on AAD Portal.
   3. Replace the string `"Enter_the_Multi-tenant_Login_Endpoint_Here"` with `"https://login.microsoftonline.com/organizations/"` (*note*: This is for multi-tenant applications located on the global Azure cloud. For more information, see the [documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-javascript)).
   4. Replace the string `"Enter_the_Redirect_Uri_Here"` with the redirect uri you setup on AAD Portal, e.g. `"http://localhost:3000/"`"
   5. Open `authConfig-b2bOverride.js`
   6. Replace the string `"Enter_the_TenantSpecific_Login_Endpoint_Here"` with `"https://login.microsoftonline.com/xxxx-xxxx-xxxx-xxxxx/"` where `xxxx-xxxx-xxxx-xxxxx` is the tenant Id.
2. To start the sample application, run `npm start`.
3. Open a browser to [http://localhost:3000/index](http://localhost:3000/index) to test multi-tenant logins.
4. Open a browser to [http://localhost:3000/b2b-index](http://localhost:3000/b2n-index) to test B2B guest logins.
   
## Key concepts

This sample demonstrates the following MSAL workflows:

* How to configure application parameters.
* How to sign-in with popup and redirect methods.
* How to sign-out.
* How to get user consent incrementally.
* How to acquire an access token.
* How to make an API call with the access token.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
