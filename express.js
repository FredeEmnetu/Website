let express = require('express');
const model = require('./model/showtimes_model.js');
let app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get("/showtimes_api", function(request, response){
    // response.send("hello");
    
    model.MovieSchema.find(request.query).then(function (result) {
        response.send(result);
    });
    
});

app.set('port', process.env.PORT || 5500);
app.listen(app.get('port'), function() {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});

