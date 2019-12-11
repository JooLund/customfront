const express = require('express');
const app = express();

const bodyParser = require('body-parser');


const routes = require('./routes/routes')
const port = process.env.PORT || 3005;

const cors = require('cors');



//app.use(cors());
app.use(cors({ origin:true, credentials:true }));


app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());
//Routing
app.use('/api', routes);



app.listen(port, () => {

    console.log(`Server started at: ${port}`);

});
