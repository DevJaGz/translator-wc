type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (infer R)[]
    ? DeepReadonly<R>[]
    : T[P] extends Record<string, unknown>
      ? DeepReadonly<T[P]>
      : T[P];
};
