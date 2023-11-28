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

export const handleFormError = <T>(error: Error, message: string) => {
  let errors: ErrorObject<T> = {} as ErrorObject<T>;

  const isZodError = verifyZodError(error as Error);

  if (isZodError) {
    errors = getZodErrors<T>(error as ZodError);
  }

  return {
    message,
    hasError: true,
    errors,
  };
};
