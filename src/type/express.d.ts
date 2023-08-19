declare namespace Express {
  export interface Request {
    user?: import('@prisma/client').User;
    admin?: import('@prisma/client').Admin;
  }
}
