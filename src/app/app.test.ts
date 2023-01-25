import app from '.';

const mockGetUnidasOffers = jest.fn();
const mockSendMail = jest.fn();

jest.mock('../service', () => ({
  getUnidasOffers: mockGetUnidasOffers,
  sendMail: mockSendMail,
}));

describe('App use case', () => {
  it('should be able to run appp', async () => {
    jest.useFakeTimers();
    await app({ interval: 1000, endAt: '01/01/2050' });

    jest.advanceTimersByTime(1000);

    const mockGetUnidasOffers = jest.fn();
    const mockSendMail = jest.fn();

    jest.mock('../service', () => ({
      getUnidasOffers: mockGetUnidasOffers,
      sendMail: mockSendMail,
    }));

    expect(mockGetUnidasOffers).toHaveBeenCalled();
    expect(mockSendMail).toBeCalled();

    jest.clearAllTimers();
  });
});
