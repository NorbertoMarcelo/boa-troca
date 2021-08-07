import { brasilApi } from '@apis/brasilApi';
import { AppError } from '@errors/AppError';
import { cpf } from 'cpf-cnpj-validator';

export class UserDataValidation {
  async name(name: string): Promise<void> {
    const regex = /[^A-Za-z]\s/;

    const test = regex.test(name);

    if (test)
      throw new AppError(
        'Invalid name, contains numbers or special characters.'
      );
  }

  async email(email: string): Promise<void> {
    const emailStructureRegex = /\S+@\S+\.\S+/;
    const specialCharacterRegex = /[!#$%^&*()=+{}()]/;
    const blankSpaceRegex = /\s/;

    const emailStructureTest = emailStructureRegex.test(email);
    const specialCharacterTest = specialCharacterRegex.test(email);
    const blankSpaceTest = blankSpaceRegex.test(email);

    if (!emailStructureTest) throw new AppError('Email address is not valid.');
    if (specialCharacterTest) throw new AppError('Email address is not valid.');
    if (blankSpaceTest) throw new AppError('Email address is not valid.');
  }

  async password(password: string): Promise<void> {
    const passwordLengh = password.length;

    if (passwordLengh < 6) throw new AppError('Password too short');
  }

  async CPF(CPF: string): Promise<void> {
    const cpfIsValid = cpf.isValid(CPF);

    if (!cpfIsValid) {
      throw new AppError('User data is not correct');
    }
  }

  async CEP(CEP: string): Promise<void> {
    const cepIsValid = await brasilApi
      .get(`/cep/v1/${CEP}`)
      .then((response) => {
        if (response.status === 200) {
          return;
        } else {
          throw new AppError('CEP is invalid');
        }
      });
  }
}
