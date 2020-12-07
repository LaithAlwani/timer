

    var set = 0;
    var totalSets = 0;
    var move = 1;
    var totalMoves = 0;
    var moveTime = 0;
    var rest = 0;
    var count = 0;

    $("#start-button").click(function (e) {
        e.preventDefault();
        count = 5;
        totalSets = ($("#set").val())
        totalMoves = ($("#moves").val())
        moveTime = ($("#move-time").val())
        rest = ($("#rest-time").val())
        
        $("#workout-info").css("display", "none");
        countDown(5);
    });

    function countDown(seconds) {
        count = seconds;
        var interval = setInterval(function () {
            if (count >= 0) {
                changeDisplay($("#count-down"),"block")
                $("#count-down").text(count)
                
                count--;
            } else {
                set++
                $("#set-number").text(`Set Number:${set}`);
                startWorkout();
                changeDisplay($("#count-down"),"none");
                changeDisplay($("#workout-display"),"block")
                clearInterval(interval);
                
            }

        }, 1000)

    }

    function changeDisplay(element, type){
        
        $(element).css("display", type);
    }

    function startWorkout() {
        if(set > totalSets){
            
            endOfWorkout(); 
        }
        else{
            var newCounter = moveTime;
        
            var workoutInterval = setInterval(function(){
                
                if(newCounter < 0 ){
                    if(move>=totalMoves){
                        set++
                        $("#set-number").text(`Set Number: ${set}`);
                        clearInterval(workoutInterval);
                        changeDisplay($("#timer"),"none");
                        changeDisplay($("#rest"),"block");
                        var newRest = rest
                        var restInterval = setInterval(function(){
                            if(newRest<0){
                                clearInterval(restInterval);
                                startWorkout();
                                
                            }else{
                                $("#rest").text(formatTime(newRest));
                                newRest--
                            }
                        },1000)
                        move = 1;
                        
                    }else{
                        move++
                        $("#move-number").text(`Move Number: ${move}`);
                        startWorkout();
                        clearInterval(workoutInterval);
                        
                    }
                    
                }else{
                    $("#move-number").text(`Move Number: ${move}`);
                    $("#timer").text(formatTime(newCounter));
                    changeDisplay($("#timer"),"block");
                    changeDisplay($("#rest"),"none");
                    newCounter--
                }
                
            },1000)
            
        }
       

    }

    function endOfWorkout(){
        changeDisplay($("#workout-display"),"none");
        changeDisplay($("#end"), "block");
    }
        


    function formatTime(s){
        
        var secs = String(s % 1000).padStart(2, 0);
        return (`${secs}`)
    }

    


