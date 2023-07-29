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

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });
}

function walk() {
    let el;
    let walkBtnElement = document.querySelector('#walkBtn');
    let textAreaElement = document.createElement('textarea');

    textAreaElement.rows = 15;
    textAreaElement.cols = 50;


    el = document.getElementById('p1');
    showNode(el, textAreaElement);
    
    el = el.firstChild;
    showNode(el, textAreaElement);

    el = el.nextSibling;
    showNode(el, textAreaElement);
    
    el = el.lastChild;
    showNode(el, textAreaElement);
    
    el = el.parentNode.parentNode.parentNode;
    showNode(el, textAreaElement);
    
    el = el.querySelector('section > *');
    showNode(el, textAreaElement);
    
    walkBtnElement.after(textAreaElement);
}


function showNode(el, textAreaToAppend) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;
    
    textAreaToAppend.value   += `Node type: ${nodeType} Node name: ${nodeName} Node value: ${nodeValue} \n\n`;
}

function advanceWalk() {
    let walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_ALL,)
    let currNode = walker.currentNode;
    let textAreaElement = document.createElement('textarea');
    textAreaElement.rows = 15;
    textAreaElement.cols = 50;

    let advWalkBtnElement = document.querySelector('#advWalkBtn');
    let indentLevel = 0;


    while (currNode) {
        
        textAreaElement.value += `${addIndent(indentLevel)}${currNode.nodeName}\n`;
        // textAreaElement.value += `${addIndent(indentLevel)}`
        // showNode(currNode, textAreaElement);
        if (!currNode.nextSibling && !currNode.firstChild ) {
            console.log(`${currNode.nodeName} has no siblings or children`)
            indentLevel--;
        } else if (currNode.firstChild) {
            console.log(`${currNode.nodeName} has children, indenting`)
            indentLevel++;
        }
        currNode = walker.nextNode()
    }
    
    advWalkBtnElement.after(textAreaElement);
}

function addIndent(numIndent) {
    let indent = '';
    for (let i = 0; i < numIndent; i++) {
        indent += '    ';
    }
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

function remove() {
    document.body.removeChild(document.body.lastChild);
}

window.addEventListener('DOMContentLoaded', init);