var key = true;

$(".NewAdd").click(function () {
    clear();
    RandomProduce(0, 30, '+');
})

$(".NewSub").click(function () {
    clear();
    RandomProduce(0, 30, '-');
})
$(".NewMul").click(function () {
    clear();
    RandomProduce(0, 30, 'x');
})
$(".NewDiv").click(function () {
    clear();
    RandomProduce(0,  30, '/');
})
//老手提升
$(".middleAdd").click(function () {
    clear();
    RandomProduce(100,  50, '+');
})
$(".middleSub").click(function () {
    clear();
    RandomProduce(100,  50, '-');
})
$(".middleMul").click(function () {
    clear();
    RandomProduce(100, 50, 'x');
})
$(".middleDiv").click(function () {
    clear();
    RandomProduce(100, 50, '/');
})

//高手支招
$(".heightAdd").click(function () {
    clear();
    RandomProduce(200, 50, '+');
})
$(".heightSub").click(function () {
    clear();
    RandomProduce(200, 50, '-');
})
$(".heightMul").click(function () {
    clear();
    RandomProduce(200, 50, 'x');
})
$(".heightDiv").click(function () {
    clear();
    RandomProduce(200, 50, '/');
})


function RandomProduce(number,sizeNumber, operate) {
    //    var number = maxNumber - minNumber;
    console.log(number);
    //定义一个数组存放真正的计算结果
    var realResultArr = [];
    //定义一个数组存放输入的结果
    var inputResultArr = [];
    //定义一个数组存放生成的每一个输入框
    var produceInputArr = [];
    for (var i = 0; i < sizeNumber; i++) {
        var firstNumber;
        var secondNumber;
        switch (operate) {
            case ("+"):
                firstNumber = Math.floor(Math.random() * 100) + number  ;
                secondNumber = Math.floor(Math.random() * (100 - firstNumber)) + number;
                realResult = firstNumber + secondNumber; break;
            case ("-"):
                firstNumber = Math.floor(Math.random() * 100) + number;
                secondNumber = Math.floor(Math.random() * firstNumber);
                realResult = firstNumber - secondNumber; break;
            case ("x"):
                firstNumber = Math.floor(Math.random() * 100) + number;
                secondNumber = Math.floor(Math.random() * (100 - firstNumber)) + number;
                 realResult = firstNumber * secondNumber;
                break;
            case ("/"):
                firstNumber = Math.floor(Math.random() * 100) + 1 + number;
                var secondNumberArr = division(firstNumber);
                var index = Math.floor((Math.random() * secondNumberArr.length));
                secondNumber = secondNumberArr[index];
                realResult = firstNumber / secondNumber;
                break;
        }

        var Olitem = $("<li></li>").text(firstNumber + "    " + operate + " " + secondNumber + "    " + "=");
        var Olinput = $("<input type = 'text'>");
        Olitem.attr("class", "item");
        Olinput.attr("class", "handInput");
        // console.log(Olinput);
        $(".questionsBox ul").append(Olitem).append(Olinput);
        //把每个结果存放在各自的数组中
        realResultArr.push(realResult);
        produceInputArr.push(Olinput);

    }

    console.log(inputResultArr);
    var btn = $("<button value='提交' class='submitBtn'>提交答案</button>");
    btn.attr("class", "submitBtn");
    $(".questionsBox").append(btn);
    //点击提交试卷按钮

    $("document").ready(
        $(".submitBtn").click(function () {
            if (key) {
                key = false;
                //清空之前输入框数组里的数字
                inputResultArr.splice(0, inputResultArr.length);
                produceInputArr.forEach(function (item, index) {

                    // (function (i) {
                    //     var inputResult = produceInputArr[i].val();
                    //     console.log(inputResult);
                    //     inputResultArr[index] = inputResult;
                    // }(index))
                    inputResultArr.push(item.val());
                    console.log(inputResultArr);
                })
                judgeResult(realResultArr, inputResultArr, produceInputArr);

            } else {
                alert("你已经提交试卷，不能重新提交！");
            }
        })

    )
    //执行一次点击完毕之后要开锁
    key = true;

}




function judgeResult(reallArr, inputArr, domArr) {

    var num = 0;
    console.log(reallArr);
    console.log(inputArr);
    var len = reallArr.length;
    //存放 错题的正确答案
    var changeArr = [];
    //存放错题在原题数组中的索引
    var indexArr =[];
    for (var i = 0; i < len; i++) {
        if (inputArr[i] == "") {
             // produceInputArr.css({ color: 'yellow' });
            $(".handInput").css({ color: 'black' });
            key = true;
            alert("输入不能为空！");
            return;//用return结束并返回，即不会再执行下面的语句
            // break;结束并继续执行
        }
        if (inputArr[i] != reallArr[i]) {
            console.log(inputArr[i]);
            domArr[i].css({ color: 'red' });
            changeArr.push(reallArr[i]);
            indexArr.push (i);
            console.log(indexArr);

        }
        if (inputArr[i] == reallArr[i]) {
            num++;
        }

    }
    $(".score").text(" > 得分: " + num).css({ color: 'red' });
     alert("恭喜你答对了 " + num + " 道题" );

    var asserBtn =  $("<button value='提交' class='submitBtn'>查看正确答案</button>");
    $(".questionsBox").append(asserBtn);
    asserBtn.attr("class","asserBtn");
    asserBtn.click(function(){
        //遍历 装索引的数组 可拿到索引数组里的值
       indexArr.forEach(function(item,index){
           domArr[item].val(changeArr[index]).css("color","blue");
       })
    })
     
    
}
//清除上一次的题目
function clear() {
    $(".questionsBox ul").empty();
    $(".submitBtn").remove();
    $(".asserBtn").remove();
    $(".score").empty();
}
//生成约数
function division(dividend) {
    var divisorArr = [];
    for (var i = 1; i <= dividend; i++) {
        if (dividend % i == 0) {
            divisorArr.push(i);
        }
    }
    return divisorArr;

}
