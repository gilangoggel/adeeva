import { Repository } from './repository'
import ResellerProduct from "App/Models/ResellerProduct";
import {LucidModel, ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";

export type UpdateStockConfig = {
  productId: number
  resellerId?: number
  total: number
}

export class ResellerProductRepository implements Repository<typeof ResellerProduct>{
  params: Record<string, any>;
  query: ModelQueryBuilderContract<typeof ResellerProduct, InstanceType<LucidModel>>;
  resellerId?: number

  constructor(params: Record<string, any>,resellerId?: any) {
    this.query = ResellerProduct.query()
      .preload('product');
    if (resellerId){
      this.query= this.query
        .where('reseller_id', resellerId)
      this.resellerId = resellerId;
    }
    this.params = {...params, page: 1, perPage: 10};
  }

  updateStock = async ( config: UpdateStockConfig ) => {
    const { total, resellerId = this.resellerId, productId } = config
    const entity = await ResellerProduct.query()
      .where('reseller_id', resellerId as number)
      .where('product_id', productId).first()
    if (entity){
      entity.stock = entity.stock + total;
      await entity.save();
      return entity;
    }
    return ResellerProduct.create({
      resellerId,
      productId,
      stock : total
    })
  }

  paginate = async () => {
    const { page, perPage } = this.params;
    const paginator = await this.query
      .paginate(page, perPage)
    return {
      paginator: await paginator.serialize()
    }
  }

}
