"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumptionClassValidation = void 0;
class ConsumptionClassValidation {
    constructor() {
        this.eligibleConsumptionClasses = [
            'comercial',
            'residencial',
            'industrial',
        ];
        this.notEligibleReasonMessage = 'Classe de consumo não aceita';
    }
    run(customer) {
        const eligible = this.eligibleConsumptionClasses.includes(customer.consumptionClass);
        return {
            eligible,
            notEligibleReason: (eligible) ? undefined : this.notEligibleReasonMessage,
        };
    }
}
exports.ConsumptionClassValidation = ConsumptionClassValidation;
//# sourceMappingURL=consumption-class.validation.js.map