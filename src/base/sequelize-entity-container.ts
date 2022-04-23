import { StoreContainer } from '@vodyani/core';

export class EntityContainer implements StoreContainer {
  private static readonly container: Map<string, Map<string, any>> = new Map();

  public static registry(scope: string, name: string, target: any) {
    if (scope && name && target) {
      EntityContainer.generate(scope);
      EntityContainer.container.get(scope).set(name, target);
    }
  }

  public static discovery(scope: string) {
    if (scope) {
      EntityContainer.generate(scope);
      const items = EntityContainer.container.get(scope);
      return items.size > 0 ? [...items.values()] : [];
    }
  }

  private static generate(scope: string) {
    if (scope && !EntityContainer.container.has(scope)) {
      EntityContainer.container.set(scope, new Map());
    }
  }
}
