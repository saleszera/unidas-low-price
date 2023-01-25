import transportOptions from '.';

describe('transportOptions use case', () => {
  const originalEnv = process.env;

  describe.each`
    nodeEnv
    ${'production'}
    ${'development'}
  `(
    'when process.env.NODE_ENV="$nodeEnv"',
    ({ nodeEnv }: { nodeEnv: 'production' | 'development' }) => {
      beforeEach(() => {
        jest.resetModules();
        process.env = {
          ...originalEnv,
          NODE_ENV: nodeEnv,
        };
      });

      afterEach(() => {
        process.env = originalEnv;
      });

      it(`should return the currect transport options`, () => {
        const options = Object.keys(transportOptions({ env: nodeEnv }));

        expect(
          options.some((key) =>
            nodeEnv === 'development'
              ? /host|port/.test(key)
              : key === 'service'
          )
        ).toBeTruthy();
      });
    }
  );
});
