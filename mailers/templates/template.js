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

export const goalCompletionEmailTemplate = (
    username,
    goalDescription,
    brandColor = "#28A745" 
  ) => ({
    subject: `Congratulations on Completing Your Goal, ${username}!`,
    text: `Hi ${username}, congratulations on completing the goal: "${goalDescription}"! You've made incredible progress, and we're so proud of you. Keep up the great work!`,
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
            <h1>Congratulations on Completing Your Goal, ${username}!</h1>
            <p>You've achieved an incredible milestone by completing the goal: <strong>"${goalDescription}"</strong>.</p>
            <p>You're making amazing progress, and we couldn't be more proud of you! 🎉</p>
            <p>But remember, this is just the beginning. Your journey is full of endless possibilities, and we're excited to see you reach even greater heights. Keep pushing forward, you're unstoppable!</p>
            <a href="#" class="button">Keep Going!</a>
          </div>
          <div class="footer">
            <p>If you have any questions or need support, don’t hesitate to reach out to us.</p>
          </div>
        </div>
      </body></html>
    `,
});

export const resetPasswordEmailTemplate = (
  username,
  email,
  resetLink,
  brandColor = "#007BFF" 
) => ({
  subject: `Password Reset Request for ${username}`,
  text: `Hi ${username},\n\nWe received a request to reset your password for the account associated with ${email}. If you made this request, please click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request a password reset, please ignore this email or contact support if you have concerns.\n\nThank you,\nYour Support Team`,
  html: `
    <html><head><style>
      body, html { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); }
      .header { background-color: ${brandColor}; font-weight:bold; font-size: 24px; color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; }
      .content { padding: 20px; text-align: center; }
      .content h1 { font-size: 24px; color: #333333; }
      .content p { font-size: 16px; color: #666666; margin: 10px 0 20px; }
      .button { display: inline-block; padding: 15px 25px; font-size: 16px; font-weight: bold; background-color: ${brandColor}; color: #fff!important; border-radius: 5px; text-decoration: none; margin-top: 20px; }
      .footer { font-size: 14px; color: #999999; text-align: center; padding: 20px; }
    </style></head><body>
      <div class="container">
        <div class="header">Password Reset Request</div>
        <div class="content">
          <h1>Reset Your Password</h1>
          <p>Hi <strong>${username}</strong>,</p>
          <p>We received a request to reset the password for your account associated with <strong>${email}</strong>.</p>
          <p>If you made this request, click the button below to set a new password:</p>
          <a href="${resetLink}" class="button">Reset Password</a>
          <p>If you didn’t request this, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>If you need any help, please contact our support team.</p>
        </div>
      </div>
    </body></html>
  `,
});

  