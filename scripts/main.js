import { englishsLevels, classesDuration, monthsDays, quotes } from './jsons.js'


// -------------- ENGLISH LEVEL --------------
let date = new Date();






// -------------- TABLES CREATION --------------
const initWeekDayOfTheYear = 'SUNDAY';
let weekDayGuide = initWeekDayOfTheYear;
let fragment = document.createDocumentFragment();

monthsDays.forEach((month, indexMonth) => {
    // TEMPLATE TABLE
    let table = document.createElement('table');
    let caption = document.createElement('caption');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');


    // CAPTION
    caption.textContent = month.name;


    // THEAD
    let thead_Row = document.createElement('tr');

    let weekAbbreviation = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
    weekAbbreviation.forEach(letter => {
        let thead_Row_TD = document.createElement('td');
        thead_Row_TD.textContent = letter.substring(0, 1);
        thead_Row.append(thead_Row_TD);
    })
    thead.append(thead_Row);


    // TBODY
    let contAuxDaysMonth = 1;

    while (contAuxDaysMonth <= month.days) {
        let tbody_Row = document.createElement('tr');
        let tbody_Row_TD;

        weekAbbreviation.forEach((weekDay, index) => {
            if (contAuxDaysMonth <= month.days) {
                tbody_Row_TD = document.createElement('td');
                if (weekDay == weekDayGuide) {
                    tbody_Row_TD.textContent = contAuxDaysMonth;
                    contAuxDaysMonth++;

                    if (weekDayGuide == 'SUNDAY') {
                        weekDayGuide = 'MONDAY';
                    } else {
                        weekDayGuide = weekAbbreviation[index + 1];
                    }
                }
            }
            tbody_Row.append(tbody_Row_TD);
        })
        tbody.append(tbody_Row)
    }


    table.append(caption, thead, tbody);

    fragment.append(table);
})

document.querySelector('.calendar').append(fragment)
// document.querySelectorAll('td').classList.add('tdStyle');







// -------------- MARK DAYS --------------
// Today
// let actualDay;
// let actualDayTag;
// let monthCaption = Array.from(document.querySelectorAll('caption'))[date.getMonth()];
// let tbodyTemp = Array.from(monthCaption.nextElementSibling.nextElementSibling.children);
// console.log(tbodyTemp);


// tbodyTemp.forEach((TR => {
//     Array.from(TR.children).forEach((TD) => {
// if(date.getDay() == monthsDays[date.getMonth()].days){
//     TD.classList.remove('markToday')
//     TD.classList.add('markTodayEndMonth')
// } else {
//     TD.classList.add('markToday');
//     actualDay = TD.textContent;
//     actualDayTag = TD;
//         }
//     })
// }));



// MARK MONTHS REVIEWS
// let indexMonth = 0;
// Array.from(document.querySelectorAll('TD')).forEach(TD => {
//     if (indexMonth < 11) {
//         if (!isNaN(parseInt(TD.textContent)) == true) {
//             if (TD.textContent == monthsDays[indexMonth].days) {
//                 TD.classList.add('nextMonthReviews')
//                 indexMonth++;

//                 if (TD.classList.contains('nextWeekReviews')) {
//                     TD.classList.remove('nextWeekReviews')
//                 }

//             }
//         }
//     }
// })





// MARK ACTUAL DAY
let markToday = {
    todayToggle: false,
    todayWeekToggle: false,
    todayMonthToggle: false,
    todayLevelToggle: false
}

let progressToggle = false;
let monthToggle = false;


// INDEX
// let indexMonth = 0;
let contClass = 0;

// SPECIFIC DAYS
let starWeekReviews = [22, 29];


// CALCULATOR END OF LEVELS && VAR DAY OFFS
// let dayOffs = [
//     {
//         Month: 0,
//         day: 0
//     }
// ]

// englishsLevels = [
//     {
//         level: "BASICO",
//         start: {
//             day: 0,
//             month: "JANUARY"
//         },
//         finish: {
//             day: 0,
//             month: ""
//         }
//     },


// Here i'm counting (how many videos) i've watched until the date.
// This is for the [progress bar] [watch today] [time spent]
// let contVideos = 1;                     // GENERAL, ALL LEVELS
// let contVideosBasic = 1;                
// let contVideosIntermediate = 1;
// let contVideosAdvanced = 1;






// -----------------------HEADER
// H1 SPAN (# DAY)
let currentDay = 0;
monthsDays.forEach((month, index) => {
    if (index <= date.getMonth()) {
        if (index == date.getMonth()) {
            currentDay += date.getDate();
        } else {
            currentDay += month.days;
        }
    }
})
// DAY OF THE YEAR
document.querySelector('.dayOfYear').textContent = currentDay;

// PROGRESS DAY OF THE YEAR
document.querySelector('.yearProgress').value = currentDay;

// QUOTES
document.querySelector('.quote').textContent = quotes[currentDay];
// document.querySelector('.quote').textContent = "Las ideas pueden cambiar la vida. A veces a lo único que tienes que abrir la puerta es a una buena idea - Jim Rohn Las ideas pueden cambiar la vida. A veces a lo único que tienes que abrir la puerta es a una buena idea - Jim Rohn as ideas pueden cambiar la ";



// -----------------------ASIDE
// TOTAL CANT VIDEOS VIEWED
// --------------------- [FUNCTION TO CHECK BASED ON DAYS PASSED]
let totalCantVideosViewed = 51;
let videosViewedByLevel = {
    basicLevelVideosViewed: 0,
    intermediateLevelVideosViewed: 0,
    advancedLevelVideosViewed: 0
}

// CHECKER LEVEL (según cant videos viewed in total)
let progressBarNumBasedOnLevel;

// ------------ LEVEL
let tempIndexCurrentLevel;
if (totalCantVideosViewed >= 1 && totalCantVideosViewed <= 195) {
    tempIndexCurrentLevel = 0;
    videosViewedByLevel.basicLevelVideosViewed = totalCantVideosViewed;
}
if (totalCantVideosViewed >= 196 && totalCantVideosViewed <= 390) {
    tempIndexCurrentLevel = 1;
    videosViewedByLevel.intermediateLevelVideosViewed = totalCantVideosViewed - 195;
}
if (totalCantVideosViewed >= 391 && totalCantVideosViewed <= 585) {
    tempIndexCurrentLevel = 2;
    videosViewedByLevel.advancedLevelVideosViewed = totalCantVideosViewed - 390;
}


// CHANGE STATUS
englishsLevels[tempIndexCurrentLevel].status = "ACTIVE";

// LEVEL NAME
document.querySelector('.englishLevel').textContent = englishsLevels[tempIndexCurrentLevel].level;

// LEVEL CLASS COLOR
let classColorLevels = ['basic', 'intermediate', 'advanced'];
document.querySelector('.englishLevel').classList.add(classColorLevels[tempIndexCurrentLevel]);

// PROGRESS BAR LEVEL && PERCENTAJE PROGRESS
let tempProgress;
switch (tempIndexCurrentLevel) {
    case 0:
        tempProgress = videosViewedByLevel.basicLevelVideosViewed;
        break;
    case 1:
        tempProgress = videosViewedByLevel.intermediateLevelVideosViewed;
        break;
    case 2:
        tempProgress = videosViewedByLevel.advancedLevelVideosViewed;
        break;
}
document.querySelector('.classProgress').value = tempProgress;
document.querySelector('.percentaje').textContent = `${Math.ceil(tempProgress*100/195)}%`;



// ------------ VIDEOS STADISTICS
// Se agregan los datos del día de hoy
// VIDEOS VIEWED
document.querySelector('.cantVideos').querySelector('span').textContent = tempProgress;
// console.log(`${Math.ceil(classesDuration[tempProgress])}`);

// TIME INVESTED
let totalTime = 0;

classesDuration.forEach((time, index) => {
    if(index <= tempProgress ){
        totalTime += parseInt(time.time.substring(0,2));
        totalTime += parseInt(time.time.substring(3,5))/60;
        // console.log(index)
    }
})
// console.log(totalTime/60);
// console.log(totalTime);
document.querySelector('.duration').querySelector('span').textContent = `${Math.ceil(totalTime/60)}`;

// document.querySelector('.number_firstVideo').textContent
// document.querySelector('.number_secondVideo').textContent

// let toggleMonthStop = false;
// monthsDays.forEach((month, index) => {


//     let contTempMonthDay = 1;

//     while (contTempMonthDay != month.days) {
//         if (index <= date.getMonth() && contTempMonthDay <= date.getDate()) {

//             // VALIDATION JANUARY START (1 VIDEO) (2 VIDEOS)
//             if (index == 0 && contTempMonthDay <= 14) {
//                 contVideos++;
//             } else {
//                 if (contVideos == 194) {
//                     contVideos++;
//                 } else {
//                     contVideos += 2;
//                 }
//             }
//             contVideosBasic++;


//         }

//         contTempMonthDay++;
//     }



//     date.getMonth()
//     date.getDate()


// }

// // if 31
// // if dayOff
// // if




//     for (let i =)

//         if (month.name.toUpperCase() == 'JANUARY') {
//         if (contVi)
//     }



// month.days
// })




// let contVideos = 1;
// let totalVideos = 195;
// for (let i_level = 1; i_level <= 3; i++) {
//     // for(let i_cantClasses=1; i_cantClasses<=195; i_cantClasses++){
//     // }

//     if today
//         if dayOff
//         if 31
//         if endlevel + 1 &&


// }




// Array.from(document.querySelectorAll('TD')).forEach(TD => {
//     if (!isNaN(parseInt(TD.textContent)) == true) {

//         // CHECK



//         // PROGRESS:
//         // MARK ALL less
//         null {
//             &!= 31{
//                 week
//             }else {
//                 month
//             }
//         }
//         null
//         // dayOff at the end of the level
//         // Week
//         // endMonth


//         // WEEK
//         // MARK ALL
//         // 2 .CLASES
//         // A partir de
//         starWeekReviews
//         //

//         // if different from end of the month (VALIDATE)
//         // null && != 31 && != dayOff && != endLevel


//         // MONTH
//         // MARK ALL END OF THE MONTH
//         //


//         // TODAY
//         //


//     }


//     if (TD.textContent == date.getDate()) {
//         if (date.getDate() == monthsDays[date.getMonth()].days) {
//             if (TD.classList.contains('nextMonthReviews')) {
//                 TD.classList.remove('nextMonthReviews')
//             }
//             // nextWeekReviews
//             TD.classList.add('markTodayEndMonth');
//         } else {
//             TD.classList.add('markToday');
//         }
//         actualDay = TD.textContent;
//         actualDayTag = TD;
//     }
// })
// }))




// // Progress && NextWeekReview
// let stop = false;
// let stop2 = false;

// Array.from(document.querySelectorAll('TD')).forEach(TD => {
//     if (stop == false) {
//         if (!isNaN(parseInt(TD.textContent)) == true) {

//             if (TD == actualDayTag) {
//                 stop = true;
//             } else {
//                 TD.classList.add('markProgress');
//             }



//         }
//     }

//     // MARK NEXT WEEK REVIEW
//     if (stop == true) {
//         if (stop2 == false) {
//             if (TD.nextElementSibling == null) {
//                 if (TD.textContent != monthsDays[date.getMonth()].days) {
//                     TD.classList.add('nextWeekReviews')
//                     stop2 = true;
//                 }
//             }
//         }
//     }

// })



// // MARK BEGIN AND FINISH DAY OF EVERY COURSE
// // ---BEING
// stop = false;

// console.log(actualDay)

// document.querySelectorAll('TD').forEach((TD) => {
//     if (!isNaN(parseInt(TD.textContent)) == true) {
//         if (stop == false) {
//             TD.classList.add('basicLevelBegin')
//             stop = true;
//         }

//     }
// })
//     // ---BEING





// MIENTRAS MIENTRAS
// MARKING WEEK REVIEWS RECENTS
let stoped = 0;
Array.from(document.querySelectorAll('TD')).forEach((td) => {
    if(!isNaN(parseInt(td.textContent))){
        if(stoped < 2){
            if(td.textContent == 22 || td.textContent == 29){
                td.classList.add('previousWeekReviews')
                stoped++;
            }
        }
    }
})





// -------------------- MARK DAYS
// -------------- MARK DAYS --------------
// Today
let actualDay;
let actualDayTag;
let monthCaption = Array.from(document.querySelectorAll('caption'))[date.getMonth()];
let tbodyTemp = Array.from(monthCaption.nextElementSibling.nextElementSibling.children);
console.log(tbodyTemp);


// tbodyTemp.forEach((TR => {
//     Array.from(TR.children).forEach((TD) => {
// if(date.getDay() == monthsDays[date.getMonth()].days){
//     TD.classList.remove('markToday')
//     TD.classList.add('markTodayEndMonth')
// } else {
//     TD.classList.add('markToday');
//     actualDay = TD.textContent;
//     actualDayTag = TD;
//         }
//     })
// }));



// MARK MONTHS REVIEWS
let indexMonth = 0;
Array.from(document.querySelectorAll('TD')).forEach(TD => {
    if (indexMonth < 11) {
        if (!isNaN(parseInt(TD.textContent)) == true) {
            if (TD.textContent == monthsDays[indexMonth].days) {
                TD.classList.add('nextMonthReviews')
                indexMonth++;

                if (TD.classList.contains('nextWeekReviews')) {
                    TD.classList.remove('nextWeekReviews')
                }

            }
        }
    }
})





// MARK ACTUAL DAY
tbodyTemp.forEach((TR => {
    Array.from(TR.children).forEach((TD) => {
        if (TD.textContent == date.getDate()) {
            if (date.getDate() == monthsDays[date.getMonth()].days) {
                if(TD.classList.contains('nextMonthReviews')){
                    TD.classList.remove('nextMonthReviews')
                }
                // nextWeekReviews
                TD.classList.add('markTodayEndMonth');
            } else {
                TD.classList.add('markToday');
            }
            actualDay = TD.textContent;
            actualDayTag = TD;
        }
    })
}))




// Progress && NextWeekReview
let stop = false;
let stop2 = false;

Array.from(document.querySelectorAll('TD')).forEach(TD => {
    if (stop == false) {
        if (!isNaN(parseInt(TD.textContent)) == true) {

            if (TD == actualDayTag) {
                stop = true;
            } else {
                TD.classList.add('markProgress');
            }



        }
    }

    // MARK NEXT WEEK REVIEW
    if (stop == true) {
        if (stop2 == false) {
            if (TD.nextElementSibling == null) {
                if(TD.textContent != monthsDays[date.getMonth()].days){
                    TD.classList.add('nextWeekReviews')
                    stop2 = true;
                }
            }
        }
    }

})



// MARK BEGIN AND FINISH DAY OF EVERY COURSE
// ---BEING
stop = false;

console.log(actualDay)

document.querySelectorAll('TD').forEach((TD) => {
    if (!isNaN(parseInt(TD.textContent)) == true) {
        if (stop == false) {
            TD.classList.add('basicLevelBegin')
            stop = true;
        }

    }
})
    // ---BEING





