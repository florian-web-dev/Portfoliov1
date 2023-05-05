

const idSectionLangFront = document.querySelector("#langFront");
const idSectionLangBack = document.querySelector("#langBack");
const idSectionFramFront = document.querySelector("#framFront");
const idSectionFramBack = document.querySelector("#framBack");

const idSectionMobil = document.querySelector("#mobil")
const idSectionCms = document.querySelector("#cms")

const idSectionTools = document.querySelector("#tools")
const idSectionUml = document.querySelector("#uml")


// version each DOM 

// const idSectionRealisationLang = document.querySelector(".langFront")
// const nodeListLangFront = document.querySelectorAll(".langFront");
// const nodeListLangBack = document.querySelectorAll(".langBack");
// const nodeListFramFront = document.querySelectorAll(".framFront");
// const nodeListFrameBack = document.querySelectorAll(".framBack");


// individual element part, 
// add the class name then add the variable in an array or create a new array 

const idFormationDw = document.querySelector('#formationDw');
const idFormationCda = document.querySelector('#formationCda');

const html = document.querySelectorAll('.html');
const css = document.querySelectorAll('.css');
const js = document.querySelectorAll('.js');
const php = document.querySelectorAll('.php');
const java = document.querySelectorAll('.java');
const sql = document.querySelectorAll('.sql');


const arrayNodeListLangF = [html, css, js];
const arrayNodeListLangB = [php, java, sql];


let arrayPushDataLang = []

async function fetchData(url) {

    let reponse = await fetch(url);
    let datas = await reponse.json();

    let allSkills = datas.skills[0];

    // Formation
    let formationArr = datas.formation;

    // ------------- Skill
    let skillLang = allSkills.language;
    let skillFrameWork = allSkills.framework;

    let skillsOther = allSkills.other[0];


    // ----------- Skill Language Frontend
    let dataLangFront = skillLang.frontend;

    // eachData(dataLangFront, idSectionLangFront);

    // ----------- Skill Language Backend
    let dataLangBack = skillLang.backend;
    eachData(dataLangBack, idSectionLangBack, viewCardProgress);

    // ----------- Skill Framework Frontend
    let dataFrameFront = skillFrameWork.frontend;
    eachData(dataFrameFront, idSectionFramFront);

    // ----------- Skill Framework Backend
    let dataFrameBack = skillFrameWork.backend;
    eachData(dataFrameBack, idSectionFramBack);
    // ----------- Skill other mobil
    let skillMobil = allSkills.mobil;
    eachData(skillMobil, idSectionMobil);

    // ----------- Skill other CMS
    let dataCms = skillsOther.cms;
    eachData(dataCms, idSectionCms);

    let dataTools = skillsOther.tools;
    eachData(dataTools, idSectionTools);

    let dataUml = skillsOther.uml
    eachData(dataUml, idSectionUml);

    arrayPushDataLang.push(
        { 'dataLangFront': dataLangFront },
        { 'dataFrameBack': dataFrameBack },
    )
    // console.log(arrayPushDataLang[0].dataLangFront);
    // ----------- Formation

    let formationDw = formationArr.dwwm;
    let formationCda = formationArr.cda;
    eachData(formationDw, idFormationDw, viewFormation)
    eachData(formationCda, idFormationCda, viewFormation)

    //----- add class -> show card -----
    eachClassName(dataLangFront, 'html', arrayNodeListLangF);
    eachClassName(dataLangFront, 'css', arrayNodeListLangF);
    eachClassName(dataLangFront, 'js', arrayNodeListLangF);
    eachClassName(dataLangBack, 'php', arrayNodeListLangB);
    eachClassName(dataLangBack, 'java', arrayNodeListLangB);
    eachClassName(dataLangBack, 'sql', arrayNodeListLangB);

    return datas
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



function viewCard(data) {
    return `
    <div class="m-2 p-2" style="width: fit-content;">
        <div class="d-flex align-items-center flex-column">
            <div style="" class="" title="${data.title}">
                <div class="box-svg">
                    ${data.svg}
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

const BtnShowProgressFront = document.querySelector('#ShowProgressFront');



BtnShowProgressFront.addEventListener('click', function (event) {


    console.log(BtnShowProgressFront.checked);

    let render = "";

    if (BtnShowProgressFront.checked) {
        console.log(BtnShowProgressFront.value);
        for (let i = 0; i < arrayPushDataLang.length; i++) {
            const element = arrayPushDataLang[i];

            console.log(element);
            // eachData(arrayPushDataLang[i], idSectionLangFront);
            // eachData(arrayPushDataLang[i], idSectionLangBack);

            for (const key in element) {
                // if (Object.hasOwnProperty.call(object, key)) {
                //     const element = object[key];

                // }
                console.log(key);
                if (key == "dataLangFront") {
                    console.log(element.dataLangFront);
                    const langFront = element.dataLangFront;
                    langFront.forEach(el => {
                        console.log(el);
                        render += viewCardProgress(el)
                    });
                    idSectionLangFront.innerHTML = render;
                }
                if (key == "dataFrameBack") {
                    console.log(element.dataFrameBack);
                }
            }


        }
    } else {
        for (let i = 0; i < arrayPushDataLang.length; i++) {
            eachData(arrayPushDataLang[i].dataLangFront, idSectionLangFront);
        }

    }
})

/**
 * Each data fetch become a inner on Dom element
 * @param {any} allSkills 
 * @param {string} elm 
 * @param {Function} callback 
 */
function eachData(allSkills, elm, callback = viewCard) {
    let chaine = "";
    // console.log(typeof allSkills);

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
function eachClassName(dataObj, className, arrayNodeList = null, elm = null) {

    let chaine = "";
    for (let obj of dataObj) {

        if (obj.slug == className) {

            chaine += viewCard(obj);
            // console.log(element.title + ' ' + element.name);

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
            // console.log(elm);
            elm.innerHTML = chaine
        }


    }

}


fetchData("public/asset/js/datas.json");


