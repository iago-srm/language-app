export abstract class CustomError {
  abstract HTTPstatusCode?: number;
  errorName: string;
  params?: any;

  constructor(args: { errorName: string; params?: any }) {
    this.errorName = args.errorName;
    this.params = args.params;
  }
}
