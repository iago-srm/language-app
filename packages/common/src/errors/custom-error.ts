export abstract class CustomError extends Error {
  abstract HTTPstatusCode?: number;
  errorName: string;
  params?: any;

  constructor(args: { errorName: string; params?: any }) {
    super();
    this.errorName = args.errorName;
    this.params = args.params;
  }
}
