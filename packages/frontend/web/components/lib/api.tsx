function checkForErrors(response: any) {
    if (!response.ok) throw Error(response.statusText);
    return response;
}

export const callApi = (url: string) => {
    return fetch(url)
        .then(checkForErrors)
        .then(response => response.json());
};
