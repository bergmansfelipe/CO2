import {Factory} from 'rosie';
import {Customer} from '../../src/domain/interfaces/customer.interface';

export const CustomerFactory = Factory.define<Customer>('Customer')
  .attr('connectionType', 'bifasico')
  .attr('consumptionClass', 'comercial')
  .attr('consumptionHistory', [
    3878,
    9760,
    5976,
  ])
  .attr('registrationNumber', '14041737706')
  .attr('tariffModality', 'convencional');