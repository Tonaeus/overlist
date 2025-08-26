import type { Request } from 'express';
import type { Types } from 'mongoose'; 

type AuthRequest = Request & {
  user?: {
    id: Types.ObjectId;
  };
};

export type {
  AuthRequest
}
