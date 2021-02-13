// const { builtinModules } = require('module')
const request = require('request')
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibm9hLXBlcnNvbjk5OSIsImEiOiJja2pnN3hwY2ozMWx2MnBydXF3bDlhNHNqIn0.LZ3qtu4uYFjl-ssil2ejaA&limit=1'
    //request({ url: url, json: true }, (error, { body }) => {
    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('unable to connect to the location service', undefined)
            console.log('Error: ' + error)
            //  console.log(url)

        }
        else if ((body) && (body.features.length === 0)) {
            callback('Unable tp find location. Try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode
