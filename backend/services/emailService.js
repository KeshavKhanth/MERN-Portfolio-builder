const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Disable email service for local testing
    this.emailEnabled = process.env.EMAIL_ENABLED === 'true';
    
    if (this.emailEnabled) {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      console.log('Email service disabled for local development');
      this.transporter = null;
    }
  }

  async sendEmail(options) {
    if (!this.emailEnabled || !this.transporter) {
      console.log('Email service disabled - would have sent email to:', options.to);
      return { success: true, messageId: 'email-disabled', disabled: true };
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }
  }

  async sendVerificationEmail(user, verificationToken) {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Portfolio Builder!</h1>
            </div>
            <div class="content">
              <h2>Hi ${user.firstName},</h2>
              <p>Thank you for signing up for Portfolio Builder. Please verify your email address to complete your registration.</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">${verificationUrl}</p>
              <p>This link will expire in 24 hours.</p>
              <div class="footer">
                <p>If you didn't create an account, please ignore this email.</p>
                <p>&copy; 2025 Portfolio Builder. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return await this.sendEmail({
      to: user.email,
      subject: 'Verify Your Email - Portfolio Builder',
      html
    });
  }

  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 10px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Hi ${user.firstName},</h2>
              <p>We received a request to reset your password for your Portfolio Builder account.</p>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">${resetUrl}</p>
              <div class="warning">
                <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons.
              </div>
              <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
              <div class="footer">
                <p>&copy; 2025 Portfolio Builder. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return await this.sendEmail({
      to: user.email,
      subject: 'Password Reset Request - Portfolio Builder',
      html
    });
  }

  async sendWelcomeEmail(user) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .feature { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Portfolio Builder!</h1>
              <p>Your account is now verified and ready to use</p>
            </div>
            <div class="content">
              <h2>Hi ${user.firstName},</h2>
              <p>Congratulations! Your email has been verified and your account is now fully activated.</p>
              
              <h3>Here's what you can do now:</h3>
              <div class="feature">
                <strong>🎨 Choose from Premium Templates</strong>
                <p>Select from our collection of professionally designed portfolio templates</p>
              </div>
              <div class="feature">
                <strong>🔧 Customize Everything</strong>
                <p>Use our drag-and-drop editor to personalize your portfolio</p>
              </div>
              <div class="feature">
                <strong>🚀 Publish & Share</strong>
                <p>Make your portfolio live and share it with the world</p>
              </div>
              
              <div style="text-align: center;">
                <a href="${process.env.CLIENT_URL}/dashboard" class="button">Go to Dashboard</a>
              </div>
              
              <div class="footer">
                <p>Need help? Contact our support team at support@portfoliobuilder.com</p>
                <p>&copy; 2025 Portfolio Builder. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return await this.sendEmail({
      to: user.email,
      subject: 'Welcome to Portfolio Builder!',
      html
    });
  }
}

module.exports = new EmailService();
