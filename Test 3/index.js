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
                    beginPunt = this;
                    beginPunt.classList.add('begin');
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
        if (tekst) {
            navigator.clipboard.writeText(tekst)
                .then(() => {
                    clipboardInfo.innerText = 'Gekopieerd naar klembord: ' + tekst;
                })
                .catch(err => {
                    console.error('Fout bij kopiëren naar klembord:', err);
                    clipboardInfo.innerText = 'Er is een fout opgetreden bij het kopiëren naar het klembord.';
                });
        } else {
            clipboardInfo.innerText = 'Geen tekst geselecteerd om te kopiëren.';
        }
    });
});




function scrollByAmount(amount) {
    window.scrollBy({
        top: amount * window.innerHeight / 100,
        behavior: 'smooth'
    });
}