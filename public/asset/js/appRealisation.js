
const tableTdLanguage = document.querySelector('#table-td-language')
const tableTdFramwork = document.querySelector('#table-td-framework')
const divRealizDiagrame = document.querySelector('#div-realiz-diagrame')

const testReal = document.querySelector('#testReal')


function viewAchievementTable(folderImg, data, size) {

    return `
        <img class="pt-4 m-1" src="../public/img/${folderImg}/${data.name}_logo.svg" alt="${data.name}" title="${data.name}"
        style="width: ${size};">
    `
}

function viewAchievDiagram(data) {
    return `
    <div class="m-2 p-3 shadow-box">
        <a class="" data-fancybox="real-ssg" data-src="../public/img/realisation/${data.nameFile}"
            data-caption="${data.caption}">
            <img class="w-100" src="../public/img/realisation/${data.nameFile}"></a>

        <figcaption class="text-center">${data.figcaption}</figcaption>
    </div>
    `
}




// let clef = 'realisation'
function checkACookieExists() {

    let cookieValue = "";
    if (document.cookie.split(";").some((item) => item.trim().startsWith(`${clef}=`))) {
        cookieValue = document.cookie.split(";").find((row) => row.startsWith(`${clef}=`))?.split("=")[1];

        console.log(cookieValue);


        fetchJson('./../public/asset/js/datas.json').then((datas) => {
            console.log(datas.realisation);

            let dataRealisation = datas.realisation

            eachDataRender(dataRealisation, cookieValue);

        })

        console.log(`> The cookie ${clef} exists`);
    } else {
        console.log(`no found ${clef}`);
    }


}

function eachDataRender(datas, cookieValue) {

    let chaine = "";
    let chaine2 = "";
    let chaine3 = "";

    datas.forEach(element => {

        if (element.title === cookieValue) {
            console.log(element);
            let textContent = element.content
            let contentSplit = textContent.split('. ');
            contentSplit.forEach((elm) => {
                addElmt("#text-content-realiz", "p", "resum-projet-text", elm)
            })


            element.language.forEach(el => {
                console.log(el.name);
                chaine += viewAchievementTable('language', el, '3rem');
                tableTdLanguage.innerHTML = chaine
            });


            element.frameWork.forEach(el => {
                console.log(el.name);
                chaine2 += viewAchievementTable('framework', el, '10rem');
                tableTdFramwork.innerHTML = chaine2
            });

            element.analyse.forEach(el => {
                console.log(el.nameFile);
                chaine3 += viewAchievDiagram(el)
                divRealizDiagrame.innerHTML = chaine3
            });



        }
    });

}


checkACookieExists()
