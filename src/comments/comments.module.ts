import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../posts/entities/event.entity';
import { EmploymentEntity } from '../posts/entities/employment.entity';
import { ExamPrepEntity } from '../posts/entities/exam-prep.entity';
import { JobEntity } from '../posts/entities/job.entity';
import { NoticeEntity } from '../posts/entities/notice.entity';
import { PracticeEntity } from '../posts/entities/practice.entity';
import { TheoryEntity } from '../posts/entities/theory.entity';
import { RepositoryModule } from '../repository/repository.module';
import { CommentsEntity } from './entities/comments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      EmploymentEntity,
      ExamPrepEntity,
      JobEntity,
      NoticeEntity,
      PracticeEntity,
      TheoryEntity,
      CommentsEntity,
    ]),
    RepositoryModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
