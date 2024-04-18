export interface Combo {
    id: number;
    name?: string;
    description?: string;
    price: number;
    quantity?: number;
    services?: { id: number, name: string }[]
}
