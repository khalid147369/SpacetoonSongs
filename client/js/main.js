// datos de ejemplo (podrían venir de una API)
const cardsData = [
{title:'Card uno', text:'Texto descriptivo de la primera tarjeta.', img:'../img/Goku.png',audio:'../audio/audio_combinado.mp3'},
{title:'Card dos', text:'Segunda tarjeta con más información.', img:'../img/ezgif-4b157aa7e09b76.png',audio:'../audio/audio_combinado.mp3'},
{title:'Card tres', text:'Tercera con texto más largo para probar alturas.', img:'../img/ezgif-4b157aa7e09b76.png',audio:'../audio/audio_combinado.mp3'},
{title:'Card cuatro', text:'Otra tarjeta más.', img:'../img/ezgif-4b157aa7e09b76.png',audio:'../audio/audio_combinado.mp3'},
{title:'Card cinco', text:'Y otra más — demostración de repetición automática.', img:'../img/ezgif-4b157aa7e09b76.png',audio:'../audio/audio_combinado.mp3'}
];

// Function that on click rotates img 
const cardMechanism = (imge,aud) => {
    //Pause all audios when a new one is played
    const pauseOtherAudios =  () => {
      const audios =  document.querySelectorAll('audio');
        audios.forEach(audio => {
            audio.currentTime = 0;
            audio.pause();
        });
      
    }
    // Pause all imgs when a new one is played
    const pauseOtherImgs =  () => {
      const imgs =  document.querySelectorAll('img');
        imgs.forEach(img => {
            if (img.id !== imge.id)
            img.classList.remove('rotated');
            
         
        });
      
    }  
    // Function that toggles play/pause audio
    const togglePlayAudio = () => {     
        if (aud.paused){ 
            pauseOtherAudios();  
            aud.play();
        }else {
            aud.currentTime = 0;
            aud.pause();   
        }
    } 
    // Function that toggles rotate img
    const togglePlayImg = () => {    
        pauseOtherImgs();
        imge.classList.toggle('rotated');
    } 
    imge.addEventListener('click', () => {    
      togglePlayImg();
      togglePlayAudio();    
    });
     
}
/* ===== Enfoque A: template + cloneNode ===== */
(function renderWithTemplate(){
const tpl = document.getElementById('card-template');
const target = document.getElementById('grid-template');


// create cards from template
cardsData.forEach((item,index) => {
// clona la plantilla (true para clonar nodos hijos)
const node = tpl.content.cloneNode(true);
node.querySelector('.img').src = item.img;
node.querySelector('.img').id = index;
node.querySelector('.img').alt = item.title;
node.querySelector('.title').textContent = item.title;
node.querySelector('.text').textContent = item.text;
node.querySelector('.audio').src = item.audio;
node.querySelector('.audio').id = index;

// pass item to rotate
cardMechanism(node.querySelector('.img'),node.querySelector('.audio'));

//animation delay for each card
setTimeout(() => {
  target.appendChild(node);
  console.log(index);
},index *300);
});
})();
