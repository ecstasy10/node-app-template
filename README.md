# node-app-template
This project is a template for a NodeJs + VueJs app

## Initialization
1. Replace [PROJECT_NAME] with your project name in all project.
2. Review docker-compose file to match your own requirements.
3. Run ```docker-compose up -d```.
4. Create the DB inside PostgreSQL, you have the connection credentials for db in ```server/.env``` file.
5. Now you can run the server with the script inside the package.json ```start:nodemon:local```.
6. You need to populate some tables in DB:
   1. Create a profile (ex: admin). 
   2. Create a role (ex: admin). 
   3. Add the role to the profile on the profile_role table.
   4. Create a permission (ex: admin). 
   5. Add the permission to the role on the role_permission table.
7. Now that your server is up and running, you can run the front-end app with the script inside the front-end package.json ```dev```;
