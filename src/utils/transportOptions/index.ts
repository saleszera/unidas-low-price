interface ITransPortOptions {
  env: 'production' | 'development';
}

const transportOptions = ({ env }: ITransPortOptions) => {
  const options = {
    production: {
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    development: {
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    },
  };

  return options[env];
};

export default transportOptions;
