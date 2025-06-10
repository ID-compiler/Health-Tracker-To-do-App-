export const saveData = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

export const getData = (key) =>
    JSON.parse(localStorage.getItem(key));