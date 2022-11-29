import { describe, expect, it } from "vitest";
import WordSession from "@/word/WordSession";

describe('#WordSession', () => {
  describe('isOlderThanOneDay', () => {
    it('return true for an older date', () => {
      const session = new WordSession('1', '2022-10-01 18:00:00', []);
      expect(session.isOlderThanOneDay()).toBeTruthy();
    });

    it('return false for 10 seconds ago', () => {
      const recentDate = Date.now() - 10000;
      const dateStr = new Date(recentDate).toISOString();
      const session = new WordSession('1', dateStr, []);
      expect(session.isOlderThanOneDay()).toBeFalsy();
    });

    it('return false for 23 hours ago', () => {
      const recentDate = Date.now() - 23*60*60*1000;
      const dateStr = new Date(recentDate).toISOString();
      const session = new WordSession('1', dateStr, []);
      expect(session.isOlderThanOneDay()).toBeFalsy();
    });

    it('return true for a day before now', () => {
      const recentDate = Date.now() - 24*60*60*1000 - 1;
      const dateStr = new Date(recentDate).toISOString();
      const session = new WordSession('1', dateStr, []);
      expect(session.isOlderThanOneDay()).toBeTruthy();
    });
  })
})
