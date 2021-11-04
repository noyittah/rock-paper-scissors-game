var MatchController = (function() {

    var selections = ['paper', 'scissors', 'rock'];
    var status = ['win', 'lose', 'tie'];

    var checkWin= function (user, computer){
        if(user === computer){  
            return status[2];
        }

        else{

           
            if(user === selections[0]){
                if(computer === selections[1]){
                    return status[1];
                }

                else if(computer === selections[2]){
                    return status[0];
                }
            }

            if(user === selections[1]){
                if(computer === selections[0]){
                    return status[0];
                }

                else if(computer === selections[2]){
                    return status[1];
                }
            }

            if(user === selections[2]){
                if(computer === selections[0]){
                    return status[1];
                }

                else if(computer === selections[1]){
                    return status[0];
                }
            }
        }  
    };

    return {

        getSelections: function (){
            return selections;
        },

        getStatus: function(){
            return status;
        },

        getWinner: function(user, computer){
            return checkWin(user, computer);
        }
    };

})();

var UIController = (function() {

    var addIcon = function(element, icon){
        var newElement, image;

        newElement = document.createElement('span');
        newElement.className = "image-wrapper";

        image = document.createElement('img');

        if(icon === 'rock'){
            image.src = "./assets/images/icon-rock.svg";

        }

        else if(icon === 'paper'){
            image.src = "./assets/images/icon-paper.svg";
        }

        else{
            image.src = "./assets/images/icon-scissors.svg";
        }

        newElement.appendChild(image);
        element.appendChild(newElement);
    }

    return {

        displayScore: function(score){
            document.getElementById('score').innerHTML = score;
        },


        displayResultPage: function(userSelect, computerSelect) {
            var element;
            document.querySelector('main').style.display = 'none';
            document.querySelector('.selection').style.display = 'flex';

            element = document.getElementById('selection');
            var classList = element.querySelectorAll('.btn-circle');


            classList.forEach(function(item, index){
                var toRemove;
                toRemove = item.querySelector('.image-wrapper');
                toRemove.remove();

                if(index === 0){
                    addIcon(item, userSelect);
                }

                else if(index === 1){
                    addIcon(item, computerSelect);
                }
            });
        },

        displayWinner: function(status) {

            if(status !== MatchController.getStatus()[2]){
                document.getElementById('winner').innerHTML = status;
            }
        },


        displayHome: function() {
            document.querySelector('main').style.display = 'flex';
            document.querySelector('.selection').style.display = 'none';
        },


        displayRules: function() {
            document.querySelector('.rules-modal').style.display = 'flex';
        },

        removeRules: function() {
            document.querySelector('.rules-modal').style.display = 'none';
        }
    };

})();


var controller = (function(MatchCtrl, UICtrl) {

    var score = 0;

    var setupEventListeners = function() {
    
        var buttons = document.querySelectorAll('.btn-circle');

        buttons.forEach(function(item){
            var input = item.dataset.choice;

            item.addEventListener('click', function(){
                ctrlMatch(input);
            });
        });

 
        document.querySelector('.btn').addEventListener('click', UICtrl.displayHome);

        document.getElementById('close').addEventListener('click', UICtrl.removeRules);

        document.querySelector('.btn-rules').addEventListener('click', UICtrl.displayRules);
    }


    var randomSelect = function(){
        var x = Math.floor(Math.random() * 3); 

        return MatchCtrl.getSelections()[x];
    }


    var ctrlMatch = function(userSelect) {

        var computerSelect = randomSelect();
        UICtrl.displayResultPage(userSelect, computerSelect);

        var status = MatchCtrl.getWinner(userSelect, computerSelect);
        UICtrl.displayWinner(status);

        if(status !== MatchController.getStatus()[2]){
            if(status === MatchController.getStatus()[0]){
                score++;
            }

            else{
                if(score !== 0)
                {
                    score--;
                }  
            } 
        }

        UICtrl.displayScore(score);
    }

    return {
        init: function() {
            console.log('Aplication has started.');
            setupEventListeners();
            UICtrl.displayScore(0);
        }
    };

})(MatchController, UIController);


controller.init();
