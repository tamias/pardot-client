import { AccountResponse } from '../types';
import ObjectsBase from './objects-base';
export default class Accounts extends ObjectsBase {
    objectName: string;
    read(): Promise<AccountResponse>;
}
