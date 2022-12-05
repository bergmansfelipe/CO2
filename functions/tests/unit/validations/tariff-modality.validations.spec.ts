import {expect} from 'chai';
import {TariffModalityValidation} from '../../../../src/domain/validations/tariff-modality.validations';
import {EligibilityValidationResult} from '../../../../src/domain/interfaces/eligibility-validation.interface';
import {CustomerFactory} from '../../../factory/customer.factory';

describe('ConsumptionClassValidation', () => {
  const validation = new TariffModalityValidation();

  describe('.run()', () => {
    let result: EligibilityValidationResult;

    context('when client consumption class is eligible', () => {
      const customer = CustomerFactory.build({ classeDeConsumo: 'branca' });

      before(() => {
        result = validation.run(customer);
      })

      it('should return eligible', () => {
        expect(result.eligible).to.be.true;
      });

      it('notEligibleReason should be undefined', () => {
        expect(result.notEligibleReason).to.be.undefined;
      });

      it('co2Economy should be undefined', () => {
        expect(result.co2Economy).to.be.undefined;        
      });
    });

    context('when client consumption class not eligible', () => {
      const client = CustomerFactory.build({ classeDeConsumo: 'azul' });

      before(() => {
        result = validation.run(client);
      })

      it('should return not eligible', () => {
        expect(result.eligible).to.be.false;
      });

      it('notEligibleReason should be undefined', () => {
        expect(result.notEligibleReason).to.be.equals('Modalidade tarifária não aceita');
      });

      it('co2Economy should be undefined', () => {
        expect(result.co2Economy).to.be.undefined;        
      });
    });
  });
});
