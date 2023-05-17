function extrairLink(arrLinks){
 return arrLinks.map(objetoLink => Object.values(objetoLink).join())
}

async function checaLinks(arrLinks){
    const arrStatus =  await Promise
    .all(
         arrLinks.map( async (url) => {
             try{
                const response = await fetch(url)
                return response.status

            }catch(erro){
               return manejaErro(erro)
            }
        })
    )
    return arrStatus;
}

function manejaErro(erro){
    console.log(erro)
}
export default async function linkValidado(listaDeLink){
    const link = extrairLink(listaDeLink)
    const status = await checaLinks(link)
    
    return listaDeLink.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}