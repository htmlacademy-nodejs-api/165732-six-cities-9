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
    ] = line.split('\t');

    return {
      title,
      description,
      publicationDate: new Date(createdDate),
      preview: 'preview.jpg',
      city: Cities.Cologne,
      linksList: ['link1.com', 'link2.com'],
      isPremium: true,
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
        avatarPath: 'avatar.jpg',
        name,
        userType: UserType.Ordinary,
        favoriteOffersIds: [],
      },
    };
  }


  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, { encoding: 'utf-8' });

    let remainingData = ' ';
    let nextLinePosition = 0;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();
      nextLinePosition = remainingData.indexOf('\n');

      while (nextLinePosition >= 0) {
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
