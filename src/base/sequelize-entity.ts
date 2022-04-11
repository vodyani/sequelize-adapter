import { pagination } from '../method';
import { Table, Model } from '../common';

@Table({ freezeTableName: true, timestamps: false })
export class BaseEntity<T = any, T2 = any> extends Model<T, T2> {
  /**
   * @param options PaginationQueryOptions
   *
   * @publicApi
   */
  public static pagination = pagination;
}
