'use strict';

function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createElem = function(){
    let newElem;
    if (this.selector[0] === '.'){
      newElem = document.createElement('div');
    } else if(this.selector[0] === '#'){
        newElem = document.createElement('p');
    } 

    newElem.innerHTML = 'Любой текст';
    newElem.style.height = this.height + 'px';
    newElem.style.width = this.width + 'px';
    newElem.style.background = this.bg;
    newElem.style.fontSize = this.fontSize + 'px';
    document.body.appendChild(newElem);
};

let block1 = new DomElement('.text', 100, 100, 'green', 14);
block1.createElem();
let block2 = new DomElement('#text', 100, 100, 'red', 14);
block2.createElem();
