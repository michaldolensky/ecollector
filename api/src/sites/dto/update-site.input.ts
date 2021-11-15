import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { SiteIdArgs } from '../../common/args/siteId.args';
import { CreateSiteInput } from './create-site.input';

@InputType()
export class UpdateSiteInput extends PartialType(CreateSiteInput) {
  @Field()
  name!: string;
}
@ArgsType()
export class UpdateSiteArgs extends SiteIdArgs {
  @Field(() => UpdateSiteInput)
  updateSiteInput: UpdateSiteInput;
}
