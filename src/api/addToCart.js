/**
* @Developed by @ArihantBhugari
*/

const { get, set } = require('../queryToRedis');
const message = require('../utils/enum');
const randtoken = require('rand-token');



class AddToCart {

    constructor(body, headers) {
        this.body = body;
        this.headers = headers
    }


    add() {
        var response = {};
        var cartBody = this.body;
        return new Promise((resolve, reject) => {
            return this.setToRedisCache(cartBody, response, resolve, reject);
        })

    }

    setToRedisCache(cartBody,response,resolve,reject){
        var uuid = `product${cartBody.clientName}${randtoken.generate(5,'abcdefg123')}`;
        set('CART_DB',uuid,JSON.stringify(cartBody)).then(result=>{
            response.status = result.status;
            return resolve(response)
        })
    }

    failureHandler(response, reject) {
        response.responseTimestamp = new Date();
        response.result = 'Failed';
        return reject(response);
    }
}

module.exports = AddToCart;