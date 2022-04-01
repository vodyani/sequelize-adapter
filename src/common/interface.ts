import { FindAndCountOptions } from 'sequelize';
import { PaginationQueryOptions } from '@vodyani/core';

export interface PaginationOptions {
  pagination: PaginationQueryOptions;
  findOptions?: FindAndCountOptions;
}
