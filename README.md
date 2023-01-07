# Algo space

## How to run app

### Firstly follow the instructions in README file placed in worker directory

### Then execute below command in current directory
```bash
docker-compose up --build
```

## Visit Frontend by clicking on the link below
[ALGO SPACE](http://localhost:3000/)

## After execution of this command service is available through
localhost:8080

## And Mysql is available through
localhost:3306

### You can get API documentation by clicking on the link below
[API documentation](http://localhost:8080/swagger-ui.html)

### If you want to run app locally in intellij execute below commands before start (it might take a while to start mysql, wait around 30 seconds)
```bash
docker run --name mysql -p 3306:3306 -e MYSQL_USER=algo_space -e MYSQL_ROOT_PASSWORD=pass -e MYSQL_PASSWORD=pass -e MYSQL_DATABASE=algo_space -d mysql:8.0.30
```
```bash
docker run --name redis -p 6379:6379 --network=bridge -d redis:6.2
```
#### After executing above command, you can get to mysql client by executing below command  
```bash
docker exec -it mysql mysql -ualgo_space -ppass
```

