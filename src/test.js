const { cpf } = require('cpf-cnpj-validator');

const user = cpf.generate();
const valid = cpf.isValid('10495102678');
console.log(user);
console.log(valid);
