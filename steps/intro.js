import colors from 'colors/safe';
import prompt from 'prompt';
import ora from 'ora';
import clear from '../utils/clear';
import load from '../utils/load';
import store from '../utils/store';

// politely ask the user if an internet connection is present
const AskForInternet = () =>
    new Promise((resolve, reject) => {
        prompt.start();
        const property = {
            name: 'yesno',
            message: colors.rainbow('Do you have a working internet connection?'),
            validator: /y[es]*|n[o]?/,
            warning: 'Must respond yes or no',
            default: 'yes',
        };

        prompt.get(property, (error, { yesno }) => {
            if (error || /n[o]?/.test(yesno)) reject(Error('You need a working internet connection'));
            resolve();
        });
    });

// never trust any user!
const CheckForInternet = () =>
    new Promise((resolve, reject) => {
        Promise.resolve()
            .then(load('test.txt'))
            .then(() => resolve())
            .catch(e => {
                if (!e.response) reject(Error('You sneaky liar! You have no connection.'));

                resolve();
            });
    });

// show the user that we care...
const AskForName = () =>
    new Promise(resolve => {
        prompt.start();
        const property = {
            name: 'name',
            message: colors.white('What is your name?'),
            validator: /[a-zA-Zäöü ]+/,
            warning: 'Must respond with a name ([a-zA-Zäöü ]+)',
            default: 'Max Muster',
        };

        prompt.get(property, (error, { name }) => {
            store.save('name', name);
            resolve();
        });
    });

// and ask him for his fafourite number - so we know! It is imPORTant ;-)
const AskForNumber = () =>
    new Promise(resolve => {
        prompt.start();
        const property = {
            name: 'number',
            message: colors.white('What is your favourite number (ranging from 1 to 99)'),
            validator: /[1-9][0-9]?/,
            warning: 'Must respond with a number',
            default: '42',
        };

        prompt.get(property, (error, { number }) => {
            store.save('port', 9000 + parseInt(number, 10));
            resolve();
        });
    });

// Now we actually du something usefull - we download all required files
const Loading = () =>
    new Promise(resolve => {
        const files = [
            { name: '🐳', file: 'whale.png', spinner: 'dots12' },
            { name: '🗻', file: 'falling_whale.mp3', spinner: 'dots3' },
            { name: '💥', file: 'pow.png', spinner: 'dots11' },
            { name: '🌈', file: 'gimmy.mp3', spinner: 'monkey' },
            { name: '🗻', file: 'mt-fuji.jpg', spinner: 'moon' },
        ];

        const promise = files.reduce((acc, { name, file, spinner }, key) => {
            const animation = ora({
                text: `(${key + 1} of ${files.length}) Loading the ${name}`,
                color: 'white',
                spinner,
            });
            return acc
                .then(() => animation.start())
                .then(load(file))
                .then(() => animation.stopAndPersist({ symbol: '🎉 ' }));
        }, Promise.resolve());

        return promise.then(resolve);
    });

export default () =>
    Promise.resolve()
        .then(clear)
        .then(AskForInternet)
        .then(CheckForInternet)
        .then(AskForName)
        .then(AskForNumber)
        .then(Loading);
