import Droppable from "https://cdn.jsdelivr.net/npm/@shopify/draggable/build/esm/Droppable/Droppable.mjs";

const droppable = new Droppable(document.querySelectorAll('section'), {
    draggable: '.item',
    dropzone: '.dropzone',
});

droppable.on('droppable:dropped', () => console.log('droppable:dropped'));
droppable.on('droppable:returned', () => console.log('droppable:returned'));