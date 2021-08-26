export const getValueFromLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key);
};

export const setValueInLocalStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
};
