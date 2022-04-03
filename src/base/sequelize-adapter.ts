import { AsyncClientAdapter } from '@vodyani/core';
import { SequelizeOptions } from 'sequelize-typescript';

import { BaseSequelize } from './sequelize';

export class SequelizeAdapter implements AsyncClientAdapter<BaseSequelize> {
  public instance: BaseSequelize;

  constructor(option: SequelizeOptions, scope?: string) {
    this.instance = new BaseSequelize(option, scope);
  }

  public async close() {
    await this.instance.close();
  }
}
