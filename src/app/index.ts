import { getUnidasOffers, sendMail } from '../service';
import { htmlContent } from '../utils';

interface IApp {
  interval: number;
  endAt: string;
}

const app = ({ interval, endAt }: IApp) => {
  const validateDate = /(\d){2}(\D){1}(\d){2}(\D){1}(\d){4}/;

  if (!validateDate.test(endAt)) {
    throw new Error('Invalid date');
  }

  const intervalIds: NodeJS.Timer[] = [];
  const currentDate = new Date().toLocaleDateString();

  const id = setInterval(async () => {
    const infos = await getUnidasOffers();

    const html = htmlContent({ offers: infos });

    void sendMail({
      from: process.env.EMAIL_USER as string,
      to: process.env.EMAIL_TO as string,
      subject: 'Ofertas unidas',
      html,
    });
  }, interval);

  intervalIds.push(id);

  if (intervalIds.length > 1) {
    clearInterval(intervalIds.shift());
  } else if (currentDate === endAt) {
    intervalIds.forEach((id) => {
      clearInterval(id);
    });
  }
};

export default app;
