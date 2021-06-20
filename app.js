const { createPublicKey } = require('crypto');
const express = require('express');
const { createReadStream } = require('fs');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 8081;
const pug = require('pug');

app.set('view engine', 'pug') 

app.get('/genres', (req,res)=> {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=eb67e272f255d3da3750f358a3984a4b&language=en-US';
    axios.get(url)
    .then(function (response) {
        console.log(response.data);
    //   let genresList = [];
    //   for(let i = 0; i < response.data.genres.length; i++){
    //     genresList[i] = response.data.genres[i];
    //     console.log( response.data.genres[i].name);
    //   }
      res.render('genres',{genresList:response.data.genres});//{title: 'DynamicTitle',});
    })
    .catch(function (error) { 
      console.log(error);
    });
});

app.get('/contact', (req,res)=>{
    res.render('contact');
});
//const genreRouter = require('./routes/genreData');app.use('/genres/:id',genreRouter, id); //Middleware



/////////////////////////GENRE ID///////////////////////////////////////////////
app.get('/genres/:id', async(req,res)=> { 
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=eb67e272f255d3da3750f358a3984a4b&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_genres=" + req.params.id + "&with_watch_monetization_types=flatrate";
    console.log(url);
    axios.get(url)
    .then(function (response) {
        let data = response.data;
      //res.send(req.params.id);
       let movieList = [];
       for(let i = 0; i < data.results.length; i++){
        movieList[i] = {id: data.results[i].id ,title: data.results[i].title,  poster_path: data.results[i].poster_path} ;
        console.log(movieList[i].title + "::" + movieList[i].id + "::::" + movieList[i].poster_path);
    }       
      res.render('genreData',{movieList: movieList});
    })
    .catch(function (error) { 
      console.log(error);
    });
});

app.get('/', (req,res) => res.render('index')//res.sendFile(path.join(__dirname, '/index.html'))
);
app.listen(port, () => console.log("Its alive on localhost:" + port) );

