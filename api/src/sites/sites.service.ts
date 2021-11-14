import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSiteInput } from './dto/create-site.input';
import { UpdateSiteInput } from './dto/update-site.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './entities/site.entity';
import { User } from '../users/entities/user.entity';
import { SiteStats } from './entities/siteStats';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site) private sitesRepository: Repository<Site>,
  ) {}

  create(createSiteInput: CreateSiteInput, currentUser: User) {
    const site = new Site();
    site.name = createSiteInput.name;
    site.ownerId = currentUser.id;
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
    throw new NotFoundException('Site with this id does not exist');
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
    if (!site) throw new NotFoundException('Site not found!');
    await this.sitesRepository.delete(id);
    return site;
  }

  async getSitesWithOwnerId(userId: number): Promise<Site[]> {
    return await this.sitesRepository.find({ where: { ownerId: userId } });
  }

  async getSiteStats(id: number) {
    const site = await this.sitesRepository.findOne({
      where: { id },
      relations: ['categories', 'items'],
    });

    const stats: SiteStats = {
      totalItems: site.items.length,
      totalCategories: site.categories.length,
    };
    return stats;
  }
}
