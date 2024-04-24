document.addEventListener('DOMContentLoaded', function () {
    const tekstElement = document.getElementById('tekst');
    let beginPunt = null;
    let eindPunt = null;

    tekstElement.innerHTML = tekstElement.innerText.split(' ').map(word => `<span>${word}</span>`).join(' ');

    const woorden = tekstElement.querySelectorAll('span');

    woorden.forEach(word => {
        word.addEventListener('click', function () {
            if (!beginPunt) {
                // Eerste klik, markeer als beginpunt en selecteer
                beginPunt = this;
                beginPunt.classList.add('begin');
                selecteerTekst(beginPunt, beginPunt);
            } else if (this !== beginPunt && !eindPunt) {
                // Tweede klik, markeer als eindpunt en selecteer tekst ertussen
                eindPunt = this;

                const start = Array.from(woorden).indexOf(beginPunt);
                const einde = Array.from(woorden).indexOf(eindPunt);

                selecteerTekst(beginPunt, eindPunt);

                // Reset begin- en eindpunten en stijlen
                beginPunt.classList.remove('begin');
                eindPunt.classList.remove('eind');
                beginPunt = null;
                eindPunt = null;
            } else {
                // Klik opnieuw op een woord om de selectie te resetten
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

    const kopieerBtn = document.getElementById('kopieerBtn');
    kopieerBtn.addEventListener('click', function () {
        const selectie = window.getSelection();
        const tekst = selectie.toString();
        const clipboardInfo = document.getElementById('clipboardInfo');
        if (tekst) {
            document.execCommand('copy');
            clipboardInfo.innerText = 'Gekopieerd: ' + tekst;
        } else {
            clipboardInfo.innerText = 'Geen tekst geselecteerd om te kopiëren.';
        }
    });
});