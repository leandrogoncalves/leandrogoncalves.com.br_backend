const express = require("express");
const axios = require("axios");
const apiKey = process.env.EMAIL_API_KEY;
const apiUrl = process.env.EMAIL_API_URL;
const router = express.Router();

router.post("/send", async (req, res, next) => {
    try {
      const { to, subject, from, text, html } = req.body;
      const data = {
        "Recipients": {
          "To": [
            to
          ]
        },
        "Content": {
          "Body": [
            {
              "ContentType": "HTML",
              "Content": html ? html : text,
              "Charset": "utf-8"
            }
          ],
          "From": `Contato via site <${from}>`,
          "ReplyTo": `Contato via site <${from}>`,
          "Subject": subject
        }
      };

      const headers = {
        'Content-Type': 'application/json',
        'X-ElasticEmail-ApiKey': apiKey
      }

      axios.post(apiUrl,data,{headers:headers})
      .then((res)=>{
          console.log('response success\n');
          //console.log(res);
      })
      .catch((err)=>{
          console.log('error to send e-mail:\n');
          console.log(err);
      });
          
      
      res.json({});
    } catch (ex) {
      res.json(ex);
    }
  });
  
  module.exports = router;