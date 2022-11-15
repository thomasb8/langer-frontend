export class Word {
  constructor(
    readonly id: string,
    readonly word: string,
    readonly position: string,
    readonly conjugations: Conjugation[],
    readonly senses: Sense[],
    readonly gender: string | null,
    readonly plural: string | null,
    readonly formOf: RelatedWord[] | null
) {}

  static fromDto(dto: any) {
    return new Word(dto.id, dto.word, dto.position, dto.conjugations, dto.senses, dto.gender, dto.plural, dto.formOf);
  }

  getGenderWord(): string {
    if (!this.gender) return '';
    return {
      f: 'die',
      m: 'der',
      n: 'das'
    }[this.gender] || '';
  }
}

export type Conjugation = {
  form: string,
  tags: Array<string>
};

export type Sense = {
  meaning: string,
  examples: { text: string, translation: string }[]
};

export type RelatedWord = {
  word: string;
  id: string;
};
