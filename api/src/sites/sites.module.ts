import { forwardRef, Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesResolver } from './sites.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';

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
