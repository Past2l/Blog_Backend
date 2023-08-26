import { ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { FindHistoryDto } from './dto/find-history.dto';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async find(@Query() data: FindHistoryDto, @Req() req) {
    if (!req.user || !req.user.owner)
      throw new HttpException(
        'You do not have permission to find History.',
        HttpStatus.UNAUTHORIZED,
      );
    return this.historyService.find(data);
  }
}
