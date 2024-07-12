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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const itemsController_1 = require("../src/controllers/itemsController");
const errors_1 = require("../src/errors");
vitest_1.vi.mock('../src/controllers/itemsController', () => ({
    getItems: vitest_1.vi.fn((req, res) => {
        res.status(200).send([{ id: 1, name: 'Item 1' }]);
    }),
}));
(0, vitest_1.describe)('Express App', () => {
    let app;
    let server;
    (0, vitest_1.beforeAll)(() => {
        app = (0, express_1.default)();
        app.get("/", (req, res) => {
            res.send("Server is online :)");
        });
        app.get('/items', itemsController_1.getItems);
        app.all('/items', errors_1.errorHandler);
        server = app.listen(5175);
    });
    (0, vitest_1.afterAll)((done) => {
        server.close(done);
    });
    (0, vitest_1.it)('should return "Server is online :)" on the root route', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/');
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.text).toBe('Server is online :)');
    }));
    (0, vitest_1.it)('should call getItems on /items route and return items', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/items');
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body).toEqual([{ id: 1, name: 'Item 1' }]);
    }));
    (0, vitest_1.it)('should return 404 for non-existent routes', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/non-existent-route');
        (0, vitest_1.expect)(res.status).toBe(404);
    }));
    (0, vitest_1.it)('should return 405 for invalid methods on existing routes', () => __awaiter(void 0, void 0, void 0, function* () {
        const resPost = yield (0, supertest_1.default)(app).post('/items');
        (0, vitest_1.expect)(resPost.status).toBe(405);
        const resPut = yield (0, supertest_1.default)(app).put('/items');
        (0, vitest_1.expect)(resPut.status).toBe(405);
        const resDelete = yield (0, supertest_1.default)(app).delete('/items');
        (0, vitest_1.expect)(resDelete.status).toBe(405);
    }));
});
