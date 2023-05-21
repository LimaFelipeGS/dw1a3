const topleft = prompt('Digite o valor da borda superior esquerda (em píxels)')
const topright = prompt('Digite o valor da borda superior direita (em píxels)')
const botleft = prompt('Digite o valor da borda inferior direita (em píxels)')
const botright = prompt('Digite o valor da borda inferior esquerda (em píxels)')

const element = document.querySelector('.caixa');
element.style.borderRadius = '0px 0px 0px 0px'
element.style.borderRadius = `${topleft}px ${topright}px ${botleft}px ${botright}px`

let css = document.createElement('css')
css.textContent = `border-radius: ${topleft}px ${topright}px ${botleft}px ${botright}px`
document.body.append(css)