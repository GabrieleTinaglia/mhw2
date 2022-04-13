var num_sel = [];
function res(event) {
    const titolo = document.querySelector('div h1');
    const testo = document.querySelector('div p');
    if ((num_sel[0].dataset.choiceId === num_sel[1].dataset.choiceId) && ((num_sel[0].dataset.choiceId != num_sel[2].dataset.choiceId) || (num_sel[0].dataset.choiceId === num_sel[2].dataset.choiceId))) {
        let risp = num_sel[0].dataset.choiceId;
        console.log(num_sel[0].dataset.choiceId);
        titolo.textContent = RESULTS_MAP[risp].title;
        testo.textContent = RESULTS_MAP[risp].contents;
    }
    else if (num_sel[1].dataset.choiceId === num_sel[2].dataset.choiceId) {
        let risp = num_sel[1].dataset.choiceId;
        console.log(num_sel[1].dataset.choiceId);
        titolo.textContent = RESULTS_MAP[risp].title;
        testo.textContent = RESULTS_MAP[risp].contents;
    }
    else {
        let risp = num_sel[0].dataset.choiceId;
        console.log(num_sel[0].dataset.choiceId);
        titolo.textContent = RESULTS_MAP[risp].title;
        testo.textContent = RESULTS_MAP[risp].contents;
    }
}

const divTot = document.querySelectorAll(".choice-grid div");
function undo(img) {
    img.classList.add('discarded');
    img.classList.remove('selected');
    img.addEventListener('click', select);
    img.querySelector('.checkbox').src = 'images/unchecked.png';
    let temp = num_sel.indexOf(img);
    num_sel.splice(temp, 1);
}
function select(event) {
    let sel = 0;
    const check = event.currentTarget;
    for (const img of num_sel) {
        if ((img.dataset.questionId == check.dataset.questionId) && (img.dataset.choiceId == check.dataset.choiceId)) {
            sel = 1;

        }
        if ((img.dataset.questionId == check.dataset.questionId) && (img.dataset.choiceId != check.dataset.choiceId)) {
            undo(img);


        }

    }
    if (sel != 1) {

        check.classList.remove('discarded');
        check.classList.add('selected');
        const img = check.querySelector(".checkbox").src = 'images/checked.png';
        num_sel.push(check);
        for (const div of divTot) {
            if ((div.dataset.questionId == check.dataset.questionId) && (div.dataset.choiceId != check.dataset.choiceId)) {
                div.classList.add('discarded');
            }
        }

    }


    if (num_sel.length == 3) {
        for (const div of divTot) {
            div.removeEventListener('click', select);
        }
        res();
    }
}

for (const div of divTot) {
    div.addEventListener('click', select);
}
function reset() {
    for (const div of divTot) {
        div.addEventListener('click', select);
        div.querySelector('.checkbox').src = 'images/unchecked.png';
        div.classList.remove('discarded');
        div.classList.remove('selected');
    }
    num_sel.length = 0;
    const titolo = document.querySelector('div h1');
    const testo = document.querySelector('div p');
    titolo.innerHTML = '';
    testo.innerHTML = '';
}

const button = document.querySelector('button');
button.addEventListener('click', reset);