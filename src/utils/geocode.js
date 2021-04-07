const request = require('request');

const geocode = (address, callback) => {
    const locationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3JhbG9rIiwiYSI6ImNrbW04MGxhYTFpaHYydms1Z3l1cnI2d2UifQ.T01i65rZ3Z78Rgg2H7j9ww&limit=1';

    // { body } = destructures response and stores the value of body(which is in our response object)
    request({ url: locationURL, json: true }, (error, { body }) => {
        if (error){
            callback('unable to connect', undefined);
        }
        else if(body.features.length === 0){
            callback('Unable to fetch the details from your data', undefined);
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
        
    })
}

module.exports = geocode;