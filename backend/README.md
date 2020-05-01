# API Documentation

# User

**/register**
Type: POST
Req body: name, nicpp, primaryContact, password
Response: REGISTER_SUCCESS
Function: Registers a user

**/login**
Type: POST
Req body: nicpp, password
Response: UID, HashedPassowrd, Salt
Function: Login verify


**/updateUser**
Type: POST
Req body: User
Response: UPDATE_SUCCESS
Function: Updates an existing user with new user data.

**/createUser**
Type: POST
Req body: User
Response: Created user data
Function: Creates anew user in the User table
