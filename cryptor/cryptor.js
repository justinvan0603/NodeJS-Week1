var crypto = require("crypto");

const publickey = `-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJTSChtSwc2PqTFSskRqd50jYJv\nN9diK\n+pUajbwLYSx3/H3tTbazrvC3NGwMzl44qjssjjzLuvVKg0MPe1LVfxkCAwEAAQ==\n-----END PUBLIC KEY-----`;
const privatekey = `-----BEGIN PRIVATE KEY-----\nMIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAlNIKG1LBzY+pMVKy\nRGp3nSNgm8312Ir6lRqNvAthLHf8fe1NtrOu8Lc0bAzOXjiqOyyOPMu69UqDQw97\nUtV/GQIDAQABAkBuZz/eM0/ZWulu0OW1QbLJHZSvIWVwJvJtKQza4ypM3PiilSj7\nTxRaAYTTpmWdjatPL1P3Zuw4vRSmpcC+4WINAiEAzl64R4ePcP5pO9pN6c6bcVHS\n2iehNIu2192Ow7F1RssCIQC4nEBtFYD9M8qax9NjximazUr29zIkDlHvDwghsElx\nKwIhAMOM48f7/4NNwEAT86JqwcbWhxtrVAkrnv3cFwz+mieTAiBDyo0WAamGUXh6\n8ho8L06j2/NFUW0GNIP952UzCctOVQIgFi1gbolMBceBDX46tfmZOpGXxSao5z++\nMuByij7e/kk=\n-----END PRIVATE KEY-----
  `;

var encryptWithPublicKey = function(message){
    var buffer = Buffer.from(message);
  var encryptedStr = crypto.publicEncrypt({key:publickey, padding:crypto.constants.RSA_PKCS1_PADDING},buffer);
  return encryptedStr.toString("base64");
}

var decryptWithPrivateKey = function(encrypted_message){
    var decryptbuff = Buffer.from(encrypted_message,"base64");
    var decryptedStr = crypto.privateDecrypt({key:privatekey,padding: crypto.constants.RSA_PKCS1_PADDING},decryptbuff); 
    return decryptedStr.toString("utf8");
}
module.exports={
    encryptWithRSAPublicKey: encryptWithPublicKey,
    decryptWithRSAPrivateKey : decryptWithPrivateKey
};