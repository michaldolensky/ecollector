import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3File } from './file.entity';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([S3File]), ConfigModule],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
