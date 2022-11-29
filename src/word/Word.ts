import type { WordTags } from "@/word/WordTags";

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

  getMeanings() {
    return this.senses.map(sense => sense.meaning);
  }
}

export type Conjugation = {
  form: string,
  tags: Array<WordTags>
};

export type Sense = {
  meaning: string,
  examples: { text: string, translation: string }[]
};

export type RelatedWord = {
  word: string;
  id: string;
};
