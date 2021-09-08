import { brasilApi } from '@apis/brasilApi';
import { cpf } from 'cpf-cnpj-validator';

export class UserDataValidation {
  async name(name: string): Promise<boolean> {
    const regex = /[^A-Za-z]\s/;
    const specialCharacterRegex = /[!#$%^&*()=+{}()]/;
    const numbersRegex = /[0-9]/;

    const nameTest = regex.test(name);
    const specialCharacterTest = specialCharacterRegex.test(name);
    const numbersTest = numbersRegex.test(name);

    if (nameTest) return false;
    if (specialCharacterTest) return false;
    if (numbersTest) return false;
    if (name.length < 3) return false;
    if (name.length > 120) return false;

    return true;
  }

  async email(email: string): Promise<boolean> {
    const emailStructureRegex = /\S+@\S+\.\S+/;
    const specialCharacterRegex = /[!#$%^&*()=+{}()]/;
    const blankSpaceRegex = /\s/;

    const emailStructureTest = emailStructureRegex.test(email);
    const specialCharacterTest = specialCharacterRegex.test(email);
    const blankSpaceTest = blankSpaceRegex.test(email);

    if (!emailStructureTest) return false;
    if (specialCharacterTest) return false;
    if (blankSpaceTest) return false;

    return true;
  }

  async password(password: string): Promise<boolean> {
    const passwordLengh = password.length;
    const blankSpaceRegex = /\s/;

    const blankSpaceTest = blankSpaceRegex.test(password);

    if (passwordLengh < 6) return false;
    if (blankSpaceTest) return false;

    return true;
  }

  async phone(phone: string): Promise<boolean> {
    const regex = /^-?\d+\.?\d*$/;

    const test = regex.test(phone);

    return test;
  }

  async cpf(cpfNumber: string): Promise<boolean> {
    const cpfIsValid = cpf.isValid(cpfNumber);
    const blankSpaceRegex = /\s/;

    const blankSpaceTest = blankSpaceRegex.test(cpfNumber);

    if (blankSpaceTest) return false;
    if (cpfIsValid) return true;

    return false;
  }

  async cep(cep: string): Promise<boolean> {
    const res = await brasilApi
      .get(`/cep/v1/${cep}`)
      .then((response) => {
        if (response.status === 200) {
          return true;
        }
      })
      .catch(() => {
        return false;
      });
    return res;
  }
}
