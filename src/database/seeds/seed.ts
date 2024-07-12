import format from 'pg-format';
import { pool } from '../connection';
import 'dotenv/config'
export interface Item {
    id: number,
    name: string,
    sprite: string,
    cost: number,
    effect: string
}

type SpecialPrice = {
    quantity: number,
    price: number
}
export interface Offer {
    name: string,
    specialPrice: SpecialPrice,
    tag: string
}


export const seedItems = async (itemsData: Item[]) => {
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
            [id, name, sprite, cost, effect]
        );

        const insertItemsQuery = format(
            `INSERT INTO items (id, name, sprite, cost, effect) VALUES %L;`,
            values
        );

        await pool.query(insertItemsQuery);

        console.log('Items seeded successfully.');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {

    }
};
export const seedOffers = async (offersData: Offer[]) => {
    try {
        await pool.query(`DROP TABLE IF EXISTS offers;`);
        await pool.query(`CREATE TABLE offers (
name VARCHAR PRIMARY KEY,
specialPrice VARCHAR,
tag VARCHAR
        );`);

        const values = offersData.map(({ name, specialPrice, tag }) => [name, specialPrice, tag])

        const insertOffersQuery = format(
            `INSERT INTO offers (name, specialPrice, tag) VALUES %L;`, values
        )
        await pool.query(insertOffersQuery)

        console.log('Offers seeded successfully.');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {

    }
}
