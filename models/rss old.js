const request = require("request");
const xml2js = require("xml2js");

let haeUutiset = (url, rajaus) => {

    return new Promise((resolve, reject) => {

        request(url, (err, response) => {

            if (err) {

                reject("Palvelimeen ei saada yhteyttä");

            } else {

                let data = response.body;
                 

                xml2js.parseString(data, (err, result) => {

                    if (err) {

                        reject("Haettu data ei ole xml-muodossa.");

                    } else {

                        let kaikkiUutiset = [];

                        let i;                       

                            for (i = 0; i < rajaus; i++) { 

                                let rss =  result.rss.channel[0].item[i];
                                
                                let muutettuaika = new Date(rss.pubDate[0]);
                                let aikaleima = muutettuaika.getTime()/1000;

                                let muutaPaivays = () => {
                                    
                                    if(rss.pubDate[0] != undefined){

                                    
                                    let d = new Date(aikaleima*1000);
                                    mm = ('0' + (d.getMonth() + 1)).slice(-2);
                                    dd = ('0' + d.getDate()).slice(-2);         
                                    hh = d.getHours();
                                    min = ('0' + d.getMinutes()).slice(-2);                       
        
                                    paivays = `${dd}.${mm} klo ${hh}.${min}.`;
                                    return paivays; 
                                    }else{
                                        paivays = `Ei julkaisuaikaa.`
                                        return paivays;
                                    }
                                }


                                let testaaKuva = () => {
                                    if(rss.enclosure == undefined){
                                        return "/img/eikuvaa.png"
                                    }else{
                                        return rss.enclosure[0].$.url
                                    }
                                }



                                let testaaLahde = () => {

                                    if(result.rss.channel[0].link == "https://yle.fi/uutiset/"){
                                        lahde = "YLE";    
                                        return lahde;
                                    }
                                    else if(result.rss.channel[0].link == "https://www.hs.fi"){
                                        lahde = "HS";    
                                        return lahde;
                                    }
                                    else if(result.rss.channel[0].link == "https://www.iltalehti.fi/"){
                                        lahde = "IL";    
                                        return lahde;
                                    }
                                    else{
                                        lahde = "";
                                        return lahde;
                                    }

                                }

                            let uutinen = {
                                            "date" : muutaPaivays(),
                                            "title" : rss.title[0],
                                            "desc" : rss.description[0],
                                            "link" : rss.link[0],
                                            "img" : testaaKuva(),
                                            "source" : testaaLahde()
                                        };

                            kaikkiUutiset.push(uutinen);

                            }
                        
                        resolve(kaikkiUutiset);
                          
                    }
                });              
            }
        });
    });
}





module.exports = {


    "uutisetKaikki" : (data, uutisrajaus, callback) => {

        let urlit = data;

        let rajaus = () => { 

            if(urlit.length == 3){
                return Math.ceil(uutisrajaus/3);
            }
            else if( urlit.length == 2){
                return Math.ceil(uutisrajaus/2);
            }else{
                return uutisrajaus;
            }          
        }

        let yhdistaUutiset = [];

        urlit.forEach((url) =>{

            yhdistaUutiset.push(haeUutiset(url, rajaus()));
            
        });

            Promise.all(yhdistaUutiset).then((yhdistetytUutiset) =>{

                callback( null, yhdistetytUutiset);              

            }).catch((virhe) => {

                callback(virhe, null);

            });
    
    }


}