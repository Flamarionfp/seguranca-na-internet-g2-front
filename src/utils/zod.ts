import { ZodError } from "zod";

export const verifyZodError = (error: Error) => {
  return error instanceof ZodError;
};

export type ErrorObject<T> = { [K in keyof T]: string };

export const getZodErrors = <T>(error: ZodError): ErrorObject<T> => {
  if (!(error instanceof ZodError)) return {} as ErrorObject<T>;

  const errorsObject: ErrorObject<T> = {} as ErrorObject<T>;

  error.issues.forEach((issue) => {
    const { message, path } = issue;
    errorsObject[`${path}` as keyof T] = message;
  });

  return errorsObject;
};
