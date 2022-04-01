import { BelongsTo, BelongsToMany, HasOne, HasMany, ModelClassGetter } from 'sequelize-typescript';

import { EntityContainer } from './sequelize-entity-container';

/**
 * Register the specified entity to the global container
 *
 * @param scope configuration scope for the entity
 *
 * @publicApi
 */
export const Entity = (scope: string) => {
  return (target: any) => EntityContainer.registry(scope, target.name, target);
};
/**
 * Set up a one-to-one association in the primary table (logical association, no real foreign key)
 *
 * @param getter `() => Model` Target Table Entity
 * @param foreignKey Fields used for association in the current table
 *
 * @example
 *  @MainToOne(() => UserAvatar, 'userId')
 *  userAvatar: UserAvatar;
 */
export const MainToOne = (getter: ModelClassGetter, foreignKey: string) => {
  return HasOne(
    getter,
    {
      foreignKey,
      constraints: false,
      foreignKeyConstraint: false,
    },
  );
};
/**
 * Set up a one-to-one association in a sub-table (logical association, no real foreign key)
 *
 * @param getter `() => Model` Target Table Entity
 * @param foreignKey Fields used for association in the current table
 * @param targetKey Fields used for association in the target table
 *
 * @example
 *  @MainToOne(() => User, 'userId')
 *  user: User;
 */
export const OneToMain = (getter: ModelClassGetter, foreignKey: string, targetKey = 'id') => {
  return BelongsTo(
    getter,
    {
      targetKey,
      foreignKey,
      constraints: false,
      foreignKeyConstraint: false,
    },
  );
};
/**
 * Set up a one-to-many association in the primary table (logical association, no real foreign key)
 *
 * @param getter `() => Model` Target Table Entity
 * @param foreignKey Fields used for association in sub-tables
 *
 * @example
 *  @MainToMany(() => UserOrders, 'userId')
 *  userOrders: UserOrders[];
 */
export const MainToMany = (getter: ModelClassGetter, foreignKey: string) => {
  return HasMany(
    getter,
    {
      foreignKey,
      constraints: false,
      foreignKeyConstraint: false,
    },
  );
};
/**
 * Set in child table Create many-to-one association (logical association, no real foreign key)
 *
 * @param getter `() => Model` Target Table Entity
 * @param foreignKey Fields used for association in the current table
 * @param targetKey Fields used for association in the target table
 *
 * @example
 *  @MainToOne(() => User, 'userId')
 *  user: User;
 */
export const ManyToMain = (getter: ModelClassGetter, foreignKey: string, targetKey = 'id') => {
  return BelongsTo(
    getter,
    {
      targetKey,
      foreignKey,
      constraints: false,
      foreignKeyConstraint: false,
    },
  );
};
/**
 * Settings Create many-to-many associations (logical associations, no real foreign keys)
 *
 * @param getter `() => Model` Target Table Entity
 * @param mapping `() => Model` Mapping Table Entity
 * @param otherKey Fields used for association in the mapping table
 * @param targetKey Fields used for association in the target table
 *
 * @example
 *  @ManyToMany(() => () => Role, () => RoleMapping, 'roleId')
 *  role: Role[];
 */
export const ManyToMany = (getter: ModelClassGetter, mapping: ModelClassGetter, otherKey: string, targetKey = 'id') => {
  return BelongsToMany(
    getter,
    {
      otherKey,
      targetKey,
      through: mapping,
      constraints: false,
      foreignKey: otherKey,
      foreignKeyConstraint: false,
    },
  );
};
