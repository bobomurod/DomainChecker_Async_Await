let cheerio = require('cheerio')
let fetch = require('node-fetch');

// cons÷t get = 

let getRandomWord = async () => {
    try {
        let result = await fetch("https://random-word-api.herokuapp.com//word?number=1", {
            "method": "GET",
        })
        resultJson = await result.json()
        console.log(resultJson);
        return resultJson
    } catch (error) {
        throw new Error(error)
    }
    
}

let checkDomainResult = async (word) => {
    try {
      let result = await fetch(`https://cctld.uz/whois/?domain=${word}&zone=uz`, {
        "method": "GET",
    })
    let resultHTML = await result.text()
    return resultHTML
    } catch (error) {
        throw new Error(error)
    }
}

let analyzer = async (HTML)=> {
    let $ = cheerio.load(HTML, { decodeEntities: false })
    let plain = $.html()
    console.log($('.content > div > p').text());
}

(async ()=>{
        let word = await getRandomWord()
        let HTML = await checkDomainResult(word)
        await analyzer(HTML)
    })()



// let foo = async () => {
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             resolve('done')
//         }, 4000)
//     })
// }

// // foo().then((result)=>{
// //     console.log(result);
// // })

// console.log(foo());

// let bar = async ()=> {
//     let result = await foo()
//     console.log(result);
// }

// bar()