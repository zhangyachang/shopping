(function () {
    //将数据渲染到页面中
    function dataToHtml() {
        var data = JSON.parse(window.localStorage.getItem('count'));
        var tpl = document.getElementById('template_list').innerHTML;
        var inner_tp_string = template(tpl,{list:data});
        //console.log(inner_tp_string);
        document.getElementById('shopping_list_info').innerHTML = inner_tp_string;
    }
    dataToHtml();

    var aBarcode = ['ITEM0001','ITEM0003'];  //买二送一

    //本地时间
    (function () {
        var $payTime = $('.pay_time');
        setInterval(getTime,1000);

        function getTime() {
            var date = new Date();
            var yy = date.getFullYear(),
                mm = date.getMonth()+1,
                dd = date.getDate(),
                hh = date.getHours(),
                minute = date.getMinutes(),
                ss = date.getSeconds();
            $payTime.html(`${yy}年${mm}月${dd}日  ${format(hh)}:${format(minute)}:${format(ss)}`);
        }
        function format(n) {
            return n<10?'0'+n:n;
        }

    })();



    //渲染第一个表格中的的价格
    (function () {
        var aAllPriceTd = document.querySelectorAll('.all_price');
        var aAllPriceTdLen = aAllPriceTd.length;
        var data = JSON.parse(window.localStorage.getItem('count'));
        for(var i=0;i<aAllPriceTdLen;i++){

            for(var j=0;j<aBarcode.length;j++){
                if(aAllPriceTd[i].parentNode.dataset['id'] == aBarcode[j]){
                    aAllPriceTd[i].innerHTML = Math.ceil((data[i]['count']*2/3))*data[i]['price'] + '元 （原价' + data[i]['count']*data[i]['price']+'元)';
                    break;
                }else if(j == aBarcode.length-1){
                    console.log('1111');
                    aAllPriceTd[i].innerHTML = data[i]['price']*data[i]['count'] + '元';
                }
            }
        }
    })();


    //赠送食品
    (function () {
        var data = JSON.parse(window.localStorage.getItem('count'));
        var oTbody = document.getElementById('pay_song');
        for(var key in data){
            for(var j=0;j<aBarcode.length;j++){
                if(data[key]['barcode'] == aBarcode[j]){
                    var count = (data[key]['count'] - Math.ceil((data[key]['count']*2/3)));
                    oTbody.innerHTML += `<tr><td>${data[key]['type']}</td><td>${data[key]['name']}</td><td>${count}</td></tr>`

                }
            }
        }

    })();

    //计算总价格
    (function () {
        //计算总价格
        function computedAllPrice() {
            var data = JSON.parse(window.localStorage.getItem('count'));
            var sum = 0;
            var dataJson = {};
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
            dataJson.sum = sum;
            var sum1 = 0;
            for(var key1 in data){
                sum1 = sum1 + data[key1]['count']*data[key1]['price'];
            }
            dataJson.sum1 = sum1;
            return dataJson;
        }

        var a = computedAllPrice();
        console.log(a);
        var payAll = document.getElementById('pay_all');
        var payLess = document.getElementById('pay_less');
        payAll.innerHTML = a.sum;
        payLess.innerHTML = (a.sum1 - a.sum);

    })();



    //确认购买
    (function () {
        var oConfirmPay = document.getElementById('confirm_pay');
        oConfirmPay.onclick = function () {
            window.localStorage.removeItem('count');
            window.location.href = 'shopping_list.html';
        }


    })();







})();