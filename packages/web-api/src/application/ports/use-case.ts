export type IUseCase<P, R> = {
  execute: (args: P) => Promise<R>;
};

export type IUseCaseFactory<D, P, R> = (dependencies: D) => IUseCase<P, R>;
