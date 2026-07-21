import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  // agrupa os testes relacionados ao CreateUserDto
  it('should validate complete valid data', async () => {
    //representa um cenário
    const dto = new CreateUserDto();
    dto.name = 'John Doe';
    dto.email = 'john.doe@example.com';
    dto.password = '123456';

    const errors = await validate(dto); //percorre todos os decorators do CreateUserDto e retorna um array de erros, caso haja algum

    expect(errors.length).toBe(0);
  });
});
