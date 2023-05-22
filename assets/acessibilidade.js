

const seletoresTexto = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
    // darkmode = new Darkmode;
let zoom = 0;

function aumentarTexto() {
    mudarTamanhoSeletores(4)
}

function diminuirTexto() {
    mudarTamanhoSeletores(-4)
}

// function toggleAltoContraste() {
//     darkmode.toggle()
// }
const mudarTamanhoSeletores = e => {
    (zoom = e > 0 ? zoom += 1 : zoom -= 1) > 3 ? zoom = 3 : zoom < -3 && (zoom = -3), 3 != zoom && -3 != zoom && seletoresTexto.forEach(o => {
        let t = document.querySelectorAll(o),
            a = Array.from(t)[0],
            i = parseFloat(window.getComputedStyle(a, null).getPropertyValue("font-size").replace("px", ""));
        a.style.fontSize = i + e + "px"
    })
};

function ferramentaAcessibilidade(e) {
    switch (e) {
        case "aumentar-texto":
            aumentarTexto();
            break;
        case "diminuir-texto":
            diminuirTexto();
            break;
        // case "modo-alto-contraste":
        //     toggleAltoContraste()
    }
}
let acessibilityToolElement = document.createElement("div");
acessibilityToolElement.id = "acessibilidade-card", acessibilityToolElement.innerHTML = ` <button onclick="ferramentaAcessibilidade('aumentar-texto')">+A</button> <button onclick="ferramentaAcessibilidade('diminuir-texto')">-A</button> <button onclick="ferramentaAcessibilidade('modo-alto-contraste')">Modo alto contraste</button> `, acessibilityToolElement.style.cssText = ` position: fixed; right: 20px; bottom: 30px; font-family: sans-serif; background: #FFFFFF; padding: 20px; border-radius: 10px; box-shadow: 2px 2px 32px 25px rgba(0, 0, 0, .03); `, document.body.appendChild(acessibilityToolElement);