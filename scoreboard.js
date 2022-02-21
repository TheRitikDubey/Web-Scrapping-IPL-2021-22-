const req=require('request');
const cheerio=require('cheerio');
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
function processScoerBoard()
{
    req(url,cb);
}

function cb(err,response,html) {
    if(err)
    console.log(err);
    else{
        extractHtml(html);
        //console.log(html);
    }
}
function extractHtml(html)
{
    let $=cheerio.load(html);
    ///venue=event,.description
    //date=.status-text span
    let d=$(".event,.description");
    let ans=$(".event .status-text ")
    //let result=$(".status-text span");
    let stringArr=d.text().split(",");
    let venue=stringArr[1].trim();
    let date=stringArr[2].trim();
    let result=ans.text();
    let innings=$(".card content-block match-scorecard-table,.Collapsible");
    let htmlstring="";
    for(let i=0;i<innings.length;i++)
    {
       // htmlstring+=$(innings[i]).html();
        let teamName=$(innings[i]).find("h5").text();
        teamName=teamName.split("INNINGS")[0].trim();
        let opponentidx=i==0?1:0;
        let opponentName=$(innings[opponentidx]).find("h5").text();
        opponentName=opponentName.split("INNINGS")[0].trim();
        console.log(" "); //for spacing so that we know this match is ended here
        console.log(`${venue}  ${date} ${teamName}  ${opponentName}  ${result} `);
        let cInnings=$(innings[i]);
        //console.log(opponentName);
        let allRows=cInnings.find(".table .batsman,tbody tr");
        for(let j=0;j<allRows.length;j++){
            let allCols=$(allRows[j]).find("td");
            let isWorthy=$(allCols[0]).hasClass("batsman-cell");
            if(isWorthy==true)
            {
                //console.log(allCols.text());
                //for printing the table for run name sr ball and everything
                let PlayerName=$(allCols[0]).text().trim();
                let Runs=$(allCols[2]).text().trim();
                let Balls=$(allCols[3]).text().trim();
                let four=$(allCols[5]).text().trim();
                let six=$(allCols[6]).text().trim();
                let SR=$(allCols[7]).text().trim();
                console.log(`${PlayerName} ${Runs} ${Balls} ${four} ${six} ${SR}`);
                 
            }
        }

    }
}
//Node module:
module.exports={
    ps:processScoerBoard
}