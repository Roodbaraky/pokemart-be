const format = require('pg-format');
import { pool } from '../connection';

export interface Item {
    id: number,
    name: string,
    sprite: string,
    cost: number, 
    effect: string
}

export const seed = async (itemsData: Item[]) => {
    try {
        await pool.query(`DROP TABLE IF EXISTS items;`);
        await pool.query(
            `CREATE TABLE items (
                id INT PRIMARY KEY,
                name VARCHAR,
                sprite VARCHAR,
                cost INT,
                effect VARCHAR
            );`
        );

        const values = itemsData.map(({ id, name, sprite, cost, effect }) =>
            [+id, name, sprite, cost, effect]
        );

        const insertItemsQuery = format(
            `INSERT INTO items (id, name, sprite, cost, effect) VALUES %L;`,
            values
        );

        await pool.query(insertItemsQuery);

        console.log('Seed data inserted successfully.');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        
    }
};
