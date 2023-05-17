import pegaArquivo from './index.js';
import fs from 'fs'
import linkValidado from './validação.js';

const caminho = process.argv


async function imprimiLista(valida, resultado, identificador = ''){

    if(valida){
    console.log('lista validada',identificador, await linkValidado(resultado))
    }else{
        console.log('lista de links', identificador, resultado)
    }

}

async function processaTexto(argumentos){
    const caminho =  argumentos[2]
    const valida = argumentos[3] === '--valida';

    try{
        fs.lstatSync(caminho)
    } catch(erro){
        if(erro.code === 'ENOENT'){
            console.log('O Arquivo ou Direitório não existe')
            return;
        } 
    }

    

    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(argumentos[2])
        imprimiLista(valida,resultado)
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivo = fs.promises.readdir(caminho)
    arquivo.forEach( async nomeDeArquivo => {
            const listas = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimiLista(valida, listas, nomeDeArquivo)
        })
    }
}

    processaTexto(caminho)