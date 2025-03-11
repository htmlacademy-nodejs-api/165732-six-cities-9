import { FileReader } from './file-reader.interface.js';
import { Cities, Facilities, Offer, AccommodationType } from '../../types/offer-type.js';
import { UserType } from '../../types/user-type.js';
import { createReadStream } from 'node:fs';
import EventEmitter from 'node:events';

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  private parseLineToOffer(line: string): Partial<Offer> {
    const [
      title,
      description,
      createdDate,
      name,
      email,
      // image,
      // type,
      // price,
      // linksList,
      // password,
      // avatarPath,
      // userType,
      // isPremium,
      // isFavorite,
      // ranking,
    ] = line.split('\t');

    return {
      title,
      description,
      publicationDate: new Date(createdDate).toString(),
      preview: 'wewee',
      city: Cities.Cologne,
      linksList: ['link1.com', 'link2.com'],
      isPremium: true,
      isFavorite: false,
      rate: 3.5,
      accommodationType: AccommodationType.Apartment,
      roomsCount: 2,
      guestsCount: 3,
      price: 100000,
      facilities: [Facilities.Breakfast, Facilities.Fridge],
      coordinates: {
        latitude: 50.938361,
        longitude: 6.959974
      },
      user: {
        email,
        avatarPath: 'sdsdsd.jpg',
        name,
        type: UserType.Ordinary,
      },
    };
  }

  // private parseBoolean(booleanString: string): boolean {
  //   if (booleanString === 'true') {
  //     return true;
  //   }
  //   return false;
  // }

  // private parselinksList(linksListString: string): string[] {
  //   return linksListString.split(';').map((name) => name);
  // }

  // private parsePrice(priceString: string): number {
  //   return Number.parseInt(priceString, 10);
  // }

  // private parseUser(name: string, email: string,
  //   // avatarPath?: string, password?: string, type?: UserType
  // ): Partial<User> {
  //   return { name, email };
  //   // avatarPath, password, type

  // }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, { encoding: 'utf-8' });

    let remainingData = ' ';
    let nextLinePosition = 0;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }
    this.emit('end', importedRowCount);
  }
}
