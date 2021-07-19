import { BadRequestException, Injectable } from '@nestjs/common';
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
    site.owner = createSiteInput.owner;

    return this.sitesRepository.save(site);
  }

  findAll() {
    return this.sitesRepository.find();
  }

  findOne(id: number) {
    return this.sitesRepository.findOneOrFail(id);
  }

  async update(id: number, updateSiteInput: UpdateSiteInput) {
    const site = await this.findOne(id);

    if (!site) throw new BadRequestException('Invalid site');

    site.name = updateSiteInput.name;
    return this.sitesRepository.save(site);
  }

  remove(id: number) {
    return this.sitesRepository.delete(id);
  }
}
