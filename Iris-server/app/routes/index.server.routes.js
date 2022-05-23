const index = require('../controllers/index.server.controller')
const userInput = require('../controllers/userinput.server.controller')
var cors = require('cors')

module.exports = function(app){
    app.use(cors())
    app.get('/',function(req,res){
        res.render('index',{
            info:"see the results in console window"
        })
    })
    app.get('/run', index.trainAndPredict);
    app.post('/userInput', userInput.trainAndPredict);
}