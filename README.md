# cartWishList-using-Redis
Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker

#REDIS

![Redis server](https://github.com/Arihantjain1/cartWishList-using-Redis/blob/master/test/redis.png)

##NPM INSTALL
```
npm install redis
```
###Redis Configuration
```
var redis = require('redis');
var redisConfig = {
  host: process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
  port: process.env.REDIS_PORT_6379_TCP_PORT || 6378
};
redis.createClient(redisConfig.port, redisConfig.host);
```