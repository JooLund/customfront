const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const routes = require('./routes/routes')
const port = process.env.PORT || 3005;


app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Routing
app.use('/api', routes);

if(process.env.NODE_ENV === 'production'){

    // Set static folder
    app.use(express.static('clientapp/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

app.listen(port, () => {

    console.log(`Server started at: ${port}`);

});
