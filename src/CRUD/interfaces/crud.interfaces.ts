import { CrudClient } from '../crud.client';

export interface ICrudProps {
    service?: CrudClient,
}

export interface ICrudState {
    lol: number;
}
