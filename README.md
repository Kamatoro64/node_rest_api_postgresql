# Express server with Postgresql integration

## Getting Started

### Clone the repository and follow the instructions below:

Build the image for the node backend server. This step is required because the docker stack command build option is ignored when deploying a stack in swarm mode with a (version 3.7) compose file. The docker stack command accepts only pre-built images.

``` 
docker build -t zng/express-backend:1.0 .
```

### Initialise a Docker swarm

```
docker swarm init
```

### Deploy the service stack

```
docker stack deploy -c docker-compose.yml node-backend-postgres
```

### Check that the services are running and all replicas are started:

```
docker service ls
ID                  NAME                        MODE                REPLICAS            IMAGE                     PORTS
o2n0jell3rec        node-backend-postgres_app   replicated          10/10               zng/express-backend:1.0   *:3000->3000/tcp
9fs05f0cpekq        node-backend-postgres_db    replicated          1/1                 postgres:latest         
```

### Check the logs of he node replicas

```
docker service logs -f node-backend-postgres_app
node-backend-postgres_app.3.urs79rs0xf3e@docker-desktop     | Server is up and listening on port 3000...
node-backend-postgres_app.3.llgatltuuh4e@docker-desktop     | Server is up and listening on port 3000...
node-backend-postgres_app.7.nvl4x9hnueqq@docker-desktop     | Server is up and listening on port 3000...
node-backend-postgres_app.1.v4v0nh1xkbts@docker-desktop     | Server is up and listening on port 3000...
node-backend-postgres_app.4.i5psria1hu7v@docker-desktop     | Server is up and listening on port 3000...
```

## Have some fun with replicas

In a terminal window, run the following command to check the number of replicas every 0.5 seconds:

``` sh
while true; do docker service ls; sleep 0.5; done
```

In a second window, run the following command to start killing the node backend containers (replicas) randomly every 2 seconds and watch the replica count drop and recover due to the deployment's restart_policy!

``` sh
while true; do for container in $(docker ps | grep  "zng/express-backend"| awk '{print $1}'); do docker kill $container; sleep 2; done; done
```
