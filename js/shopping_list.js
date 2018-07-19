var allItem = {
    list:
        [{type:"饮料",name:"可口可乐",price:"3",unit:"瓶",barcode:"ITEM0001"},
            {type:"饮料",name:"雪碧",price:"3",unit:"瓶",barcode:"ITEM0002"},
            {type:"水果",name:"苹果",price:"6",unit:"斤",barcode:"ITEM0003"},
            {type:"水果",name:"荔枝",price:"12",unit:"斤",barcode:"ITEM0004"},
            {type:"生活用品",name:"电池",price:"1",unit:"个",barcode:"ITEM0005"},
            {type:"食品",name:"方便面",price:"2",unit:"袋",barcode:"ITEM0006"}
            ]
};

window.onload = function () {
    var tpl = document.getElementById('template_list').innerHTML;
    var inner_tp_string = template(tpl,allItem);
    //console.log(inner_tp_string);
    document.getElementById('shopping_list_info').innerHTML = inner_tp_string;

    //更新数量
    getCount();
};

function addItemToCart(e) {
    e = e || window.event;
    var id = e.target.id;
    var data;
    var arr = JSON.parse(window.localStorage.getItem('count')) || [];

    //这里是添加到购物车的数据
    for(var key in allItem.list){
        if(id === allItem.list[key]['barcode']){
            data = allItem.list[key];
        }
    }
    //查看数据有没有在本地存储
    for(var key in arr){
        if(id === arr[key]['barcode']){
            arr[key]['count']++;
            break;
        }else if(key == arr.length-1){  // ==
            data.count = 1;
            arr.push(data);
            break;
        }
    };
    if(arr.length === 0){
        data.count = 1;
        arr.push(data);
    };
    window.localStorage.setItem('count',JSON.stringify(arr));
    getCount();
}



