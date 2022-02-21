const req=require('request');
const cheerio=require('cheerio');
const Allmathcobj=require("./AllMatch");
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
req(url,cb);
function cb(err,response,html) {
    if(err)
    console.log(err);
    else{
        extractLink(html);
        //console.log(html);
    }
    
    
}
function extractLink(html)
{
    let $=cheerio.load(html);
    let anchor=$("a[data-hover='View All Results']");
    let link=anchor.attr('href');
    let fullLink='https://www.espncricinfo.com'+link
    //console.log(fullLink);
       Allmathcobj.gAlmatches(fullLink);
}