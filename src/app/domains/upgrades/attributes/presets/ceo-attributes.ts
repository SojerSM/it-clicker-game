import { HeroRole } from '../../../heroes/types/enums/hero-role.enum';
import { AttributeTarget } from '../types/enums/attribute-target.enum';
import { AttributeType } from '../types/enums/attribute-type.enum';
import { HeroAttribute } from '../types/hero-attribute';

export const CEO_ATTRIBUTES: HeroAttribute[] = [
  {
    id: 'ceo_attr_1',
    heroRole: HeroRole.CEO,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.MPI,
    title: 'Budget Stretching Masterclass',
    description:
      'Learn the art of making $100 last a week in a startup, convincing your team it’s a strategic challenge, not a cash shortage.',
    value: 2,
    imgBadge: '',
    price: 250,
    isPurchased: false,
  },
  {
    id: 'ceo_attr_2',
    heroRole: HeroRole.CEO,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.MPI,
    title: 'Investor Charm Bootcamp',
    description:
      'Polish your elevator pitch to make investors believe your MVP is a billion-dollar idea, even if it’s still a prototype.',
    value: 1.5,
    imgBadge: '',
    price: 1000,
    isPurchased: false,
  },
  {
    id: 'ceo_attr_3',
    heroRole: HeroRole.CEO,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.MPI,
    title: 'Cross-Team Communication Intensive',
    description:
      'Master the subtle art of sending ambiguous Slack messages that make everyone think you are delegating tasks wisely.',
    value: 1.5,
    imgBadge: '',
    price: 2000,
    isPurchased: false,
  },
  {
    id: 'ceo_attr_4',
    heroRole: HeroRole.CEO,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.MPI,
    title: 'Client Relationship Jedi Training',
    description:
      'Learn to respond to client requests politely while secretly ignoring the impossible ones and still keeping them happy.',
    value: 2,
    imgBadge: '',
    price: 5000,
    isPurchased: false,
  },
  {
    id: 'ceo_attr_5',
    heroRole: HeroRole.CEO,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.MPI,
    title: 'Strategic Roadmap Simulation',
    description:
      'Create a convincing product roadmap for the next year in under an hour, perfectly timed for board meetings and investor calls.',
    value: 2,
    imgBadge: '',
    price: 10000,
    isPurchased: false,
  },
];
