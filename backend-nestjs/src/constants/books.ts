/**
 * Interface for book data
 * This is used to define the structure of the book data.
 *
 * @export
 * @interface
 * @module BookModule
 * @property {string} author - The author of the book.
 * @property {string} title - The title of the book.
 * @property {string} topic - The topic of the book.
 * @property {string} targetAudience - The target audience of the book.
 * @property {number} numChapters - The number of chapters in the book.
 * @property {number} numSubsections - The number of subsections in the book.
 * @property {string} cover - The cover image of the book.
 * @property {string} document - The document of the book.
 * @property {string} pdf - The PDF of the book.
 * @property {boolean} isShowcase - Whether the book is a showcase item.
 */
export interface ShowcaseBookData {
  author: string;
  title: string;
  topic: string;
  targetAudience: string;
  numChapters: number;
  numSubsections: number;
  cover: string;
  document: string;
  pdf: string;
  isShowcase: boolean;
}

/**
 * Predefined showcase books data
 * This is used to define the predefined books in the application.
 *
 * @export
 * @constant
 * @type {ShowcaseBookData[]}
 * @module BookModule
 */
export const showcaseBooks: ShowcaseBookData[] = [
  {
    author: 'AIScript',
    title: 'AI-Powered Creativity: The Future of Book Writing',
    topic:
      'How AI technology is revolutionizing the book writing and publishing industry.',
    targetAudience: 'General Audience',
    numChapters: 5,
    numSubsections: 8,
    cover:
      'https://drive.usercontent.google.com/download?id=1vwU2S8sMdFvnv7fbO40vZYtGKMK9KLxY&authuser=0',
    document:
      'https://drive.google.com/uc?id=1eyx4_n6O4yGBcaNMA0P0NPq-h-mWdZGi',
    pdf: 'https://drive.google.com/uc?id=1UllM9gEp-k3Qr9WFvRS5sVXFWhRDMMeK',
    isShowcase: true,
  },
];
