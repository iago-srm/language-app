// export type IUseCase<P, R> = {
//   execute: (args: P) => Promise<R>;
// };

export interface IUseCase<P, R> {
  execute: (args: P) => Promise<R>
}
