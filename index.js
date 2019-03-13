var fs = require('fs');

console.log("Starting...");

var pokemonData = JSON.parse(fs.readFileSync("pokemon.json"));
var pokedexDictionary = JSON.parse(fs.readFileSync("pokedex.json"));
var spriteData = {};
spriteData.pokemon = {};


var pokemonKeys = Object.keys(pokemonData);





for(var i=0;i!=pokemonKeys.length;i++)
{
    var pkmnName = pokemonKeys[i]
    var pokeDexId = pokedexDictionary[pkmnName];

    var pkmn = pokemonData[pkmnName];
    var spriteDataPkmn = {};
    try{

        var threeDigitId = pokedexIdToThreeDigit(pokeDexId);
    }
    catch(e)
    {
        console.log("error: " + pkmnName + "<-- is missing from dictionary.");
        break;
    }

    var gifFrontPath = "Sprites/front/" + threeDigitId + ".gif";
    var gifBackPath = "Sprites/back/" + threeDigitId + ".gif";
    var gifFrontBase64 = readFileAsBase64(gifFrontPath);
    var gifBackBase64 = readFileAsBase64(gifBackPath);

    spriteDataPkmn.front = gifFrontBase64
    spriteDataPkmn.back = gifBackBase64;

    spriteData.pokemon[pkmnName] = spriteDataPkmn;
}

fs.writeFileSync("pokemonSprites.json",JSON.stringify(spriteData,null,4));
console.log("Done!");

function pokedexIdToThreeDigit(id)
{
    id = id.toString();
    var preNumbers = "";
    var newId = id;
    while(newId.length!=3)
    {
        preNumbers+="0";
        newId = preNumbers+id;
    }
    return newId;
}

function readFileAsBase64(file)
{
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}