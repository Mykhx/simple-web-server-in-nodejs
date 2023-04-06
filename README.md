Just another basic web server using node.js for educational purposes in JS.

Reused a simple energy converter as a test webpage.

The server may be run in Docker/via Docker compose listening on port 8080 by default.
 
So far only GET requests are handled and the requested path needs to mirror the folder structure of the projects (following the "views" folder). While not ideal, this is ``good enough'' for this experiment. 

Requests are logged employing a basic event logger. The logger is currently injected into instances of the web server, which should be changed in further updates.

Docker containers are supported, where the logs are bound by default to a docker volume.

Supported file-formats:
- svg+xml,png,jpg (binary)
- css,html,js (text)
