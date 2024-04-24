function setRandomBackgroundColor() {
    const colors = [
        'rgba(131, 236, 157, 0.5)',
        'rgba(208, 236, 131, 0.5)',
        'rgba(236, 201, 131, 0.5)',
        'rgba(236, 161, 131, 0.5)',
        'rgba(236, 131, 131, 0.5)',
        'rgba(236, 131, 197, 0.5)',
        'rgba(199, 131, 236, 0.5)',
        'rgba(141, 131, 236, 0.5)',
        'rgba(131, 159, 236, 0.5)',
        'rgba(131, 224, 236, 0.5)'
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    document.documentElement.style.setProperty('--random-selection-color', colors[randomIndex]);
}


document.addEventListener('DOMContentLoaded', function () {
    const pElementen = document.querySelectorAll('p');

    pElementen.forEach(pElement => {
        let beginPunt = null;
        let eindPunt = null;

        pElement.innerHTML = pElement.innerText.split(' ').map(word => `<span>${word}</span>`).join(' ');

        const woorden = pElement.querySelectorAll('span');

        woorden.forEach(word => {
            word.addEventListener('click', function () {
                if (!beginPunt) {
                    setRandomBackgroundColor();

                    beginPunt = this;
                    selecteerTekst(beginPunt, beginPunt);
                } else if (this !== beginPunt && !eindPunt) {
                    eindPunt = this;

                    const start = Array.from(woorden).indexOf(beginPunt);
                    const einde = Array.from(woorden).indexOf(eindPunt);

                    selecteerTekst(beginPunt, eindPunt);

                    beginPunt.classList.remove('begin');
                    eindPunt.classList.remove('eind');
                    beginPunt = null;
                    eindPunt = null;
                } else {
                    woorden.forEach(word => {
                        word.classList.remove('begin');
                        word.classList.remove('eind');

                    });
                    beginPunt = null;
                    eindPunt = null;
                }
            });
        });

        function selecteerTekst(startNode, endNode) {
            const selectie = window.getSelection();
            const bereik = document.createRange();

            bereik.setStartBefore(startNode);
            bereik.setEndAfter(endNode);

            selectie.removeAllRanges();
            selectie.addRange(bereik);
        }
    });

    const kopieerBtn = document.getElementById('kopieerBtn');
    kopieerBtn.addEventListener('click', function () {
        const selectie = window.getSelection();
        const tekst = selectie.toString();
        const clipboardInfo = document.getElementById('clipboardInfo');
        clipboardInfo.classList.remove('feedback');
        clipboardInfo.classList.remove('feedback2');



        if (tekst) {
            navigator.clipboard.writeText(tekst)
                .then(() => {
                    clipboardInfo.innerText = tekst;
                    clipboardInfo.classList.add('feedback');
                    console.log(clipboardInfo.innerText);

                })
                .catch(err => {
                    console.error('Fout bij kopiëren naar klembord:', err);
                    clipboardInfo.innerText = 'Er is een fout opgetreden bij het kopiëren naar het klembord.';
                });
        } else {
            clipboardInfo.innerText = 'Geen tekst geselecteerd om te kopiëren.';
            clipboardInfo.classList.add('feedback2');
        }
    });

    const toevoegBtn = document.getElementById('toevoegenBtn');
    toevoegBtn.addEventListener('click', function () {
        const selectie = window.getSelection();
        const tekst = selectie.toString();
        const clipboardInfo = document.getElementById('clipboardInfo');
        clipboardInfo.classList.remove('feedback');
        clipboardInfo.classList.remove('feedback2');




        if (tekst) {
            navigator.clipboard.writeText(tekst)
                .then(() => {
                    clipboardInfo.innerText = clipboardInfo.innerText + ' ' + tekst;
                    clipboardInfo.classList.add('feedback');
                    navigator.clipboard.writeText(clipboardInfo.innerText + ' ' + tekst);

                })
                .catch(err => {
                    console.error('Fout bij kopiëren naar klembord:', err);
                    clipboardInfo.innerText = 'Er is een fout opgetreden bij het kopiëren naar het klembord.';
                });
        } else {
            clipboardInfo.innerText = 'Geen tekst geselecteerd om te kopiëren.';
            clipboardInfo.classList.add('feedback2');

        }
    });
});


function scrollByAmount(amount) {
    window.scrollBy({
        top: amount * window.innerHeight / 100,
        behavior: 'smooth'
    });
}



