const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.get('/colors', function(req, res) {
    res.send('This is another example API')
})

 router.get('/movies', function(req, res) {
    let movie = ["suryavanshi", "bahubali", "kgf ch-2", "shershah", "sardar udham"]
    res.send(movie)
 })

 router.get('/movies/:mex', function(req, res) {
     let movie = ["suryavanshi", "bahubali", "kgf ch-2", "shershah", "sardar udham"]
     let index = req.params.mex  
     let mIndex = movie[index]
     
     if (index > movie.length) {
         res.send("Invalid input")
     } else {
         res.send(movie[index])
     }
  })

  router.get('/films', function(req, res) {
    let film = [ {
        'id': 1,
        'name': 'The Shining'
        }, {
        'id': 2,
        'name': 'Incendies'
        }, {
        'id': 3,
        'name': 'Rang de Basanti'
        }, {
        'id': 4,
        'name': 'Finding Nemo'
        }]
    res.send(film)
 })

  router.get('/films/:fex', function(req, res) {
      let film = [ {
        'id': 1,
        'name': 'The Shining'
        }, {
        'id': 2,
        'name': 'Incendies'
        }, {
        'id': 3,
        'name': 'Rang de Basanti'
        }, {
        'id': 4,
        'name': 'Finding Nemo'
        }]
      let indexValue = req.params.fex
      let fIndex = film[indexValue]

      if (indexValue > film.length) {
        res.send("Invalid input")
    } else {
        res.send(film[indexValue])
    }
})


module.exports = router;