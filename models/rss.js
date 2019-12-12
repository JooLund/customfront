const request = require("request");
const xml2js = require("xml2js");

let getNews = (url) => {

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

                            for (i = 0; i < result.rss.channel[0].item.length; i++) {

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

                                        let date = `${dd}.${mm}`;
                                        return date; 

                                    }else{
                                        let date = `undefined`
                                        return date;
                                    }
                                }


                                let formatTime = () => {
                                    
                                    if(rss.pubDate[0] != undefined){
                                    
                                        let d = new Date(timestamp*1000);       
                                            hh = d.getHours();
                                            min = ('0' + d.getMinutes()).slice(-2);  

                                        let time = `${hh}.${min}`;
                                        return time; 

                                    }else{
                                        let time = `undefined`
                                        return time;
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

                            let newsSingle = {
                                            "date" : formatDate(),
                                            "time" : formatTime(),
                                            "title" : rss.title[0],
                                            "desc" : rss.description[0],
                                            "link" : rss.link[0],
                                            "img" : getImage(),
                                            "source" : findSource()
                                        };

                            newsCombined.push(newsSingle);

                            }
                        
                        resolve(newsCombined);
                          
                    }
                });              
            }
        });
    });
}




module.exports = {

    "exportNews" : (data, callback) => {

        let settings = data;
        let urls = [];
        let loadNews = false;
        let limit = settings.limit;

        if(settings.newsYle === true){
            urls.push('https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET');
            loadNews = true;
        }
        if(settings.newsHs === true){
            urls.push('https://www.hs.fi/rss/tuoreimmat.xml');
            loadNews = true;
        }
        if(settings.newsIl === true){
            urls.push('https://www.iltalehti.fi/rss.xml');
            loadNews = true;
        }

        if(loadNews === false){
            
            return callback(null, loadNews);

        }else{

            let combineNews = [];

            urls.forEach((url) =>{

                combineNews.push(getNews(url));
                
            });

                Promise.all(combineNews).then((combinedNews) =>{

                    let merge = [].concat.apply([], combinedNews);

                    merge.sort((b, a) => a.date - b.date || a.time - b.time);

                    if (merge.length > limit){
                        merge.length = limit;
                    } 

                    callback( null, merge);              

                }).catch((error) => {

                    callback(error, null);

                });
        }
    }

}
