const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
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
const clipboardEl = document.getElementById("copiedToClipboard")
const checkboxes = document.querySelectorAll("input[type='checkbox']")
const outputFields = document.querySelectorAll(".output--field")

let numbersIncluded = false;
let symbolsIncluded = false;
let passwordLength = passwordEl.value;

// create an img element for the SVG
let copyIcon = document.createElement("img")
copyIcon.setAttribute("src", "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#d5d4d8" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
`));
copyIcon.className = "copy-icon"
let copyIcon2 = document.createElement("img")
copyIcon2.setAttribute("src", "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#d5d4d8" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
`));
copyIcon2.className = "copy-icon"



// Add event listeners to checkboxes
for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", selectedOptions)
}

// Add event listener for password input text
passwordEl.addEventListener("change", selectedOptions)

// Add event listener for clicking the output field
for (const output of outputFields) {
    output.addEventListener("click", copyMessage)
}

function copyMessage() {
    clipboardEl.textContent = "(Password copied to clipboard!)"
    clipboardEl.style.display = "block"
    setTimeout(() => {
        clipboardEl.style.display = "none"
        // clipboardEl.textContent = ""
    }, 3000)
}

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
    if (parseInt(passwordLength) > 20) passwordLength = 20;

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
    output2El.appendChild(copyIcon);
    output1El.appendChild(copyIcon2);
}

function getCharacters(symbols, numbers) {
    let pool = characters;

    if (!numbers) {
        // Remove numbers from the pool
        pool = pool.filter(char => isNaN(parseInt(char)));
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

