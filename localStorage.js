// key , 데이터

function saveLocalStorage(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
    const result = JSON.parse(window.localStorage.getItem(key));
    return result;
}

export { saveLocalStorage, getLocalStorage };