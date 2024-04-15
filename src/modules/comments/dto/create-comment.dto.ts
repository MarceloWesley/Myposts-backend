import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  public readonly content: string;

  @IsString()
  @IsNotEmpty()
  public readonly user: string;

  @IsString()
  @IsNotEmpty()
  public readonly post: string;
}
