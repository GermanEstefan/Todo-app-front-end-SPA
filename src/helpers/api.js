const baseUrlApi = process.env.REACT_APP_API_URL;

export const verifyAuth = async () => {
    const tokenInLocalStorage = localStorage.getItem('token') || '';
    try {
        const resp = await fetch(`${baseUrlApi}/auth/verify`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'access-token': tokenInLocalStorage
            }
        });
        const respToJSON = await resp.json();

        if (respToJSON.ok) {
            localStorage.setItem('token', respToJSON.userData.token);
            return respToJSON;
        } else {
            return null;
        }

    } catch (error) {
        console.warn('Internal error, please check your internet connection', error)
    }
}

export const fetchApi = async (endpoint, method, data) => {
    const tokenInLocalStorage = localStorage.getItem('token') || '';
    if (!tokenInLocalStorage) { //Request sin token(Login, register)
        const resp = await fetch(`${baseUrlApi}/${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await resp.json();

    } else { //Request con token(Para usuarios autenticados)
        const resp = await fetch(`${baseUrlApi}/${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'access-token': tokenInLocalStorage || ''
            },
            body: JSON.stringify(data)
        });
        return await resp.json();
    }
}

export const fetchApiFormData = async (endpoint, method, data) => {
    const tokenInLocalStorage = localStorage.getItem('token') || '';
    const resp = await fetch(`${baseUrlApi}/${endpoint}`, {
        method,
        headers: {
            'access-token': tokenInLocalStorage || ''
        },
        body: data
    });
    return await resp.json();
}

