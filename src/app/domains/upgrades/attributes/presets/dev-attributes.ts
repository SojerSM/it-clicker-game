import { HeroRole } from '../../../heroes/types/enums/hero-role.enum';
import { AttributeTarget } from '../types/enums/attribute-target.enum';
import { AttributeType } from '../types/enums/attribute-type.enum';
import { HeroAttribute } from '../types/hero-attribute';

export const DEV_ATTRIBUTES: HeroAttribute[] = [
  {
    id: 'dev_attr_1',
    heroId: null,
    heroRole: HeroRole.PROGRAMMER,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.PPS,
    title: '"How to center a div" crash course',
    description:
      '“1/10, instructor barely spoke English. It must be something about his name Rajeesh, but I am not sure. ~/ some frustrated user',
    value: 2,
    imgBadge: '',
    price: 100,
  },
  {
    id: 'dev_attr_2',
    heroId: null,
    heroRole: HeroRole.PROGRAMMER,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.PPS,
    title: 'Git for Absolute Beginners',
    description:
      'The mysterious art of committing, pushing, and accidentally merging conflicts in less than 10 minutes.',
    value: 2,
    imgBadge: '',
    price: 500,
  },
  {
    id: 'dev_attr_3',
    heroId: null,
    heroRole: HeroRole.PROGRAMMER,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.PPS,
    title: 'Stack Overflow Survival Guide',
    description:
      'Master the ancient skill of copy-pasting code snippets while praying they actually work.',
    value: 1.5,
    imgBadge: '',
    price: 2000,
  },
  {
    id: 'dev_attr_4',
    heroId: null,
    heroRole: HeroRole.PROGRAMMER,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.PPS,
    title: 'Debugging 101: Console.log Everything',
    description:
      'Nothing beats dumping your life into the console to find out why nothing really works.',
    value: 2,
    imgBadge: '',
    price: 5000,
  },
];
