const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
    throw new Error("BASE_URL environment variable was not defined!");
}

function buildUrl(...path) {
    return baseUrl + '/' + path.join("/");
}

export default buildUrl;