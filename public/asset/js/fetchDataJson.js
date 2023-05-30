

const idSectionLangFront = document.querySelector("#langFront");
const idSectionLangBack = document.querySelector("#langBack");
const idSectionFramFront = document.querySelector("#framFront");
const idSectionFramBack = document.querySelector("#framBack");

const idSectionMobil = document.querySelector("#mobil")
const idSectionCms = document.querySelector("#cms")

const idSectionTools = document.querySelector("#tools")
const idSectionUml = document.querySelector("#uml")


const idFormationDw = document.querySelector('#formationDw');
const idFormationCda = document.querySelector('#formationCda');


// version each DOM 

// const idSectionRealisationLang = document.querySelector(".langFront")
// const nodeListLangFront = document.querySelectorAll(".langFront");
// const nodeListLangBack = document.querySelectorAll(".langBack");
// const nodeListFramFront = document.querySelectorAll(".framFront");
// const nodeListFrameBack = document.querySelectorAll(".framBack");


// individual element part, 
// add the class name then add the variable in an array or create a new array 

const html = document.querySelectorAll('.html');
const css = document.querySelectorAll('.css');
const js = document.querySelectorAll('.js');
const php = document.querySelectorAll('.php');
const java = document.querySelectorAll('.java');
const sql = document.querySelectorAll('.sql');

const arrayNameClass = ['html', 'css', 'js', 'php', 'java', 'sql'];
const arrayNodeListLangF = [html, css, js];
const arrayNodeListLangB = [php, java, sql];



const arrayLang = [];
const arrayFrame = [];
const arrayAnalyse = [];
const arrayMobil = [];
const arrayCms = [];
const arrayTools = [];
const arrayAchiev = [];

const showProgress = document.querySelectorAll("[class*='showProgress-']")



const achievementShow = document.querySelector('#achievementShow');


// const myHeaders = new Headers();
// const myInit = {
//     method: 'GET',
//     headers: myHeaders,
//     mode: 'cors',
//     // mode: 'no-cors',
//     cache: 'default',

// };


// async function fetchJson(url) {
//     try {
//         let response = await fetch(url, myInit)
//         // console.log(`try : Reponse : ${response.status} ${response.statusText} `)
//         // console.log(response);
//         if (response.ok) {

//             let datas = await response.json();

//             // console.log(datas);

//             return datas

//         } else {
//             console.log(`pas Ok : Invalid Response `);
//         }
//     } catch ($e) {
//         console.log("Catch : ERROR " + $e)
//     }

// }


function eachDataForPush() {
    fetchJson("public/asset/js/datas.json").then((datas) => {

        for (const allSkills of datas.skills) {

            // ---------------------------------------
            // ---------------- skills ---------------
            // ---------------------------------------
            //--------- language --------- //
            let skillLang = allSkills.language;
            arrayLang.push(skillLang)
            // ----------- Skill Language Frontend
            let dataLangFront = skillLang.frontend;

            // ----------- Skill Language Backend
            let dataLangBack = skillLang.backend;

            //----- add class array node -> show card -----
            arrayNameClass.forEach(nodeElmName => {
                eachClassName(dataLangFront, nodeElmName, arrayNodeListLangF);
                eachClassName(dataLangBack, nodeElmName, arrayNodeListLangB);
            });

            //--------- framework --------- //
            let skillFrameWork = allSkills.framework;
            arrayFrame.push(skillFrameWork)

            //--------- analyse --------- //
            let skillsAnalyse = allSkills.analyse;
            arrayAnalyse.push(skillsAnalyse)

            //--------- analyse --------- //
            let skillsMobil = allSkills.mobil;
            arrayMobil.push(skillsMobil)

            //--------- cms --------- //
            let skillsCms = allSkills.cms;
            arrayCms.push(skillsCms)

            //--------- tools --------- //
            let skillTools = allSkills.tools
            arrayTools.push(skillTools);

        }

        // ---------------------------------------
        // ---------------- formation ------------
        // ---------------------------------------

        let formationArr = datas.formation;

        let formationDw = formationArr.dwwm;
        let formationCda = formationArr.cda;
        // eachData(formationDw, idFormationDw, viewFormation)
        // eachData(formationCda, idFormationCda, viewFormation)


        // ---------------------------------------
        // ---------------- realisation ------------
        // ---------------------------------------
        let achievement = datas.realisation;
        arrayAchiev.push(achievement);
    })
}


/**
 * 
 * @param {Array} arrayFramOrLanf 
 * @param {Boolean} isFront 
 * @param {Boolean} isLang 
 * @param {callback} callbackRunder 
 */
function eachFramLang(arrayFramOrLanf, isFront, isLang, callbackRunder) {

    let keyType = "";
    let elemId = "";

    for (let i = 0; i < arrayFramOrLanf.length; i++) {
        const type = arrayFramOrLanf[i];
        if (isFront) {
            keyType = type.frontend;
            // elemId = idSectionLangFront
            elemId = isLang ? idSectionLangFront : idSectionFramFront;
        } else {
            keyType = type.backend;
            // elemId = idSectionLangBack
            elemId = isLang ? idSectionLangBack : idSectionFramBack;
        }

        eachData(keyType, elemId, callbackRunder)
    }
}

/**
 * Each data fetch become a inner on Dom element
 * @param {array} allSkills 
 * @param {string} elm 
 * @param {Function} callback 
 */
function eachData(allSkills, elm, callback = viewCard) {
    let chaine = "";

    if (allSkills === undefined ) {
        window.location.reload();
    }
    allSkills.forEach(skill => {
        chaine += callback(skill)
    });

    elm.innerHTML = chaine;

}

/**
 * 
 * @param {Array} dataObj data iterable
 * @param {String} className string is equals to class name
 * @param {Array} arrayNodeList is list to nodeList
 * @param {node} node Element
 */
function eachClassName(dataObj, className, arrayNodeList = null, elm = null,) {

    let chaine = "";
    for (let obj of dataObj) {

        if (obj.slug == className) {

            // chaine += viewCard(obj, "3rem");
            chaine += viewLanguageLogo(obj, "3rem");
        }

        if (arrayNodeList != null && obj.slug == className) {
            arrayNodeList.forEach(nodeElm => {

                nodeElm.forEach(element => {
                    if (element.classList.contains(className)) {
                        element.innerHTML = chaine;
                    }

                })
            })
        }
        if (elm != null) {

            elm.innerHTML = chaine
        }


    }

}


function viewCardProgress(data) {
    return `
    <div>
        <div class="progress skillProgress m-2">

            <div class="progress-bar bg-black bg-opacity-75" role="progressbar" 
                aria-valuenow="${data.value}" aria-valuemin="0" aria-valuemax="100" 
                value="${data.value}" max="100" style="width:${data.value}%">

                <div class="m-auto">
                    <img class="w-25" src="${data.image}" alt="image">
                    <span title="${data.name}">${data.title}</span>
                    <span>${data.value}%</span>
                </div>
                
            </div>
        </div>
    </div>
    `;
}


// 
function viewCard(data, size = null) {

    return `
    <div class="m-2 p-2" style="width: fit-content;">
        <div class="d-flex align-items-center flex-column">
            <div style="" class="" title="${data.name}">
                <div class="">  
                    
                    <img class="w-75" src="${data.image}" alt="image" style="width: ${size};">
                </div>
            </div>
            <div class="title-competence">
                <p class="m-2">${data.title}</p>
            </div>
        </div>
    </div> 
    `;
}

function viewFormation(data) {
    return `
    <h6><u>Titre professionnel :</u> <strong title="${data.titre}"> ${data.titre}</strong></h6>
    <p>Niveau de qualification ${data.level} équivalent a : ${data.equivalent}</p>
    <a href="${data.lien}" target="_blank" rel="nofollow">Cliqué ici pour plus d'information sur la formation</a>
    `
}

function viewLanguageLogo(data, size = null, className = null) {
    return `
        <img class="${className}" src="${data.image}" alt="${data.name}" title="${data.name}" style="width: ${size};"></img>
    `
}

function viewList(data) {
    return `

        <li class="list-group-item">${data.name}</li>
    `
}


function viewList2(data) {
    return `

        <div class="${data.className} m-auto">${data.name}</div>
    `
}


function viewAchiev(data) {
    return `
        <div class="card-achiev m-3 ">
            <img src="public/img/noir.jpg" alt="Projet Suivi Séance" class="w-100 rounded" />
            <div class="fadedbox">

                <h5 class="title-fade">${data.title}</h5>
                <div class="card-body-achiev">
                    <p title="Concepteur Développeur Application">${data.subtitle}</p>
                    <a href="./pages/realisation.html" onauxclick="addCookie('${data.title}')" onclick="addCookie('${data.title}')"
                        class="btn btn-primary" target="_blank" rel="noopener noreferrer">Voir</a>
                </div>

            </div>
            <h6 class="m-1">${data.context}</h6>
        </div>

`
}
// console.log(arrayLang);

// console.log(arrayAchiev);

window.addEventListener('load', () => {
    console.log('La page est complètement chargée');

    reportWindowSize();

    eachFramLang(arrayLang, true, true, viewCard)

    eachFramLang(arrayLang, false, true, viewCard)

    eachFramLang(arrayFrame, true, false, viewCard)
    eachFramLang(arrayFrame, false, false, viewCard)

    eachData(arrayMobil[0], idSectionMobil);

    eachData(arrayCms[0], idSectionCms);

    eachData(arrayTools[0], idSectionTools);


    eachData(arrayAnalyse[0], idSectionUml, viewList2);

    eachData(arrayAchiev[0], achievementShow, viewAchiev);
})


showProgress.forEach(btnProgress => {
    btnProgress.addEventListener('click', function () {

        let isFront = btnProgress.classList.contains('showProgress-front')


        if (btnProgress.checked) {
            functionRunder = viewCardProgress
        } else {
            functionRunder = viewCard
        }

        eachFramLang(arrayLang, isFront, true, functionRunder)
    })
});

eachDataForPush()
