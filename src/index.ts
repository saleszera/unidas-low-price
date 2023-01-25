import { getUnidasOffers, nodemailer } from './service';
import { htmlContent } from './utils';

const app = async () => {
  const infos = await getUnidasOffers();

  const html = htmlContent({ offers: infos });

  void nodemailer({
    from: 'saleszinhow@gmail.com',
    to: 'crowzcoleslaw@gmail.com',
    subject: 'Ofertas unidas',
    html,
  });
};

void app();
