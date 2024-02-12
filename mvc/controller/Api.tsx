const API_URL = 'http://ipwho.is/'

export const getAllStats = async (ip: string) => {
    try {
        const response = await fetch(API_URL + ip)
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}