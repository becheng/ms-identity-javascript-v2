// Add here the endpoints for MS Graph API services you would like to use.
const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    //graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
    graphUsersEndpoint: "https://graph.microsoft.com/beta/users?$expand=appRoleAssignments"
    //graphUsersEndpoint: "https://graph.microsoft.com/beta/users?$select=id,createdDateTime,displayName,userPrincipalName,identities,appRoleAssignments&$expand=appRoleAssignments"
};
