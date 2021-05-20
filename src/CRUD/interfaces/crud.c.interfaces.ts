import { IGeneratorField } from '../../@interfaces/generator.interface';
import { CrudClient } from '../crud.client';

export type ICrudCStateTarget = { [key: string]: string | number | null | boolean };

export interface ICrudCProps {
    onAccess: CrudClient['update'] | CrudClient['create'],
    onClose: (data: ICrudCStateTarget) => Promise<ICrudCStateTarget>,
    options: { [key: string]: IGeneratorField },
    toUpdate: ICrudCStateTarget | null,
    idKey?: string;
}

export interface ICrudCState {
    target: ICrudCStateTarget;
    errors: { [key: string]: string };
}
