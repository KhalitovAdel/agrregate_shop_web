export interface IFindQuery {
    fields?: string[];
}

export interface IListQuery extends IFindQuery {
    limit: number;
    skip: number;
    find?: string;
}
