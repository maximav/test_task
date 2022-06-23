import * as CONSTS from './consts';
import { getDomainSelector } from '../utils/fetch';

export const appSelector = getDomainSelector([CONSTS.DOMAIN]);
