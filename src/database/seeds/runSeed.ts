import { Item, Offer, seedItems, seedOffers } from "./seed"
import { pool } from '../connection'
import  dotenv from 'dotenv'

const itemsData: Item[] = require('../data/itemsData.json')
const offersData: Offer[] = require('../data/offersData.json')

const runSeed = async () => {
    await seedItems(itemsData)
    await seedOffers(offersData)
    await pool.end()
}
runSeed()