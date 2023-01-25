import sendMail from '.';

const mockSendMail = jest.fn();

jest.mock('nodemailer', () => ({
  ...jest.requireActual('nodemailer'),
  createTransport: () => ({ sendMail: mockSendMail }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('sendMail use case', () => {
  it('should be able to send an email', async () => {
    await sendMail({
      from: 'email@test.com',
      to: 'email@test.com',
      subject: 'teste',
      html: '',
    });

    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });

  it('should not be able to send an email without required fields', async () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(sendMail({ from: '', to: '', subject: '' })).rejects.toThrowError();
    expect(mockSendMail).not.toHaveBeenCalled();
  });
});
