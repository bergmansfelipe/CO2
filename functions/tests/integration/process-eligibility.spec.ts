import {Eligibility} from '../../src/domain/process-eligibility';
import {ConsumptionClassValidation} from '../../src/domain/validations/consumption-class.validation';
import {ConsumptionMinimalValidation} from '../../src/domain/validations/consumption-minimal.validation';
import {TariffModalityValidation} from '../../src/domain/validations/tariff-modality.validations';
import {CustomerFactory} from '../factory/customer.factory';
import {expect} from 'chai';

describe('Integration - Eligibility', () => {

  context('when customer data is eligible', () => {
    const customer = CustomerFactory.build({
      registrationNumber: '14041737706',
      connectionType: 'bifasico',
      consumptionClass: 'comercial',
      tariffModality: 'convencional',      
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
  
    const eligibility = new Eligibility([
      new ConsumptionClassValidation(),
      new TariffModalityValidation(),
      new ConsumptionMinimalValidation(),
    ]);

    it('should be return eligility and CO2 economy', () => {
      const result = eligibility.process(customer);
      expect(result.eligible).to.be.true;
      expect(result.co2Economy).to.be.equals(5553.24);
      expect(result.notEligibleReasons).to.be.empty;
    });
  });

  context('when customer data ineligible', () => {
    const customer = CustomerFactory.build({
      registrationNumber: '14041737706',
      connectionType: 'bifasico',
      consumptionClass: 'rural',
      tariffModality: 'verde',      
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
      ]
    });
  
    const eligibility = new Eligibility([
      new ConsumptionClassValidation(),
      new ConsumptionMinimalValidation(),
      new TariffModalityValidation(),
    ]);

    it('should be return eligility and CO2 economy', () => {
      const result = eligibility.process(customer);
      expect(result.eligible).to.be.false;
      expect(result.notEligibleReasons?.length).to.be.equals(3);
      expect(result.co2Economy).to.be.equals(0);
    });
  });

});