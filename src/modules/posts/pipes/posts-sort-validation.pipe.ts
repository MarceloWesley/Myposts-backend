import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { SortPostDTO } from 'src/modules/posts/dto';

@Injectable()
export class PostsSortValidationPipe implements PipeTransform {
  public async transform(value: string) {
    if (!value) return;

    const parsedValue = JSON.parse(value);

    const dto = plainToInstance(SortPostDTO, parsedValue, {});
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
