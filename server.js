const express = require("express");
const app = express();
const PORT =process.env.PORT || 8080;

let router = express.Router();

router.get('/',function(req,res){
 res.sendFile(__dirname + '/daw/index.html');
});
app.use(express.static(__dirname + '/daw'));
app.use('/',router);

app.listen(PORT,function(){
  console.log('Server is running at PORT:',PORT);
});
