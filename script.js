// Assignment Code
var generateBtn = document.querySelector("#generate");
var resetBtn = document.querySelector("#reset");
var copyBtn = document.querySelector("#copy");
var checkBtn = document.querySelector("#check");
var uncheckBtn = document.querySelector("#uncheck");
var lengthRange = document.querySelector("#lengthRange");
var lengthNumber = document.querySelector("#lengthNumber");
var lowercaseEl = document.querySelector("#useLowercase");
var uppercaseEl = document.querySelector("#useUppercase");
var numberEl = document.querySelector("#useNumber");
var symbolEl = document.querySelector("#useSymbol");

// Sync slider with textbox and vice versa
lengthRange.addEventListener("input", syncSliderBox);
lengthNumber.addEventListener("input", syncSliderBox);
function syncSliderBox(event){
  var x = event.target.value;
  lengthRange.value = x;
  lengthNumber.value = x;
}

// Automatically populate data list for textbox
var list = document.querySelector("#defaultNumbers");
var allNum = [];
for (let i = Number(lengthNumber.min); i<=Number(lengthNumber.max); i++){
  allNum.push(i); // Create an array from 8 to 128;
  // console.log(i);
}
// Using the earlier array, create the option element in the datalist dynamically
allNum.forEach(function(item){
  var option = document.createElement("option");
  option.value = item;
  list.appendChild(option);
});

// ASCII Codes
var ascLower = ascGenerator(97, 122);
var ascUpper = ascGenerator(65, 90);
var ascNumber = ascGenerator(48, 57);
var ascSymbol = ascGenerator(33, 47).concat(ascGenerator(58, 64)).concat(ascGenerator(91, 96)).concat(ascGenerator(123, 126));

// ASCII Array Generator
function ascGenerator(min, max){
  var ascArray = [];
  for(let i = min; i<=max; i++){
    ascArray.push(i);
  }
  // console.log(ascArray);
  return ascArray; 
}

// Generate Password
function generatePassword(checkLength, checkLower, checkUpper, checkNumber, checkSymbol){
  var ascTotal=[]; // Creating an array of all ascii codes to choose from
  var password=[]; // Our output password
  
  // Using our checkbox values to make ascArray include all possible ascii codes
  if(checkLower){
    ascTotal = ascTotal.concat(ascLower)
    // Making sure the password includes the type by adding in a random character
    password.push(String.fromCharCode(ascLower[Math.floor(Math.random()*ascLower.length)]))
    checkLength--; // Reduces our length since we hardcoded a character in
  }
  
  if(checkUpper){
    ascTotal = ascTotal.concat(ascUpper)
    password.push(String.fromCharCode(ascUpper[Math.floor(Math.random()*ascUpper.length)]))
    checkLength--;
  }

  if(checkNumber){
    ascTotal = ascTotal.concat(ascNumber)
    password.push(String.fromCharCode(ascNumber[Math.floor(Math.random()*ascNumber.length)]))
    checkLength--;
  }

  if(checkSymbol){
    ascTotal = ascTotal.concat(ascSymbol)
    password.push(String.fromCharCode(ascSymbol[Math.floor(Math.random()*ascSymbol.length)]))
    checkLength--;  
  }
  
  //Add remaining random characters based on checkLength left
  for(let i = 0; i<checkLength; i++){
    password.push(String.fromCharCode(ascTotal[Math.floor(Math.random()*ascTotal.length)]));
  }
  password=shuffle(password); // Shuffle once otherwise our password will always be in the order of aB3$ depending on checkboxes;
  return password.join("");
}

// Copy function from https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
function copy() { 
  /* Get the text field */
  var copyText = document.querySelector("#password");
    /* Select the text field */
  copyText.select()
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  /* Copy the text inside the text field */
  document.execCommand("copy");
} 

// Fisher-Yates Shuffle from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

// Write password to the #password input
function writePassword() {
  var checkLength = document.querySelector("#lengthNumber").value;
  var checkLower = document.querySelector("#useLowercase").checked;
  var checkUpper = document.querySelector("#useUppercase").checked;
  var checkNumber = document.querySelector("#useNumber").checked;
  var checkSymbol = document.querySelector("#useSymbol").checked;

  // Check range on length and whether no types are checked
  if(checkLength<8){ //
    lengthNumber.value=8;
    document.querySelector("#lengthNumber").focus();
    alert("Password length cannot be less than 8")
  }else if(checkLength>128){
    lengthNumber.value=128;
    document.querySelector("#lengthNumber").focus();
    alert("Password length cannot be greater than 128")
  }else if(!(checkLower || checkUpper || checkNumber || checkSymbol)){
    document.querySelector("#useLowercase").focus();
    alert("You have no criterias included!");
  }else{
    var password = generatePassword(checkLength, checkLower, checkUpper, checkNumber, checkSymbol);
    // console.log(password);
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
    resetBtn.disabled=false;
    copyBtn.disabled=false;
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Add event listener to reset button
resetBtn.addEventListener("click", function(){
  var passwordText = document.querySelector("#password")
  if(confirm("Are you sure you wish to reset? Current password will be lost!")){;
  passwordText.placeholder = "RESET SUCCESSFUL";
  passwordText.value = "";
  resetBtn.disabled=true;
  copyBtn.disabled=true;
}})

// Add event listener to reset button
copyBtn.addEventListener("click", copy);

// Add event listener to check button
checkBtn.addEventListener("click", function(){
  lowercaseEl.checked=true;
  uppercaseEl.checked=true;
  numberEl.checked=true;
  symbolEl.checked=true;
})
// Add event listener to uncheck button
uncheckBtn.addEventListener("click", function(){
  lowercaseEl.checked=false;
  uppercaseEl.checked=false;
  numberEl.checked=false;
  symbolEl.checked=false;
})