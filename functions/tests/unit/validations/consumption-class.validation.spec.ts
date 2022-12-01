import {expect} from 'chai';
import {ConsumptionClassValidation} from '../../../src/domain/validations/consumption-class.validation';
import {EligibilityValidationResult} from '../../../src/domain/interfaces/eligibility-validation.interface';
import {CustomerFactory} from '../../factory/customer.factory';

describe('ConsumptionClassValidation', () => {
  const validation = new ConsumptionClassValidation();

  describe('.run()', () => {
    let result: EligibilityValidationResult;

    context('when customer consumption class is eligible', () => {
      const customer = CustomerFactory.build({ consumptionClass: 'industrial' });    

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

    context('when customer consumption class not eligible', () => {
      const customer = CustomerFactory.build({ consumptionClass: 'rural' });

      before(() => {
        result = validation.run(customer);
      })

      it('should return not eligible', () => {
        expect(result.eligible).to.be.false;
      });

      it('notEligibleReason should be undefined', () => {
        expect(result.notEligibleReason).to.be.equals('Classe de consumo não aceita');
      });

      it('co2Economy should be undefined', () => {
        expect(result.co2Economy).to.be.undefined;        
      });
    });
  });
});