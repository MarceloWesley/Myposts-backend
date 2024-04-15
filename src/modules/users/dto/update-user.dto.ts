import { PartialType, OmitType } from '@nestjs/swagger';

import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO extends PartialType(
  OmitType(CreateUserDTO, ['email']),
) {}
