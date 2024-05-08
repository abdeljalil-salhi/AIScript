/**
 * Interface for plan data
 * This is used to define the structure of the plan data.
 *
 * @export
 * @interface
 * @module PlanModule
 * @property {string} name - Name of the plan
 * @property {string} description - Description of the plan
 * @property {number} price - Price of the plan
 * @property {number} duration - Duration of the plan
 */
export interface PlanData {
  name: string;
  description: string;
  price: number;
  duration: number;
}

/**
 * Predefined plans data
 * This is used to define the predefined plans in the application.
 *
 * @export
 * @constant
 * @type {PlanData[]}
 * @module PlanModule
 */
export const plans: PlanData[] = [
  {
    name: 'Basic Plan',
    description: 'Basic plan for free users',
    price: 0,
    duration: 0,
  },
  {
    name: 'Pro Plan - Monthly',
    description: 'Monthly subscription for small projects',
    price: parseFloat(process.env.PRO_PLAN_MONTHLY || '10'),
    duration: 30,
  },
  {
    name: 'Pro Plan - Yearly',
    description: 'Yearly subscription for small projects',
    price: parseFloat(process.env.PRO_PLAN_YEARLY || '96'),
    duration: 365,
  },
  {
    name: 'Premier Plan - Monthly',
    description: 'Monthly subscription for large projects',
    price: parseFloat(process.env.PREMIER_PLAN_MONTHLY || '20'),
    duration: 30,
  },
  {
    name: 'Premier Plan - Yearly',
    description: 'Yearly subscription for large projects',
    price: parseFloat(process.env.PREMIER_PLAN_YEARLY || '216'),
    duration: 365,
  },
];
