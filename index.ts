import { createServer } from './apis';
import express from 'express';
import next from 'next';

(async function () {


    const app = express();
    const apis = createServer(app);
    const ui = next({
        dev: true,
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
