var client = require('../../config/redisConfig');
var enums = require('../utils/enum')



const get = (db, key) => {
    return new Promise(resolve=>{
        client.select(enums[db], (err, db) => {
            if (err) {
                result.errors = [err]
                result.status = 'Failed'
                return resolve(result)
            }
            client.get(key, (err, getdata) => {
                if (err) {
                    console.log('GET_Error', err);
                    result.errors = [err]
                    result.status = 'Failed'
                    return resolve(result)
                }
                var data = JSON.parse(getdata);
                return resolve(data)
            })
        })
    })
}

const set = (db, key, value) => {
    var result = { "status": "Success" };
    return new Promise((resolve) => {
        client.select(enums[db], (err, db) => {
            if (err) {
                result.errors = [err]
                result.status = 'Failed'
                return resolve(result)
            }
            client.set(key, value);
            return resolve(result);

        })
    })
}

const getMatchedKeys = (db,key) => {
    return new Promise((resolve,reject)=>{
        client.select(enums[db], (err, db) => {
            if (err) {
                return reject(err)
            }
        client.keys(key.toString(), (err, keys) => {
            if(err) return reject(err);
            return resolve(keys)
        })
    })
    })
}


module.exports = {
    get,
    set,
    getMatchedKeys
}