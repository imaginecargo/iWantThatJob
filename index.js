import intro from './steps/intro';

Promise.resolve()
    .then(intro)
    .catch(error => console.error(error));
