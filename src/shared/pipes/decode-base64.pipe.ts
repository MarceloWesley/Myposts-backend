import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DecodeBase64Pipe implements PipeTransform {
  public async transform(value: string) {
    if (!value) return;

    const decoded = Buffer.from(value, 'base64').toString('utf-8');

    return JSON.parse(decoded);
  }
}
// const logger = new Logger('Valor');
// logger.debug(value);
