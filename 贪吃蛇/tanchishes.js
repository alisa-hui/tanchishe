$(function(){
	function initSnake() {
    var pointer = randomPointer(len-1, len-1, WIDTH/2);
    for(var i = 0; i < len; i++) {
        var x = pointer[0] - i,
            y = pointer[1];
        snake.push([x,y]);
        carrier[x][y] = "cover"; //标记snake body
    }
}

//initialize grid 
function initGrid() {
    var body = document.getElementsByTagName("body")[0];
    var table = document.createElement("table"),
        tbody = document.createElement("tbody")
    for(var j = 0; j < HEIGHT; j++) {  
        var col = document.createElement("tr");  
        for(var i = 0; i < WIDTH; i++) {  
            var row = document.createElement("td");
            gridElems[i][j] = col.appendChild(row);  
        }
        tbody.appendChild(col);  
    }
    table.appendChild(tbody);
    document.getElementById("snakewrap").appendChild(table);
}

function randomPointer(startX,startY,endX,endY) {
    startX = startX || 0;
    startY = startY || 0;
    endX = endX || WIDTH;
    endY = endY || HEIGHT;
     
    var p = [],
    x = Math.floor(Math.random()*(endX - startX)) + startX,
    y = Math.floor(Math.random()*(endY - startY)) + startY;
     
    //如果(x,y)有物体，则重新生成坐标
    if(carrier[x][y]) {
        return randomPointer(startX,startY,endX,endY);
    }
     
    p[0] = x;
    p[1] = y;
    return p;
}

//addObject("food")
function addObject(name) {
    var p = randomPointer(); //get random position
    var x = p[0];
    var y = p[1];
    carrier[x][y] = name;
    gridElems[x][y].className = name;
}

//keyboard event listener
function attachEvents(e) {
    e = e || event;
    directkey = Math.abs(e.keyCode - directkey) != 2 && e.keyCode > 36 && e.keyCode < 41 ? e.keyCode : directkey; 
    return false;
}
function judge() {
    //把snake的“头”位置暂存起来
    var headX = snake[0][0], headY = snake[0][1];
    switch(directkey) {
        case 37: headX -= 1; break; //left
        case 38: headY -= 1; break; //up
        case 39: headX += 1; break  //right
        case 40: headY += 1; break; //down
    }
     
    //碰到边界(block),或头碰到身体(cover)，则结束游戏
    if(headX >= WIDTH || headX < 0 || headY >= HEIGHT || headY < 0 || carrier[headX][headY] == "block" || carrier[headX][headY] == "cover" ) {
        $("say").innerText = "Game Over.";
         
        $("start").removeAttribute("disabled");
        $("start").style.color = "#000";
         
        window.clearInterval(snakeTimer);
         
        return;
    }
     
    //如果头元素的carrier不是食物，则让snake的尾巴pop出来
    if(carrier[headX][headY] != "food") {
        var lastX = snake[snake.length-1][0],
            lastY = snake[snake.length-1][1];
        carrier[lastX][lastY] = false;
        gridElems[lastX][lastY].className = "";
        snake.pop();
    } 
    else {
        carrier[headX][headY] = false;
        addObject("food"); //吃掉食物，然后调用addObject("food")，重新生成食物
    }
     
    //向数组的开头添加一个元素-->从而实现了“视觉上”的snake移动（或吃食物body增长)的效果
    snake.unshift([headX,headY]); 
    carrier[headX][headY] = "cover";
    gridElems[headX][headY].className = "cover";
     
    len = snake.length;
}

function run_run_run() {
    if(snakeTimer) {
        window.clearInterval(snakeTimer);
    }
    snakeTimer = window.setInterval("judge()", Math.floor(300));
}


window.onload = function(){
    initGrid(); 
    document.onkeydown = attachEvents; //监听keydown事件
    $("start").onclick = function (e) {
        len = 3; //snake的初始长度
        directkey = 39; //right
        snake = new Array();
        initSnake(); 
        addObject("food");
        run_run_run();
         
        //让start按钮失效
        $("start").setAttribute("disabled",true);
        $("start").style.color = "#aaa";
    }
}

})
