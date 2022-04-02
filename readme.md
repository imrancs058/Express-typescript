## Setup database
There is .env.production.local file in the root directory.Which have database credentials in it.

Run command

`npm start`
It will create database and tables.
After that navigate to `src` folder and run

`sequelize db:seed:all`
It will create 2 users in the table that are below

`{
email : 'admin@xyz.com',
password : '#Admin123',
name : 'Admin Person',
role :'admin'
}`

`{
email : 'user@xyz.com',
password : '#Admin123',
name : 'User Person',
role : 'user'
}`


## Run App
`npm start`
<dl><dt>Login API (POST)</dt></dl>

`http://localhost:3000/login`
<dl><dt>Payload</dt></dl>
`{
"email": "user@xyz.com",
"password": "#Admin123"
}`

####After login you will get jwt token and you need to pass it in header in every request.

<dl><dt>Get All users(GET)</dt></dl>
`http://localhost:3000/users
<dl><dt>Get user By ID(GET)</dt></dl>
`http://localhost:3000/users/:id`
`http://localhost:3000/users/1`

<dl><dt>Add user(POST)</dt></dl>
`http://localhost:3000/users`
<dl><dt>Payload</dt></dl>
`{
  "email": "",
  "password": "",
  "name": "",
  "role": ""(admin or user)
}`
<dl><dt>Delete user(DELETE)</dt></dl>
`http://localhost:3000/users/:id`
`http://localhost:3000/users/1`

####Only admin can delete it

#Run Tests
`npm run test`


