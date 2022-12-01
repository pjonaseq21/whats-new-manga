const express = require("express")
const app = express()
const session = require('express-session');
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set("view engine", 'ejs')
app.use(express.static(__dirname+'/public'));

app.get("/",(req,res)=>{
    request("https://readberserk.com/",function test(error,response){
        let data = new JSDOM(response.body)

        let title = data.window.document.querySelector('#content > div > div.col-md-8 > div.row.mb-3 > div:nth-child(3) > div > div > h5').innerHTML
        let href = data.window.document.querySelector('#content > div > div.col-md-8 > div.row.mb-3 > div:nth-child(3) > div > div > a').href
        
        res.render("index.ejs",{title:title,href:href})

    })

})

app.listen(8000)