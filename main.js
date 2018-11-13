$('document').ready(init);

function init() {};

var firstCard = '';
var secondCard = '';
var currentClickState = 'first';
var attemptScoreMatch = 0;



function displayStartTimer(timer) {
    var interval = setInterval(function () {
        timer--;
        $('.set_timer').text(timer);
    }, 1000)

    return interval;

}




var animalPictureCard = ['cheetah', 'elephant', 'flamingo', 'giraffe',
    'hippo', 'lion', 'monkey', 'orangutan', 'zebra'
];

var animalPictureCardConcat = animalPictureCard.concat(animalPictureCard);

function randomNumber(value) {
    return Math.floor(Math.random() * 100) % value;
}


function shuffleCards(tempArray) {
    for (var i = 0; i < 100; i++) {
        var currentNumberCard = randomNumber(tempArray.length - 1);
        var currentNumberCard2 = randomNumber(tempArray.length - 1);
        var tempNum = tempArray[currentNumberCard];
        tempArray[currentNumberCard] = tempArray[currentNumberCard2];
        tempArray[currentNumberCard2] = tempNum;
    }
    return tempArray;
}

function getAnimalCard(currentCard) {
    for (var i = 0; i < animalPictureCardConcat.length; i++) {
        var currentAnimal = animalPictureCardConcat[i];
        if ($(currentCard).hasClass(currentAnimal)) {
            console.log(currentClickState);
            console.log(currentAnimal);
            if (currentClickState === 'first') {
                firstCard = currentAnimal;
                lockCard(currentCard);
                currentClickState = 'second';
            } else {
                secondCard = currentAnimal;
                unlockIndividualCards();
                currentClickState = 'first';
                CompareCards();

            }
            return;
        }
    }
}


var statsButton = {
    "hit": 0,
    "missed": 0,
    "total": 0,
    "start": 0,
}

function displayStatsButtons() {
    var hits = statsButton["hit"];
    var missed = statsButton["missed"];
    var total = statsButton["total"];
    var start = statsButton["start"];
    $('.display_game_missed').text(missed);
    $('.display_game_scores').text(total);
    $('.display_hits').text(hits);
    $('.display_times_played').text(start);
}
displayStatsButtons();


function CompareCards() {
        statsButton["total"]++;
    if (firstCard === secondCard) {
        statsButton["hit"]++;
        displayStatsButtons();
        $('.' + firstCard).addClass('cardMatched');

    } else {
        lockCards();
        setTimeout(function () {
            statsButton["missed"]++;
            displayStatsButtons();
            $('.' + firstCard).find('.front').hide();
            $('.' + firstCard).find('.back').show();
            $('.' + secondCard).find('.front').hide();
            $('.' + secondCard).find('.back').show();
            firstCard = '';
            secondCard = '';
            unlockCards();

        }, 1000)




    }
}




var displayTimer = {};

$('.start').on('click', startGame);
$('.reset').on('click', resetGame);

function startGame() {
    animalPictureCardConcat = shuffleCards(animalPictureCardConcat);
    generateMultipleCards();
    $('.all_cards').addClass('active');
    statsButton["start"]++;
    clearInterval(displayTimer);
    displayTimer = displayStartTimer(61);



}

function lockCards() {
    $('#game-area').addClass('lock_cards');

}
function lockCard(card){
    $(card).addClass('lock_card')
}
function unlockIndividualCards(){
    $(".card").removeClass('lock_card');
}
function unlockCards() {
    $('#game-area').removeClass('lock_cards');
}


function showAllCards() {
    $('.card').find('.front').show();
    $('.card').find('.back').hide();
}

function resetGame() {
    $('.all_cards').removeClass('active');
    $('.card').find('.front').hide();
    $('.card').find('.back').show();
    clearInterval(displayTimer);

}

function clickHandler() {
    $('.card').on('click', function (e) {
        e.stopPropagation();
        $(this).find('.front').toggle();
        $(this).find('.back').toggle();
        getAnimalCard($(this));
    });
}

function generateCard(animal) {
    return ` <div class="card ${animal}">
                    <div class="front">
                    <img src="./images/${animal}.jpg">
                    </div>
                    <div class="back">
                        <img src="./images/backcardimage.png">
                    </div>
                     </div>
                </div>`

};

function generateMultipleCards() {
    var cards = '';
    for (var i = 0; i < animalPictureCardConcat.length; i++) {
        var currentAnimal = animalPictureCardConcat[i];
        cards += generateCard(currentAnimal);

        $('#game-area').html(cards);
        clickHandler();
    }
}
