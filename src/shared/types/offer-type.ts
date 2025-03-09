import { User } from './user-type.js';

export enum Type {
    Apartment = 'apartment',
    House = 'house',
    Room = 'room',
    Hotel = 'hotel'
}

export enum Facilities {
    Breakfast = 'Breakfast',
    AirConditioning = 'Air conditioning',
    LaptopFriendlyWorkspace = 'Laptop friendly workspace',
    BabySeat = 'Baby seat',
    Washer = 'Washer',
    Towels = 'Towels',
    Fridge = 'Fridge'
}

export enum Cities {
    Paris = 'Paris',
    Cologne = 'Cologne',
    Brussels = 'Brussels',
    Amsterdam = 'Amsterdam',
    Hamburg = 'Hamburg',
    Dusseldorf = 'Dusseldorf'
}

export type Offer = {
  title: string;
  description: string;
  publicationDate: string;
  city: Cities;
  preview: string;
  linksList: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rate: number;
  accommodationType: Type;
  roomsCount: number;
  guestsCount: number;
  price: number;
  facilities: Facilities[];
  user: User;
  coordinates: {
       latitude: number;
       longitude: number;
    }
  }
