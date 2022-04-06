import { Model } from 'sequelize';
import { Table } from 'sequelize-typescript';

import { pagination } from '../method';

@Table({ freezeTableName: true, timestamps: false })
export class BaseEntity<T> extends Model<T> {
  /**
   * @param options PaginationQueryOptions
   *
   * @publicApi
   */
  public static pagination = pagination;
}
