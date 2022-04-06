import { Container, isValid } from '@vodyani/core';

export class EntityContainer implements Container {
  private static readonly container: Map<string, Map<string, any>> = new Map();

  public static registry(scope: string, name: string, target: any) {
    if (isValid(scope) && isValid(name) && isValid(target)) {
      EntityContainer.generate(scope);
      EntityContainer.container.get(scope).set(name, target);
    }
  }

  public static discovery(scope: string) {
    if (isValid(scope)) {
      EntityContainer.generate(scope);
      const items = EntityContainer.container.get(scope);
      return items.size > 0 ? [...items.values()] : [];
    }
  }

  private static generate(scope: string) {
    if (isValid(scope) && !EntityContainer.container.has(scope)) {
      EntityContainer.container.set(scope, new Map());
    }
  }
}
