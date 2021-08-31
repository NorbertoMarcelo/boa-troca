import { brasilApi } from '@apis/brasilApi';
import { cpf } from 'cpf-cnpj-validator';

export class UserDataValidation {
  async name(name: string): Promise<boolean> {
    const regex = /[^A-Za-z]\s/;

    const nameTest = regex.test(name);

    if (nameTest) return false;
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

    if (passwordLengh < 6) return false;

    return true;
  }

  async cpf(cpfNumber: string): Promise<boolean> {
    const cpfIsValid = cpf.isValid(cpfNumber);

    if (cpfIsValid) return true;

    return false;
  }

  async cep(cep: string): Promise<boolean> {
    const cepIsValid = await brasilApi
      .get(`/cep/v1/${cep}`)
      .then((response) => {
        if (response.status === 200) {
          return true;
        }
      });

    return false;
  }
}
