const dns = require("dns").promises

const beastphishIPs = [
    "194.226.139.111",
    "194.226.139.112",
    "194.226.139.121",
    "194.226.139.129",
    "194.226.139.130"
]

function getUrlsInString(input) {
    let re = /https?:\/\/(?:[-\w.]|(?:%[\da-fA-F]{2}))+/
    let output = re.exec(input)

    return output;
}

async function resolveUrlIp(input) {
    const inputUrl = new URL("/", input)

    let address = await dns.resolve4(inputUrl.hostname)

    return address[0]
}

async function isBeastPhishUrl(urlString) {
    const ip = await resolveUrlIp(urlString)

    return beastphishIPs.includes(ip)
}

async function analyzeMessage(text) {
    urls = getUrlsInString(text)

    for(const url of urls){
        if(await isBeastPhishUrl(url)) return true;
    }

    return false;
}
