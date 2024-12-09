**FS CLIENT PORTAL**

**Authentication methods provided:**
1) Google OAuth : Used `react-oauth/google` npm react module ; Token verification done on backend using pip packages like `google-auth, google-auth-oauthlib, etc`
2) Azure OAuth : Used `azure/msal-browser` and `azure/msal-react` npm react modules ; Token verification done on backend using pip packages like `msal etc`

   Once token verification is successful, User will be created in our system

**Heimdal Customers data:**
1) To pull data of cutomers from Heimdal this is the API I used : https://rc-dashboard.heimdalsecurity.com/api/heimdalapi/customers?customerId={customer-id}
2) Full code to pull data is in `heimdal/customers_data_loader.py`
3) As per what I've understood from Heimdal UI, `RESELLER` type is MSP for us and `CORP` type is Client for us - so this is what you see in the code too, based on the type I find what the customer is
4) Heimdal APIs document if you want to refer - https://support.heimdalsecurity.com/hc/en-us/articles/360001462138-HEIMDAL-Security-APIs 

**After login of user, whatever APIs will be called, using JWT for those:**
1) I have kept all APIs that will return data to UI protected with `jwt_required` - code in `app/decorators.py`
2) Flow is - When a user logs in, JWT will be generated for him - code in `app/jwt.py`
3) The JWT will be sent to frontend - where it's stored in sessionstorage on browser - then this is sent in Authorization header while making API calls - In the react code `services/Authprovider` you can check that I have made all axios requests to send JWT auth header, you dont need to do it for every API call
4) Example of API returning data to UI - dashboarddata (all MSP and Client data shown on the dashboard)

**React**
1) Used `Material-UI`
2) MSSP will be able to see his MSPs and Clients. MSP will be able to see his Clients. Permission handled in backend. Only data that the user has access to comes from backend. View handled in frontend.
3) Admin Panel - given option to Invite MSP User - this form when submitted, will create record in `PreAssignedRole` - which stores role for an email (before the user logs in)

**Database**
1) Tables for User and Roles - `User, Role, UserRole, PreAssignedRole`
2) Other tables - `Product, Mssp, MsspProduct, Msp, Client`
3) Table/Model code in `models.py`
4) Crud/ORM kind of code in `services.py`
5) Custom functions, all other logic in `main.py` 

**Deployment**
1) Python3, Node20, PIP, NPM, PostgreSQL14, Nginx - I installed these on the server
2) Nginx config - `/etc/nginx/sites-available/fs-client-portal`
3) I'm using Gunicorn to run the Flask application, gunicorn config - `/etc/systemd/system/fs_client_portal.service` 
4) Flask `Gitlab-CI` will - `copy code to server, activate venv, install pip packages, do database migrations, restart fs_client_portal service`
5) React `Gitlab-CI` will - `copy code to server, install npm modules, do npm build, copy build to backend folder, restart fs_client_portal service`



