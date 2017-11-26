import intro from './steps/intro';
import server from './steps/server';
import endcard from './steps/endcard';

Promise.resolve()
    .then(intro)
    .then(server)
    .then(endcard)
    .catch(error => console.error(error));
