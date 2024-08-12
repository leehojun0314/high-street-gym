import { Request } from 'express';
import { TUser } from './userTypes';

export type TExtendedRequest = Request & {
	user?: TUser;
};
