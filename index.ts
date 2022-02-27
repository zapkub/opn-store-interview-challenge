import { createServer } from './apis';
import express from 'express';
import next from 'next';
import { InmemoryDB } from './apis/db';

(async function () {


    const db = new InmemoryDB();
    const app = express();
    const apis = createServer(app, db);
    const ui = next({
        dev: process.env['NODE_ENV'] === 'production',
    })
    await apis.start();
    apis.applyMiddleware({ app })
    await ui.prepare();

    app.all("*", (req, res, next) => {
        ui.getRequestHandler()(req, res);
    });


    app.listen(8888, () => {
        console.log('server started : http://localhost:8888');
    });

})();
