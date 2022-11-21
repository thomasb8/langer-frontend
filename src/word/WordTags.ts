export enum WordTags {
  NOMINATIVE = 'nominative',
  ACCUSATIVE = 'accusative',
  DATIVE = 'dative',
  GENITIVE = 'genitive',
  SINGULAR = 'singular',
  PLURAL = 'plural',

  INDICATIVE = 'indicative',
  PRESENT = 'present',
  PRATERITUM = 'preterite',
  PERFECT = 'perfect',
  SUBJUNCTIVE = 'subjunctive',
  SUBJUNCTIVE_II = 'subjunctive-ii',
  SUBORDINATE = 'subordinate-clause',
  FIRST_PERSON = 'first-person',
  SECOND_PERSON = 'second-person',
  THIRD_PERSON = 'third-person',
}

export const PERSONS = [WordTags.FIRST_PERSON, WordTags.SECOND_PERSON, WordTags.THIRD_PERSON];
