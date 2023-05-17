  import fs from 'fs'

    
    function extrairLink(texto){
        const regex = /\[([^[]*?)\]\((https?:\/\/[^\s?#.]*.[^\s]*)\)/gm;
        const pegaLink = [...texto.matchAll(regex)];
        const capturas = pegaLink.map(captura => ({[captura[1]]: captura[2]}))
        return capturas !== 0 ? capturas : 'Não existe link a ser extraido'
    }
   


function trataErro(erro){
    throw new Error(erro.code, 'O diretório não foi encontrado')
}    

// async / await
 async function pegaArquivo(caminhoDoArquivo){
    try{ 
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extrairLink(texto)
    }catch(erro){
        trataErro(erro)
    }    

} 

     export default pegaArquivo;

// promises / then

// function  pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
    
//     fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => console.log(texto))
//     .catch(trataErro)
// }

// sem o promises
    
    // function  pegaArquivo(caminhoDoArquivo){
    //     const encoding = 'utf-8';
    // fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
    //     if(erro){
    //         trataErro(erro)
    //     }
        
    //         console.log(texto)
    // })
// }



