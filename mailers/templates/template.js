export const welcomeEmailTemplate = (
  username,
  brandColor = "#2563EB"
) => ({
  subject: `Welcome to BJJ-COMPASS, ${username}!`,
  text: `Hi ${username}, welcome to the exciting world of Brazilian Jiu-Jitsu! We're thrilled to have you on board. Get ready for an amazing journey with us!`,
  html: `
    <html><head><style>
      body, html { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); }
      .header { background-color: ${brandColor}; font-weight:bold; font-size: 24px; color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; }
      .header img { max-width: 40px; margin-bottom: 10px; }
      .content { padding: 20px; text-align: center; }
      .content h1 { font-size: 24px; color: #333333; }
      .content p { font-size: 16px; color: #666666; margin: 10px 0 20px; }
      .button { display: inline-block; padding: 15px 25px; font-size: 16px; font-weight: bold; background-color: ${brandColor}; color: #fff!important; border-radius: 5px; text-decoration: none; margin-top: 20px; }
      .footer { font-size: 14px; color: #999999; text-align: center; padding: 20px; }
    </style></head><body>
      <div class="container">
        <div class="header">BJJ-COMPASS Family</div>
        <div class="content">
          <h1>Welcome to Brazilian Jiu-Jitsu, ${username}!</h1>
          <p>We're so excited to have you with us! Get ready to embark on a journey filled with strength, discipline, and fun. Whether you're new to BJJ or have experience, this is the beginning of an exciting adventure.</p>
          <p>To kick things off, check out our amazing resources and join the community. You're now part of something truly special!</p>
          <a href="#" class="button">Start Your Journey</a>
        </div>
        <div class="footer">
          <p>If you have any questions or need support, don’t hesitate to reach out to us.</p>
        </div>
      </div>
    </body></html>
  `,
});
