"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumptionMinimalValidation = void 0;
class ConsumptionMinimalValidation {
    constructor() {
        this.notEligibleReasonMessage = 'Consumo mínimo não aceito';
    }
    run(customer) {
        let eligible = false;
        let co2Economy = 0;
        if (customer.consumptionHistory.length >= 12) {
            const averageConsumption = this.getAverageConsumptionOfLast12Months(customer.consumptionHistory);
            eligible = this.validateConsumptionByConnectionType(customer.connectionType, averageConsumption);
            co2Economy = this.getCO2Economy(averageConsumption);
        }
        return {
            eligible,
            notEligibleReason: (eligible) ? undefined : this.notEligibleReasonMessage,
            co2Economy: (eligible) ? co2Economy : undefined,
        };
    }
    validateConsumptionByConnectionType(connectionType, averageConsumption) {
        if (connectionType === 'monofasico' && averageConsumption > 400) {
            return true;
        }
        else if (connectionType === 'bifasico' && averageConsumption > 500) {
            return true;
        }
        else if (connectionType === 'trifasico' && averageConsumption > 750) {
            return true;
        }
        else {
            return false;
        }
    }
    getAverageConsumptionOfLast12Months(historicalConsumption) {
        const last12MonthsConsumption = historicalConsumption.slice(0, 13);
        const accumulated = last12MonthsConsumption.reduce((accumulated, current) => accumulated + current) / 12;
        return parseFloat(accumulated.toFixed(2));
    }
    getCO2Economy(averageConsumption) {
        const baseKWH = 1000;
        const baseCO2Kg = 84;
        const economy = ((averageConsumption * baseCO2Kg) / baseKWH) * 12;
        return parseFloat(economy.toFixed(2));
    }
}
exports.ConsumptionMinimalValidation = ConsumptionMinimalValidation;
//# sourceMappingURL=consumption-minimal.validation.js.map