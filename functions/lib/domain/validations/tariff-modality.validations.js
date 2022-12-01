"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TariffModalityValidation = void 0;
class TariffModalityValidation {
    constructor() {
        this.eligibleTariffModality = [
            'convencional',
            'branca',
        ];
        this.notEligibleReasonMessage = 'Modalidade tarifária não aceita';
    }
    run(customer) {
        const eligible = this.eligibleTariffModality.includes(customer.tariffModality);
        return {
            eligible,
            notEligibleReason: (eligible) ? undefined : this.notEligibleReasonMessage,
        };
    }
}
exports.TariffModalityValidation = TariffModalityValidation;
//# sourceMappingURL=tariff-modality.validations.js.map