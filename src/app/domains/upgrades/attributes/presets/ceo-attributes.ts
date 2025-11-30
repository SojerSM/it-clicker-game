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
    value: 1.5,
    imgBadge: '',
    price: 100,
    isPurchased: false,
  },
  {
    id: 'ceo_attr_2',
    heroRole: HeroRole.CEO,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.LEARNING_RATE,
    title: 'The CEO Brain-Boost Binge',
    description:
      'One motivational audiobook later and you’re convinced you can learn anything at 2x speed — including how to actually finish that book.',
    value: 1.5,
    imgBadge: '',
    price: 250,
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
    price: 250,
    isPurchased: false,
  },
  {
    id: 'ceo_attr_4',
    heroRole: HeroRole.CEO,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.MPI,
    title: 'Cross-Team Communication Intensive',
    description:
      'Master the subtle art of sending ambiguous Slack messages that make everyone think you are delegating tasks wisely.',
    value: 2,
    imgBadge: '',
    price: 500,
    isPurchased: false,
  },
  {
    id: 'ceo_attr_5',
    heroRole: HeroRole.CEO,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.LEARNING_RATE,
    title: 'Pay-to-Win Enlightenment DLC',
    description:
      'You bought a “Limited Edition Productivity Mindset Pack,” and now your brain loads new skills faster — mostly because you’re trying to justify the purchase.',
    value: 1.5,
    imgBadge: '',
    price: 1000,
    isPurchased: false,
  },
  {
    id: 'ceo_attr_6',
    heroRole: HeroRole.CEO,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.MPI,
    title: 'Client Relationship Jedi Training',
    description:
      'Learn to respond to client requests politely while secretly ignoring the impossible ones and still keeping them happy.',
    value: 2,
    imgBadge: '',
    price: 1000,
    isPurchased: false,
  },
  {
    id: 'ceo_attr_7',
    heroRole: HeroRole.CEO,
    type: AttributeType.MULTIPLY,
    target: AttributeTarget.MPI,
    title: 'Strategic Roadmap Simulation',
    description:
      'Create a convincing product roadmap for the next year in under an hour, perfectly timed for board meetings and investor calls.',
    value: 2,
    imgBadge: '',
    price: 2000,
    isPurchased: false,
  },
];
