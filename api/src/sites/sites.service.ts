import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateSiteInput } from './dto/create-site.input';
import { UpdateSiteInput } from './dto/update-site.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './entities/site.entity';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site) private sitesRepository: Repository<Site>,
  ) {}

  create(createSiteInput: CreateSiteInput) {
    const site = new Site();
    site.name = createSiteInput.name;
    site.urlString = createSiteInput.urlString;
    site.ownerId = createSiteInput.userId;

    return this.sitesRepository.save(site);
  }

  findAll() {
    return this.sitesRepository.find();
  }

  async findOne(id: number) {
    const site = await this.sitesRepository.findOne({ id });
    if (site) {
      return site;
    }
    throw new HttpException(
      'Site with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateSiteInput: UpdateSiteInput) {
    const site = await this.findOne(id);
    if (!site) throw new BadRequestException('Invalid site');
    Object.assign(site, updateSiteInput);
    await this.sitesRepository.update(id, site);
    return site;
  }

  async remove(id: number) {
    const site = await this.sitesRepository.findOne({ where: { id } });
    if (!site) throw new Error('Site not found!');
    await this.sitesRepository.delete(id);
  }

  async getSitesWithOwnerId(userId: number): Promise<Site[]> {
    return await this.sitesRepository.find({ where: { ownerId: userId } });
  }
}
