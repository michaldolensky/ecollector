import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { FileUpload } from 'graphql-upload';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { S3File } from './file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(S3File)
    private filesRepository: Repository<S3File>,
    private readonly configService: ConfigService,
  ) {}

  async uploadFile(
    file: FileUpload,
    key = `${uuid()}-${file.filename}`,
  ): Promise<S3File> {
    const s3 = new S3({
      endpoint: this.configService.get('AWS_S3_ENDPOINT'),
    });
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Body: file.createReadStream(),
        Key: key,
      })
      .promise();

    const newFile = this.filesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.filesRepository.save(newFile);
    return newFile;
  }

  async deleteFile(fileId: number) {
    const file = await this.filesRepository.findOne({ id: fileId });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: file.key,
      })
      .promise();
    await this.filesRepository.delete(fileId);
  }
}
