import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(
    @CurrentUser() currentUser: User,
    @Body() createReportDto: CreateReportDto,
  ) {
    return this.reportsService.create(createReportDto, currentUser);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  approveReport(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() approveReportDto: ApproveReportDto,
  ) {
    return this.reportsService.changeApproval(id, approveReportDto.approved);
  }
}
