var blockComp=Qt.createComponent("Block.qml")
var block=[]
var blocks=[]
var nums=[]
var palette=["blue","red","green","yellow","orange","gray"]
var maxi,maxj
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function row(block){
    return Math.round(block.y/canvas.blockHeight)
}

function col(block){
    return Math.round(block.x/canvas.blockWidth)
}

function init() {

    maxi=canvas.height/canvas.blockHeight
    maxj=canvas.width/canvas.blockWidth
    for(var i=0;i<maxi;++i){
        nums[i]=0
        blocks[i]=new Array(maxj)
    }
    spawn();
}
function spawn(){
    var t=[new Object,new Object,new Object,new Object]
    t[0].col=Math.round(maxj/2-1)
    t[0].row=0
    if (blocks[t[0].row][t[0].col])
        return false
    for(var i=1;i<4;++i){
        if(getRandomInt(0,1)){
            t[i].col=t[i-1].col
            t[i].row=t[i-1].row+1
        } else {
            t[i].row=t[i-1].row
            t[i].col=t[i-1].col+1
        }
        if (blocks[t[i].row][t[i].col])
            return false
    }

    var color_num=getRandomInt(0,palette.length-1)
    for(i=0;i<4;++i){
        block[i]=blockComp.createObject(canvas)
        block[i].color=palette[color_num]
        block[i].row=t[i].row
        block[i].col=t[i].col

    }
    return true
}

function moveLeft(){
    var i
    for(i=0;i<4;++i){
        if(block[i].col<=0||
                blocks[block[i].row]&&blocks[block[i].row][block[i].col-1])
            return
    }

    for(i=0;i<4;++i){
        //block[i].x-=canvas.blockWidth
        --(block[i].col)
    }
}
function moveRight(){
    var i
    for(i=0;i<4;++i){
        if(block[i].col>=maxj-1||
                blocks[block[i].row]&&blocks[block[i].row][block[i].col+1])
                return;
    }
    for(i=0;i<4;++i){
        //block[i].x+=canvas.blockWidth
        ++(block[i].col)
    }
}

function removeRow(row){
    for(var j=0;j<maxj;++j){
        blocks[row][j].died=true
        delete blocks[row][j]
        for(var i=row-1;i>=0;--i){
            if(blocks[i][j]){
                //blocks[i][j].y+=canvas.blockHeight
                ++(blocks[i][j].row)
            }
            blocks[i+1][j]=blocks[i][j]
        }

    }
    for(i=row;i>0;--i){
        nums[i]=nums[i-1]
    }
    nums[0]=0
}

function checkRow(row){
    for(var j=0;j<maxj;++j){
        if(!blocks[row][j])
            return false;
    }
    return true
}

function checkLose(){
    /*
    for(var j=0;j<maxj;++j){
        if(blocks[0][j])
            return true
    }
    return false
    */
    return !spawn()
}

function checkDropped(){
    var i
    for(i=0;i<4;++i){
        block[i].dropped=true
        blocks[block[i].row][block[i].col]=block[i]
    }

    for(i=0;i<4;++i){
        //console.debug(r[i],"-",nums[r[i]])
        if(checkRow(block[i].row)){
            removeRow(block[i].row)
        }
    }
    //console.log("Yep")
    //spawn()
}
function revert(){
    var t=[]
    for(var i=1;i<4;++i){
        t[i]=new Object
        //t[i].x=block[0].x-(block[i].y-block[0].y)
        t[i].col=block[0].col-(block[i].row-block[0].row)
        //t[i].y=block[0].y+(block[i].x-block[0].x)
        t[i].row=block[0].row+(block[i].col-block[0].col)
        if(t[i].col<0||t[i].col>=maxj||
           t[i].row<0||t[i].y>=maxi||
           blocks[t[i].row][t[i].col])
            return
    }
    for(i=1;i<4;++i){
        //block[i].x=t[i].x
        block[i].col=t[i].col
        //block[i].y=t[i].y
        block[i].row=t[i].row
    }
}
function clear(){
    for(var i=0;i<4;++i){
        if(block[i]){
            block[i].died=true
            delete block[i]
        }
    }
    for(i=0;i<maxi;++i){
        for(var j=0;j<maxj;++j){
            if (blocks[i][j]){
                blocks[i][j].died=true
                delete blocks[i][j]
            }

        }
        delete blocks[i]
    }
    //init()
}

function doTurn(){
    var i
    for(i=0;i<4;++i){

        if(!blocks[block[i].row+1]||blocks[block[i].row+1][block[i].col]){

            checkDropped()
            if(checkLose()){
                canvas.gameOver()
            }
            return false
        }
    }
    for(i=0;i<4;++i){
        ++(block[i].row)
    }
    return true
}
function doDrop(){
    var i
    while(true){
        for(i=0;i<4;++i){
            if(!blocks[block[i].row+1]||blocks[block[i].row+1][block[i].col]){
                return
            }
        }
        for(i=0;i<4;++i){
            //block[i].y+=canvas.blockHeight
            ++(block[i].row)
        }
    }
}
