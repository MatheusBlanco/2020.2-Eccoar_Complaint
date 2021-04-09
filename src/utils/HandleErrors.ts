import { NextFunction, Request, Response } from 'express';
import { GeneralError } from '../utils/Error';

export default (error: Error | GeneralError, req: Request, res: Response, next: NextFunction) => {
  if(error instanceof GeneralError) {
    return res.status(error.getCode()).json({
      status: "Error",
      message: error.message
    })
  }

  return res.status(500).json({
    status: "Error",
    message: error.message
  })
}