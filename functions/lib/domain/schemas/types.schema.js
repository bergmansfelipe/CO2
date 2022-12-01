"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modalidadesTarifarias = exports.classesDeConsumo = exports.tiposDeConexao = exports.cnpj = exports.cpf = void 0;
exports.cpf = {
    type: 'string',
    pattern: '^\\d{11}$',
    example: '21554495008',
};
exports.cnpj = {
    type: 'string',
    pattern: '^\\d{14}$',
    example: '33400689000109',
};
exports.tiposDeConexao = ['monofasico', 'bifasico', 'trifasico'];
exports.classesDeConsumo = [
    'residencial',
    'industrial',
    'comercial',
    'rural',
    'poderPublico',
];
exports.modalidadesTarifarias = [
    'azul',
    'branca',
    'verde',
    'convencional',
];
//# sourceMappingURL=types.schema.js.map