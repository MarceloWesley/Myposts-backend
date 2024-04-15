import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { SortUserDTO } from '../dto';

@Injectable()
export class UsersSortValidationPipe implements PipeTransform {
  public async transform(value: string) {
    if (!value) return;

    const parsedValue = JSON.parse(value);
    const dto = plainToInstance(SortUserDTO, parsedValue, {});
    const errors = await validate(dto);

    if (errors.length > 0)
      throw new BadRequestException(
        errors
          .map((e) => Object.values(e.constraints))
          .reduce((previous, current) => [...previous, ...current]),
      );

    return dto;
  }
}
