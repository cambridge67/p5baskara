var pdfjsLib = window["pdfjs-dist/build/pdf"]
var index = 1
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

renderPage(index)

document.getElementById("btnprev").addEventListener("click", () => renderPage(index-1), false)
document.getElementById("btnnext").addEventListener("click", () => renderPage(index+1), false)

document.getElementById("a").addEventListener("click", () => renderPage(2), false)
document.getElementById("b").addEventListener("click", () => renderPage(3), false)
document.getElementById("c").addEventListener("click", () => renderPage(4), false)
document.getElementById("d").addEventListener("click", () => renderPage(6), false)
document.getElementById("e").addEventListener("click", () => renderPage(13), false)
document.getElementById("f").addEventListener("click", () => renderPage(14), false)
document.getElementById("g").addEventListener("click", () => renderPage(15), false)
document.getElementById("h").addEventListener("click", () => renderPage(17), false)
document.getElementById("i").addEventListener("click", () => renderPage(18), false)

function renderPage(i) {
    if (i < 1 || i > 19) {
        return
    }
    index = i
    return loadingTask.promise.then(function(pdf) {
        pdf.getPage(i).then(function(page) {
            var scale = 1.0;
            var viewport = page.getViewport({ scale: scale, });
            var outputScale = window.devicePixelRatio || 1;
        
            var canvas = document.getElementById('the-canvas');
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
        })
    })
}
