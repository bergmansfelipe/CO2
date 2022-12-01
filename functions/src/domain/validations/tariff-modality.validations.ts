import {
  EligibilityValidation,
  EligibilityValidationResult,
} from '../interfaces/eligibility-validation.interface';
import {Customer} from '../interfaces/customer.interface';

export class TariffModalityValidation implements EligibilityValidation {
  private readonly eligibleTariffModality = [
    'convencional',
    'branca',
  ];
  private readonly notEligibleReasonMessage = 'Modalidade tarifária não aceita';

  public run(customer: Customer): EligibilityValidationResult {
    const eligible = this.eligibleTariffModality.includes(
        customer.tariffModality
    );

    return {
      eligible,
      notEligibleReason: (eligible) ? undefined : this.notEligibleReasonMessage,
    };
  }
}
