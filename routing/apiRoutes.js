module.exports = function(app, bodyparser) { 
    
    var array = require('../app/data/friends.js')
    var arr = array.userArr;

    app.use(bodyparser.urlencoded({extended: true}));
    app.use(bodyparser.json()); 
    
    app.get("/api/friends", function(request, response) {
        response.json(array.userArr);
    });

    app.post("/api/friends", function(request, response) {
        var newUser = request.body;

        var userScore = 0;

        for (i = 0; i < newUser.scores.length; i++) {
            userScore += parseInt(newUser.scores[i]);
        }

        console.log(userScore);

        var userArray = [];

        arr.forEach(function(index) {
            var newScore = 0;
            for (i = 0; i < index.scores.length; i++) {
                newScore += parseInt(index.scores[i]);
            }
            newScore = Math.abs(userScore - newScore);
            userArray.push(newScore);
        });

        var matchScore = Math.min.apply(null, userArray);

        for (i = 0; i < arr.length; i++) {
            if (matchScore === userArray[i]) {
                response.send(arr[i]);
            }
        }

        console.log(userArray);
               
        //array.push2arr(newUser);
    });

}