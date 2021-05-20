import { GeneratorFields } from '../@enums/generator.enums';

export type IGeneratorField = IGeneratorFieldDefault | IGeneratorInputField | IGeneratorSelectField;

export interface IGeneratorFieldDefault {
    field: GeneratorFields,
    default?: string | number | null;
}

export interface IGeneratorInputField extends IGeneratorFieldDefault {
    type?: 'text' | 'number'
}

export interface IGeneratorSelectField extends IGeneratorFieldDefault {
    isNullable?: boolean,
    values: { id: number | string, title: string }[]
}
