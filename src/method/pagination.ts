import { Model } from 'sequelize';
import { Class, PaginationResult } from '@vodyani/core';
import { convert, convertNumber, convertString } from '@vodyani/transformer';

import { PaginationOptions } from '../common';

export async function pagination<T extends Model>(this: Class<T> & typeof Model, options: PaginationOptions) {
  const result: PaginationResult<T> = {
    rows: [],
    page: {
      index: 1,
      size: 20,
      count: 0,
      pageCount: 0,
    },
  };

  if (!options) {
    return result;
  }

  const { pagination, findOptions } = options;

  const orderBy = convert(pagination.orderBy);
  const size = convertNumber(pagination.size, 20);
  const index = convertNumber(pagination.index, 1);
  const orderRule = convertString(pagination.orderRule, 'DESC');

  if (orderBy) {
    findOptions.order = [[orderBy, orderRule]];
  }

  findOptions.limit = size;
  findOptions.offset = (index - 1) * size;

  const data = await this.findAndCountAll(findOptions);

  if (!data?.rows) {
    return result;
  }

  result.page.pageCount = Math.floor((data.count - 1) / size) + 1;
  result.page.count = data.count;
  result.page.index = index;
  result.page.size = size;

  result.rows = data.rows;

  return result;
}
