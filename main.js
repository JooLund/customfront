const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const port = process.env.PORT || 3005;

const cors = require('cors');


app.use(cors());


app.use(bodyParser.json());


//Routing
app.use('/api', routes);



app.listen(port, () => {

    console.log(`Server started at: ${port}`);

});