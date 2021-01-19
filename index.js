const score = document.querySelector('.score');
        const startScreen = document.querySelector('.startScreen');
        const gameArea = document.querySelector('.gameArea');

        // console.log(gameArea);

        startScreen.addEventListener('click', start);

        let player ={ speed : 5, score : 0};

        let keys ={ ArrowUp :false, ArrowDown :false, ArrowLeft :false, ArrowRight :false}
        
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

        function keyDown(e){
            e.preventDefault();
            keys[e.key] = true;
            // console.log(keys);
        }

        function keyUp(e){
            e.preventDefault();
            keys[e.key] = false;
            // console.log(keys);
        }

        function isCollide(a,b){
            aRect = a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();

            return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.left > bRect.right) || (aRect.right < bRect.left)) 
        }


        function movelines(){
            let lines = document.querySelectorAll('.lines');

            lines.forEach(function(item){

                if(item.y >= 700){
                    item.y -= 750;
                }

                item.y += player.speed;
                item.style.top = item.y + "px"; 
            })
        }
        
        function movelinestwo(){
            let lines2 = document.querySelectorAll('.lines2');

            lines2.forEach(function(item){

                if(item.y >= 700){
                    item.y -= 750;
                }

                item.y += player.speed;
                item.style.top = item.y + "px"; 
            })
        }

        function endGame(){
            player.start=false;
            startScreen.classList.remove('hide');
            startScreen.innerHTML = "GAME OVER !! <br> CLICK to RESTART";
        }
        
        function moveEnemy(car){
            let enemy = document.querySelectorAll('.enemy');

            enemy.forEach(function(item){

                if(isCollide(car,item)){
                    console.log ("BOOMM HITTT!!!");
                    endGame();
                }

                if(item.y >= 750){
                    item.y = -300;
                    item.style.left = Math.floor(Math.random()*350) + "px";
                }

                item.y += player.speed;
                item.style.top = item.y + "px"; 
            })
        }

        function gamePlay(){
            let car=document.querySelector('.car');
            let road = gameArea.getBoundingClientRect();
            // console.log(road);

            if (player.start){
                movelines();
                movelinestwo();
                moveEnemy(car);

                if(keys.ArrowLeft && player.x > 0 ) { player.x -= player.speed}
                if(keys.ArrowRight && player.x < (road.width- 50)) { player.x += player.speed}
                
                car.style.top = player.y + "px";
                car.style.left = player.x + "px";

            window.requestAnimationFrame(gamePlay);
            console.log(player.score++);

            player.score++;
            score.innerText = "SCORE: " + player.score;
            }
        }   

        function start(){
            startScreen.classList.add('hide');
            gameArea.innerHTML="";

            player.start =true;
            player.score =0;
            window.requestAnimationFrame(gamePlay);

            for(x=0; x<5; x++){
            let roadLine = document.createElement('div');
            roadLine.setAttribute('class', 'lines');
            roadLine.y= (x*150);
            roadLine.style.top = (x*150) + "px";
            gameArea.appendChild(roadLine);
            }

            for(x=0; x<5; x++){
            let roadLine = document.createElement('div');
            roadLine.setAttribute('class', 'lines2');
            roadLine.y= (x*150);
            roadLine.style.top = (x*150) + "px";
            gameArea.appendChild(roadLine);

            }


            let car= document.createElement('div');
            car.setAttribute('class', 'car');
            gameArea.appendChild(car);


            player.x = car.offsetLeft;
            player.y = car.offsetTop;

            for(x=0; x<3; x++){
            let enemyCar = document.createElement('div');
            enemyCar.setAttribute('class', 'enemy');
            enemyCar.y= ((x+1) *350 ) * -1;
            enemyCar.style.top = enemyCar.y + "px";
            enemyCar.style.left= Math.floor(Math.random()*350) + "px";
            gameArea.appendChild(enemyCar);

            }
        }
