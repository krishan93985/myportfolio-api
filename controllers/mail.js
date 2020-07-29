const sendMail = (req,res,nodemailer,nodemailMailGun) =>  {
    
    const { name,email,message } = req.body;
    if(!name || !email || !message)
       res.json(false)

    const auth = {
        auth:{
            api_key: process.env.API_KEY,
            domain: process.env.DOMAIN
        }
    }   

    var mailOptions = {
        from: `${name} <${email}>`,
        to: process.env.RECEPIENT,
        subject: 'Portfolio contact',
        text: message,
        html: 'Message from: ' + name + '<br></br> Email: ' +  email + '<br></br> Message: ' + req.body.message,
    };

    var transporter = nodemailer.createTransport(nodemailMailGun(auth));

    transporter.sendMail(mailOptions, (err,resp) => {
        if(err){
        res.send(false); console.log(err)}
        else
        res.json("mail sent!!");
    })
}

module.exports = {
    sendMail
}