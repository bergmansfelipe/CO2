import {JTDDataType} from 'ajv/dist/jtd';
import {
  EligibilityOutput,
} from './domain/interfaces/eligibility-output.interface';
import {output} from './domain/schemas/output.schema';

export class EligibilityResponseBuilder {
  private readonly eligibility: EligibilityOutput;

  constructor(eligibilityOutput: EligibilityOutput) {
    this.eligibility = eligibilityOutput;
  }

  public build(): JTDDataType<typeof output> {
    const response = {elegivel: this.eligibility.eligible};

    if (this.eligibility.eligible) {
      return {
        ...response,
        economiaAnualDeCO2: this.eligibility.co2Economy,
      };
    } else {
      return {
        ...response,
        razoesDeInelegibilidade: this.eligibility.notEligibleReasons,
      };
    }
  }
}
