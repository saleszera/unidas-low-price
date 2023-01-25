import 'dotenv/config';
import nodemailer, { Transport, TransportOptions } from 'nodemailer';
import SESTransport from 'nodemailer/lib/ses-transport';

import { transportOptions } from '../utils';

interface ISendMail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const sendMail = async ({ from, html, subject, to }: ISendMail) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const transporter = nodemailer.createTransport(
    transportOptions as TransportOptions | Transport<unknown>
  );

  const info = (await transporter.sendMail({
    from,
    to,
    subject,
    html,
  })) as SESTransport.SentMessageInfo;

  if (Object.values(info ?? '').length > 0) {
    console.log('Message sent: %s', info?.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

export default sendMail;
