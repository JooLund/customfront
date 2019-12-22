const rss = require('../models/rss');


exports.getNews = (req, res) => {

    let settings = checkCookies(req, res);


    rss.exportNews(settings, (err,news) => {

        try{

            if(news === false){
                res.status(200).json([]);
            }else{
                res.json(news);
            }

        }catch(error){
            res.status(200).send(err);
        }
        
    });

}


const checkCookies = (req, res) => {

    if(req.cookies.settings){

        settings = JSON.parse(req.cookies.settings);
        return settings;

    }else{

        settings = {
            'location': 'Mikkeli',
            'weather': true,
            'forecast': true,
            'newsYle': true,
            'newsIl': false,
            'newsHs': false,
            'limit': 10
        }

        res.cookie('settings', JSON.stringify(settings), {maxAge: 5000000000});
        return settings;
    }

}
