/**
 * Interface for the book data.
 *
 * @export
 * @interface BookData
 * @property {string} name - The name of the book.
 * @property {string} author - The author of the book.
 * @property {string} title - The title of the book.
 * @property {string} topic - The topic of the book.
 * @property {string} targetAudience - The target audience of the book.
 * @property {number} numChapters - The number of chapters of the book.
 * @property {number} numSections - The number of sections of the book.
 * @property {string} cover - The cover of the book.
 */
export interface BookData {
  name: string;
  author: string;
  title: string;
  topic: string;
  targetAudience: string;
  numChapters: number;
  numSections: number;
  cover: string;
}
