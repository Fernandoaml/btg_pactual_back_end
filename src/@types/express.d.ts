declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    userIP: {
      ip: string;
    };
  }
}
