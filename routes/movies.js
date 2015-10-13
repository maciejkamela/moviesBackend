var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
/**
 * Get all movies or some certain movie
 */
router.get('/movies', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var movies = req.db.get('movies'),
        query = req.query;

    // convert year parameter string to int if it exists
    if (query.hasOwnProperty("year")) {
        query["year"] = parseInt(query.year);
    }
    movies.find(query, function (err, docs) {
        res.json({length: docs.length, records: docs});
    });
});


/**
 * POST method for inserting new movies
 */
router.post('/addmovie', function (req, res) {

    // Set our internal DB variable
    var db = req.db,

    // Get our form values. These rely on the "name" attributes
        newTitle = req.body.title,
        newDirector = req.body.director,
        newGenre = req.body.genre,
        newProduction = req.body.production,
        newYear = req.body.year,
        newTrailer = req.body.trailer,
        newPoster = req.body.poster,
        newBoxofficeInDollars = req.body.boxofficeInDollars,
        newMainRoles = [
            {
                "newFirstName": req.body.mainRoles[0].firstName,
                "newLastName": req.body.mainRoles[0].lastName
            },
            {
                "newFirstName": req.body.mainRoles[1].firstName,
                "newLastName": req.body.mainRoles[1].lastName
            }
        ],
    oscarsAmount = req.body.oscars;
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
            res.json({message: 'New movie has been created'});
        }
    });
});

/**
 * PUT
 */

router.put(function (req, res) {
    var movies = req.db.get('movies');
    movies.find()
});

module.exports = router;
