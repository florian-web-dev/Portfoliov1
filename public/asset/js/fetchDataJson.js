

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



const arrayNameClass = ['html', 'css', 'js', 'php', 'java', 'sql'];
const arrayNodeListLangF = [html, css, js];
const arrayNodeListLangB = [php, java, sql];

const myHeaders = new Headers();
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    // mode: 'no-cors',
    cache: 'default',

};


// const arrayData = new Array

async function fetchJson(url) {
    try {
        let response = await fetch(url,myInit )
        // console.log(`try : Reponse : ${response.status} ${response.statusText} `)
        // console.log(response);
        if (response.ok) {

            let datas = await response.json();

            console.log(datas);

            // let skills = datas.skills
            // let langData = skills[0].language

            // let formation = datas.formation

            // console.log(langData);
            // arrayData.push(skills, formation)


            return datas

        } else {
            console.log(`pas Ok : Invalid Response `);
        }
    } catch ($e) {
        console.log("Catch : ERROR " + $e)
    }

}
// fetchJson("public/asset/js/datas.json");


const arrayLang = [];
const arrayFrame = [];
const arryOther = [];
const arrayMobil = [];
const arrayCms = [];
const arrayTools = [];
function eachByKey() {
    fetchJson("public/asset/js/datas.json").then((datas) => {

        // console.log(datas.skills[0].language);
        console.log( datas.skills);

        for (const allSkills of datas.skills) {

            let skillLang = allSkills.language;
            arrayLang.push(skillLang)

            let skillFrameWork = allSkills.framework;
            arrayFrame.push(skillFrameWork)

            let skillsOther = allSkills.other;
            arryOther.push(skillsOther)

            let skillsMobil = allSkills.mobil;
            arrayMobil.push(skillsMobil)

            let skillsCms = allSkills.cms;
            arrayCms.push(skillsCms)
            
            let skillTools = allSkills.tools
            arrayTools.push(skillTools);

            // // ----------- Skill Language Frontend
            let dataLangFront = skillLang.frontend;

            // // eachData(dataLangFront, idSectionLangFront);

            // // ----------- Skill Language Backend
            let dataLangBack = skillLang.backend;
            // console.log(dataLangBack);

            // console.log(skillLang);


            //----- add class -> show card -----
            arrayNameClass.forEach(nodeElmName => {
                eachClassName(dataLangFront, nodeElmName, arrayNodeListLangF);
                eachClassName(dataLangBack, nodeElmName, arrayNodeListLangB);
            });

        }
        // console.log(datas.formation);

        // console.log("datas.formation");
        // console.log(datas.formation);
        // ----------- Formation

        let formationArr = datas.formation;

        let formationDw = formationArr.dwwm;
        let formationCda = formationArr.cda;
        eachData(formationDw, idFormationDw, viewFormation)
        eachData(formationCda, idFormationCda, viewFormation)

        //----- add class -> show card -----
    })
}
// datas.skills[0]
// datas.formation
eachByKey()





const showProgress = document.querySelectorAll("[class*='showProgress-']")

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

    // for (let i = 0; i < allSkills.length; i++) {
    //     const skill = allSkills[i];
    //     chaine += callback(skill)
    // }

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
function viewCard(data) {
    return `
    <div class="m-2 p-2" style="width: fit-content;">
        <div class="d-flex align-items-center flex-column">
            <div style="" class="" title="${data.name}">
                <div class="box-svg">  
                    
                    <img class="w-27" src="${data.image}" alt="image">
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

// console.log(arrayLang);
// console.log(arrayFrame);
console.log(arryOther);
// console.log(arryOther.tools);
// console.log(arrayMobil);
// console.log(arrayCms);
console.log(arrayTools);

function ttt() {
    arryOther.forEach(other => {
        console.log(other);
       
    });
}


window.addEventListener('load', () => {
    console.log('La page est complètement chargée');
    eachFramLang(arrayLang, true, true, viewCard)

    eachFramLang(arrayLang, false, true, viewCard)

    eachFramLang(arrayFrame, true, false, viewCard)
    eachFramLang(arrayFrame, false, false, viewCard)

    eachData(arrayMobil[0], idSectionMobil);

    eachData(arrayCms[0], idSectionCms);

    eachData(arrayTools[0], idSectionTools);


    ttt()
})

// eachFramLang(arrayLang, true, true, viewCard)

// eachFramLang(arrayLang, false, true, viewCard)

// eachFramLang(arrayFrame, true, false, viewCard)
// eachFramLang(arrayFrame, false, false, viewCard)

// eachData(arrayMobil[0], idSectionMobil);