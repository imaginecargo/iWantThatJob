const store = {};

export default {
    save: (name, data) => {
        store[name] = data;
    },
    get: name => store[name],
};
