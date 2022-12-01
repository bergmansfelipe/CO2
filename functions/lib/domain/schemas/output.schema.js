"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = void 0;
const enumOf = (values) => ({
    type: typeof values[0],
    enum: values,
    example: values[0],
});
exports.output = {
    oneOf: [
        {
            type: 'object',
            additionalProperties: false,
            required: ['elegivel', 'economiaAnualDeCO2'],
            properties: {
                elegivel: enumOf([true]),
                economiaAnualDeCO2: { type: 'number', minimum: 0 },
            },
        },
        {
            type: 'object',
            additionalProperties: false,
            required: ['elegivel', 'razoesDeInelegibilidade'],
            properties: {
                elegivel: enumOf([false]),
                razoesDeInelegibilidade: {
                    type: 'array',
                    uniqueItems: true,
                    items: {
                        type: 'string',
                        enum: [
                            'Classe de consumo não aceita',
                            'Modalidade tarifária não aceita',
                            'Consumo muito baixo para tipo de conexão',
                        ],
                    },
                },
            },
        },
    ],
};
//# sourceMappingURL=output.schema.js.map