import { NextFunction, Request, Response } from "express";
import { KTBankError } from "../controller/KTBankError";
const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof KTBankError) {
    const { queryPath, httpStatusCode, message, stack } = err;

    return res.status(httpStatusCode! || 500).json({
      queryPath,
      httpStatusCode,
      ...(isJsonStr(message) ? JSON.parse(message) : { message }),
      stack: process.env.NODE_ENV === "development" ? stack : {},
    });
  }
  return res
    .status(500)
    .json({
      message: err.message || "Unknown Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
};
export default ErrorHandler;

function isJsonStr(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
