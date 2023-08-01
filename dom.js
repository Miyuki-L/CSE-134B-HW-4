/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advWalkBtn');
    element.addEventListener('click', function () {
        advanceWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModifyBtn');
    element.addEventListener('click', function () {
        advanceModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.querySelector('select');
    element.addEventListener('change', function () {
        changeInputOptions();
    });

    element = document.getElementById('advAddBtn');
    element.addEventListener('click', function () {
        addAdvanced();
    });

    element = document.getElementById('safeDeleteBtn');
    element.addEventListener('click', function () {
        safeDelete();
    });

    element = document.getElementById('selectorDeleteBtn');
    element.addEventListener('click', function () {
        selectorDelete();
    });

    element = document.getElementById('basicCloneBtn');
    element.addEventListener('click', function () {
        basicClone();
    });

    element = document.getElementById('advCloneBtn');
    element.addEventListener('click', function () {
        advanceClone();
    });
}

function walk() {
    let el;
    let walkTextAreaElement = document.getElementById('walkOutputElement');

    walkTextAreaElement.rows = 15;
    walkTextAreaElement.cols = 50;


    el = document.getElementById('p1');
    showNode(el, walkTextAreaElement);
    
    el = el.firstChild;
    showNode(el, walkTextAreaElement);

    el = el.nextSibling;
    showNode(el, walkTextAreaElement);
    
    el = el.lastChild;
    showNode(el, walkTextAreaElement);
    
    el = el.parentNode.parentNode.parentNode;
    showNode(el, walkTextAreaElement);
    
    el = el.querySelector('section > *');
    showNode(el, walkTextAreaElement);

}

function showNode(el, textAreaToAppend) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;
    
    textAreaToAppend.value   += `Node type: ${nodeType} Node name: ${nodeName} Node value: ${nodeValue} \n\n`;
}

function advanceWalk() {
    let walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_ALL)
    let currNode = walker.currentNode;
    let advWalkTextAreaElement = document.getElementById('advWalkOutputElement');
    advWalkTextAreaElement.rows = 15;
    advWalkTextAreaElement.cols = 50;

    let indentLevel = 0;


    while (currNode) {
        if (currNode.nodeType === Node.ELEMENT_NODE) {
            advWalkTextAreaElement.value += `${addIndent(indentLevel)}${currNode.nodeName}\n`;
        }

        if (!currNode.nextSibling && !currNode.firstChild ) {
            indentLevel--;
        } else if (currNode.firstChild) {
            indentLevel++;
        }
        currNode = walker.nextNode()
    }
    
}

function addIndent(numIndent) {
    let indent = '';

    if (numIndent <= 0) {
        return indent;
    }
    for (let i = 0; i < numIndent-1; i++) {
        indent += '|   ';
    }
    indent += '|-- ';
    return indent;
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');  

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advanceModify() {
    /**
     *  1.  Changes the text of the h1 to say "DOM Manipulation is Fun!"
        2.  Changes the color of the h1 to a random dark color from one of the 5 CSS variables defined in the style tag above.  You can use the Math.random() function.
        3. Sets the class of the p tag to "shmancy" so that does a new CSS text effect of your own design. You can find something on the internet (please cite the URL of your inspiration) or make up your own.  You can use the classList property as you like, but make sure you toggle the animation class on and off every time you push the button.
     */
    let h1Element = document.querySelector('h1');
    h1Element.innerText = 'DOM Manipulation is Fun!';

    h1Element.style.color = `var(--darkcolor${Math.floor(Math.random() * 6) + 1})`;

    let pElement = document.querySelector('p');
    pElement.classList.toggle('fancy');
    pElement.classList.add('shmancy')
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function changeInputOptions() {
    let element = document.querySelector('select');
    let selectedOption = element.options[element.selectedIndex].value;

    let textNodeDiv = document.getElementById("textNodeAddition");
    let commentNodeDiv = document.getElementById("commentNodeAddition");
    let elementNodeDiv= document.getElementById("elementNodeAddition");

    switch (selectedOption) {
        case 'textNode':
            textNodeDiv.style.display = 'block';
            commentNodeDiv.style.display = 'none';
            elementNodeDiv.style.display = 'none';
            break;
        case 'comment':
            textNodeDiv.style.display = 'none';
            commentNodeDiv.style.display = 'block';
            elementNodeDiv.style.display = 'none';
            break;
        case 'element':
            textNodeDiv.style.display = 'none';
            commentNodeDiv.style.display = 'none';
            elementNodeDiv.style.display = 'block';
            break;
    }
}

function addAdvanced() {
    let selectElement = document.querySelector('select');
    let selectedOption = selectElement.options[selectElement.selectedIndex].value;
    let outputElement = document.querySelector('output');
    let newElement;
    let currDate = new Date();

    if (!outputElement) {
        outputElement = document.createElement('output');
        outputElement.innerText = 'Output: ';
        document.body.appendChild(outputElement);
    }

    switch (selectedOption) {
        case 'textNode':
            let textContent = document.getElementById('textNodeContent');
            newElement = document.createTextNode(`${textContent.value} ${currDate.toLocaleString()} `);
            break;
        case 'comment':
            let commentContent = document.getElementById('commentNodeContent');
            newElement = document.createComment(`${commentContent.value} ${currDate.toLocaleString()} `);
            break;
        case 'element':
            let tagName = document.getElementById('elementTagName'); 
            let elementContent = document.getElementById('elementNodeContent');
            newElement = document.createElement(tagName.value);
            newElement.innerText = `${elementContent.value} ${currDate.toLocaleString()} `;
    }

    outputElement.appendChild(newElement);
}

function remove() {
    document.body.removeChild(document.body.lastChild);
}

function safeDelete() {
    let bodyElement = document.body;
    let lastChild = bodyElement.lastChild;
    let controlsSection = document.getElementById('controls');

    console.log(lastChild);
    if (lastChild.isSameNode(controlsSection)) {
        if (lastChild.previousSibling) {
            document.body.removeChild(lastChild.previousSibling);
        }
    } else {
        document.body.removeChild(lastChild);
    }
}

function selectorDelete() {
    let selectedElement = document.getElementById('selectorDeleteInput').value;
    let elementsToDelete = document.querySelectorAll(selectedElement);

    for (let i=0; i < elementsToDelete.length; i++) {
        elementsToDelete[i].remove();
    }
}

function basicClone() {
    let pElement = document.getElementById('p1');
    let clonedElement = pElement.cloneNode(true);
    let outputElement = document.querySelector('output');

    clonedElement.removeAttribute('id');
    outputElement.appendChild(clonedElement);

}


//Images came from Unsplash.com
let imageAltText = ['A pink and white flower sitting on top of green leaves',
                    'A close up picture of a plant pink flower buds',
                    'A close up picture of green plant with water droplets on it',
                    'A tree filled with purple fllowers']

function advanceClone() {
    let templateElement = document.querySelector('template');
    let clonedElement = templateElement.content.cloneNode(true);
    let numCards = document.querySelectorAll('card-element').length;

    let cardImgElement = clonedElement.querySelector('img');
    cardImgElement.src = `images/image${numCards % 4 }.jpg`;
    cardImgElement.alt = imageAltText[numCards % 4 ];

    let cardTitleElement = clonedElement.querySelector('card-title')
    cardTitleElement.textContent = `Card ${numCards}`;

    let cardTextElement = clonedElement.querySelector('card-text');
    cardTextElement.textContent = `This is card ${numCards} paragraph`;

    let cardLinkElement = clonedElement.querySelector('a');
    cardLinkElement.href = `https://www.google.com/search?q=${numCards}`;

    let containerElement = document.querySelector('card-container');
    containerElement.appendChild(clonedElement);
}
window.addEventListener('DOMContentLoaded', init);