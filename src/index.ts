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

const intervalIds: NodeJS.Timer[] = [];
const reRunInterval = 1000 * 60 * 60 * 6;
const finalDate = new Date('03/03/2023').toLocaleDateString();

const id = setInterval(() => {
  void app();
}, reRunInterval);

intervalIds.push(id);

if (intervalIds.length > 1) {
  clearInterval(intervalIds.shift());
} else if (new Date().toDateString() === finalDate) {
  intervalIds.forEach((id) => {
    clearInterval(id);
  });
}
