import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('SiteStats')
@InputType('SiteStatsInput')
export class SiteStats {
  @Field()
  totalItems: number;
  @Field()
  totalCategories: number;
}
