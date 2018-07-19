function fn1() {
    alert(11111111111)
}

function fn() {
    console.log(this.name);
    for(var i=0;i<arr.length;i++){
        console.log(i);
    }
}

function update() {
    console.log(this.name);
    if(this.name){
        console.log(this.age);
    }
}