"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.input = void 0;
const types_schema_1 = require("./types.schema");
const enumOf = (values) => ({
    type: typeof values[0],
    enum: values,
});
exports.input = {
    type: 'object',
    additionalProperties: false,
    required: [
        'numeroDoDocumento',
        'tipoDeConexao',
        'classeDeConsumo',
        'modalidadeTarifaria',
        'historicoDeConsumo',
    ],
    properties: {
        numeroDoDocumento: { oneOf: [types_schema_1.cpf, types_schema_1.cnpj] },
        tipoDeConexao: enumOf(types_schema_1.tiposDeConexao),
        classeDeConsumo: enumOf(types_schema_1.classesDeConsumo),
        modalidadeTarifaria: enumOf(types_schema_1.modalidadesTarifarias),
        historicoDeConsumo: {
            type: 'array',
            minItems: 3,
            maxItems: 12,
            items: {
                type: 'integer',
                minimum: 0,
                maximum: 9999,
            },
        },
    },
};
//# sourceMappingURL=input.schema.js.map