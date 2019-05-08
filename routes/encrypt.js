var express= require('express');
var router = express.Router();
var cryptor = require('../cryptor/cryptor');

router.get('/',function(req,res){
    var encryptedStr = cryptor.encryptWithRSAPublicKey("abc");
    res.send("Result after encryption: " + encryptedStr.toString("base64"));
});
router.get('/decrypt/:id',function(req,res){
    var encryptedStr = req.params.id;
    var decryptedStr = cryptor.decryptWithRSAPrivateKey(encryptedStr);
    res.send("Result after decryption: " + decryptedStr);
});
module.exports = router;