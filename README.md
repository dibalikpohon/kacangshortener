# kacangshortener
A server to make a shortlinks to websites.

# How to install
1. Clone this repo
2. Prepare a PostgreSQL database
3. Open this project
4. Run `npm i`
5. Create `.env` file in the root project with this format:
```
SVHOST=<An IP Address/hostname where you want to host>
SVPORT=<The Port where you bind the IP>

PGHOST=<Where PostgreSQL lives>
PGPORT=<Which port the PostgreSQL bound to>
PGUSER=<PostgreSQL Username>
PGPASSWORD=<PostgreSQL Password>
PGDATABASE=<PostgreSQL database>
```
6. Run `npm run migrate up`
7. Run `npm run start` to start hosting.

⚠️ You might want to remove line 14 on `server.js`
