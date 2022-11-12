import {
  InvalidParameterError,
  DatabaseError,
} from "@language-app/common-utils";

export const handlePrismaError = (e) => {
  const errorName = e.constructor.name;
  if (errorName.startsWith("PrismaClient")) {
    console.log(
      `Prisma error ${e}. ${e.code}/${e.errorCode}. ${e.clientVersion}. ${errorName}`
    );
    if (
      errorName.endsWith("ValidationError") ||
      errorName.endsWith("KnownRequestError")
    ) {
      return new InvalidParameterError();
    } else if (
      errorName.endsWith("InitializationError") ||
      errorName.endsWith("RustPanicError") ||
      errorName.endsWith("UnknownRequestError")
    ) {
      return new DatabaseError();
    }
    return e;
  }

  return e;
};
