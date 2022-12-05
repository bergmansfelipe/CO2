import * as functions from 'firebase-functions';
import Ajv from 'ajv';
import {Eligibility} from './domain/process-eligibility';
import {
  ConsumptionClassValidation,
} from './domain/validations/consumption-class.validation';
import {
  ConsumptionMinimalValidation,
} from './domain/validations/consumption-minimal.validation';
import {
  TariffModalityValidation,
} from './domain/validations/tariff-modality.validations';
import {Customer} from './domain/interfaces/customer.interface';
import {input} from './domain/schemas/input.schema';
import {EligibilityResponseBuilder} from './output-eligibility.builder';

const ajv = new Ajv();

const eligibility = new Eligibility([
  new ConsumptionClassValidation(),
  new TariffModalityValidation(),
  new ConsumptionMinimalValidation(),
]);

// https://firebase.google.com/docs/functions/typescript
export const processEligibility = functions.https.onRequest(
    (request, response) => {
      const validate = ajv.compile<Customer>(input);

      const customer = request.body;
      functions.logger.info('productEligibility customer', {...customer});

      if (validate(customer)) {
        functions.logger.info(
            'productEligibility - init eligibility.process',
            {...customer}
        );
        const output = eligibility.process(customer);
        functions.logger.info('productEligibility output', {...output});
        response.send(new EligibilityResponseBuilder(output).build());
      } else {
        response.status(400).send(validate.errors);
      }
    }
);
