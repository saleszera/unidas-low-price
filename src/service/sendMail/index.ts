import 'dotenv/config';
import nodemailer, { Transport, TransportOptions } from 'nodemailer';
import SESTransport from 'nodemailer/lib/ses-transport';
import * as Yup from 'yup';

import { transportOptions } from '../../utils';

interface ISendMail {
  from: string;
  to: string;
  subject: string;
  html?: string;
}

const schema = Yup.object().shape({
  from: Yup.string().email().required(),
  to: Yup.string().email().required(),
  subject: Yup.string().required(),
  html: Yup.string(),
});

const sendMail = async (contact: ISendMail) => {
  const isValid = await schema.validate(contact, { abortEarly: true });

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!isValid) {
    throw new Error('From, to and subject are required');
  }

  const { from, subject, to, html } = contact;

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const transporter = nodemailer.createTransport(
    transportOptions({
      env: process.env.NODE_ENV as 'development' | 'production',
    }) as TransportOptions | Transport<unknown>
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
