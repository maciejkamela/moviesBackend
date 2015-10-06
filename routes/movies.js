var express = require('express');
var router = express.Router();
/**
 * Get all movies
 */
router.get('/movies', function (req, res, next) {

    var movies = req.db.get('movies');
    movies.find({}, function (err, docs) {
        res.json({length: docs.length, records: docs});

    });
});
/**
 * GET new movies with title as a parameter
 */
router.get('/movies/:title', function (req, res, next) {

    var title = req.params.title;
console.log(title);
    var movies = req.db.get('movies');
    movies.find({title: title}, function (err, docs) {
        res.json({length: docs.length, records: docs});
    });
});

router.get('/:year', function (req, res, next) {

    var year = req.params.year;
    console.log(year);

    var movies = req.db.get('movies');
    movies.find({year: year}, function (err, docs) {
        res.json({length: docs.length, records: docs});
    });
});

/**
 * POST method for inserting new movies
 */
router.post('/addmovie', function (req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var newTitle = req.body.title;
    var newDirector = req.body.director;
    var newGenre = req.body.genre;
    var newProduction = req.body.production;
    var newYear = req.body.year;
    var newTrailer = req.body.trailer;
    var newPoster = req.body.poster;
    var newBoxofficeInDollars = req.body.boxofficeInDollars;
    var newMainRoles = [
        {
            "newFirstName" : req.body.mainRoles[0].firstName,
            "newLastName" : req.body.mainRoles[0].lastName
        },
        {
            "newFirstName" : req.body.mainRoles[1].firstName,
            "newLastName" : req.body.mainRoles[1].lastName
        }
    ];
    var oscarsAmount = req.body.oscars;
console.log(req.body.director, req.body.mainRoles[0].firstName);
// Set our collection
    var collection = db.get('movies');

// Submit to the DB
    collection.insert({
        "title": newTitle,
        "director": newDirector,
        "genre": newGenre,
        "production": newProduction,
        "year": newYear,
        "trailer": newTrailer,
        "poster": newPoster,
        "boxofficeInDollars": newBoxofficeInDollars,
        "mainRoles": [
            {
                "firstName": newMainRoles[0].newFirstName,
                "lastName": newMainRoles[0].newLastName
            },
            {
                "firstName": newMainRoles[1].newFirstName,
                "lastName": newMainRoles[1].newLastName
            }
        ],
        "oscars": oscarsAmount
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            //res.redirect("movies");
            res.json({ message: 'New movie has been created' });
        }
    });
});

/**
 * PUT
 */

router.put(function(req, res) {
    var movies = req.db.get('movies');
    movies.find()
});

module.exports = router;
