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
    
async function GetchainsawMan(){ 
        return new Promise((resolve,reject)=>{
          request("https://www.chainsaw-man-manga.online/",function test2(error,response){
            let data = new JSDOM(response.body);
            let title2 = data.window.document.querySelector('#ceo_latest_comics_widget-3 > ul > li:nth-child(1) > a').innerHTML;
            let href = data.window.document.querySelector("#menu-item-1867 > a").href;
            resolve({title2,href});
        })
        })
             
  
  }
async function getData() {
        return new Promise((resolve, reject) => {
          request("https://readberserk.com/", (error, response) => {
            let data = new JSDOM(response.body);
            let title = data.window.document.querySelector(
              "#content > div > div.col-md-8 > div.row.mb-3 > div:nth-child(3) > div > div > h5"
            ).innerHTML;
            let href = data.window.document.querySelector(
              "#content > div > div.col-md-8 > div.row.mb-3 > div:nth-child(3) > div > div > a"
            ).href;
            resolve({ title, href });
          });
        });
      }
      
      (async() => {
        let databerserk = await getData();
        let datachain = await GetchainsawMan();
        console.log(databerserk, datachain);
        res.render("index.ejs",{data:databerserk,dataChainsawMan: datachain})
      })();


})

app.listen(8000)