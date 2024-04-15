import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PaginationOptionsDTO } from 'src/shared/dtos';
import { SortPostDTO } from './dto';
import { PostsSortValidationPipe } from './pipes/posts-sort-validation.pipe';
import { DecodeBase64Pipe } from 'src/shared/pipes/decode-base64.pipe';

@Controller('posts')
export class PostsController {
  private readonly logger = new Logger(PostsController.name);
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDTO) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(
    @Query() pagination: PaginationOptionsDTO,
    @Query('sort', new PostsSortValidationPipe()) sort: SortPostDTO,
    @Query('select', new DecodeBase64Pipe()) select: any,
  ) {
    return this.postsService.findAll({ pagination, sort, select });
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('select', new DecodeBase64Pipe()) select: any,
  ) {
    return this.postsService.findOneById(id, select);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDTO) {
    return this.postsService.updateOneById(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.deleteOneById(id);
  }
}
