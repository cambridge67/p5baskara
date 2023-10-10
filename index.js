async function run() {
    document.getElementById("jsquestion").remove()
 
    const loadingImg = document.createElement("img")
    loadingImg.setAttribute("class", "img-fluid")
    loadingImg.setAttribute("src", "assets/sun-loading.gif")
    loadingImg.setAttribute("style", "width: 10%; height: 10%")

    document.getElementById("title").appendChild(loadingImg)

    for (let i = 1; i <= 19; i++) {
        const canvas = document.createElement("canvas")
        canvas.setAttribute("id", `${i}`)

        document.getElementById("content").appendChild(canvas)
    }

    const pdfjsLib = window["pdfjs-dist/build/pdf"]

    const pdfRaw = await fetch("assets/baskara.pdf").then(res => res.arrayBuffer())
    const pdf = await pdfjsLib.getDocument(pdfRaw).promise

    const render = []

    for (let i = 1; i <= 19; i++) {
        const num = i
        render.push(renderPage(num))
    }

    await Promise.all(render)

    loadingImg.remove()

    dropdownMenuBtn("a", 2)
    dropdownMenuBtn("b", 3)
    dropdownMenuBtn("c", 4)
    dropdownMenuBtn("d", 6)
    dropdownMenuBtn("e", 13)
    dropdownMenuBtn("f", 14)
    dropdownMenuBtn("g", 15)
    dropdownMenuBtn("h", 17)
    dropdownMenuBtn("i", 18)

    function dropdownMenuBtn(id, page) {
        document.getElementById(`${id}`).addEventListener("click", () => scrollTo(page), false);
    }

    function scrollTo(i) {
        return document.getElementById(`${i}`).scrollIntoView()
    }

    async function renderPage(i) {
        const page = await pdf.getPage(i)
        
        const viewportOriginal = page.getViewport({ scale: 1 })
        const scale = Math.min((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / viewportOriginal.width, 1.5)
        const viewport = page.getViewport({ scale: scale, })
        const outputScale = window.devicePixelRatio || 1
    
        const canvas = document.getElementById(`${i}`);
        const context = canvas.getContext('2d');
    
        canvas.width = Math.floor(viewport.width * outputScale)
        canvas.height = Math.floor(viewport.height * outputScale)
        canvas.style.width = Math.floor(viewport.width) + "px"
        canvas.style.height =  Math.floor(viewport.height) + "px"
    
        const transform = outputScale !== 1
            ? [outputScale, 0, 0, outputScale, 0, 0]
            : null
    
        const renderContext = {
            canvasContext: context,
            transform: transform,
            viewport: viewport
        }

        await page.render(renderContext).promise
    }
}

