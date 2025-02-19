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
    postDate: Date;
    city: Cities;
    image: string;
    linksList: string[];
    isPremium: boolean;
    isFavorite: boolean;
    ranking: number;
    type: Type;
    roomsCount: number;
    guestsCount: number;
    price: number;
    facilities: Facilities;
    author: User;
    coordinates: {
        latitude: string;
        longitude: string;
    }
  }
