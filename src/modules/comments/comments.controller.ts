import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDTO, SortCommentDTO } from './dto';
import { UpdateCommentDTO } from './dto';
import { PaginationOptionsDTO } from 'src/shared/dtos';
import { CommentsSortValidationPipe } from './pipes/posts-sort-validation.pipe';
import { DecodeBase64Pipe } from 'src/shared/pipes/decode-base64.pipe';
import { AuthGuard } from '../auth/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCommentDto: CreateCommentDTO) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Query() pagination: PaginationOptionsDTO,
    @Query('sort', new CommentsSortValidationPipe()) sort: SortCommentDTO,
    @Query('select', new DecodeBase64Pipe()) select: any,
  ) {
    return this.commentsService.findAll({ pagination, sort, select });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(
    @Param('id') id: string,
    @Query('select', new DecodeBase64Pipe()) select: any,
  ) {
    return this.commentsService.findOneById(id, select);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDTO) {
    return this.commentsService.updateOneById(id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.deleteOneById(id);
  }
}
