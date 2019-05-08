/**
* @Developed by @ArihantBhugari
*/

const { get, set, getMatchedKeys } = require('../queryToRedis');
const message = require('../utils/enum');



class getFromCart {

    constructor(body, headers) {
        this.body = body;
        this.headers = headers
    }


    get() {
        var response = {};
        var cartInfo = this.body;
        return new Promise((resolve, reject) => {
            return this.getFromRedisCache(cartInfo, response, resolve, reject);
        })

    }

    getFromRedisCache(cartInfo,response,resolve,reject){
        response.cartValue = [];
        var uuid = `product${cartInfo.clientName}*`;
        getMatchedKeys('CART_DB',uuid).then( keys=>{
            if(keys.length > 0) {
               keys.forEach(async key => {
                    await get('CART_DB',key).then( result=>{
                        response.cartValue.push(result)
                    })
                });
                
                return resolve(response)
            }
        }).catch(err=>{
            response.errors = err
            return resolve(response)
        })
            
    }
}

module.exports = getFromCart;