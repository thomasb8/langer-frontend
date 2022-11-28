import { Word } from "@/word/Word";

export default class WordSession {
  constructor(
    private readonly id: string,
    private readonly entries: WordSessionEntry[],
  ) {}

  static fromDto(dto: any) {
    return new WordSession(dto.id, dto.entries.map((it: any) => ({ wordId: it.wordId, word: Word.fromDto(it.word) }) ));
  }
}

interface WordSessionEntry {
  wordId: string,
  word: Word
}
