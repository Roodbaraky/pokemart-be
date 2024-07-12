import { Item, seed } from "./seed"
import { pool } from '../connection'
import  dotenv from 'dotenv'

const itemsData: Item[] = require('../data/itemsData.json')


const runSeed = async () => {
    await seed(itemsData)
    await pool.end()
}
runSeed()