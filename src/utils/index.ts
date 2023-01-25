import 'dotenv/config';
import { IOffer } from '../@types/offers';

interface IHtmlContent {
  offers: IOffer[];
}

export const htmlContent = ({ offers }: IHtmlContent) => {
  const rows = offers.map(
    ({ group, type, price }) =>
      `<tr><td>${group}</td><td>${type}</td><td>${
        price ?? 'Indisponível'
      }</td></tr>`
  );

  const table = `<div style="padding:18px;font-family:sans-serif"><h1 style="letter-spacing:4px;opacity:0.8;line-height:0;text-shadow:1px 2px #0000002b">Atenção</h1><h5 style="opacity:0.6;margin-left:8px">Estes são os preços mais baixos no momento</h5><table style="max-width:784px;width:100%;font-size:14px;border:1px solid #00000017;border-radius:8px;padding:8px"><tr><td>Grupo</td><td>Tipo</td><td>Preço</td></tr>${rows.join(
    ''
  )}</table></div>`;

  return table;
};

export const transportOptions =
  process.env.NODE_ENV === 'production'
    ? {
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      }
    : {
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      };
