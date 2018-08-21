var wheel = document.getElementById('wheel'); // 转盘
    var arrow = document.getElementById('arrow'); // 转盘按钮
    var luckDrawCountDom = document.querySelector('.luckDrawCount span'); // 抽奖次数dom
    // 转盘游戏属性
    var gameState = false;          //  游戏状态
    var luckDrawCount = 10;         //  抽奖次数
    var rotateZPositionCount = 0;   //  当前转盘的rotateZ 值
    var preUseRotateZ = 0;          //  上一次已抽奖中奖奖品的RotateZ
    var rotateZ = 360;              //  一圈360deg
    var rotateZCount = 10;          //  旋转圈数的倍数
    var runTime = 6;                //  游戏过度时间

    // 奖品指针位置
    // 20   一等奖，
    // 158  二等奖，
    // 200  二等奖，
    // 112  三等奖， 
    // 68   四等奖，
    // 计算归着，每次抽奖最终rotateZ值 + 相应的奖品值位置 = (rotateZCount + rotateZPosition[0]) 等于一等奖
    var rotateZPosition = [20, 158, 200, 112, 68];


    const prize = [                 //  奖品设置 传入一个奖项，0，1，2，3，4， 分别是12345等奖
      {
        title: '手气不错哟～恭喜获得',
        prize: '100元红包', 
      },
      {
        title: '手气不错哟～恭喜获得',
        prize: '优惠券礼包',
      },
      {
        title: '手气不错哟～恭喜获得',
        prize: '优惠券礼包',
      },
      {
        title: '手气不错哟～恭喜获得',
        prize: '5元代金券',
      },
      {
        title: '手气不错哟～恭喜获得',
        prize: '1元红包',
      },
    ];
    
    // 运行游戏
    function gameAction(rotateZPositionIndex){
        /// 转盘位置计算规则 一圈360deg 乘以 10圈，加上 奖品 rotateZ值，再减去上一次中奖rotateZ值
        var toRotateZCount = (rotateZPositionCount - preUseRotateZ + rotateZPosition[rotateZPositionIndex]) + rotateZ * rotateZCount; // 达到圈数位置
        wheel.style.transition = 'transform '+ runTime +'s ease-in-out 0s'; // 过度时间
        wheel.style.transform = 'rotateZ(' + toRotateZCount + 'deg)'; // 旋转
        preUseRotateZ = rotateZPosition[rotateZPositionIndex]; // 上传抽奖的中奖rotateZ
        rotateZPositionCount = toRotateZCount; // 保存当前转盘值
        luckDrawCount = luckDrawCount-1;  // 游戏次数减一
        
        // 页面更新抽奖次数
        luckDrawCountDom.innerHTML = luckDrawCount;

        //  弹出中奖信息
        setTimeout(() => {
            gameState = false; // 设置游戏当前状态
            alert(prize[rotateZPositionIndex].title+ '\r\n' + prize[rotateZPositionIndex].prize);
        }, runTime*1000);

    }


    // 开始游戏
    arrow.addEventListener('click', function(){
        // 模拟抽奖
        var rotateZPositionIndex = Math.round(Math.random()* 4);
        // 判断游戏是否进行中
        if(gameState) return;
        // 判断是否还有抽奖资格
        if(luckDrawCount <= 0){
            alert('Sorry 您没有抽奖机会了');
            return;
        }
        gameState = true; // 设置游戏当前状态
        // run game
        gameAction(rotateZPositionIndex);
    }, false)
    