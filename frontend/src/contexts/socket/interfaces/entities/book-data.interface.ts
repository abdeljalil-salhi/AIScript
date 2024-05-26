/**
 * Interface for the book data entity.
 *
 * @export
 * @interface BookData
 * @property {string} name - The name of the book.
 * @property {string} author - The author of the book.
 * @property {string} title - The title of the book.
 * @property {string} topic - The topic of the book.
 * @property {string} target_audience - The target audience of the book.
 * @property {number} num_chapters - The number of chapters in the book.
 * @property {number} num_subsections - The number of subsections in the book.
 */
export interface BookData {
  name: string;
  author: string;
  title: string;
  topic: string;
  target_audience: string;
  num_chapters: number;
  num_subsections: number;
}
