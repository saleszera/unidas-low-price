import htmlContent from '.';

describe('htmlContent use case', () => {
  it('should be able to return a email body with a table', () => {
    const content = htmlContent({
      offers: [{ group: 'test', price: '0', type: 'test' }],
    });

    expect(content).toContain('table');
  });

  it('should be able a message when offers will empty', () => {
    const content = htmlContent({
      offers: [],
    });

    expect(content).toContain('Não há ofertas no momento');
    expect(content).not.toContain('Estes são os preços mais baixos no momento');
  });
});
