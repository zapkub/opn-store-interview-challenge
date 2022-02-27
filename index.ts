import { createServer } from './apis';
import express from 'express';
import next from 'next';
import { InmemoryDB } from './apis/db';
import { parse } from 'url';

(async function () {


    const db = new InmemoryDB();
    const app = express();
    const apis = createServer(app, db);
    const ui = next({
        dev: process.env['NODE_ENV'] !== 'production',
    })
    await apis.start();
    apis.applyMiddleware({ app })
    await ui.prepare();
    const handle = ui.getRequestHandler();

    app.all("*", (req, res, next) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });


    app.listen(8888, () => {
        console.log('server started: http://localhost:8888');
        console.log('for session with seed data : http://localhost:8888?session-id=default');
    });

})();
