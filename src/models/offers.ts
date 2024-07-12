import { pool } from "../database/connection";
export const fetchOffers = async (query?: any, params?: any) => {

    const { limit, page } = query ? query : { limit: 98, page: 0 }

    const SQLString = `SELECT * FROM offers `
    return pool.query(SQLString + `${params?.itemName ? `WHERE offers.name LIKE '${params?.itemName}'` : ``} LIMIT ${limit || 98} OFFSET ${page || 0} ;`)
}