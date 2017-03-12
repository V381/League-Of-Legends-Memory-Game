


class ShuffleImages {

    images = document.querySelector('.images')

    shuffleImagesAlgo(){
        for (var i = this.images.children.length; i >= 0; i--) {
            this.images.appendChild(this.images.children[Math.random() * i | 0]);
        }
        return this.images;
    }

}

class ScoreCounter{
    statsMatches = document.querySelector('.stats__matches');
    statsAttempts = document.querySelector('.stats__attempts');

    positive : any = 0;
    negative : any = 0;

    setPositive(){
        this.positive++;
        this.statsMatches.innerHTML = this.positive;
    }

    setNegative(){
        this.negative++;
        this.statsAttempts.innerHTML = this.negative;
    }
}

class NewGame{
    newGameContainer = document.querySelector('.game-finished');
    newGameBtn = document.querySelector('.game-finished__new-game');

    getNewGameContainer(){
        return this.newGameContainer;
    }

    startNewGame(){
        this.newGameBtn.addEventListener('click', () => {
            window.location.href = window.location.href;
        });
    }

}


class Music{

    audio__bg = document.querySelector('.audio__bg').children[0];
    audioChars = document.querySelector('.audio__characters').children[0];
    disableMusic = document.querySelector('.stats__stats-fx');

    audioCharsLocationMap = {
        'tfate' : 'assets/music/TwistedFate_Select.ogx',
        'quinn' : 'assets/music/Quinn_Select.ogx',
        'shaco' : 'assets/music/Shaco_Select.ogx',
        'malphite': 'assets/music/Malphite_Select.ogx',
        'morde' : 'assets/music/Mordekaiser_Select.ogx',
        'irelia' : 'assets/music/Irelia_Select.ogx',
        'garen' : 'assets/music/Garen_Select.ogx',
        'darius': 'assets/music/Darius_Select.ogx',
        'diana' : 'assets/music/Diana_Select.ogx',
        'sion' : 'assets/music/Sion_Select.ogx',
        'lissandra' : 'assets/music/Lissandra_Select.ogx',
        'null' : 'assets/music/Ahri.attack1.ogx',
        'anivia' : 'assets/music/Anivia_select.ogx',
        'jayce' : 'assets/music/Jayce_Select.ogx'
    }

    setCharsAudio(char){
        for(let i in this.audioCharsLocationMap){
            if(char === i){
                this.audioChars.src = this.audioCharsLocationMap[i];
                this.audioChars.play();
            }
        }
    }

    disableAudio(){
        let toggle = true;
        this.disableMusic.addEventListener('click', () => {
            if(toggle){
                this.disableMusic.children[0].style.color = 'red';
                this.audio__bg.pause()
                toggle = false;
            }else{
                toggle = true;
                this.disableMusic.children[0].style.color = 'white';
                this.audio__bg.play()
            }
        });
    }

}


class MatchImages{

    imagesContainer = document.getElementsByClassName('images__container')
    selectedImages = [];

    scoreCounter = new ScoreCounter();
    newGame = new NewGame();
    music = new Music();

    gameEndedCounter : number = 0;

    matchByClick():void{
        for(let i = 0; i < this.imagesContainer.length; i++){
            ((i) => {
                this.imagesContainer[i].addEventListener('click', () => {
                    // Prevent from selecting already revealed picture.

                    if(this.imagesContainer[i].children[0].style.visibility === 'initial') return false;

                    this.imagesContainer[i].children[0].style.visibility = 'initial'
                    this.selectedImages.push(this.imagesContainer[i].children[0]);

                    if(this.selectedImages.length === 2){

                    // Show second picture

                        this.selectedImages[1].style.visibility = 'initial';

                    // With timeout we show another picture on second click.
                    // To prevent multiple opened pictures, we set 150 time.

                        setTimeout(() => {
                            if(this.selectedImages[0].getAttribute('data-attr') === this.selectedImages[1].getAttribute('data-attr')){
                                this.selectedImages[0].style.visibility = 'initial';
                                this.selectedImages[1].style.visibility = 'initial';
                    
                    // Set character sounds

                                this.music.setCharsAudio(String(this.selectedImages[0].getAttribute('data-attr')))
                                
                                this.selectedImages = [];
                                this.scoreCounter.setPositive();

                    // Increment counter when pictures match, if is it 15(all images), then end game.   

                                this.gameEndedCounter++;

                                if(this.gameEndedCounter === 15){
                                    let newGame = this.newGame.getNewGameContainer();
                                    newGame.style.visibility = 'initial';
                                    this.newGame.startNewGame();
                                }
                                }else{
                                        this.selectedImages[0].style.visibility = 'hidden';
                                        this.selectedImages[1].style.visibility = 'hidden';
                                        this.selectedImages = [];
                                        this.scoreCounter.setNegative();
                                }
                        }, 150)
                    }
                });
            })(i)
        }
    }
}

let shuffleImages = new ShuffleImages();
shuffleImages.shuffleImagesAlgo();

let matchImages = new MatchImages();
matchImages.matchByClick();

let music = new Music();
music.disableAudio();