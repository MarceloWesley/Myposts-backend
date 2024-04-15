import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  public readonly title: string;

  @IsString()
  @MaxLength(5000)
  @MinLength(3)
  public readonly content: string;

  @IsString()
  @IsNotEmpty()
  public readonly user: string;
}
