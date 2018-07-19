function getCount() {
    var a = JSON.parse(window.localStorage.getItem('count'));
    var sum = 0;
    for(var key in a){
        sum = sum + a[key]['count'];
    }
    document.getElementById('price').innerHTML = sum;
}
getCount();