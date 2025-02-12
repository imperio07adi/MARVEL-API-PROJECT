const publicKey = 'ac925d77d596c2b8f5f04e3faa04a48b';
const privateKey = 'e86f17babd7d8b9cb8718fd957a0813bd51a2475';


function generateMD5Hash(ts, privateKey, publicKey) {
    return CryptoJS.MD5(ts + privateKey + publicKey).toString();
}


function fetchCharacterData(characterName) {
    const ts = new Date().getTime();  
    const hash = generateMD5Hash(ts, privateKey, publicKey);  
    const url = `https://gateway.marvel.com/v1/public/characters?name=${characterName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayCharacterInfo(data))
        .catch(error => console.error('Error fetching data:', error));
}


function displayCharacterInfo(data) {
    const characterInfoDiv = document.getElementById('characterInfo');
    characterInfoDiv.innerHTML = '';

    if (data && data.data && data.data.results.length > 0) {
        const character = data.data.results[0];
        characterInfoDiv.innerHTML = `
            <h3>${character.name}</h3>
            <p>${character.description || 'No description available.'}</p>
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}" height="20%" width="20%">
        `;
    } else {
        characterInfoDiv.innerHTML = '<p>No character found.</p>';
    }
}


document.getElementById('searchButton').addEventListener('click', function () {
    const characterName = document.getElementById('characterName').value;
    if (characterName) {
        fetchCharacterData(characterName);
    } else {
        alert('Please enter a character name!');
    }
});
