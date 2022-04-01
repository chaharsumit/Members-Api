# MEMBERS-API
This is a basic api that allows CRUD operation taking data for members with their details such as member name, company name, last updated time, notes about the member.

This api uses the following -
- Express.js used as the backend framework
- JWT used for authentication and authorization

# Heroku deploy link(API ROOT_URL)
[https://thawing-oasis-92301.herokuapp.com/](https://thawing-oasis-92301.herokuapp.com/).

# ENDPOINTS
**Authentication Header:**
Authentication header can be read from the header of the request.
```js
  Authorization: jwt_token
```
**Authentication:**
```js
POST ROOT_URL/login
```
Example request body:
```js
{
  "user":{
    "email": "test@example.com",
    "password": "test123"
  }
}
```
Returns a User object with email & userId.
Required fields: ```email``` ```password```

**Registration**
```js
POST ROOT_URL/register
```
Example request body:
```js
{
  "user":{
    "email": "test@example.com",
    "password": "test123"
  }
}
```
Returns a User object with email & userId.
Required fields: ```email``` ```password```

**Get Current User**
```js
GET ROOT_URL/user
```
Authentication required, returns a User object with email & userId.

**Get List Of All Members**
```js
GET ROOT_URL/members
```
No authentication required, returns an array of object containing all members as objects of the array returned.

**Add New Member**
```js
POST ROOT_URL/addMember
```
Example request body:
```js
{
  "member":{
    "name": "test_name",
    "company": "test_company,
    "status": "test_status",
    "notes": "test_notes"
  }
}
```
Authentication required, returns the list of all members including the newly created member.
Required fields: ```name``` ```company``` ```status``` ```notes```

**Delete Member**
```js
GET ROOT_URL/:id/delete // id = selected member id
```
Authentication required, returns the list of all members left after deleting the selected member.
