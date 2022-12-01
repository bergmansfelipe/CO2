"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEligibility = void 0;
const functions = require("firebase-functions");
const ajv_1 = require("ajv");
const process_eligibility_1 = require("./domain/process-eligibility");
const consumption_class_validation_1 = require("./domain/validations/consumption-class.validation");
const consumption_minimal_validation_1 = require("./domain/validations/consumption-minimal.validation");
const tariff_modality_validations_1 = require("./domain/validations/tariff-modality.validations");
const input_schema_1 = require("./domain/schemas/input.schema");
const ajv = new ajv_1.default();
const eligibility = new process_eligibility_1.Eligibility([
    new consumption_class_validation_1.ConsumptionClassValidation(),
    new tariff_modality_validations_1.TariffModalityValidation(),
    new consumption_minimal_validation_1.ConsumptionMinimalValidation(),
]);
// https://firebase.google.com/docs/functions/typescript
exports.processEligibility = functions.https.onRequest((request, response) => {
    const validate = ajv.compile(input_schema_1.input);
    const customer = request.query.body;
    functions.logger.info('productEligibility customer', { customer });
    if (validate(customer)) {
        const output = eligibility.process(customer);
        functions.logger.info('productEligibility', { structuredData: true });
        functions.logger.info('productEligibility output', Object.assign({}, output));
        response.send({
            elegivel: output.eligible,
            razoesInelegibilidade: output.notEligibleReasons,
            economiaAnualDeCO2: output.notEligibleReasons,
        });
    }
    else {
        response.status(400).send(validate.errors);
    }
});
//# sourceMappingURL=index.js.map