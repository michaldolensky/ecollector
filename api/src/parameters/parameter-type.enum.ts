import { registerEnumType } from '@nestjs/graphql';

export enum ParameterType {
  TEXT = 'text',
}

registerEnumType(ParameterType, {
  name: 'ParameterType',
});
