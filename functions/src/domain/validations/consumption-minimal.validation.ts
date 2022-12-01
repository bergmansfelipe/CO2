import {
  EligibilityValidation,
  EligibilityValidationResult,
} from '../interfaces/eligibility-validation.interface';
import {Customer} from '../interfaces/customer.interface';

export class ConsumptionMinimalValidation implements EligibilityValidation {
  private readonly notEligibleReasonMessage = 'Consumo mínimo não aceito';

  public run(customer: Customer): EligibilityValidationResult {
    let eligible = false;
    let co2Economy = 0;

    if (customer.consumptionHistory.length >= 12) {
      const averageConsumption = this.getAverageConsumptionOfLast12Months(
          customer.consumptionHistory
      );

      eligible = this.validateConsumptionByConnectionType(
          customer.connectionType,
          averageConsumption,
      );

      co2Economy = this.getCO2Economy(averageConsumption);
    }

    return {
      eligible,
      notEligibleReason: (eligible) ? undefined : this.notEligibleReasonMessage,
      co2Economy: (eligible) ? co2Economy : undefined,
    };
  }

  private validateConsumptionByConnectionType(
      connectionType: string,
      averageConsumption: number
  ): boolean {
    if (connectionType === 'monofasico' && averageConsumption > 400) {
      return true;
    } else if (connectionType === 'bifasico' && averageConsumption > 500) {
      return true;
    } else if (connectionType === 'trifasico' && averageConsumption > 750) {
      return true;
    } else {
      return false;
    }
  }

  private getAverageConsumptionOfLast12Months(
      historicalConsumption: number[]
  ): number {
    const last12MonthsConsumption = historicalConsumption.slice(0, 13);

    const accumulated = last12MonthsConsumption.reduce(
        (accumulated, current) => accumulated + current
    ) / 12;
    return parseFloat(accumulated.toFixed(2));
  }

  private getCO2Economy(averageConsumption: number): number {
    const baseKWH = 1000;
    const baseCO2Kg = 84;
    const economy = ((averageConsumption * baseCO2Kg) / baseKWH) * 12;

    return parseFloat(economy.toFixed(2));
  }
}
