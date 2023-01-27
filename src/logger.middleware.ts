import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger("INFO");
    logger.log(new Date().toISOString() + " " + req.baseUrl + " " + req.url + " " + req.method)
    next();
  }
}