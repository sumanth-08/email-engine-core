# Email Engine Core

Email Synchronization with Elasticsearch and Microsoft Graph API

## Description
This project is a Node.js-based server application that integrates with Microsoft Graph API to fetch and synchronize emails. The data is stored in an Elasticsearch database, enabling efficient search and retrieval. User authentication is handled using OAuth with Outlook integration.


## Technologies Used
- **Node.js**
- **Elasticsearch**
- **Microsoft Graph API**
- **OAuth 2.0**
- **Docker**

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/sumanth-08/email-engine-core.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start Elasticsearch using Docker Compose:
   ```
   docker-compose up -d
   ```

4. Verify Elasticsearch is running:
   ```
   curl -X GET "localhost:9200/_cat/health"
   ```

5. Start the server:
   ```
   npm start
   ```
   or
   ```
   npx nodemon
   ```

   once after this will get to seen log message like
   ```
   Server listening on the port 8989
   Database Connected Successfully
   ```

## Usage
- Base URL `http://localhost:8989`

## API Endpoints
1. **POST** `/api/create/user/`
User to create account with `name`, `email` and `password`.

2. **POST** `/api/user/signin`
- Sign with account with previously created credentials `email` and `password`
- In response will get to see `access_token` 

3. **GET** `/api/email/login`
- This API initiates the OAuth login process
- In respone will get login link
- Click on that link and redirect to the Microsoft login page then give credentials and will get to see the redirect URL 
- From the redirection URL copy the `code`
- The `code` will looks like `M.C510_SN1.2.U.0805a538-402d-1fdb-b3xx-xxxxxxxxxxxx`

4. **GET** `/api/email/redirect?code=M.C510_SN1.2.U.0805a538-402d-1fdb-b3xx-xxxxxxxxxxxx`
- Handles OAuth callback
- In response will get to see `accessToken`

5. **GET** `api/fetch/email`
- Sync emails
- In `Authorization` pass the `accessToken` as `Bearer Token` 
- And in headers pass the `access_token` (it's from signin API)

6. **GET** `api/user/messages/list`
- This API will list the user email data from the elasticsearch `usersmails` index
- Need to pass the `access_token` in the header

7. **GET** `/api/user/mailbox/list`
- This API will list the mailbox data from elasticsearch `usermailbox` index 
- Need to pass the `access_token` in the header

To check the active Indices 
```
curl -X GET "localhost:9200/_cat/indices"
```

For more please fnd the postman collection `postman_collection.json` file

## Contact
For questions or support, please contact mrsumanth1947@gmail.com.
