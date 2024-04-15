import { BadRequestException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { SortUserDTO } from '../dto';
import { UsersSortValidationPipe } from './users-sort-validation.pipe';

describe('UsersSortValidationPipe', () => {
  it('should be defined', () => {
    // ? ARRANGE
    const sut = new UsersSortValidationPipe();

    // ? ACT
    // ? ASSERT
    expect(sut).toBeDefined();
  });

  describe('transform', () => {
    it('should transform value and return a valid DTO', async () => {
      // ? ARRANGE
      const sut = new UsersSortValidationPipe();

      const dto: SortUserDTO = {
        createdAt: 1,
        username: 1,
      };
      const value = JSON.stringify(dto);

      const parsedValue = JSON.parse(value);
      const expectedResult = plainToInstance(SortUserDTO, parsedValue, {});

      // ? ACT
      const result = await sut.transform(value);

      // ? ASSERT
      expect(result).toEqual(expectedResult);
    });

    it('should transform value and throw an error', async () => {
      // ? ARRANGE
      const sut = new UsersSortValidationPipe();

      const invalidDto: SortUserDTO = {
        createdAt: '1',
        username: '1',
      } as any;
      const value = JSON.stringify(invalidDto);

      const parsedValue = JSON.parse(value);
      const expectedResult = plainToInstance(SortUserDTO, parsedValue, {});

      const expectedErrors = await validate(expectedResult);

      // ? ACT
      const result = sut.transform(value);

      // ? ASSERT
      await expect(result).rejects.toThrow(
        new BadRequestException(
          expectedErrors
            .map((e) => Object.values(e.constraints))
            .reduce((previous, current) => [...previous, ...current]),
        ),
      );
    });
  });
});
