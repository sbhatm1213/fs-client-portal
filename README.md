**FS CLIENT PORTAL**

**Authentication methods provided:**
1) Google OAuth : Used "react-oauth/google" npm react module ; Token verification done on backend using pip packages like "google-auth" "google-auth-oauthlib" etc
2) Azure OAuth : Used "azure/msal-browser" and "azure/msal-react" npm react modules ; Token verification done on backend using pip packages like "msal" etc

   Once token verification is successful, User will be created in our system

**Heimdal Customers data:**
1) To pull data of cutomers from Heimdal this is the API I used : https://rc-dashboard.heimdalsecurity.com/api/heimdalapi/customers?customerId={customer-id}
2) Full code to pull data is in `heimdal/customers_data_loader.py`
3) As per what I've understood from Heimdal UI, "RESELLER" type is MSP for us and "CORP" type is Client for us - so this is what you see in the code too, based on the type I find what the customer is

**JWT for all APIs used after login of a user**
1) I have kept all APIs that will return data to UI protected with "jwt_required" - code in `app/decorators.py`
2) Flow is - When a user logs in, JWT will be generated for him - code in `app/jwt.py`
3) The JWT will be sent to frontend - where it's stored in sessionstorage on browser - then this is sent in Authorization header while making API calls - In the react code `services/Authprovider`you can check that I have made all axios requests to send JWT auth header, you dont need to do it for every API call
4) Example of API returning data to UI - dashboarddata (all MSP and Client data shown on the dashboard)







