import { Model } from 'sequelize';
import { Table } from 'sequelize-typescript';

import { pagination } from './sequelize-pagination';

@Table({ freezeTableName: true, timestamps: false })
export class BaseEntity<T> extends Model<T> {
  /**
   * @param options PaginationQueryOptions
   */
  public static pagination = pagination;
}
