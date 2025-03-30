import { Injectable, BadRequestException } from '@nestjs/common';
import { prepareToPutObject } from 'src/utils/awsUtils/s3Util';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AwsService {
  async getSignedUrl(params: {fileType:string;fileExt:string}): Promise<any> {
    const { fileType, fileExt } = params;
    if (!fileType) throw new BadRequestException('File type can not empty!');
    if (!fileExt)
      throw new BadRequestException('File extension can not empty!');
    const key = `uploads/test/${fileType}/${uuid()}.${fileExt}`;
    const result = await prepareToPutObject(key);
    return result;
  }
}
