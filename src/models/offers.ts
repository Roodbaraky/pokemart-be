import { pool } from "../database/connection";

export const fetchOffers = async (query?: any, params?: any) => {
    const { limit = 98, page = 0 } = query || {};
    let SQLString = `SELECT * FROM offers `;
    const values: any[] = [];

    if (params?.itemName) {
        SQLString += `WHERE offers.name LIKE $1 `;
        values.push(`%${params.itemName}%`);
    }

    SQLString += `LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, page);

    return pool.query(SQLString, values);
}
