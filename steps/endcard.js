import fs from 'fs';
import Player from 'play-sound';
import calcAnimations from 'chalk-animation';
import colors from 'colors/safe';
import path from 'path';
import store from '../utils/store';

const player = Player({});

const Gimmy = () =>
    new Promise(resolve => {
        fs.writeFileSync(path.join(__dirname, '..', 'tmp', 'gimmy.mp3'), store.get('gimmy.mp3'), 'binary');
        const animation = calcAnimations.glitch('Gimmy Gimmy Gimmy that job!');
        const audio = player.play(path.join(__dirname, '..', 'tmp', 'gimmy.mp3'), err => {
            if (err && !err.killed) throw err;
        });

        setTimeout(() => {
            animation.stop();
            audio.kill();
            resolve();
        }, 231000);
    });

export default () =>
    Promise.resolve()
        .then(() => console.log(colors.green('And now I present you:')))
        .then(Gimmy);
