const nodemailer = require('nodemailer');

function createTransporter() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return nodemailer.createTransport({
    streamTransport: true,
    newline: 'unix',
  });
}

const transporter = createTransporter();

async function sendPasswordResetEmail(email, resetUrl) {
  const message = {
    from: process.env.SMTP_FROM || 'noreply@mcq-platform.com',
    to: email,
    subject: 'Password Reset - MCQ Platform',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="font-size: 24px; color: #1f2937; margin: 0;">MCQ Platform</h1>
        </div>
        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
          <h2 style="font-size: 18px; color: #1f2937; margin: 0 0 12px;">Password Reset Request</h2>
          <p style="color: #6b7280; line-height: 1.6; margin: 0 0 20px;">
            We received a request to reset your password. Click the button below to set a new password. This link is valid for 1 hour.
          </p>
          <div style="text-align: center; margin-bottom: 20px;">
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #a78bfa, #f472b6); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
              Reset Password
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin: 0;">
            If you did not request a password reset, please ignore this email. No changes have been made to your account.
          </p>
        </div>
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">
          &copy; ${new Date().getFullYear()} MCQ Platform. All rights reserved.
        </p>
      </div>
    `,
  };

  const info = await transporter.sendMail(message);

  return info;
}

module.exports = { sendPasswordResetEmail };
