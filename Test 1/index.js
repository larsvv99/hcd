// document.addEventListener('mouseup', function () {
//     var selectedText = window.getSelection().toString().trim();
//     if (selectedText !== '') {
//         // Copy the selected text to clipboard
//         navigator.clipboard.writeText(selectedText)
//             .then(function () {
//                 console.log('Text copied to clipboard: ' + selectedText);
//                 alert('Text copied to clipboard: ' + selectedText);
//             })
//             .catch(function (err) {
//                 console.error('Failed to copy text to clipboard: ', err);
//             });
//     }
// });

document.addEventListener('mouseup', function () {
    var selectedText = window.getSelection().toString().trim();
    var selectedElement = window.getSelection().anchorNode.parentNode;
    // Check if the selected text is within <p> or <h> tags
    if ((selectedElement.tagName === 'P' || selectedElement.tagName === 'H1' || selectedElement.tagName === 'H2' || selectedElement.tagName === 'H3' || selectedElement.tagName === 'H4' || selectedElement.tagName === 'H5' || selectedElement.tagName === 'H6') && selectedText !== '') {
        // Copy the selected text to clipboard
        navigator.clipboard.writeText(selectedText)
            .then(function () {
                console.log('Text copied to clipboard: ' + selectedText);
                // Paste the copied text into a textarea
                var textarea = document.getElementById('pastedText');
                textarea.value = selectedText;
                console.log('Text pasted into textarea.');
            })
            .catch(function (err) {
                console.error('Failed to copy text to clipboard: ', err);
            });
    }
});

