import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  @MaxLength(1000)
  @MinLength(3)
  public readonly content: string;

  @IsString()
  @IsNotEmpty()
  public readonly user: string;

  @IsString()
  @IsNotEmpty()
  public readonly post: string;
}
