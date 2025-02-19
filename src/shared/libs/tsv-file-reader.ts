import { FileReader } from './file-reader.interface.js';
import { Offer, Type } from '../types/offer-type.js';
import { User, UserType } from '../types/user-type.js';
import { readFileSync } from 'node:fs';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
      private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Partial<Offer>[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Partial<Offer> {
    const [
      title,
      description,
      createdDate,
      image,
      type,
      price,
      linksList,
      name,
      password,
      email,
      avatarPath,
      userType,
      isPremium,
      isFavorite,
      ranking,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(createdDate),
      image,
      type: type as Type,
      linksList: this.parselinksList(linksList),
      price: this.parsePrice(price),
      author: this.parseUser(name, email, avatarPath, password, userType as UserType),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      ranking: Number(ranking),
    };
  }

  private parseBoolean(booleanString: string): boolean {
    if (booleanString === 'true') {
      return true;
    }
    return false;
  }

  private parselinksList(linksListString: string): string[] {
    return linksListString.split(';').map((name) => name);
  }

  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseUser(name: string, email: string, avatarPath: string, password: string, type: UserType): User {
    return { email, name, avatarPath, password, type };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Partial<Offer>[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
