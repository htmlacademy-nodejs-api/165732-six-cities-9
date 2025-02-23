import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { generateRandomValue, getRandomItem } from '../../utils/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const user = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, createdDate,
      user, email
    ].join('\t');
  }
}
