const restify = require("restify-clients");


let apiUrl = 'https://api.openweathermap.org';

    client = restify.createJsonClient({
        "url" : apiUrl,
        retry: {
            'retries': 0
        },
        agent: false

    });



    module.exports = {
    

        "haeSaa" : (paikkak) => {


            return new Promise((resolve, reject) => {


                client.get(`/data/2.5/weather?q=${paikkak}&units=metric&lang=fi&APPID=276e6a9c509a91607ffec6f737b0ea54`, (err, _req, _res, data) =>  {

                    if(!err){

                        let tulos = data;

                        let saaObjekti = [];


                            let paivitetty = tulos.dt*1000;
                            let auringonnousu = tulos.sys.sunrise*1000;
                            let auringonlasku = tulos.sys.sunset*1000;


                            let muutaKellonajaksi = (aikaleima) => {

                                let paivays = new Date(aikaleima);
                                    hh = paivays.getHours();
                                    min = ('0' + paivays.getMinutes()).slice(-2);                                   
                                    aika = `${hh}:${min}`;
                                return aika;
                            }



                            let saa = {
                                        'ikoni' : `http://openweathermap.org/img/w/${tulos.weather[0].icon}.png`,
                                        'kuvaus' : tulos.weather[0].description,
                                        'lampotila' : tulos.main.temp,
                                        'ilmanpaine' : tulos.main.pressure,
                                        'kosteus' : tulos.main.humidity,
                                        'tuuli' : tulos.wind.speed,
                                        'paivitetty' : muutaKellonajaksi(paivitetty),
                                        'auringonnousu' : muutaKellonajaksi(auringonnousu),
                                        'auringonlasku' : muutaKellonajaksi(auringonlasku),
                                        'sijainti' : tulos.name

                                      }

                            saaObjekti.push(saa);
                            resolve(saaObjekti);

                    }else{
                        reject(err);
                        console.log(err);
                    }
                });
            });
        },

        "haeEnnuste" : (paikkak) => {

            return new Promise((resolve, reject) => {


                client.get(`/data/2.5/forecast?q=${paikkak}&units=metric&lang=fi&APPID=276e6a9c509a91607ffec6f737b0ea54`, (err, _req, _res, data) =>  {               
                    if(!err){

                    let tulokset = [];
                    tulokset.push(data);

                    let aputulokset = [];

                    let saaEnnuste = [];


                            let i;
                            for (i = 0; i < tulokset[0].cnt; i++) { 
                                if(tulokset[0].list[i].dt_txt.match(/12:00:00/)){
                                    aputulokset.push(tulokset[0].list[i]);
                                }
                            }


                    let j;

                    for(j = 0; j < aputulokset.length; j++){



                        let muutaPaivays = (aikaleima) => {

                            let d = new Date(aikaleima*1000);
                            
                            yyyy = d.getFullYear();
                            mm = ('0' + (d.getMonth() + 1)).slice(-2);
                            dd = ('0' + d.getDate()).slice(-2);         
                            hh = d.getHours();
                            min = ('0' + d.getMinutes()).slice(-2);                         



                            paivays = `${dd}.${mm}.${yyyy} ${hh}.${min}`;
                            return paivays;

                        }

                        let ennuste = {
                                        'ikoni' : `http://openweathermap.org/img/w/${aputulokset[j].weather[0].icon}.png`,
                                        'kuvaus' : aputulokset[j].weather[0].description,
                                        'lampotila' : aputulokset[j].main.temp,
                                        'ilmanpaine' : aputulokset[j].main.pressure,
                                        'kosteus' : aputulokset[j].main.humidity,
                                        'tuuli' : aputulokset[j].wind.speed,
                                        'paivays' : muutaPaivays(aputulokset[j].dt)
                                      }

                        saaEnnuste.push(ennuste);
                    }

                    resolve(saaEnnuste);

                }else{

                    reject(err);

                }
                });

            });

        }
    }