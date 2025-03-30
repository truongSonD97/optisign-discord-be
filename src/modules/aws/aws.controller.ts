import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AwsService } from './aws.service';
@UseGuards(JwtAuthGuard)
@Controller('aws')
@ApiBearerAuth()
@ApiTags('AWS signature')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @ApiQuery({
    name: 'fileType',
    type: 'string',
  })
  @ApiQuery({
    name: 'fileExt',
    type: 'string',
  })
  @Get('s3-signed')
  async getSignedUrl(@Query() params) {
    return this.awsService.getSignedUrl(params);
  }
}
