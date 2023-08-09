// unpinning a document from infura

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const unpinFromInfura = async (hash) => {
    const res = await fetch(`https://ipfs.infura.io:5001/api/v0/pin/rm?arg=${hash}`, {
        method: 'POST',
        headers: {
            'Authorization': authorization
        }
    });
    console.log(res);
}

unpinFromInfura("Qma3nbPLRJj32mBRUNPxat62hycjUfpQ3SoBwy3BSVwQ5n")
