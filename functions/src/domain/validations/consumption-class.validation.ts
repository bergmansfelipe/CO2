import {
  EligibilityValidation,
  EligibilityValidationResult,
} from '../interfaces/eligibility-validation.interface';
import {Customer} from '../interfaces/customer.interface';

export class ConsumptionClassValidation implements EligibilityValidation {
  private readonly eligibleConsumptionClasses = [
    'comercial',
    'residencial',
    'industrial',
  ];
  private readonly notEligibleReasonMessage = 'Classe de consumo não aceita';

  public run(customer: Customer): EligibilityValidationResult {
    const eligible = this.eligibleConsumptionClasses.includes(
        customer.consumptionClass
    );

    return {
      eligible,
      notEligibleReason: (eligible) ? undefined : this.notEligibleReasonMessage,
    };
  }
}
