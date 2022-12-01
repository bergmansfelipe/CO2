import {expect} from 'chai';
import {ConsumptionMinimalValidation} from '../../../src/domain/validations/consumption-minimal.validation';
import {EligibilityValidationResult} from '../../../src/domain/interfaces/eligibility-validation.interface';
import {CustomerFactory} from '../../factory/customer.factory';

describe('ConsumptionClassValidation', () => {
  const validation = new ConsumptionMinimalValidation();

  describe('.valid()', () => {
    let result: EligibilityValidationResult;

    context('when customer connection is "monofásica" and average consumption > 400', () => {
      const customer = CustomerFactory.build({
        connectionType: 'monofasico',
        consumptionHistory: [
          3878,
          9760,
          5976,
          2797,
          2481,
          5731,
          7538,
          4392,
          7859,
          4160,
          6941,
          4597
        ]
      });

      before(() => {
        result = validation.run(customer);
      })

      it('should return eligible', () => {
        expect(result.eligible).to.be.true;
      });

      it('notEligibleReason should be undefined', () => {
        expect(result.notEligibleReason).to.be.undefined;
      });

      it('co2Economy should have value', () => {
        expect(result.co2Economy).to.be.equals(5553.24);        
      });
    });

    context('when customer connection is "bifásica" and average consumption > 500', () => {
      const customer = CustomerFactory.build({
        connectionType: 'bifasico',
        consumptionHistory: [
          7538,
          4392,
          7859,
          4160,
          6941,
          4597,
          2481,
          5731,
          7538,
          4392,
          7859,
          4160,
          6941,
          4597
        ]
      });

      before(() => {
        result = validation.run(customer);
      })

      it('should return eligible', () => {
        expect(result.eligible).to.be.true;
      });

      it('notEligibleReason should be undefined', () => {
        expect(result.notEligibleReason).to.be.undefined;
      });

      it('co2Economy should have value', () => {
        expect(result.co2Economy).to.be.equals(6265.48);        
      });
    });
    
    context('when customer connection is "trifásica" and average consumption > 750', () => {
      const customer = CustomerFactory.build({
        connectionType: 'trifasico',
        consumptionHistory: [
          17538,
          14392,
          17859,
          14160,
          16941,
          14597,
          12481,
          15731,
          17538,
          14392,
          27859,
          34160,
          46941,
          44597
        ]
      });

      before(() => {
        result = validation.run(customer);
      })

      it('should return eligible', () => {
        expect(result.eligible).to.be.true;
      });

      it('notEligibleReason should be undefined', () => {
        expect(result.notEligibleReason).to.be.undefined;
      });

      it('co2Economy should have value', () => {
        expect(result.co2Economy).to.be.equals(22225.47);        
      });
    });

    context('when customer consumption history less than 12 months', () => {
      const customer = CustomerFactory.build({
        connectionType: 'trifasico',
        consumptionHistory: [
          538,
          392,
          859,
        ],
      });

      before(() => {
        result = validation.run(customer);
      })

      it('should return not eligible', () => {
        expect(result.eligible).to.be.false;
      });

      it('should return notEligibleReason', () => {
        expect(result.notEligibleReason).to.be.equals('Consumo mínimo não aceito');
      });

      it('co2Economy should be undefined', () => {
        expect(result.co2Economy).to.be.undefined;        
      });
    });
  });
});