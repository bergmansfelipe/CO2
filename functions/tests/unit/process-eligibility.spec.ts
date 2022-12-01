import {expect} from 'chai';
import {Customer} from '../../src/domain/interfaces/customer.interface';
import {Eligibility} from '../../src/domain/process-eligibility';
import {CustomerFactory} from '../factory/customer.factory';
import {EligibilityValidation} from '../../src/domain/interfaces/eligibility-validation.interface';
import {mock, when, instance, resetCalls} from 'ts-mockito';

describe('Eligibility', () => {
  const customer: Customer = CustomerFactory.build();

  const validationAMocked = mock<EligibilityValidation>();
  const validationBMocked = mock<EligibilityValidation>();
  const validationCMocked = mock<EligibilityValidation>();
  
  beforeEach(() => {
    resetCalls(validationAMocked);
    resetCalls(validationAMocked);
    resetCalls(validationAMocked);
  })

  describe('.process()', () => {
    context('when customer meets all eligibility criteria', () => {
      before(() => {
        when(validationAMocked.run(customer)).thenReturn({
          eligible: true,
        });
        when(validationBMocked.run(customer)).thenReturn({
          eligible: true,
        });
        when(validationCMocked.run(customer)).thenReturn({
          eligible: true,
          co2Economy: 1000,
        });
      });

      it('should return eligible and co2 economy', () => {
        const eligibility = new Eligibility([
          instance(validationAMocked),
          instance(validationBMocked),
          instance(validationCMocked)
        ]);
        const result = eligibility.process(customer);
        expect(result.eligible).to.be.true;
        expect(result.co2Economy).to.be.equals(1000);
        expect(result.notEligibleReasons).to.be.empty;
      });
    });

    context('when customer is rejected on one of the eligibility criteria', () => {
      before(() => {
        when(validationAMocked.run(customer)).thenReturn({
          eligible: true,
        });
        when(validationBMocked.run(customer)).thenReturn({
          eligible: false,
          notEligibleReason: 'foo',
        });
        when(validationCMocked.run(customer)).thenReturn({
          eligible: true,
        });
      });

      it('should return not eligible and reason', () => {
        const eligibility = new Eligibility([
          instance(validationAMocked),
          instance(validationBMocked),
          instance(validationCMocked)
        ]);
        const result = eligibility.process(customer);
        expect(result.eligible).to.be.false;
        expect(result.notEligibleReasons?.length).to.be.equals(1);
        expect(result.notEligibleReasons?.shift()).to.be.equals('foo');
      });
    });

    context('when customer is rejected on all eligibility criteria', () => {
      before(() => {
        when(validationAMocked.run(customer)).thenReturn({
          eligible: false,
          notEligibleReason: 'foo',
        });
        when(validationBMocked.run(customer)).thenReturn({
          eligible: false,
          notEligibleReason: 'bar',
        });
        when(validationCMocked.run(customer)).thenReturn({
          eligible: false,
          notEligibleReason: 'cil',
        });
      });

      it('should return not eligible and reasons', () => {
        const eligibility = new Eligibility([
          instance(validationAMocked),
          instance(validationBMocked),
          instance(validationCMocked)
        ]);
        const result = eligibility.process(customer);
        expect(result.eligible).to.be.false;
        expect(result.notEligibleReasons?.length).to.be.equals(3);
        expect(result.notEligibleReasons?.shift()).to.be.equals('foo');
        expect(result.notEligibleReasons?.shift()).to.be.equals('bar');
        expect(result.notEligibleReasons?.shift()).to.be.equals('cil');
      });
    });

    context('when eligibility instanced without validation', () => {
      it('should return not eligible', () => {
        const eligibility = new Eligibility([]);
        const result = eligibility.process(customer);
        expect(result.eligible).to.be.false;
      })
    })
  })
})