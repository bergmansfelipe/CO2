"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eligibility = void 0;
class Eligibility {
    constructor(validations) {
        this.validations = validations;
    }
    process(customer) {
        const eligibilities = [];
        const notEligibleReasons = [];
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
exports.Eligibility = Eligibility;
//# sourceMappingURL=process-eligibility.js.map