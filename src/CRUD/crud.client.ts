import { AxiosInstance } from 'axios';
import { stringify } from 'qs';

import { IFindQuery, IListQuery } from '../@interfaces/list-query.interface';

export class CrudClient {
    constructor(protected readonly http: AxiosInstance, protected readonly prefix: string = '') {}

    async create(data: unknown) {
        return this.http.request<unknown, unknown>({
            method: 'POST',
            data,
            url: this.prefix,
        });
    }

    async update(id: unknown, data: unknown) {
        return this.http.request<unknown, unknown>({
            method: 'PUT',
            data,
            url: `${this.prefix}/${id}`,
        });
    }

    async delete(id: unknown) {
        return this.http.request<unknown, unknown>({
            method: 'DELETE',
            url: `${this.prefix}/${id}`,
        });
    }

    // TODO: implement list interface
    async list(query?: IListQuery) {
        return this.http.request<unknown, unknown>({
            method: 'GET',
            url: `${this.prefix}?${query ? stringify(query) : ''}`,
        });
    }

    // TODO: implement fetchOne interface
    async fetchOne(id: unknown, query?: IFindQuery) {
        return this.http.request<unknown, unknown>({
            method: 'GET',
            url: `${this.prefix}/${id}?${query ? stringify(query) : ''}`,
        });
    }

    async options() {
        return this.http.request<unknown, unknown>({ method: 'OPTIONS', url: this.prefix });
    }
}
