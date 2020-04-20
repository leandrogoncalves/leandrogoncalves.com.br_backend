let express = require("express");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY_SENDGRID);
let router = express.Router();

router.post("/send", async (req, res, next) => {
    try {
      const { to, subject, from, text, html } = req.body;
      const msg = {
        to,
        from,
        subject,
        text,
        html
      };

      sgMail.send(msg).then((res)=>{
          console.log('res:', res);
      })
      .catch((err)=>{
          console.log('err: ', err);
      });
          
      
      res.json({});
    } catch (ex) {
      res.json(ex);
    }
  });
  
  module.exports = router;