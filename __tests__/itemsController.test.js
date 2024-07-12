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
const itemsController_1 = require("../src/controllers/itemsController");
const items_1 = require("../src/models/items");
vitest_1.vi.mock('../src/models/items', () => ({
    fetchItems: vitest_1.vi.fn(),
}));
(0, vitest_1.describe)('getItems', () => {
    (0, vitest_1.it)('should call fetchItems with query parameters and send the result', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: { limit: 50, page: 2 },
        };
        const res = {
            status: vitest_1.vi.fn().mockReturnThis(),
            send: vitest_1.vi.fn(),
        };
        const next = vitest_1.vi.fn();
        const mockItems = { rows: [{ id: 1, name: 'Item 1' }] };
        items_1.fetchItems.mockResolvedValueOnce(mockItems);
        yield (0, itemsController_1.getItems)(req, res, next);
        (0, vitest_1.expect)(items_1.fetchItems).toHaveBeenCalledWith(req.query);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(200);
        (0, vitest_1.expect)(res.send).toHaveBeenCalledWith(mockItems.rows);
    }));
    (0, vitest_1.it)('should handle errors and call next with error', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: {},
        };
        const res = {
            status: vitest_1.vi.fn().mockReturnThis(),
            send: vitest_1.vi.fn(),
        };
        const next = vitest_1.vi.fn();
        const error = new Error('Database error');
        items_1.fetchItems.mockRejectedValueOnce(error);
        yield (0, itemsController_1.getItems)(req, res, next);
        (0, vitest_1.expect)(items_1.fetchItems).toHaveBeenCalledWith(req.query);
        (0, vitest_1.expect)(next).toHaveBeenCalledWith(error);
    }));
});
