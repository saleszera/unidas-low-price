import puppeteer from 'puppeteer';
import { IOffer } from '../@types/offers';

const getUnidasOffers = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  await page.goto('https://www.unidas.com.br/reserva/passo-1');
  const input = await page.waitForSelector('input[name="storeField"]');
  await input?.type('Guaratinguetá');

  //! First step
  await page.evaluate(() => {
    const regex = /guaratingueta/gi;
    const list: NodeListOf<HTMLLIElement> = document.querySelectorAll(
      '.search-store ul li'
    );
    let storeIndex;

    for (storeIndex = 0; storeIndex < list.length; storeIndex++) {
      if (regex.test(list[storeIndex]?.textContent ?? '')) {
        list[storeIndex]?.click();
      }
    }

    const fields = ['Retirada', 'Devolução'];

    fields.forEach((field) => {
      (
        document.querySelector(
          `input[placeholder="${field}"]`
        ) as HTMLInputElement
      )?.click();
      const isFromStartInput = field.includes('Retirada');
      const indexes = {
        week: isFromStartInput ? 1 : 2,
        day: isFromStartInput ? 5 : 1,
      };

      if (isFromStartInput) {
        (
          document.querySelector('.p-datepicker-next') as HTMLButtonElement
        )?.click();
      }

      (
        document.querySelectorAll('table')[1].children[1].children[indexes.week]
          .children[indexes.day].children[0] as HTMLSpanElement
      )?.click();
    });

    const hours: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[placeholder="Hora"]'
    );
    let hourIndex;

    for (hourIndex = 0; hourIndex < hours.length; hourIndex++) {
      hours[hourIndex].value = '10:00';
    }

    (document.querySelector('.primary-button') as HTMLAnchorElement)?.click();
  });

  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

  //! Second step
  const dayOffers = await page.evaluate(() => {
    let cardIndex: number;
    const offers: IOffer[] = [];
    const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.card.ng-star-inserted'
    );
    const cardFields = [
      { className: '.card__header-title', name: 'type' },
      { className: '.card__header-cars', name: 'group' },
      { className: '.value', name: 'price' },
    ];

    for (cardIndex = 0; cardIndex < cards.length; cardIndex++) {
      offers.push(
        cardFields.reduce((acc, { className, name }) => {
          const value = cards[cardIndex].querySelector(className)?.textContent;

          return {
            ...acc,
            [name]: name === 'price' ? value?.replace(',', '.') : value,
          };
        }, {}) as IOffer
      );
    }

    return offers.sort(({ price: a }, { price: b }) => Number(a) - Number(b));
  });

  await browser.close();

  return dayOffers.slice(0, 3);
};

export default getUnidasOffers;
