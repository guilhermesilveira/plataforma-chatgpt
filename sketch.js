let personagem;
let inimigo;
let chao = [];
let puloSound;
let velocidade = 3;

let imgInimigo, imgChao;
let personagemAtual = 0;
function preload() {
    imgPersonagens = [loadImage('assets/platformChar_walk1.png'), loadImage('assets/platformChar_walk2.png')];
    imgInimigo = loadImage('assets/platformPack_tile043.png');
    imgChao = loadImage('assets/platformPack_tile013.png');
    puloSound = loadSound('assets/footstep09.ogg');
}

function setup() {
    createCanvas(800, 400);

    personagem = {
        x: 50,
        y: height - 96 - 64,
        width: 96,
        height: 96,
        pulando: false,
        alturaPulo: -20,
        velocidadePulo: 0,
        gravidade: 0.6,
    };
    
    inimigo = {
        img: imgInimigo,
        x: width,
        y: height - 64 - 64,
        width: 64,
        height: 64,
    };
    
    for (let i = 0; i <= width / 64 + 1; i++) {
        chao.push({
            img: imgChao,
            x: i * 64,
            y: height - 64,
            width: 64,
            height: 64,
        });
    }
}

function draw() {
    background(220);

    // Desenhar e mover o chão
    for (let tile of chao) {
        image(tile.img, tile.x, tile.y, tile.width, tile.height);
        tile.x -= velocidade;
        if (tile.x <= -64) {
            // move pro fim da tela
            // mas desloca de acordo com o delta de pixels que ficou fora da tela
            // mais um tamanho do sprite
            tile.x = width + (tile.x + 64);


            // tile.x = width;
        }
    }

    // troca o personagem atual para o proximo sprite
    // se 0 vai pro 1
    // se 1 vai pro 0
    personagemAtual = (personagemAtual + 1) % 2;
    personagem.img = imgPersonagens[personagemAtual];

    // Desenhar personagem
    image(personagem.img, personagem.x, personagem.y, personagem.width, personagem.height);

    // Pulando
    if (personagem.pulando) {
        personagem.y += personagem.velocidadePulo;
        personagem.velocidadePulo += personagem.gravidade;
        if (personagem.y > height - 96 - 64) {
            personagem.y = height - 96 - 64;
            personagem.pulando = false;
        }
    }

    // Desenhar e mover inimigo
    image(inimigo.img, inimigo.x, inimigo.y, inimigo.width, inimigo.height);
    inimigo.x -= velocidade;

    if (inimigo.x < -inimigo.width) {
        inimigo.x = width;
        velocidade += 0.1;
    }

    // Verificar colisão
    if (personagem.x + personagem.width > inimigo.x &&
        personagem.x < inimigo.x + inimigo.width &&
        personagem.y + personagem.height > inimigo.y + 32 &&
        personagem.y < inimigo.y + inimigo.height) {
        noLoop(); // Fim de jogo
    }
}

function keyPressed() {
    if (key === ' ' && !personagem.pulando) {
        personagem.pulando = true;
        personagem.velocidadePulo = personagem.alturaPulo;
        puloSound.play();
    }
}
