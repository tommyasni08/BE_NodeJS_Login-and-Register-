# User Login and Register Page with OAuth
Integration of OAuth to User Login and Register Rest API

## OAuth Google
- Go to Google Developer Console
- Create new project (OAuth Tutorial)
- Setup configure consent screen (external) and creadentials (OAuth Client ID)
- Install module passport-google-oauth
- Setup google authentication in ./middlewares/auth/index.js
- Create new routes for Google Auth: auth, callback, failed

## Future Improvement
Addition of email/account verification [reference](https://www.youtube.com/watch?v=76tKpVbjhu8):
- Integrate nodemailer and send email for verification.
- Add new column in database for verification identification (true or false)
- Insert vertification API inside email content: html - href


