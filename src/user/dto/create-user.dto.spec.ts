import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  // agrupa os testes relacionados ao CreateUserDto

  let dto = new CreateUserDto();

  beforeEach(() => {
    //executa antes de cada teste
    dto = new CreateUserDto();
    dto.name = 'John Doe';
    dto.email = 'john.doe@example.com';
    dto.password = '123456A#';
  });

  it('should validate complete valid data', async () => {
    //representa um cenário
    const errors = await validate(dto); //percorre todos os decorators do CreateUserDto e retorna um array de erros, caso haja algum

    expect(errors.length).toBe(0);
  });

  it('should fail on invalid email', async () => {
    // Arrange
    dto.email = 'test';
    // Act
    const errors = await validate(dto);
    // Assert
    // console.log(errors);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  // 1) At least 1 uppercase letter
  // 2) At least 1 number
  // 3) At least 1 special character
  it('should return specific validation messages', async () => {
    dto.password = 'abcdfa';
    const errors = await validate(dto);
    const passwordError = errors.find((error) => error.property === 'password');
    expect(passwordError).not.toBeUndefined();
    const messages = Object.values(passwordError?.constraints ?? {});
    expect(messages).toContain(
      'Password must contain at least 1 uppercase letter',
    );
  });
});
