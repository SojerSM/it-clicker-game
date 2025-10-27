import { Injectable } from '@angular/core';
import { TicketType } from '../types/ticket-type.enum';

@Injectable({ providedIn: 'root' })
export class TicketNameGeneratorService {
  private verbsByType: Record<TicketType, string[]> = {
    [TicketType.FEATURE]: [
      'Add',
      'Build',
      'Implement',
      'Enable',
      'Create',
      'Introduce',
      'Deploy',
      'Overengineer',
    ],
    [TicketType.MAINTENANCE]: [
      'Update',
      'Clean',
      'Optimize',
      'Upgrade',
      'Refactor',
      'Improve',
      'Maintain',
    ],
    [TicketType.BUGFIX]: ['Fix', 'Resolve', 'Investigate', 'Debug', 'Patch', 'Handle', 'Correct'],
    [TicketType.HOTFIX]: [
      'Hotfix',
      'Fix',
      'Patch',
      'Emergency Resolve',
      'Deploy',
      'Quick Fix',
      'Repair',
    ],
    [TicketType.TESTING]: [
      'Test',
      'Verify',
      'Check',
      'Validate',
      'Measure',
      'Inspect',
      'Simulate',
      'Broke',
      '',
    ],
    [TicketType.DOCUMENTATION]: [
      'Document',
      'Write',
      'Explain',
      'Describe',
      'Record',
      'Illustrate',
      'Copy-paste',
    ],
    [TicketType.REFACTORING]: [
      'Refactor',
      'Rewrite',
      'Clean',
      'Reorganize',
      'Improve',
      'Optimize',
      'Simplify',
    ],
  };

  private nouns = [
    'Bug',
    'Feature',
    'Coffee',
    'Meeting',
    'Server',
    'Database',
    'Intern',
    'Keyboard',
    'Deadline',
    'Cache',
    'Pipeline',
    'Code',
    'Ticket',
    'Manager',
    'Commit',
    'Sprint',
    'Workflow',
    'Chatbot',
    'Grandma',
    'Documentation',
    'Coffee Overflow',
    'Keyboard Smash',
    'Catastrophic Merge',
    'Bug Apocalypse',
    'Monday Syndrome',
    'Friday Paradox',
    'Dependency Hell',
    'Endless Refactor',
    'Technical Debt',
    'White Supremacy',
    'Rasism',
    'Communism',
  ];

  private adjectives = [
    'Lazy',
    'Haunted',
    'Broken',
    'Corporate',
    'Chaotic',
    'Overcomplicated',
    'Magical',
    'Budget',
    'Self-Aware',
    'Experimental',
    'Unstable',
    'Mysterious',
    'Annoying',
    'Fake',
    'Critical',
    'Dramatic',
    'Recursive',
    'Drunk',
    'Unmaintainable',
    'Deadly',
    'Catastrophic',
    'Infernal',
    'Self-Destructing',
    'Malfunctioning',
  ];

  private adverbs = [
    'Quickly',
    'Badly',
    'Heroically',
    'Inefficiently',
    'Successfully',
    'Barely',
    'Accidentally',
    'Eventually',
    'Secretly',
    'Painfully',
    'Ironically',
    'Recklessly',
    'Unnecessarily',
    'Finally',
    'Magically',
    'Reluctantly',
  ];

  private prepositions = ['in', 'with', 'from', 'to', 'for', 'without', 'at', 'under'];

  private modules = [
    'AI',
    'Blockchain',
    'Cloud',
    'Server',
    'Frontend',
    'Backend',
    'Chat',
    'Analytics',
    'Payment',
    'Quantum',
    'API',
    'Database',
    'Microservice',
  ];

  private templates: string[][] = [
    ['Verb', 'Noun'],
    ['Verb', 'Noun', 'Adverb'],
    ['Verb', 'Adjective', 'Module'],
    ['Verb', 'Adjective', 'Module', 'Preposition', 'Noun'],
    ['Verb', 'Preposition', 'Adjective', 'Noun'],
    ['Verb', 'Preposition', 'Noun', 'Module'],
    ['Verb', 'Preposition', 'Module', 'Noun'],
    ['Verb', 'Noun', 'Preposition', 'Adjective', 'Noun'],
    ['Verb', 'Noun', 'Preposition', 'Module'],
  ];

  constructor() {}

  generateName(type: TicketType): string {
    const verb = this.getRandom(this.verbsByType[type]);
    const template = this.getRandom(this.templates);

    const parts: string[] = [verb];
    for (let i = 1; i < template.length; i++) {
      parts.push(this.pickWord(template[i]));
    }

    return this.capitalize(parts.filter(Boolean).join(' '));
  }

  private pickWord(type: string): string {
    switch (type) {
      case 'Noun':
        return this.getRandom(this.nouns);
      case 'Adjective':
        return this.getRandom(this.adjectives);
      case 'Adverb':
        return this.getRandom(this.adverbs);
      case 'Preposition':
        return this.getRandom(this.prepositions);
      case 'Module':
        return this.getRandom(this.modules);
      default:
        return '';
    }
  }

  private getRandom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
