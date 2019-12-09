const request = require("request");
const xml2js = require("xml2js");

let getNews = (url, limit) => {

    return new Promise((resolve, reject) => {

        request(url, (err, response) => {

            if (err) {
                reject("Connection error.");
            } else {

                let data = response.body;
                 
                xml2js.parseString(data, (err, result) => {

                    if (err) {
                        reject("Fetched data was not in XML-format.");
                    } else {

                        let newsCombined = [];

                        let i;                       

                            for (i = 0; i < limit; i++) { 

                                let rss =  result.rss.channel[0].item[i];
                                
                                let pubDate = new Date(rss.pubDate[0]);
                                let timestamp = pubDate.getTime()/1000;


                                let formatDate = () => {
                                    
                                    if(rss.pubDate[0] != undefined){
                                    
                                        let d = new Date(timestamp*1000);
                                            mm = ('0' + (d.getMonth() + 1)).slice(-2);
                                            dd = ('0' + d.getDate()).slice(-2);         
                                            hh = d.getHours();
                                            min = ('0' + d.getMinutes()).slice(-2);  

                                        date = `${dd}.${mm} klo ${hh}.${min}.`;
                                        return date; 

                                    }else{
                                        date = `No date.`
                                        return date;
                                    }
                                }


                                let getImage = () => {
                                    if(rss.enclosure == undefined){
                                        return "no_image"
                                    }else{
                                        return rss.enclosure[0].$.url
                                    }
                                }


                                let findSource = () => {

                                    if(result.rss.channel[0].link == "https://yle.fi/uutiset/"){
                                        source = "YLE";    
                                        return source;
                                    }
                                    else if(result.rss.channel[0].link == "https://www.hs.fi"){
                                        source = "HS";    
                                        return source;
                                    }
                                    else if(result.rss.channel[0].link == "https://www.iltalehti.fi/"){
                                        source = "IL";    
                                        return source;
                                    }
                                    else{
                                        source = "";
                                        return source;
                                    }

                                }

                            let uutinen = {
                                            "date" : formatDate(),
                                            "title" : rss.title[0],
                                            "desc" : rss.description[0],
                                            "link" : rss.link[0],
                                            "img" : getImage(),
                                            "source" : findSource()
                                        };

                            newsCombined.push(uutinen);

                            }
                        
                        resolve(newsCombined);
                          
                    }
                });              
            }
        });
    });
}





module.exports = {


    "exportNews" : (data, newsLimit, callback) => {

        let urls = data;

        let limit = () => { 

            if(urls.length == 3){
                return Math.ceil(newsLimit/3);
            }
            else if( urls.length == 2){
                return Math.ceil(newsLimit/2);
            }else{
                return newsLimit;
            }          
        }

        let combineNews = [];

        urls.forEach((url) =>{

            combineNews.push(getNews(url, limit()));
            
        });

            Promise.all(combineNews).then((combinedNews) =>{

                callback( null, combinedNews);              

            }).catch((error) => {

                callback(error, null);

            });
    
    }


}