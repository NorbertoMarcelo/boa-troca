import { UserDataValidation } from '@utils/UserDataValidation';

describe('User Data Validation', () => {
  let userDataValidation: UserDataValidation;

  beforeEach(() => {
    userDataValidation = new UserDataValidation();
  });

  it('validating username', async () => {
    const correctName = await userDataValidation.name('User Name');
    const tooShortName = await userDataValidation.name('Us');
    const doubleBlanckSpace = await userDataValidation.name('User  Name');
    const specialCharacter = await userDataValidation.name('User Name=');
    const nameWithNumber = await userDataValidation.name('User N4me');

    expect(correctName).toBeTruthy();
    expect(tooShortName).toBeFalsy();
    expect(doubleBlanckSpace).toBeFalsy();
    expect(specialCharacter).toBeFalsy();
    expect(nameWithNumber).toBeFalsy();
  });

  it('validating email', async () => {
    const correctEmail = await userDataValidation.email('user@email.com');
    const emailWithoutAtSign = await userDataValidation.email('useremail.com');
    const specialCharacter = await userDataValidation.email('u#ser@email.com');
    const blanckSpace = await userDataValidation.email('user@email.com ');

    expect(correctEmail).toBeTruthy();
    expect(emailWithoutAtSign).toBeFalsy();
    expect(specialCharacter).toBeFalsy();
    expect(blanckSpace).toBeFalsy();
  });

  it('validating password', async () => {
    const validPassword = await userDataValidation.password('pass123');
    const tooShortPassword = await userDataValidation.password('123');
    const blanckSpace = await userDataValidation.password('pass 123');

    expect(validPassword).toBeTruthy();
    expect(tooShortPassword).toBeFalsy();
    expect(blanckSpace).toBeFalsy();
  });

  it('validating phone', async () => {
    const validPhoneNumber = await userDataValidation.phone('3232148000');
    const lettersWithNumbers = await userDataValidation.phone('3232148o00');
    const specialCharacter = await userDataValidation.phone('323214#000');

    expect(validPhoneNumber).toBeTruthy();
    expect(lettersWithNumbers).toBeFalsy();
    expect(specialCharacter).toBeFalsy();
  });

  it('validating cpf', async () => {
    const validCpf = await userDataValidation.cpf('15373245003');
    const invalidCpf = await userDataValidation.cpf('11100011100');
    const blanckSpace = await userDataValidation.cpf(' 15373245003');
    const invalidCharacter = await userDataValidation.cpf(' i5373245003');
    const specialCharacter = await userDataValidation.cpf('1$373245003');

    expect(validCpf).toBeTruthy();
    expect(invalidCpf).toBeFalsy();
    expect(blanckSpace).toBeFalsy();
    expect(invalidCharacter).toBeFalsy();
    expect(specialCharacter).toBeFalsy();
  });

  it('validating cep', async () => {
    const existingCep = await userDataValidation.cep('36032490');
    const nonExistingCep = await userDataValidation.cep('00000000');
    const invalidCharacter = await userDataValidation.cep(' 3603249o');
    const specialCharacter = await userDataValidation.cep('36032$90');

    expect(existingCep).toBeTruthy();
    expect(nonExistingCep).toBeFalsy();
    expect(invalidCharacter).toBeFalsy();
    expect(specialCharacter).toBeFalsy();
  });
});
