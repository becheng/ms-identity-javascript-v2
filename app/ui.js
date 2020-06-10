// Select DOM elements to work with
const welcomeDiv = document.getElementById("WelcomeMessage");
const signInButton = document.getElementById("SignIn");
const cardDiv = document.getElementById("card-div");
//const mailButton = document.getElementById("readMail");
const usersButton = document.getElementById("readUsers");

const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");
const loggerDiv = document.getElementById("logger-div");
const accessTokenCard = document.getElementById("access_token-card");
const accessTokenDiv = document.getElementById("access_token-div");
const idTokenCard = document.getElementById("id_token-card");
const idTokenDiv = document.getElementById("id_token-div");
const usersCard = document.getElementById("list-users-card");
const graphCard = document.getElementById("graph-card");

function showWelcomeMessage(account, isB2B ='N') {

    // Reconfiguring DOM elements
    cardDiv.classList.remove('d-none');
    welcomeDiv.innerHTML = `Welcome ${account.name}`;

    // Reconfiguring DOM elements
    cardDiv.style.display = 'initial';
    welcomeDiv.innerHTML = `Welcome ${account.name}`;
    signInButton.setAttribute("onclick", isB2B == 'N' ? "signOut();": "b2bSignOut();");
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Sign Out";
}

function updateUI(data, endpoint) {
    console.log('Graph API responded at: ' + new Date().toString());

    if (endpoint === graphConfig.graphMeEndpoint) {
        const title = document.createElement('p');
        title.innerHTML = "<strong>Title: </strong>" + data.jobTitle;
        const email = document.createElement('p');
        email.innerHTML = "<strong>Mail: </strong>" + data.mail;
        const phone = document.createElement('p');
        phone.innerHTML = "<strong>Phone: </strong>" + data.businessPhones[0];
        const address = document.createElement('p');
        address.innerHTML = "<strong>Location: </strong>" + data.officeLocation;
        profileDiv.appendChild(title);
        profileDiv.appendChild(email);
        profileDiv.appendChild(phone);
        profileDiv.appendChild(address);

    // } else if (endpoint === graphConfig.graphMailEndpoint) {
    //     if (data.value.length < 1) {
    //         alert("Your mailbox is empty!")
    //     } else {
    //         const tabList = document.getElementById("list-tab");
    //         tabList.innerHTML = ''; // clear tabList at each readMail call
    //         const tabContent = document.getElementById("nav-tabContent");

    //         data.value.map((d, i) => {
    //             // Keeping it simple
    //             if (i < 10) {
    //                 const listItem = document.createElement("a");
    //                 listItem.setAttribute("class", "list-group-item list-group-item-action")
    //                 listItem.setAttribute("id", "list" + i + "list")
    //                 listItem.setAttribute("data-toggle", "list")
    //                 listItem.setAttribute("href", "#list" + i)
    //                 listItem.setAttribute("role", "tab")
    //                 listItem.setAttribute("aria-controls", i)
    //                 listItem.innerHTML = d.subject;
    //                 tabList.appendChild(listItem)

    //                 const contentItem = document.createElement("div");
    //                 contentItem.setAttribute("class", "tab-pane fade")
    //                 contentItem.setAttribute("id", "list" + i)
    //                 contentItem.setAttribute("role", "tabpanel")
    //                 contentItem.setAttribute("aria-labelledby", "list" + i + "list")
    //                 contentItem.innerHTML = "<strong> from: " + d.from.emailAddress.address + "</strong><br><br>" + d.bodyPreview + "...";
    //                 tabContent.appendChild(contentItem);
    //             }
    //         });
    //     }
    } else if (endpoint === graphConfig.graphUsersEndpoint) {

        const graphContent = document.getElementById("raw-graph-content");
        graphContent.innerHTML = JSON.stringify(data, null, 2); 

        const userList = document.getElementById("list-users");
        const orderedList = document.createElement("ul");

        //clear the list before appending a new list
        userList.innerHTML = ''; 
        orderedList.innerHTML = '';

        data.value.map((d, i) => {
            // Just show up to a max of 10 users 
            if (i < 10) {
                const listItem = document.createElement("li");
                var userDisplay = '';
                userDisplay = d.displayName + ' | ' + d.userPrincipalName;
                if (d.appRoleAssignments){
                    d.appRoleAssignments.map((ara, j) => {
                        if (ara.resourceId == '9ee245dd-48a7-4100-a691-d75e37d914fe'){
                            userDisplay = userDisplay + ' | ' + ara.appRoleId;
                        }
                    });
                }
                
                listItem.innerHTML = userDisplay;
                listItem.setAttribute("id", "user" + i);
                orderedList.appendChild(listItem)
            }
        });

        userList.appendChild(orderedList);
        
        usersCard.style.display = 'block';
        graphCard.style.display = 'block';
    }
}

function populateAccessTokenCard(token) {
    accessTokenCard.style.display = 'block';
    accessTokenDiv.innerHTML = JSON.stringify(parseJwt(token), null, 2); 
}

function populateIdTokenCard(token) {
    idTokenCard.style.display = 'block';
    idTokenDiv.innerHTML = JSON.stringify(parseJwt(token), null, 2); 
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};