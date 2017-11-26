import axios from 'axios';
import store from './store';

const load = file => () =>
    axios
        .get(`http://mature-sense.surge.sh/${file}`, {
            responseType: 'arraybuffer',
        })
        .then(r => store.save(file, r.data));

export default load;
