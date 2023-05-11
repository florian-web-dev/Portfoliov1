

async function fetchUrl(url) {
    try {
        let response = await fetch(url)
        // console.log(`try : Reponse : ${response.status} ${response.statusText} `)
        console.log(response);
        if (response.ok) {

            let datas =  response.url

            console.log(datas);

            return datas

        } else {
            console.log(`pas Ok : Invalid Response `);
        }
    } catch ($e) {
        console.log("Catch : ERROR " + $e)
    }

}

// fetchUrl('http://127.0.0.1:5500/pages/realisation.html')
fetchUrl('https://florian-web-dev.github.io/Portfolio/')