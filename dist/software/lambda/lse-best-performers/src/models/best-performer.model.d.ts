/**
 * This file demonstrates how to create a model class.
 * Models are used when you need to add behavior, validation, or transformation methods.
 * For simple data contracts, use interfaces in the interfaces/ folder instead.
 *
 * Example:
 * export class BestPerformer {
 *     Symbol: string;
 *     Change1m: number;
 *
 *     constructor(data: Partial<BestPerformer>) {
 *         this.Symbol = data.Symbol || '';
 *         this.Change1m = data.Change1m || 0;
 *     }
 *
 *     // Add methods here for business logic
 *     getChangeCategory(): string {
 *         if (this.Change1m > 10) return 'High';
 *         return 'Normal';
 *     }
 * }
 */
