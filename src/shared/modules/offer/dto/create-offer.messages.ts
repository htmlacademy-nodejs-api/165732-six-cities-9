export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  publicationDate: {
    invalidFormat: 'publicationDate must be a valid ISO date',
  },
  image: {
    maxLength: 'Too short for field «image»',
  },
  city: {
    invalid: 'city must be one of six cities',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 200000',
  },
  linksList: {
    invalidFormat: 'Field linksList must be an array',
  },
  author: {
    invalidId: 'author field must be a valid id',
  },
} as const;
