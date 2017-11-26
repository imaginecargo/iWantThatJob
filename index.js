import intro from './steps/intro';
import server from './steps/server';

Promise.resolve()
    .then(intro)
    .then(server)
    .catch(error => console.error(error));
