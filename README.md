Fetch the geo location of an IP address, IP6 and host name.


```js
npm install ip-to-location --save
```


```js
var ip2location = require('ip-to-location');

ip2location.fetch('209.58.139.51', function(err, res){
    console.log(res);
    //  { 
    //     ip: '209.58.139.51',
    //     country_code: 'US',
    //     country_name: 'United States',
    //     region_code: 'CA',
    //     region_name: 'California',
    //     city: 'San Jose',
    //     zip_code: '95131',
    //     time_zone: 'America/Los_Angeles',
    //     latitude: 37.3874,
    //     longitude: -121.9024,
    //     metro_code: 807 
    // }
})

```

```js
ip2location.fetch('209.58.139.51').then(res => {
    console.log(res);
});
```