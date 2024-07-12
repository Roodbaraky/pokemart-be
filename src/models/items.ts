import { pool } from "../database/connection";

export const fetchItems = async (query?: any) => {

    const { limit, page } = query ? query : { limit: 98, page: 0 }

    const SQLString = `SELECT * from items `

    return pool.query(SQLString + `LIMIT ${limit||98} OFFSET ${page||0};`)
}