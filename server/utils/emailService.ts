import { sendPurchaseConfirmationEmail, sendWaitlistConfirmationEmail } from './email';

/**
 * EmailService provides a wrapper around the email functions with consistent error handling and logging
 */
export class EmailService {
  private resendApiKey: string;
  
  constructor(resendApiKey: string) {
    this.resendApiKey = resendApiKey;
  }
  
  /**
   * Sends a purchase confirmation email with error handling
   */
  async sendPurchaseConfirmation(
    recipientEmail: string, 
    customerName: string, 
    productName: string,
    downloadUrl?: string
  ): Promise<boolean> {
    try {
      console.log(`[EmailService] Sending purchase confirmation to ${recipientEmail} for ${productName}`);
      const result = await sendPurchaseConfirmationEmail(
        recipientEmail,
        customerName,
        productName,
        downloadUrl,
        this.resendApiKey
      );
      
      console.log(`[EmailService] Successfully sent purchase confirmation to ${recipientEmail}`, result?.data?.id);
      return true;
    } catch (error) {
      console.error(`[EmailService] Failed to send purchase confirmation to ${recipientEmail}:`, error);
      return false;
    }
  }
  
  /**
   * Sends a waitlist confirmation email with error handling
   */
  async sendWaitlistConfirmation(recipientEmail: string): Promise<boolean> {
    try {
      console.log(`[EmailService] Sending waitlist confirmation to ${recipientEmail}`);
      const result = await sendWaitlistConfirmationEmail(
        recipientEmail,
        this.resendApiKey
      );
      
      console.log(`[EmailService] Successfully sent waitlist confirmation to ${recipientEmail}`, result?.data?.id);
      return true;
    } catch (error) {
      console.error(`[EmailService] Failed to send waitlist confirmation to ${recipientEmail}:`, error);
      return false;
    }
  }
  
  /**
   * Factory method to create an EmailService with the Resend API key from runtime config
   */
  static fromRuntimeConfig(config: any): EmailService {
    const apiKey = config.resendApiKey;
    if (!apiKey) {
      throw new Error('Resend API key is not configured in runtime config');
    }
    return new EmailService(apiKey);
  }
} 