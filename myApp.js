const express = require('express');
const app = express();
const helmet = require('helmet');

//app.use(helmet.hidePoweredBy());
//app.use(helmet.frameguard({action: 'deny'}));
//app.use(helmet.xssFilter());
//app.use(helmet.noSniff());
//app.use(helmet.ieNoOpen());

ninetyDaysInSeconds = 90*24*60*60
//app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}));


// disable DNS prefetching
//app.use(helmet.dnsPrefetchControl());


// disable caching on client’s browser
app.use(helmet.noCache());

// setting and configuring a Content Security Policy
directives = {defaultSrc: ["'self'"], scriptSrc: ["'self'", 'trusted-cdn.com']}
//app.use(helmet.contentSecurityPolicy({directives: directives}));


app.use(helmet({
    frameguard: {         // configure
    action: 'deny'
  },
    contentSecurityPolicy: {directives: directives},
    hsts: {maxAge: ninetyDaysInSeconds, force: true}
    
}));






































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
