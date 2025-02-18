import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}

  getReports() {
    return this.reportRepository.find();
  }

  create(reportDto: CreateReportDto, user: User) {
    const newReport = this.reportRepository.create(reportDto);

    newReport.user = user;

    return this.reportRepository.save(newReport);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportRepository.findOne({ where: { id } });

    if (!report) throw new NotFoundException('Report not found');

    report.approved = approved;

    return this.reportRepository.save(report);
  }
}
