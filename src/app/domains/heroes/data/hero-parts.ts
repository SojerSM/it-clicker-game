import {
  EDUCATION_MEME_ASIA,
  EDUCATION_PRESTIGIOUS_ASIA,
  EDUCATION_REGULAR_ASIA,
  FEMALE_HERO_NAMES_ASIA,
  MALE_HERO_NAMES_ASIA,
  SURNAMES_ASIA,
} from './asian';
import {
  EDUCATION_MEME_EN,
  EDUCATION_PRESTIGIOUS_EN,
  EDUCATION_REGULAR_EN,
  FEMALE_HERO_NAMES_EN,
  MALE_HERO_NAMES_EN,
  SURNAMES_EN,
} from './english';

export const HERO_PARTS = {
  asian: {
    name: {
      male: MALE_HERO_NAMES_ASIA,
      female: FEMALE_HERO_NAMES_ASIA,
    },
    surname: SURNAMES_ASIA,
    education: {
      prestigious: EDUCATION_PRESTIGIOUS_ASIA,
      regular: EDUCATION_REGULAR_ASIA,
      meme: EDUCATION_MEME_ASIA,
    },
  },
  english: {
    name: {
      male: MALE_HERO_NAMES_EN,
      female: FEMALE_HERO_NAMES_EN,
    },
    surname: SURNAMES_EN,
    education: {
      prestigious: EDUCATION_PRESTIGIOUS_EN,
      regular: EDUCATION_REGULAR_EN,
      meme: EDUCATION_MEME_EN,
    },
  },
};
