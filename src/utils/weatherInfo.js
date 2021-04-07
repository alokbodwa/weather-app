const request = require('request');

const weatherInfo = (data, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=6d54f837fa443d04f84cea6a4f423a7b&query='+ data.latitude+',' + data.longitude + '&units=m';
    request({ url: url, json: true }, (error, response) => {
            if(error){
                callback('can not connect to weather app services', undefined)
                // console.log('can not connect to weather app services');
            } else{
                const report = response.body.current; 
                callback(undefined,report);
            }
        })

}

module.exports = weatherInfo ;