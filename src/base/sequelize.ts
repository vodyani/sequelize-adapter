import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { EntityContainer } from './sequelize-entity-container';

export class BaseSequelize extends Sequelize {
  constructor(options: SequelizeOptions, scope?: string) {
    if (!options) {
      throw new Error('Invalid options');
    }

    const models = options.models || EntityContainer.discovery(scope);

    if (models) {
      options.models = models;
    }

    super(options);
  }
}
