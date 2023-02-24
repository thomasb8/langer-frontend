import { Word } from "@/word/Word";

export default class WordSession {
  constructor(
    readonly id: string,
    readonly createdAt: string,
    readonly entries: WordSessionEntry[],
  ) {}

  static fromDto(dto: any) {
    return new WordSession(dto.id, dto.createdAt, dto.entries);
  }

  getFormattedCreationDate() {
    return Intl.DateTimeFormat(navigator.language).format(Date.parse(this.createdAt));
  }

  isNotOlderThanOneDay() {
    const dayInMilliseconds = 24*60*60*1000;
    return (Date.now() - Date.parse(this.createdAt)) / dayInMilliseconds < 1;
  }
}

export interface WordSessionEntry {
  word: string
}
