
// ------------- Ici JavaScript

const display = document.querySelectorAll('.display');

const pcDisplay = document.querySelector('.pcDisplay');
const smartDisplay = document.querySelector('.smartDisplay');

// ---------------------------------// ---------------------------------



const responsive = document.getElementById('responsive');


// ---------------------------------// ---------------------------------
// ---------------------------------// ---------------------------------

const listNav = document.querySelectorAll("#listNav a");

const navbarSupportedContent = document.getElementById('navbarSupportedContent');
const topelm = document.getElementById('top');

function ifTrueNone(navbarSupportedContent, topelm) {
    if (navbarSupportedContent.classList.contains('show')) {
        topelm.classList.add('none');

    }
}


ifTrueNone(navbarSupportedContent, topelm);

function selected(nodeList, className) {
    nodeList.forEach(element => {

        element.addEventListener("click", () => {

            nodeList.forEach(el => {

                if (el.classList.contains(className)) {

                    el.classList.remove(className)

                }

            })
            element.classList.add(className)

        })
    })
}



function reportWindowSize() {

    let phone = window.innerWidth < 992;
    let pc = window.innerWidth >= 1250;
    let tab = (window.innerWidth >= 992) && (window.innerWidth < 1250);

    let strLinkSvg = `<a data-fancybox data-type="pdf" class="nav-link" href="public/doc/cv.pdf">Mon CV
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                        </svg>
                    </a>`

    if (pc) {

        return responsive.innerHTML = `<a target="_blank" class="nav-link" href="public/doc/cv.pdf">Mon CV</a>`;

    } if (phone) {

        // console.log("Phone Size : " + window.innerWidth);

        return responsive.innerHTML = strLinkSvg;
    } if (tab) {

        // 992
        return responsive.innerHTML = strLinkSvg;
    }
}

// ---------------------------------// ---------------------------------


function reveal() {
    const ratio = .1
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: ratio
    }

    const handleIntersect = function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio > ratio) {

                entry.target.classList.remove('reveal')

                observer.unobserve(entry.target)
            }

        })


    }

    const observer = new IntersectionObserver(handleIntersect, options);
    document.querySelectorAll('.reveal').forEach(function (r) {

        observer.observe(r) // r comme reveal
    })



} reveal()



window.addEventListener('load', (event) => {
    reportWindowSize();

});

display.forEach((e) => {
    e.addEventListener('resize', window.onresize = reportWindowSize)
})



// const ariaCurrent = document.querySelectorAll("a[aria-current]")

// function obervMenu() {

//     ratio = .5
//     options = {
//         root: null,
//         rootMargin: '0px',
//         threshold: ratio
//     }


//     const callback = function (entries, observer) {
//         entries.forEach(function (entry) {
//             if (entry.isIntersecting) {


//                 ariaCurrent.forEach(el => {

//                     if (entry.target.id == el.ariaCurrent) {
//                         el.classList.add('currentSelec')
//                     }else{
//                         el.classList.remove('currentSelec') 

//                     }

//                 })

//             }
//         })


//     }

//     const observer = new IntersectionObserver(callback, options);
//     document.querySelectorAll('.observ').forEach(function (r) {
//         // console.log(r);
//         observer.observe(r)
//     })

// }
// obervMenu()


// chaque élément de entries correspond à une variation
// d'intersection pour un des éléments cible:
//   entry.boundingClientRect
//   entry.intersectionRatio
//   entry.intersectionRect
//   entry.isIntersecting
//   entry.rootBounds
//   entry.target
// console.log(entry.target);
// console.log("entry.target :" + entry.target.className);
// -------------------------------------------------------

// function rederTest(testTest) {
//     return `un test: ${testTest}`

// }
// let nouveuContenu = 'un nouveu contenu ajouter par variable';
/**
 * la fonction addElmt ajoute un element html a un element parent 
 * 
 * @param {string} elmIdParent selecteur CSS
 * @param {string} noeudCre Type de nodeName / noeud
 * @param {string} classNameParam Nom de attibute class du noeud crée
 * @param {string} newContent contenu text de noeudCre, ne prend pas en charge le html
 * 
 */
function addElmt(elmIdParent, noeudCre, classNameParam, newContent) {

    let elmAddParent = document.querySelector(elmIdParent);

    let newElm = document.createElement(noeudCre.toUpperCase());


    let elmtNewContent = document.createTextNode(newContent);
    // let elmtNewContent = document.createTextNode(newContent);

    newElm.setAttribute('class', classNameParam);

    //let elmtNewContent = document.innerHTML(newContent);

    // noeudCre.innerHTML = newContent;
    newElm.appendChild(elmtNewContent);

    elmAddParent.appendChild(newElm)

}
// addElmt("#teste1",'div','bob',rederTest("teste addElmt bob"))
//------------------------------------------------------
//------------------------------------------------------

const myHeaders = new Headers();
const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    // mode: 'no-cors',
    cache: 'default',

};


async function fetchJson(url) {
    try {
        let response = await fetch(url, myInit)
        // console.log(`try : Reponse : ${response.status} ${response.statusText} `)
        // console.log(response);
        if (response.ok) {

            let datas = await response.json();

            // console.log(datas);

            return datas

        } else {
            console.log(`pas Ok : Invalid Response `);
        }
    } catch ($e) {
        console.log("Catch : ERROR " + $e)
    }

}


// 
// function cookieAddEvent() {



//     if (undefined == cookieTest) {
//         console.log('#cookieTest n\'est pas sur la page ou js!=js');
//     } else {
//         cookieTest.addEventListener('auxclick', function (event) {
//             if (event.button == 1) {
//                 console.log('bouton du millieu');
//             }

//             addCookie("Suivi Séance")
//         })
//     }

// }


// cookieAddEvent();
// let value = "Suivi Séance"
let clef = "realisation"
function addCookie(value) {
    
    // let date = new Date(Date.now() + 60000);
    let date = new Date(Date.now() + 6000000000);
    date = date.toUTCString()

    document.cookie = `${clef}=${value};path=/;expires=${date};SameSite=lax;Secure`

    console.log(document.cookie);

}





// document.cookie = `user=bob;path=/;expires=${date};samesite=lax;`

function showCookies() {
    const output = document.getElementById("cookies");

    output.textContent = `> ${document.cookie}`;

    const cookieValue = document.cookie
        .split(";")
        .find((row) => row.startsWith(`${clef}=`))
        ?.split("=")[1];

    console.log(cookieValue);
}

function clearOutputCookies() {
    const output = document.getElementById("cookies");
    output.textContent = "";
    console.log(document.cookie);
    // console.log(cookieValue);

}


