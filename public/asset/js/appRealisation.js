
const titleProjetRealiz = document.querySelector('#title-projet-realiz')
const tableTdLanguage = document.querySelector('#table-td-language')
const tableTdFramwork = document.querySelector('#table-td-framework')
const tableTdSgbd = document.querySelector('#table-td-sgbd')


const divRealizDiagrame = document.querySelector('#div-realiz-diagrame')


const listBtnShowRealiz = document.querySelectorAll('.btn-show-realiz')



const testReal = document.querySelector('#testReal')


function viewAchievementTableImg(folderImg, data, minefile, size) {

    
    return `
        <img class="m-3" src="../public/img/${folderImg}/${data}_logo.${minefile}" alt="${data}" title="${data}"
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

        // console.log(cookieValue);


        fetchJson('./../public/asset/js/datas.json').then((datas) => {
            // console.log(datas.realisation);

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
            // console.log(element);

            titleProjetRealiz.textContent = element.title;
            
            let elementContent = element.content

            addNodeElementWhoContent("#text-content-realiz", "p", "resum-projet-text", elementContent)

            element.language.forEach(el => {
                // console.log(el.name);
                chaine += viewAchievementTableImg('language', el.name,'svg', '3rem');
                tableTdLanguage.innerHTML = chaine
            });


            element.frameWork.forEach(el => {
                // console.log(el.name);
                chaine2 += viewAchievementTableImg('framework', el.name,'svg', '8rem');
                tableTdFramwork.innerHTML = chaine2
            });

            element.analyse.forEach(el => {
                // console.log(el.nameFile);
                chaine3 += viewAchievDiagram(el)
                divRealizDiagrame.innerHTML = chaine3
            });

            console.log(element.bataBase);
            tableTdSgbd.innerHTML = viewAchievementTableImg('tools',element.bataBase,'png', '5rem');
            

        }
    });

}


listBtnShowRealiz.forEach((elmBtn) => {
    elmBtn.addEventListener('click', (event) => {
        // console.log(event.currentTarget);
        // console.log(event.currentTarget.textContent);

        addCookie(event.currentTarget.textContent)
        checkACookieExists()

    })
})


function addNodeElementWhoContent(elmIdParent, noeudCre, classNameParam, newContent) {

    let txt = "";

    let elmAddParent = document.querySelector(elmIdParent);

    let newNoeud = document.createElement(noeudCre.toUpperCase());
    newNoeud.setAttribute('class', classNameParam);

    let contentSplit = newContent.split('. ');

    if (contentSplit.length > 0) {

        contentSplit.forEach((elm) => {

            txt += `<p>${elm}</p>`

        })
        elmAddParent.innerHTML = txt
    }

}


checkACookieExists()
