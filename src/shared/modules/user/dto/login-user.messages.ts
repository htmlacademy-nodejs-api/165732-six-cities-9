export const CreateLoginUserMessage = {
  email: {
    invalidFormat: 'email must be a valid address',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'length between 6 and 12'
  }
} as const;
