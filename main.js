'use strict'
var _ = require('util'),
    Wreck = require('wreck');


module.exports = {

    providers: [
        {
            name: 'freegeoip',
            api: 'https://freegeoip.net/json/%s'
        },
        {
            name: 'ip-api',
            api: 'http://ip-api.com/json/%s'
        },
        {
            name: 'keycdn',
            api: 'https://tools.keycdn.com/geo.json?host=%s'
        }

    ],
    try: function (i, ip, callback) {
        if (i > this.providers.length) {
            callback(new Error('All providers failed.'), null);
        }
        var $ = this;
        var p = this.providers[i];
        var uri = _.format(p.api, ip);
        Wreck.get(uri, { json: true }, function (err, res, body) {
            if (err || !body) {
                $.try(++i, ip, callback);
            } else {
                var data = {
                    status: false,
                    msg: 'This IP or Host can\'t search in database'
                };

                switch (p.name) {

                    case 'ip-api':
                        if (body.status === "success") {
                            data = {
                                country_code: body.countryCode,
                                country_name: body.country,
                                region_code: body.region,
                                region_name: body.regionName,
                                city: body.city,
                                isp: body.isp,
                                zip_code: body.zip,
                                time_zone: body.timezone,
                                latitude: body.lat,
                                longitude: body.lon
                            }
                        }


                        break;

                    case 'keycdn':
                        if (body.status === "success") {
                            body = body.data.geo;
                            data = {
                                country_code: body.country_code,
                                country_name: body.country_name,
                                region_code: body.region,
                                region_name: '',
                                city: body.city,
                                isp: body.isp,
                                zip_code: body.zip_code,
                                time_zone: body.timezone,
                                latitude: body.latitude,
                                longitude: body.longitude
                            }
                        }

                        break;

                    case 'freegeoip':
                    default:
                        data = body;
                        break;
                }

                callback(null, data);
            }

        });
    },

    fetch: function (ip, callback) {
        var $ = this;
        if (callback) {
            $.try(0, ip, callback);
        } else {
            return new Promise(function (resolve, reject) {
                $.try(0, ip, function (err, res) {
                    if (err) return reject(err)
                    else resolve(res)
                })
            });
        }

    }
}
