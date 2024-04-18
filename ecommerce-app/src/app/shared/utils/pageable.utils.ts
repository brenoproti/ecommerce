export class PageableUtils {
    static getPageable(event: any) {
        const pageable: any = {};
        pageable.page = event.first + 1;
        pageable.take = event.rows;
        if (event.sortOrder) {
            pageable.order = event.sortOrder > 0 ? 'ASC' : 'DESC';
        }
        return pageable;
    }

    static onSortChange(event: any) {
        let value = event.value;
        let sortOrder: number;
        let sortField: string;
        if (value.indexOf('!') === 0) {
            sortOrder = -1;
            sortField = value.substring(1, value.length);
        } else {
            sortOrder = 1;
            sortField = value;
        }

        return {sortOrder, sortField};
    }

    static getSortOptions() {
        return [{label: 'Maior preço', value: '!price'}, {label: 'Menor preço', value: 'price'}];
    }

    static getPageableUrlParams(pageable: any) {
        if (!pageable.order) {
            pageable.order = 'ASC';
        }
        return `?page=${pageable.page}&take=${pageable.take}&order=${pageable.order}`
    }
}
