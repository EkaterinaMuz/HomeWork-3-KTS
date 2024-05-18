module.exports = {
  bracketSameLine: false,
  tabWidth: 2,
  bracketSpacing: true,
  endOfLine: 'auto',
  printWidth: 120,
  singleQuote: true,
  overrides: [
    {
      files: ['**.*.scss', '*.scss'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
