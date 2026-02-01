import {
  AMERICAN_EDUCATION_MEME,
  AMERICAN_EDUCATION_PRESTIGIOUS,
  AMERICAN_EDUCATION_REGULAR,
  AMERICAN_FEMALE_HERO_NAMES,
  AMERICAN_MALE_HERO_NAMES,
  AMERICAN_SURNAMES,
} from './presets/american';
import {
  ASIAN_EDUCATION_MEME,
  ASIAN_EDUCATION_PRESTIGIOUS,
  ASIAN_EDUCATION_REGULAR,
  ASIAN_FEMALE_HERO_NAMES,
  ASIAN_MALE_HERO_NAMES,
  ASIAN_SURNAMES,
} from './presets/asian';
import {
  INDIAN_EDUCATION_MEME,
  INDIAN_EDUCATION_PRESTIGIOUS,
  INDIAN_EDUCATION_REGULAR,
  INDIAN_FEMALE_HERO_NAMES,
  INDIAN_MALE_HERO_NAMES,
  INDIAN_SURNAMES,
} from './presets/indian';

export const HERO_PARTS = {
  american: {
    name: {
      male: AMERICAN_MALE_HERO_NAMES,
      female: AMERICAN_FEMALE_HERO_NAMES,
    },
    surname: AMERICAN_SURNAMES,
    education: {
      prestigious: AMERICAN_EDUCATION_PRESTIGIOUS,
      regular: AMERICAN_EDUCATION_REGULAR,
      meme: AMERICAN_EDUCATION_MEME,
    },
  },
  asian: {
    name: {
      male: ASIAN_MALE_HERO_NAMES,
      female: ASIAN_FEMALE_HERO_NAMES,
    },
    surname: ASIAN_SURNAMES,
    education: {
      prestigious: ASIAN_EDUCATION_PRESTIGIOUS,
      regular: ASIAN_EDUCATION_REGULAR,
      meme: ASIAN_EDUCATION_MEME,
    },
  },
  indian: {
    name: {
      male: INDIAN_MALE_HERO_NAMES,
      female: INDIAN_FEMALE_HERO_NAMES,
    },
    surname: INDIAN_SURNAMES,
    education: {
      prestigious: INDIAN_EDUCATION_PRESTIGIOUS,
      regular: INDIAN_EDUCATION_REGULAR,
      meme: INDIAN_EDUCATION_MEME,
    },
  },
};
