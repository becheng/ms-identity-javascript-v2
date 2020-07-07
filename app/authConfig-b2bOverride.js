// override the auth object to support B2B logins

// override the authority to tenant specific Id, i.e. the tenant that contains the b2b users 
msalConfig.auth.authority = "Enter_the_TenantSpecific_Login_Endpoint_Here";

// override the loginRequest obj to b2b user scopes
loginRequest.scopes =  ["openid", "profile", "User.Read", "User.Read.All"];

// override the tokenRequest obj to b2b user scopes for MS Graph 
tokenRequest.scopes= ["User.Read", "User.Read.All"];

