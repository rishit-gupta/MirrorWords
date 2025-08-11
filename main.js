// MirrorWords main.js

const input = document.getElementById('input');
const output = document.getElementById('output');
const mode = document.getElementById('mode');

// Upside-down Unicode map
const upsideDownMap = {
    'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ','i':'ᴉ','j':'ɾ','k':'ʞ','l':'ן','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ','w':'ʍ','x':'x','y':'ʎ','z':'z',
    'A':'∀','B':'𐐒','C':'Ɔ','D':'p','E':'Ǝ','F':'Ⅎ','G':'פ','H':'H','I':'I','J':'ſ','K':'ʞ','L':'˥','M':'W','N':'N','O':'O','P':'Ԁ','Q':'Ό','R':'ᴚ','S':'S','T':'┴','U':'∩','V':'Λ','W':'M','X':'X','Y':'⅄','Z':'Z',
    '1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'ㄥ','8':'8','9':'6','0':'0',
    '.':'˙',',':'‘','!':'¡','?':'¿','"':'„','\'':'‚','(':' )',')':'(','[':']',']':'[','{':'}','}':'{','<':'>','>':'<','_':'‾','&':'⅋',';':'؛','‿':'⁀','⁅':'⁆','∴':'∵',' ':' '
};

// Emoji map (expand as needed)
const emojiMap = {
    'sun': '🌞', 'heart': '❤️', 'star': '⭐', 'moon': '🌙', 'cat': '🐱', 'dog': '🐶', 'fire': '🔥', 'love': '❤️', 'happy': '😊', 'sad': '😢', 'coffee': '☕', 'tree': '🌳', 'car': '🚗', 'book': '📖', 'music': '🎵', 'smile': '😄', 'laugh': '😂', 'cry': '😭', 'food': '🍔', 'pizza': '🍕', 'flower': '🌸', 'ok': '👌', 'thumb': '👍', 'phone': '📱', 'computer': '💻', 'rain': '🌧️', 'cloud': '☁️', 'snow': '❄️', 'star': '⭐', 'cake': '🎂', 'birthday': '🎉', 'gift': '🎁', 'dog': '🐕', 'cat': '🐈', 'bird': '🐦', 'fish': '🐟', 'fox': '🦊', 'bear': '🐻', 'lion': '🦁', 'tiger': '🐯', 'horse': '🐴', 'elephant': '🐘', 'monkey': '🐒', 'chicken': '🐔', 'pig': '🐷', 'cow': '🐮', 'sheep': '🐑', 'rabbit': '🐇', 'frog': '🐸', 'panda': '🐼', 'koala': '🐨', 'penguin': '🐧', 'mouse': '🐭', 'bee': '🐝', 'ant': '🐜', 'butterfly': '🦋', 'spider': '🕷️', 'snake': '🐍', 'turtle': '🐢', 'dragon': '🐉', 'unicorn': '🦄', 'apple': '🍎', 'banana': '🍌', 'grape': '🍇', 'lemon': '🍋', 'peach': '🍑', 'watermelon': '🍉', 'cherry': '🍒', 'strawberry': '🍓', 'carrot': '🥕', 'corn': '🌽', 'potato': '🥔', 'tomato': '🍅', 'bread': '🍞', 'cheese': '🧀', 'egg': '🥚', 'milk': '🥛', 'ice': '🍦', 'chocolate': '🍫', 'cookie': '🍪', 'candy': '🍬', 'popcorn': '🍿', 'sushi': '🍣', 'rice': '🍚', 'noodle': '🍜', 'burger': '🍔', 'fries': '🍟', 'hotdog': '🌭', 'pizza': '🍕', 'sandwich': '🥪', 'salad': '🥗', 'soup': '🥣', 'bacon': '🥓', 'shrimp': '🍤', 'octopus': '🐙', 'crab': '🦀', 'lobster': '🦞', 'bread': '🍞', 'meat': '🥩', 'chicken': '🍗', 'eggplant': '🍆', 'pepper': '🌶️', 'avocado': '🥑', 'broccoli': '🥦', 'mushroom': '🍄', 'onion': '🧅', 'garlic': '🧄', 'lettuce': '🥬', 'cucumber': '🥒', 'pumpkin': '🎃', 'peanut': '🥜', 'chestnut': '🌰', 'walnut': '🥜', 'almond': '🥜', 'hazelnut': '🌰', 'cashew': '🥜', 'pistachio': '🥜', 'coconut': '🥥', 'date': '🌴', 'fig': '🍈', 'grapefruit': '🍊', 'kiwi': '🥝', 'lime': '🍈', 'mango': '🥭', 'melon': '🍈', 'nectarine': '🍑', 'olive': '🫒', 'papaya': '🥭', 'passionfruit': '🥭', 'pear': '🍐', 'persimmon': '🍅', 'plum': '🍑', 'pomegranate': '🍎', 'quince': '🍏', 'raspberry': '🍓', 'tangerine': '🍊', 'watermelon': '🍉', 'zucchini': '🥒', 'corn': '🌽', 'pea': '🫛', 'bean': '🫘', 'spinach': '🥬', 'turnip': '🥕', 'yam': '🍠', 'sweetpotato': '🍠'
};

// Morse code map
const morseMap = {
    'a':'.-', 'b':'-...', 'c':'-.-.', 'd':'-..', 'e':'.', 'f':'..-.', 'g':'--.', 'h':'....', 'i':'..', 'j':'.---', 'k':'-.-', 'l':'.-..', 'm':'--', 'n':'-.', 'o':'---', 'p':'.--.', 'q':'--.-', 'r':'.-.', 's':'...', 't':'-', 'u':'..-', 'v':'...-', 'w':'.--', 'x':'-..-', 'y':'-.--', 'z':'--..',
    '0':'-----', '1':'.----', '2':'..---', '3':'...--', '4':'....-', '5':'.....', '6':'-....', '7':'--...', '8':'---..', '9':'----.',
    '.':'.-.-.-', ',':'--..--', '?':'..--..', '!':'-.-.--', '/':'-..-.', '(':'-.--.', ')':'-.--.-', '&':'.-...', ':':'---...', ';':'-.-.-.', '=':'-...-', '+':'.-.-.', '-':'-....-', '_':'..--.-', '"':'.-..-.', '$':'...-..-', '@':'.--.-.', ' ':'/'
};

function toBackwards(text) {
    return text.split('').reverse().join('');
}

function toUpsideDown(text) {
    return text.split('').reverse().map(c => upsideDownMap[c] || upsideDownMap[c.toLowerCase()] || c).join('');
}

function toEmoji(text) {
    return text.split(/(\s+)/).map(word => {
        let clean = word.toLowerCase().replace(/[^a-z]/g, '');
        return emojiMap[clean] ? emojiMap[clean] : word;
    }).join('');
}

function toMorse(text) {
    return text.toLowerCase().split('').map(c => morseMap[c] || c).join(' ');
}

function updateOutput() {
    const val = input.value;
    let result = '';
    switch (mode.value) {
        case 'backwards':
            result = toBackwards(val);
            break;
        case 'upsidedown':
            result = toUpsideDown(val);
            break;
        case 'emoji':
            result = toEmoji(val);
            break;
        case 'morse':
            result = toMorse(val);
            break;
    }
    output.textContent = result;
}

input.addEventListener('input', updateOutput);
mode.addEventListener('change', updateOutput);

// Keypress animation & floating letters
input.addEventListener('keydown', (e) => {
    input.classList.add('key-press');
    setTimeout(() => input.classList.remove('key-press'), 180);
    // Floating letter
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        const rect = input.getBoundingClientRect();
        const letter = document.createElement('span');
        letter.className = 'floating-letter';
        letter.textContent = e.key;
        letter.style.left = (rect.left + 60 + Math.random() * 60) + 'px';
        letter.style.top = (rect.top + 30 + Math.random() * 40) + 'px';
        document.body.appendChild(letter);
        setTimeout(() => letter.remove(), 900);
    }
});

// Initialize output
updateOutput();
