var express = require('express');
var router = express.Router();
var cryptor = require('../cryptor/cryptor');
/* GET home page. */
/**
 * This function comment is parsed by doctrine
 * @route GET /api
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/', function(req, res, next) {

  var publickey = `-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJTSChtSwc2PqTFSskRqd50jYJv\nN9diK\n+pUajbwLYSx3/H3tTbazrvC3NGwMzl44qjssjjzLuvVKg0MPe1LVfxkCAwEAAQ==\n-----END PUBLIC KEY-----`;

  var pw= "abc123";
  var encrypted = cryptor.encryptWithRSAPublicKey(pw);
  console.log("Encrypted: " + cryptor.encryptWithRSAPublicKey(pw) + "\n");
  console.log("Decrypted: " + cryptor.decryptWithRSAPrivateKey(encrypted) + "\n");
  // console.log("String before encrypt: " + pw + "\n");
  // var buffer = Buffer.from(pw);
  // var encryptedStr = crypto.publicEncrypt({key:publickey, padding:crypto.constants.RSA_PKCS1_PADDING},buffer);
  // //var encryptedStr = "jbj9E15VvPCosU2AHFesy85MHPY/vj+fzsWrfn6MmdkaIXpjVW392PpQpFNigC4+BhLDEP6ESyFm0g+aPKo5lg==";
  // //console.log(encryptedStr.toString("base64"));
  // console.log("Result after encrytion: " + encryptedStr.toString("base64")+ "\n");
  // var privatekey = `-----BEGIN PRIVATE KEY-----\nMIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAlNIKG1LBzY+pMVKy\nRGp3nSNgm8312Ir6lRqNvAthLHf8fe1NtrOu8Lc0bAzOXjiqOyyOPMu69UqDQw97\nUtV/GQIDAQABAkBuZz/eM0/ZWulu0OW1QbLJHZSvIWVwJvJtKQza4ypM3PiilSj7\nTxRaAYTTpmWdjatPL1P3Zuw4vRSmpcC+4WINAiEAzl64R4ePcP5pO9pN6c6bcVHS\n2iehNIu2192Ow7F1RssCIQC4nEBtFYD9M8qax9NjximazUr29zIkDlHvDwghsElx\nKwIhAMOM48f7/4NNwEAT86JqwcbWhxtrVAkrnv3cFwz+mieTAiBDyo0WAamGUXh6\n8ho8L06j2/NFUW0GNIP952UzCctOVQIgFi1gbolMBceBDX46tfmZOpGXxSao5z++\nMuByij7e/kk=\n-----END PRIVATE KEY-----
  // `;
  // var decryptbuff = Buffer.from(encryptedStr,"base64");
  // var decryptedStr = crypto.privateDecrypt({key:privatekey,padding: crypto.constants.RSA_PKCS1_PADDING},decryptbuff);
  // console.log("String after decrypt with private key: " + decryptedStr.toString("utf8") + "\n");
  res.send("Encrypted: " + cryptor.encryptWithRSAPublicKey(pw) + "- Decrypted: " + cryptor.decryptWithRSAPrivateKey(encrypted));
//  res.render('index', { title: 'Express' });
});
module.exports = router;
