const dns = require("dns").promises

const beastphishIPs = [
    "194.226.139.111",
    "194.226.139.112",
    "194.226.139.115",
    "194.226.139.120",
    "194.226.139.121",
    "194.226.139.123",
    "194.226.139.129",
    "194.226.139.130",
    "95.181.157.36",
    "95.181.155.250",
    "95.181.155.224",
    "95.181.155.143"
]

function getUrlsInString(input) {
    let re = /https?:\/\/(?:[-\w.]|(?:%[\da-fA-F]{2}))+/
    let output = re.exec(input)

    return output;
}

async function resolveUrlIp(input) {
    const inputUrl = new URL("/", input)

    let address = await dns.resolve4(inputUrl.hostname)
        .catch(() => {});

    if(!address) return null;

    return address[0]
}

async function isBeastPhishUrl(urlString) {
    const ip = await resolveUrlIp(urlString)

    return beastphishIPs.includes(ip)
}

async function analyzeMessage(text) {
    urls = getUrlsInString(text)

    if(!urls) return false;

    for(const url of urls){
        if(await isBeastPhishUrl(url)) return true;
    }

    return false;
}

module.exports = {analyzeMessage}