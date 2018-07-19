window.onload = function () {
    //将数据渲染到页面中
    function dataToHtml() {
        data = JSON.parse(window.localStorage.getItem('count'));
        var tpl = document.getElementById('template_list').innerHTML;
        var inner_tp_string = template(tpl,{list:data});
        //console.log(inner_tp_string);
        document.getElementById('shopping_list_info').innerHTML = inner_tp_string;
    }
    dataToHtml();

    var aBarcode = ['ITEM0001','ITEM0003'];  //买二送一


    function updateInfo() {
        var aCarListNumTd = document.querySelectorAll('.car_list_num_td');
        var aNumP = document.querySelectorAll('.num_p');
        var aAllPrice = document.querySelectorAll('.all_price');
        var oShopListInfo = document.getElementById('shopping_list_info');
        var aCarTdLen = aCarListNumTd.length;

        var allPrice = document.getElementsByClassName('all_price');

        for(var i=0;i<aCarTdLen;i++){
            aCarListNumTd[i].index = i;
            //渲染优惠tr
            for(var j=0;j<aBarcode.length;j++){
                if(aCarListNumTd[i].parentNode.dataset.id == aBarcode[j]){
                    aCarListNumTd[i].parentNode.dataset.youhui = '1';
                }
            }
            //渲染价格
            for(var k=0;k<allPrice.length;k++){
                if(aAllPrice[k].parentNode.dataset['youhui'] === '1'){
                    aAllPrice[k].innerHTML = Math.ceil(data[k]['count']*2/3)*data[k]['price'] + '元  (原价'+ data[k]['count']*data[k].price+'元)';
                }else{
                    aAllPrice[k].innerHTML = data[k]['count']*data[k]['price'] + '元';
                }
            }
            //总价格
            var pay = document.getElementById('pay_price');
            pay.innerHTML = computedAllPrice();


            aCarListNumTd[i].onclick = function (e) {
                e = e || window.event;
                var target = e.target;
                var index = this.index;
                //点击数量增加的
                if((target.nodeName).toLowerCase() === 'button' && target.className == 'num_more'){
                    var id = aCarListNumTd[index].parentNode.dataset.id;
                    var data = JSON.parse(window.localStorage.getItem('count'));
                    var dataLen = data.length;

                    for(var i=dataLen-1;i>=0;i--){
                        if(data[i]['barcode'] == id) {
                            data[i]['count']++;
                            //判断页面中的价格是不是小于0

                            //更新页面中的数量 和总价格
                            aNumP[index].innerHTML = data[i]['count'];

                            if(aAllPrice[index].parentNode.dataset['youhui'] === '1'){
                                aAllPrice[index].innerHTML = Math.ceil(data[i]['count']*2/3)*data[i]['price'] + '元  (原价'+ data[i]['count']*data[i].price+'元)';
                                break;
                            }else{
                                aAllPrice[index].innerHTML = data[i]['count']*data[i]['price'] + '元';
                                break;
                            }
                        }
                    }


                    window.localStorage.setItem('count',JSON.stringify(data));
                    getCount();
                    //点击数量减少的
                }else if((target.nodeName).toLowerCase() === 'button' && target.className == 'num_less'){
                    var id = aCarListNumTd[index].parentNode.dataset.id;
                    var data = JSON.parse(window.localStorage.getItem('count'));
                    var dataLen = data.length;
                    for(var i=dataLen-1;i>=0;i--){
                        if(data[i]['barcode'] == id) {
                            data[i]['count']--;
                            //判断页面中的价格是不是小于0
                            if (data[i]['count'] === 0) {
                                data.splice(index, 1);
                                oShopListInfo.removeChild(aCarListNumTd[index].parentNode);
                                //重新获取页面中的元素的个数
                                updateInfo();
                                break;
                            }
                            //更新页面中的数量 和总价格
                            aNumP[index].innerHTML = data[i]['count'];

                            if(aAllPrice[index].parentNode.dataset['youhui'] === '1'){
                                aAllPrice[index].innerHTML = Math.ceil(data[i]['count']*2/3)*data[i]['price'] + '元  (原价'+ data[i]['count']*data[i].price+'元)';
                                break;
                            }else{
                                aAllPrice[index].innerHTML = data[i]['count']*data[i]['price'] + '元';
                                break;
                            }
                        }
                    }
                    window.localStorage.setItem('count',JSON.stringify(data));
                    getCount();
                }

                var pay = document.getElementById('pay_price');
                pay.innerHTML = computedAllPrice();
            }

        }
    };

    updateInfo();

    //计算总价格
    function computedAllPrice() {
        var data = JSON.parse(window.localStorage.getItem('count'));
        var sum = 0;
        for(var key in data){
            for(var j=0;j<aBarcode.length;j++){
                if(data[key]['barcode'] == aBarcode[j]){
                    sum = sum + Math.ceil((data[key]['count']*2/3))*data[key]['price'];
                    break;
                }else if(j == aBarcode.length-1){
                    sum = sum + data[key]['count']*data[key]['price'];
                }
            }
        }
        return sum;
    }


};



















