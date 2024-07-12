"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const items_1 = require("../src/models/items");
const connection_1 = require("../src/database/connection");
vitest_1.vi.mock('../src/database/connection', () => ({
    pool: {
        query: vitest_1.vi.fn(),
    },
}));
(0, vitest_1.describe)('fetchItems', () => {
    (0, vitest_1.it)('should call pool.query with default parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedQuery = 'SELECT * from items LIMIT 98 OFFSET 0;';
        yield (0, items_1.fetchItems)();
        (0, vitest_1.expect)(connection_1.pool.query).toHaveBeenCalledWith(expectedQuery);
    }));
    (0, vitest_1.it)('should call pool.query with custom limit and page', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = { limit: 50, page: 2 };
        const expectedQuery = 'SELECT * from items LIMIT 50 OFFSET 2;';
        yield (0, items_1.fetchItems)(query);
        (0, vitest_1.expect)(connection_1.pool.query).toHaveBeenCalledWith(expectedQuery);
    }));
    (0, vitest_1.it)('should handle string values for limit and page', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = { limit: '30', page: '1' };
        const expectedQuery = 'SELECT * from items LIMIT 30 OFFSET 1;';
        yield (0, items_1.fetchItems)(query);
        (0, vitest_1.expect)(connection_1.pool.query).toHaveBeenCalledWith(expectedQuery);
    }));
    (0, vitest_1.it)('should handle negative values for limit and page', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = { limit: -10, page: -1 };
        const expectedQuery = 'SELECT * from items LIMIT -10 OFFSET -1;';
        yield (0, items_1.fetchItems)(query);
        (0, vitest_1.expect)(connection_1.pool.query).toHaveBeenCalledWith(expectedQuery);
    }));
    (0, vitest_1.it)('should handle missing query object', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedQuery = 'SELECT * from items LIMIT 98 OFFSET 0;';
        yield (0, items_1.fetchItems)();
        (0, vitest_1.expect)(connection_1.pool.query).toHaveBeenCalledWith(expectedQuery);
    }));
});
