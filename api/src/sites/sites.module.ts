import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { UsersModule } from '../users/users.module';
import { Site } from './entities/site.entity';
import { SitesResolver } from './sites.resolver';
import { SitesService } from './sites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Site]),
    forwardRef(() => UsersModule),
    forwardRef(() => CategoriesModule),
  ],
  providers: [SitesResolver, SitesService],
  exports: [SitesService],
})
export class SitesModule {}
