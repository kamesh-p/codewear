import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import KoalaWelcomeEmail from '../email/email';

const resend = new Resend("re_DS1Lyami_FtV2tNvsNF1azJL5ggPcaZPF");

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { name, email, message } = req.body; // Get form data from the request body
        await resend.sendEmail({
            from: 'onboarding@resend.dev',
        to: email, // Use the email from the form
      subject: message,
      react: KoalaWelcomeEmail({ userFirstname: name }), // Use the name from the form
     // Use the message from the form
    });
    
   
    return res.status(200).json({ status: 'Ok' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while sending the email.' });
  }
};
