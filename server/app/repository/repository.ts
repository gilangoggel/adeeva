

import {LucidModel, ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";

export interface Repository<T extends LucidModel>{
  query : ModelQueryBuilderContract<T, InstanceType<LucidModel>>
  params: Record<string, any>
}
