var pdfjsLib = window["pdfjs-dist/build/pdf"]
var loadingTask = pdfjsLib.getDocument({
    url: "assets/baskara.pdf",
    crossDomain: true,
    mode:'no-cors',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers':'*',
    'Access-Control-Allow-Methods':"POST, GET, OPTIONS, DELETE, PUT", 
    'Access-Control-Allow-Methods':'GET', 
    httpHeaders: {'Access-Control-Allow-Origin':'*'}
});

loadingTask.promise.then(function(pdf) {
    Promise.all([
        renderPage(1),
        renderPage(2),
        renderPage(3),
        renderPage(4),
        renderPage(5),
        renderPage(6),
        renderPage(7),
        renderPage(8),
        renderPage(9),
        renderPage(10),
        renderPage(11),
        renderPage(12),
        renderPage(13),
        renderPage(14),
        renderPage(15),
        renderPage(16),
        renderPage(17),
        renderPage(18),
        renderPage(19)
    ]).then(function() {
        document.getElementById("a").addEventListener("click", () => scrollTo(2), false);
        document.getElementById("b").addEventListener("click", () => scrollTo(3), false);
        document.getElementById("c").addEventListener("click", () => scrollTo(4), false);
        document.getElementById("d").addEventListener("click", () => scrollTo(6), false);
        document.getElementById("e").addEventListener("click", () => scrollTo(13), false);
        document.getElementById("f").addEventListener("click", () => scrollTo(14), false);
        document.getElementById("g").addEventListener("click", () => scrollTo(15), false);
        document.getElementById("h").addEventListener("click", () => scrollTo(17), false);
        document.getElementById("i").addEventListener("click", () => scrollTo(18), false);
    });

    function scrollTo(i) {
        return document.getElementById(`${i}`).scrollIntoView();
    }

    function renderPage(i) {
        return pdf.getPage(i).then(function(page) {
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale, });
            var outputScale = window.devicePixelRatio || 1;
        
            var canvas = document.getElementById(`${i}`);
            var context = canvas.getContext('2d');
        
            canvas.width = Math.floor(viewport.width * outputScale);
            canvas.height = Math.floor(viewport.height * outputScale);
            canvas.style.width = Math.floor(viewport.width) + "px";
            canvas.style.height =  Math.floor(viewport.height) + "px";
        
            var transform = outputScale !== 1
            ? [outputScale, 0, 0, outputScale, 0, 0]
            : null;
        
            var renderContext = {
            canvasContext: context,
            transform: transform,
            viewport: viewport
            };
            page.render(renderContext);
        });
    }
});
