// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

function signIn() {
    clearPageLogs();
    myMSALObj.loginPopup(loginRequest)
        .then(loginResponse => {

            console.log('id_token acquired at: ' + new Date().toString());
            
            if (myMSALObj.getAccount()) {
                showWelcomeMessage(myMSALObj.getAccount());
                populateIdTokenCard(loginResponse.idToken);
                populateAccessTokenCard(loginResponse.accessToken);                    
            }
        }).catch(error => {
            console.error(error);
            logToPage(error);
        });
}

function signOut() {
    myMSALObj.logout();
}

function getTokenPopup(request) {
    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn(error);
            console.warn("silent token acquisition fails. acquiring token using popup");

            // fallback to interaction when silent call fails
            return myMSALObj.acquireTokenPopup(request)
                .then(tokenResponse => {
                    return tokenResponse;
                }).catch(error => {
                    console.error(error);
                });
        });
}

function seeProfile() {
    if (myMSALObj.getAccount()) {
        getTokenPopup(loginRequest)
            .then(response => {
                //console.log('access_token acquired at: ' + new Date().toString());
                //console.log(response.accessToken);
                callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
                profileButton.classList.add('d-none');
                //mailButton.classList.remove('d-none');
                usersButton.classList.remove('d-none');
            }).catch(error => {
                console.error(error);
            });
    }
}

// function readMail() {
//     if (myMSALObj.getAccount()) {
//         getTokenPopup(tokenRequest)
//             .then(response => {
//                 console.log(response.accessToken);
//                 callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
//             }).catch(error => {
//                 console.error(error);
//                 logToPage(error);
//             });
//     }
// }

function readUsers() {
    if (myMSALObj.getAccount()) {
        getTokenPopup(tokenRequest)
            .then(response => {
                console.log(response.accessToken);
                callMSGraph(graphConfig.graphUsersEndpoint, response.accessToken, updateUI);
                usersButton.classList.add('d-none');
            }).catch(error => {
                console.error(error);
                logToPage(error);
            });
    }
}

function logToPage(content) {
    loggerDiv.style.display = 'block';
    loggerDiv.innerHTML = content;
}

function clearPageLogs() {
    loggerDiv.style.display = 'none';
    loggerDiv.innerHTML = '';
}