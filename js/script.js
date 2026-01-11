// ----- LOAD FOOTER FROM FOOTER.HTML -----
fetch('components/footer.html')
    .then(res => res.text())
    .then(data => document.getElementById('footer-area').innerHTML = data);