# node-server-template
This NodeJS server serves as a template or reference to create your own project and as a means for me to show my knowledge and have a place to reference my work in the future. To understand how this works first start with the index.js file:

Besides importing express, path, cors, and other basic necesities; the first action taken is importing the env. The env can be loaded from a file or imported via docker/podman with environment declarations. Just below this you will see a second try/catch that checks the environment. Making sure certain variables are present and if they are not, either setting them to a default value or omitting them if not required. If a value is required and is not assigned the server will terminate.

After this we include our body parsers. At time of writing the only bodyParser supported is a JSON format parser. It is intended to add multer as a means to pass along files to the node server in the future.

Next is CORS. Note that if you plan to put this node server behind a path (not a separate domain name) and a reverse proxy, that disabling CORS is what is recommended to avoid conflicts. However, if not, then you should enable CORS via the environmet variables and be sure to add your intended frontend to list of ALLOWED_ORIGINS

Next will be AUTH. This has yet to be setup. It is planned to support no auth, basic-auth, jwt, keycloak/oidc (either separate or together), and a potential hybrid (with basic-auth) to start.

Next is the DATABASE. This area is not where the initial connection test is conducted, rather it is testing to see if the intended DB exists in /database folder. This should be caught in the check-env, but in case it is not, there is a fail safe here.

Next is the LOGGER. same as above, this does not test the LOGGER connection just yet and acts as a failsafe incase an invalid LOGGER is set and the check-env does not pick it up.

Next is Endpoints. This Node server uses modules in order to separate the endpoint declaration from the index.js . The intent is to minimise the size of the index.js and also allow the ability to potentially turn off/on endpoints depending on the environment config.

Next is actually serving the server. Either HTTP or HTTPS is supported. Not that if nothing is passed to the environment that HTTP will be the default. I usually go through a reverse proxy when serving HTTPS, but the option of HTTPS is given. Failsafes will be added incase there is an issue serving HTTPS.

Next is the STARTUP scripts. This is where initial connections are tested. It is also planned to add the capabiltiy to setup the Database as well as other services in the startup scripts (ex: adding a dashboard to opensearch or kibana)

# Database settings

At time of writing initial connections are setup for: Postgres, MySQL, MariaDB, SQLite, MongoDB, Elasticsearch, and Opensearch. Any of these services can be used, but none can be used at the same time as the primary database. The check-env will make sure that what is required to connect to the respective database is present before attempting. However the check-env does not check to make sure your authentication means will actually work. It is planned to add a means of starting up the Database with an initial user if using basic-auth or jwt. It is also intended to add some means of enabling certain services and editing the environment at some point in association with the database

# Logger settings

To be configured. Some initial connections are working, just not fully setup yet. It is planned to have this working to the requirements of STIG checklists I have worked with in the past.

# Dashboard settings

It is planned that if a LOGGER is being used that a DASHBOARD can be configured as well. Specifically Kibana or Opensearch tools will be supported.

# API Settings

It is planned to add certain APIs based off services that have been useful for me in the past. I will again be taking a module like approach with APIs. For instance, this server is a template so only a few general use APIs will be supported here. However, I will add the capability to clone some other modules into the /api folder for specific uses (Again things I've used in the past, but maybe not great for general use template things). APIs that I plan to have in the template (at time of writing) include: apache-tika and keycloak. It is important to note that apis for specific types of services (dashboards, databases, logging) will be in other directories