const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

function getRandom(min, max, floatFlag) {
    r = Math.random() * (max - min) + min
    return floatFlag ? r : Math.floor(r)
}

let output1El = document.getElementById("field-1")
let output2El = document.getElementById("field-2")
const symbolEl = document.getElementById('toggle-symbols');
const numbersEl = document.getElementById('toggle-numbers');
const passwordEl = document.getElementById("psswrd")
const checkboxes = document.querySelectorAll("input[type='checkbox']")

console.log(passwordEl.value)
let numbersIncluded = false;
let symbolsIncluded = false;
let passwordLength = passwordEl.value;

//symbolEl.addEventListener('change', selectedOptions);
//numbersEl.addEventListener('change', selectedOptions);

// Add event listeners to checkboxes
for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", selectedOptions)
}

// Add event listener for password input text
passwordEl.addEventListener("change", selectedOptions)

function selectedOptions(e) {
    e.preventDefault();
    symbolsIncluded = symbolEl.checked;
    numbersIncluded = numbersEl.checked;
    passwordLength = passwordEl.value;
    console.log("symbols", symbolsIncluded)
    console.log("numbers", numbersIncluded)
    console.log("password", passwordLength)
}


function generate() {    
    let keys1 = [];
    let keys2 = [];
    for (let i = 0; i < parseInt(passwordLength); i++) {
       /*
        keys1.push(characters[getRandom(0, characters.length)])
        keys2.push(characters[getRandom(0, characters.length)])
        */
        keys1.push(getCharacters(symbolsIncluded, numbersIncluded));
        keys2.push(getCharacters(symbolsIncluded, numbersIncluded));
    }
    output1El.textContent = keys1.join("")
    output2El.textContent = keys2.join("")
}

 function getCharacters(symbols, numbers) {
            let pool = characters;

            if (!numbers) {
                // Remove numbers from the pool
                pool = pool.filter(char => isNaN(parseInt(char, 10)));
            }

            if (!symbols) {
                // Remove symbols from the pool
                pool = pool.filter(char => !(/[~`!@#$%^&*()_+\-=\{\}\[\]:;<>,.?/|]/.test(char)));
            }

            return pool[getRandom(0, pool.length)];
        }

function copyToClipboard(element) {
            // Create a range and select the text within the output field
            const range = document.createRange();
            range.selectNodeContents(element);

            // Create a selection and set it to the created range
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            // Execute the copy command
            document.execCommand("copy");

            // Clean up the selection
            selection.removeAllRanges();

            // Provide visual feedback or handle other actions if needed
            console.log("Password copied to clipboard!");
        }

