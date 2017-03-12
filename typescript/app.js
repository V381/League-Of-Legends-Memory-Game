var ShuffleImages = (function () {
    function ShuffleImages() {
        this.images = document.querySelector('.images');
    }
    ShuffleImages.prototype.shuffleImagesAlgo = function () {
        for (var i = this.images.children.length; i >= 0; i--) {
            this.images.appendChild(this.images.children[Math.random() * i | 0]);
        }
        return this.images;
    };
    return ShuffleImages;
}());
var ScoreCounter = (function () {
    function ScoreCounter() {
        this.statsMatches = document.querySelector('.stats__matches');
        this.statsAttempts = document.querySelector('.stats__attempts');
        this.positive = 0;
        this.negative = 0;
    }
    ScoreCounter.prototype.setPositive = function () {
        this.positive++;
        this.statsMatches.innerHTML = this.positive;
    };
    ScoreCounter.prototype.setNegative = function () {
        this.negative++;
        this.statsAttempts.innerHTML = this.negative;
    };
    return ScoreCounter;
}());
var NewGame = (function () {
    function NewGame() {
        this.newGameContainer = document.querySelector('.game-finished');
        this.newGameBtn = document.querySelector('.game-finished__new-game');
    }
    NewGame.prototype.getNewGameContainer = function () {
        return this.newGameContainer;
    };
    NewGame.prototype.startNewGame = function () {
        this.newGameBtn.addEventListener('click', function () {
            window.location.href = window.location.href;
        });
    };
    return NewGame;
}());
var Music = (function () {
    function Music() {
        this.audio__bg = document.querySelector('.audio__bg').children[0];
        this.audioChars = document.querySelector('.audio__characters').children[0];
        this.disableMusic = document.querySelector('.stats__stats-fx');
        this.audioCharsLocationMap = {
            'tfate': 'assets/music/TwistedFate_Select.ogx',
            'quinn': 'assets/music/Quinn_Select.ogx',
            'shaco': 'assets/music/Shaco_Select.ogx',
            'malphite': 'assets/music/Malphite_Select.ogx',
            'morde': 'assets/music/Mordekaiser_Select.ogx',
            'irelia': 'assets/music/Irelia_Select.ogx',
            'garen': 'assets/music/Garen_Select.ogx',
            'darius': 'assets/music/Darius_Select.ogx',
            'diana': 'assets/music/Diana_Select.ogx',
            'sion': 'assets/music/Sion_Select.ogx',
            'lissandra': 'assets/music/Lissandra_Select.ogx',
            'null': 'assets/music/Ahri.attack1.ogx',
            'anivia': 'assets/music/Anivia_select.ogx',
            'jayce': 'assets/music/Jayce_Select.ogx'
        };
    }
    Music.prototype.setCharsAudio = function (char) {
        for (var i in this.audioCharsLocationMap) {
            if (char === i) {
                this.audioChars.src = this.audioCharsLocationMap[i];
                this.audioChars.play();
            }
        }
    };
    Music.prototype.disableAudio = function () {
        var _this = this;
        var toggle = true;
        this.disableMusic.addEventListener('click', function () {
            if (toggle) {
                _this.disableMusic.children[0].style.color = 'red';
                _this.audio__bg.pause();
                toggle = false;
            }
            else {
                toggle = true;
                _this.disableMusic.children[0].style.color = 'white';
                _this.audio__bg.play();
            }
        });
    };
    return Music;
}());
var MatchImages = (function () {
    function MatchImages() {
        this.imagesContainer = document.getElementsByClassName('images__container');
        this.selectedImages = [];
        this.scoreCounter = new ScoreCounter();
        this.newGame = new NewGame();
        this.music = new Music();
        this.gameEndedCounter = 0;
    }
    MatchImages.prototype.matchByClick = function () {
        var _this = this;
        for (var i = 0; i < this.imagesContainer.length; i++) {
            (function (i) {
                _this.imagesContainer[i].addEventListener('click', function () {
                    // Prevent from selecting already revealed picture.
                    if (_this.imagesContainer[i].children[0].style.visibility === 'initial')
                        return false;
                    _this.imagesContainer[i].children[0].style.visibility = 'initial';
                    _this.selectedImages.push(_this.imagesContainer[i].children[0]);
                    if (_this.selectedImages.length === 2) {
                        // Show second picture
                        _this.selectedImages[1].style.visibility = 'initial';
                        // With timeout we show another picture on second click.
                        // To prevent multiple opened pictures, we set 150 time.
                        setTimeout(function () {
                            if (_this.selectedImages[0].getAttribute('data-attr') === _this.selectedImages[1].getAttribute('data-attr')) {
                                _this.selectedImages[0].style.visibility = 'initial';
                                _this.selectedImages[1].style.visibility = 'initial';
                                // Set character sounds
                                _this.music.setCharsAudio(String(_this.selectedImages[0].getAttribute('data-attr')));
                                _this.selectedImages = [];
                                _this.scoreCounter.setPositive();
                                // Increment counter when pictures match, if is it 15(all images), then end game.   
                                _this.gameEndedCounter++;
                                if (_this.gameEndedCounter === 15) {
                                    var newGame = _this.newGame.getNewGameContainer();
                                    newGame.style.visibility = 'initial';
                                    _this.newGame.startNewGame();
                                }
                            }
                            else {
                                _this.selectedImages[0].style.visibility = 'hidden';
                                _this.selectedImages[1].style.visibility = 'hidden';
                                _this.selectedImages = [];
                                _this.scoreCounter.setNegative();
                            }
                        }, 150);
                    }
                });
            })(i);
        }
    };
    return MatchImages;
}());
var shuffleImages = new ShuffleImages();
shuffleImages.shuffleImagesAlgo();
var matchImages = new MatchImages();
matchImages.matchByClick();
var music = new Music();
music.disableAudio();
