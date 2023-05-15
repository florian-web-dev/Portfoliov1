

// let gettingStores = document.cookies
// console.log(gettingStores);



// function logCookies() {
//   for (cookie of gettingStores) {
//     console.log(`Domain: ${cookie.domain}`);
//     console.log(`Name: ${cookie.name}`);
//     console.log(`Value: ${cookie.value}`);
//     console.log(`Persistent: ${!cookie.session}`);
//   }
// }
// logCookies();



let clef = 'realisation'
function checkACookieExists() {

    let cookieValue = "";
    if ( document.cookie.split(";").some((item) => item.trim().startsWith(`${clef}=`)) ) 
        {
        cookieValue = document.cookie.split(";").find((row) => row.startsWith(`${clef}=`))?.split("=")[1];

        console.log(cookieValue);

        fetchJson('./../public/asset/js/datas.json').then((datas) => {
            console.log(datas.realisation);

            let dataRealisation = datas.realisation

            dataRealisation.forEach(element => {

                if (element.name === cookieValue) {
                    console.log(element.name);
                }
            });

        })
        //   const output = document.getElementById("a-cookie-existence");
        //   output.textContent = '> The cookie "reader" exists';
        console.log(`> The cookie ${clef} exists`);
    } else {
        console.log(`no found ${clef}`);
    }

    console.log(document.cookie);
}

checkACookieExists()
