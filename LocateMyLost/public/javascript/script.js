'use strict';

// const hidden = document.querySelector(".hidden");
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const HR = document.querySelector('.buttonHR')
// const buttonSection = document.querySelector('.sectionTwo')

document.querySelector('.lostButton').addEventListener('click',function(){
    // hidden.classList.remove('hidden');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden')

    // buttonSection.classList.add('relative');
    // modal.scrollIntoView();
} );

document.querySelector('.overlay').addEventListener('click', function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
});

const modalTwo = document.querySelector('.modal2');
const overlayTwo = document.querySelector('.overlay2');

document.querySelector('.foundButton').addEventListener('click', function(){
    modalTwo.classList.remove('hidden');
    overlayTwo.classList.remove('hidden');
});

document.querySelector('.overlay2').addEventListener('click', function(){
    modalTwo.classList.add('hidden');
    overlayTwo.classList.add('hidden');
});