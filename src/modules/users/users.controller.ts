import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUserDTO } from './dto/update-user.dto';
import { RemoveFieldsInterceptor } from 'src/interceptors/remove-fields';
import { User } from './entities';
import { PaginationOptionsDTO } from 'src/shared/dtos';
import { FindUserDTO } from './dto/find-user.dto';
import { UsersSortValidationPipe } from './pipes';
import { CreateUserDTO, SortUserDTO } from './dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(new RemoveFieldsInterceptor<User>(['password']))
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.createOne(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  public findAll(
    @Query() pagination: PaginationOptionsDTO,
    @Query() filter: FindUserDTO,
    @Query('sort', new UsersSortValidationPipe()) sort: SortUserDTO,
  ) {
    return this.usersService.findAll({ filter, pagination, sort });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.updateOneById(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteOneById(id);
  }
}
