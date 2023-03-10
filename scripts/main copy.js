import { englishsLevels, classesDuration, monthsDays, quotes } from './jsons.js'


// -------------- ENGLISH LEVEL --------------
let date = new Date();

// englishsLevels.forEach(level => {
//     if(date.getDate() >= level.start && date.getMonth()){

//     }
// })

// let currentLevel = englishsLevels
document.querySelector('.englishLevel').textContent = englishsLevels[0].level;





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





