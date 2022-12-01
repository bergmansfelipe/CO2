import {Customer} from './interfaces/customer.interface';
import {EligibilityOutput} from './interfaces/eligibility-output.interface';
import {
  EligibilityValidation,
} from './interfaces/eligibility-validation.interface';

export class Eligibility {
  private readonly validations: EligibilityValidation[];

  constructor(validations: EligibilityValidation[]) {
    this.validations = validations;
  }

  public process(customer: Customer): EligibilityOutput {
    const eligibilities: boolean[] = [];
    const notEligibleReasons: string[] = [];
    let co2Economy = 0;

    for (const validation of this.validations) {
      const result = validation.run(customer);
      eligibilities.push(result.eligible);
      if (!result.eligible && result.notEligibleReason) {
        notEligibleReasons.push(result.notEligibleReason);
      }
      if (result.eligible && result.co2Economy) {
        co2Economy += result.co2Economy;
      }
    }

    const eligibility = (eligibilities.length > 0) ?
      eligibilities.reduce((accumulated, current) => accumulated && current) :
      false;

    return {
      eligible: eligibility,
      notEligibleReasons,
      co2Economy,
    };
  }
}
