import { Request, Response, NextFunction } from 'express';
import reqIP from 'request-ip';

export default function captureIP(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const userIP: string | null = reqIP.getClientIp(request);

  if (userIP) {
    request.userIP = {
      ip: userIP,
    };
  }
  return next();
}
