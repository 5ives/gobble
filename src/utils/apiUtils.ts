
export const getRequest = async (url: string, queries: any) => {
    const response = await fetch(url + "?" + new URLSearchParams(queries), {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return response.json();
};
