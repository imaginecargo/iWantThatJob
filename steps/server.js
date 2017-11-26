import express from 'express';
import compileSass from 'express-compile-sass';
import path from 'path';
import opn from 'opn';
import colors from 'colors/safe';
import store from '../utils/store';
import wait from '../utils/wait';

const Server = () =>
    new Promise(resolve => {
        const port = store.get('port');
        const app = express();
        app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'server.html')));
        app.get('/end', (req, res) => {
            res.send('You can close your browser now and go back to your terminal');
            resolve();
        });
        app.get('/file/:file', (req, res) => res.end(store.get(req.params.file)));
        app.use(
            compileSass({
                root: __dirname,
                watchFiles: true,
                logToConsole: false,
            }),
        );
        app.use(express.static(__dirname));
        app.listen(port, () => {
            const url = `http://localhost:${port}`;
            console.log(colors.bgRed.white(`You should now be forced to your browser 😉  (${url})`));
            opn(url, { app: ['google chrome', '--incognito'] });
        });
    });

export default () =>
    Promise.resolve()
        .then(() => console.log(colors.bgGreen.white('get ready!')))
        .then(wait(2000))
        .then(() => console.log(colors.white('1...')))
        .then(wait(1000))
        .then(() => console.log(colors.white('2...')))
        .then(wait(1000))
        .then(() => console.log(colors.white('3!')))
        .then(wait(1000))
        .then(Server)
        .then(() => console.log(colors.bgGreen.white(`Thank you for comming back! ${store.get('name')}!`)))
        .then(wait(1000))
        .then(() => console.log(colors.white('...3')))
        .then(wait(1000))
        .then(() => console.log(colors.white('...2')))
        .then(wait(1000))
        .then(() => console.log(colors.white('...1')))
        .then(wait(1000));
