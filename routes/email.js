const express = require("express");
const axios = require("axios");
const Mailgun = require('mailgun.js');
const formData = require('form-data');
const mailgun = new Mailgun(formData);

const apiKey = process.env.EMAIL_API_KEY;
const apiUrl = process.env.EMAIL_API_URL;

const router = express.Router();

const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

const sendElasticEmail = async (req, res, next) => {
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
        console.log(res);
    })
    .catch((err)=>{
        console.log('error to send e-mail:\n');
        console.log(err);
    });
        
    
    res.json({});
  } catch (ex) {
    res.json(ex);
  }
}
  
router.post("/send",  async (req, res, next) => {
  try {
    const { to, subject, from, name, text, html } = req.body;
    const data = {
      from: `${name} <${from}>`,
      to: [to],
      subject: subject,
      text: text ? text : html,
      html: html
    };
    mg.messages.create('zappbot.net', data)
      .then(msg => console.log(msg))
      .catch(err => console.error(err));

    res.json({});
  } catch (ex) {
    res.json(ex);
  }
});

module.exports = router;