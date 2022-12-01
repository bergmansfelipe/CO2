import {Customer} from './customer.interface';

export interface EligibilityValidationResult {
  eligible: boolean;
  notEligibleReason?: string;
  co2Economy?: number;
}

export interface EligibilityValidation {
  run(customer: Customer): EligibilityValidationResult;
}
