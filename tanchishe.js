$(function(){
	var box=$(".big-box")[0];
    var boxs=$(".score")[0];
    var start=$(".start")[0];
    var stop=$(".stop")[0];
    var end=$(".end")[0];
    var sck=$(".sck")[0];
    var fen=0;
    var t;
    boxs.innerHTML=fen;
	for(var i=0;i<20;i++){
		for(var j=0;j<20;j++){
		    var div=$("<div>");
		    div.id=i+"-"+j;
		    box.appendChild(div);
	    }
	}
    var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];    
    for(var i=0;i<she.length;i++){
    	var obj=$("#"+she[i].x+"-"+she[i].y);
    	obj.className="she";
    }
    var jiutou=$("#"+she[she.length-1].x+"-"+she[she.length-1].y);
    function getFood(){
    	do{
    	  var x=Math.floor(Math.random()*20);
    	  var y=Math.floor(Math.random()*20);
    	}while(panduan(x,y))
    	var food=$("#"+x+"-"+y)
    	food.style.backgroundImage='url(./mianbao.jpg)';
        food.style.backgroundSize='20px 20px'
    	return{x:x,y:y};        
    }
    function panduan(a,b){
    	for(var i=0;i<she.length;i++){
    		if(she[i].x==a&&she[i].y==b){
    			return true;
    		}
    	}
    	return false;
    }
    var food=getFood();
     //蛇运动
         var fx="you";
         function run(){
           var  jiutou=she[she.length-1]; 
           if(fx=="you"){
            var newtou=$("#"+jiutou.x+"-"+(jiutou.y+1)); 
            var jiutou1=$("#"+jiutou.x+"-"+(jiutou.y));
            if(newtou==null){
                sck.style.display="block";
                sck.innerHTML="呀，撞墙了!";
                clearInterval(t);
                return;
            }
            if(panduan(jiutou.x,jiutou.y+1)){
                sck.style.display="block";
                sck.innerHTML="呀，吃到自己了哟!";
                clearInterval(t);
                return;
            }           
            newtou.className="she shetou";
            jiutou.className="she";  
            newtou.style.backgroundImage='url(./newheadl.png)'
            jiutou1.style.backgroundImage='url(./shetou.png)' 
            she.push({x:jiutou.x,y:jiutou.y+1});
        }
        if(fx=="zuo"){
            var newtou=$("#"+jiutou.x+"-"+(jiutou.y-1)); 
            var jiutou1=$("#"+jiutou.x+"-"+(jiutou.y));
            jiutou=she[she.length-1];           
            if(newtou==null){
                sck.style.display="block";
                sck.innerHTML="呀，撞墙了!";
                clearInterval(t);
                return;
            }
            if(panduan(jiutou.x,jiutou.y-1)){
                sck.style.display="block";
                sck.innerHTML="呀，吃到自己了哟!";
                clearInterval(t);
                return;
            }
            
            newtou.className="she shetou";
            newtou.style.backgroundImage='url(./newheadr.png)'
            jiutou1.style.backgroundImage='url(./shetou.png)'
            she.push({x:jiutou.x,y:jiutou.y-1});
        }
        if(fx=="shang"){
            var newtou=$("#"+(jiutou.x-1)+"-"+jiutou.y);
             var jiutou1=$("#"+jiutou.x+"-"+(jiutou.y));
            jiutou=she[she.length-1];        
            if(newtou==null){
                sck.style.display="block";
                sck.innerHTML="呀，撞墙了!";
                clearInterval(t);
                return;
            }
            if(panduan(jiutou.x-1,jiutou.y)){
                sck.style.display="block";
                sck.innerHTML="呀，吃到自己了哟!";
                clearInterval(t);
                return;
            }
            newtou.className="she shetou";
            newtou.style.backgroundImage='url(./newheadx.png)'
            jiutou1.style.backgroundImage='url(./shetou.png)'
            she.push({x:jiutou.x-1,y:jiutou.y});
        }
        if(fx=="xia"){
            var newtou=$("#"+(jiutou.x+1)+"-"+jiutou.y); 
            jiutou=she[she.length-1];
             var jiutou1=$("#"+jiutou.x+"-"+(jiutou.y));           
            if(newtou==null){
                sck.style.display="block";
                sck.innerHTML="呀，撞墙了!";
                clearInterval(t);
                return;
            }
            if(panduan(jiutou.x+1,jiutou.y)){
                sck.style.display="block";
                sck.innerHTML="呀，吃到自己了哟!";
                clearInterval(t);
                return;
            }
            newtou.className="she shetou";
             newtou.style.backgroundImage='url(./newheads.png)'
            jiutou1.style.backgroundImage='url(./shetou.png)'
            she.push({x:jiutou.x+1,y:jiutou.y});
        }
        if(food.x==she[she.length-1].x&&food.y==she[she.length-1].y){ 
            food=getFood();
            fen+=1;
            boxs.innerHTML=fen;
            shetou=$("#"+jiutou.x+"-"+(jiutou.y))
            return;         
        }else{
            var shewei=$("#"+she[0].x+"-"+she[0].y);
            shewei.className="";
            $("#"+she[0].x+"-"+she[0].y).style.backgroundImage='url()'
            she.shift();
        }       
     }     
         document.onkeydown=function(e){
            var e=e||window.event;
            var val=e.keyCode;
            if(val==37){
                if(fx=="you"){
                    return;
                }
                fx="zuo";
            }else if(val==38){
                if(fx=="xia"){
                    return;
                }
                fx="shang";
            }else if(val==39){
                if(fx=="zuo"){
                    return;
                }
                fx="you";
            }else if(val==40){
                if(fx=="shang"){
                    return;
                }
                fx="xia";
            }
         } 
     stop.onclick=function(){
        if(t){  
        clearInterval(t);
        t=0;  
        }else{
            t=setInterval(run,200);
        }        
     }
     end.onclick=function(){ 
        clearInterval(t);
        location.href="start.html";  
     }
     start.onclick=function(){
        if(!t){
             fen=0;
            boxs.innerHTML=fen;
            $(".she").className="";
            she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];    
            for(var i=0;i<she.length;i++){
                var obj=$("#"+she[i].x+"-"+she[i].y)
                obj.className="she";
            }        
             t=setInterval(run,200);
                boxs.innerHTML=fen;   
            }
        }
       
     
})