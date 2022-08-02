export interface IUseCase<P, R> {
  execute: (args: P) => Promise<R>
}
