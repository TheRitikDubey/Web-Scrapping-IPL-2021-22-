const req=require('request');
const cheerio=require('cheerio');
//const { ps } = require('google-translate-api/languages');
const scoreCardobj=require("./scoreboard");
function getAllmatchLink(url)
{
    req(url,function(err,response,html){
        if(err)
        console.log(err);
        else{
            extractScoreLink(html)
        }
    });
}
function extractScoreLink(html)
{
    let $=cheerio.load(html);
    let scoreAnchor=$("a[data-hover='Scorecard']");
   
    for(let i=0;i<scoreAnchor.length;i++)
    {
        let scoreLink=$(scoreAnchor[i]).attr('href');
        let scoreFullLink="https://www.espncricinfo.com" + scoreLink;
        //console.log(scoreFullLink);
        scoreCardobj.ps(scoreFullLink);

    }

}
module.exports={
    gAlmatches: getAllmatchLink
}