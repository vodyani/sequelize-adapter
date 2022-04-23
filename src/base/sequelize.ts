import { isValidArray, isValidObject } from '@vodyani/validator';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { EntityContainer } from './sequelize-entity-container';

export class BaseSequelize extends Sequelize {
  constructor(options: SequelizeOptions, scope?: string) {
    if (!isValidObject(options)) {
      throw new Error('Invalid options');
    }

    const models = options.models || EntityContainer.discovery(scope);

    if (isValidArray(models)) {
      options.models = models;
    }

    super(options);
  }
}
