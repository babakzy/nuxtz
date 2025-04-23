import { Resend } from 'resend';

// Email templates
interface EmailTemplate {
  subject: string;
  html: string;
}

// Create templates for different email types
const createPurchaseConfirmationEmail = (name: string, productName: string, downloadUrl?: string): EmailTemplate => ({
  subject: `Your purchase of ${productName} is confirmed!`,
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #333;">Thank you for your purchase, ${name}!</h2>
      <p style="color: #555;">We're excited to confirm your purchase of <strong>${productName}</strong>.</p>
      
      ${downloadUrl ? `
      <div style="margin: 25px 0; padding: 20px; background-color: #f8f9fa; border-radius: 5px; text-align: center; border: 1px solid #dee2e6;">
        <h3 style="margin-top: 0; color: #333;">Download Your Boilerplate</h3>
        <p style="color: #555; margin-bottom: 20px;">Click the button below to access the download page. Your download should start automatically.</p>
        <a href="${downloadUrl}" 
           style="display: inline-block; background-color: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;"
        >Download ${productName}</a>
        <p style="margin-top: 20px; font-size: 0.9em; color: #6c757d;">This secure download link is unique to you and will expire in 7 days.</p>
      </div>
      <p style="color: #555;">Once downloaded, unzip the file and follow the instructions in the README to get started.</p>
      ` : `
      <p style="color: #555;">You should receive access shortly. If you have any questions, please reply to this email.</p>
      `}
      
      <p style="color: #555; margin-top: 30px;">If you have any questions or need assistance, feel free to reply to this email.</p>
      
      <p style="color: #555; margin-top: 20px;">Best regards,<br>The Nuxtz Team</p>
    </div>
  `
});

const createWaitlistConfirmationEmail = (email: string): EmailTemplate => ({
  subject: "You've been added to our waitlist!",
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>You're on the list!</h2>
      <p>Thank you for joining our waitlist. We've registered <strong>${email}</strong> and will notify you as soon as we have availability.</p>
      <p>Best regards,<br>The Nuxtz Team</p>
    </div>
  `
});

// Initialize Resend once
let resendInstance: Resend | null = null;

const getResendClient = (apiKey?: string): Resend => {
  if (!resendInstance) {
    const key = apiKey || process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error('Resend API key is not configured');
    }
    resendInstance = new Resend(key);
  }
  return resendInstance;
};

// Export email sending functions
export const sendPurchaseConfirmationEmail = async (
  to: string,
  name: string,
  productName: string,
  downloadUrl?: string,
  resendApiKey?: string
) => {
  const resend = getResendClient(resendApiKey);
  const { subject, html } = createPurchaseConfirmationEmail(name, productName, downloadUrl);

  return resend.emails.send({
    from: 'info@updates.nuxtz.com',
    to,
    subject,
    html
  });
};

export const sendWaitlistConfirmationEmail = async (
  to: string,
  resendApiKey?: string
) => {
  const resend = getResendClient(resendApiKey);
  const { subject, html } = createWaitlistConfirmationEmail(to);

  return resend.emails.send({
    from: 'info@updates.nuxtz.com',
    to,
    subject,
    html
  });
}; 