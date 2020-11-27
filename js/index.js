


//实现放大镜效果
(function(){
    var zoomBox=document.querySelector("#zoomBox")//放大镜元素
    var zoom=document.querySelector("#zoom")//蒙版元素
    var smallImageBox=document.querySelector("#smallImageBox")
    var bigImageBox=document.querySelector("#bigImageBox")
    var bigImage=document.querySelector("#bigImage")
    //鼠标悬停显示蒙版
    smallImageBox.onmouseenter=function(event){
       zoom.style.display="block"
       bigImageBox.style.display="block"

    }
    //鼠标离开
    smallImageBox.onmouseleave=function(){
        zoom.style.display="none"
        bigImageBox.style.display="none"
    }
    //鼠标移动
    smallImageBox.onmousemove=function(event){
        //计算鼠标在元素中的位置
        var eleX=event.clientX-smallImageBox.getBoundingClientRect().left
        var eleY=event.clientY-smallImageBox.getBoundingClientRect().top
        var left=eleX-zoom.offsetWidth/2
        var top=eleY-zoom.offsetHeight/2

        //判断是否超出边界
        if(left<0){
            left=0
        }else if(left>smallImageBox.clientWidth-zoom.offsetWidth){
            left=smallImageBox.clientWidth-zoom.offsetWidth
        }
        if(top<0){
            top=0
        }else if(top>smallImageBox.clientHeight-zoom.offsetHeight){
            top=smallImageBox.clientHeight-zoom.offsetHeight
        }
        //调整蒙版位置
        zoom.style.left=left+"px"
        zoom.style.top=top+"px"
        //根据蒙版位置调整大图的位置
        bigImageBox.scrollLeft=left*2
        bigImageBox.scrollTop=top*2
    }
})();



//实现缩略图的左右切换
(function(){
    //获取元素
    var arrowLeft=document.querySelector("#arrowLeft")
    var arrowRight=document.querySelector("#arrowRight")
    var thumbWrapper=document.querySelector("#thumbWrapper")
    var thumbBox=document.querySelector("#thumbBox")
    var smallImage=document.querySelector("#smallImage")
    var bigImage=document.querySelector("#bigImage")
    //添加元素
    goodData.imgsrc.forEach(function(item,index){
        //创建元素
        var imgNode=document.createElement("img")
        //设置图片的属性
        imgNode.src=item.s;
        //把图片添加
        thumbWrapper.appendChild(imgNode)
    })
    //定义相关变量
    //获取单个图片的宽度
    var imgWidth=thumbWrapper.firstElementChild.offsetWidth+parseInt(getStyle(thumbWrapper.firstElementChild,"marginRight") ) 
    var scorllLen=imgWidth*2
    var minLeft=imgWidth*5-goodData.imgsrc.length*imgWidth
    
    //为右边按钮绑定事件
    arrowRight.onclick=function(){
      var left=thumbWrapper.offsetLeft-scorllLen
      if(left<minLeft){
          left=minLeft
      }
      thumbWrapper.style.left=left+"px"
    }
    //为左边按钮绑定事件
    arrowLeft.onclick=function(){
        var left=thumbWrapper.offsetLeft+scorllLen
        if(left>0){
            left=0
        }
        thumbWrapper.style.left=left+"px"
    }
    //给每一个图片绑定单击事件
    var imgList=thumbWrapper.querySelectorAll("img")
    imgList.forEach(function(item,index){
        item.onclick=function(){
            smallImage.src=item.src
            bigImage.src=goodData.imgsrc[index].b
        }
    })
})();
//实现购物信息上部分内容信息动态添加
(function(){
    //获取元素
    var productTitle=document.querySelector("#productTitle")
    var productNews=document.querySelector("#productNews")
    var comment=document.querySelector("#comment")
    var priceContent=document.querySelector("#priceContent")
    var supportContent=document.querySelector("#supportContent")
    var address=document.querySelector("#address")

    //给元素动态赋值
    productTitle.innerHTML=goodData.goodsDetail.title
    productNews.innerHTML=goodData.goodsDetail.recommend
    comment.innerHTML="累计评价"+goodData.goodsDetail.evaluateNum
    priceContent.innerHTML=(goodData.goodsDetail.promoteSales.type ? "<span class='badge'>"+goodData.goodsDetail.promoteSales.type+"</span>" : " ")+goodData.goodsDetail.promoteSales.content;
    supportContent.innerHTML=goodData.goodsDetail.support
    address.innerHTML=goodData.goodsDetail.address
})();
//购物车选中效果
(function(){
    //获取元素
    var choose=document.querySelector("#choose")
    var selectedList=document.querySelector("#selectedList")
    var priceBox=document.querySelector("#price")
    var defaultPrice=goodData.goodsDetail.price
    var totallPrice=defaultPrice
    var inputBox=document.querySelector("#inputBox")
    var plus=document.querySelector("#plus")
    var reduce=document.querySelector("#reduce")
    var collectionPrice=0
    var selectCheckBox=document.querySelectorAll("#selectBox .check input")
    var resultPrice=document.querySelector("#resultPrice")
    var collectNum=0
    var resultNum=document.querySelector("#resultNum")
     //创建数组，按顺序存放点击的标签
     var selectedArr= new Array(goodData.goodsDetail.crumbData.length)
    var nums=1
    priceBox.innerHTML=defaultPrice
    //动态添加元素
    goodData.goodsDetail.crumbData.forEach(function(item,index){
        //创建dl元素
        var dlNode=document.createElement("dl")
        //给dl元素添加索引
        dlNode.dataset.dlIndex=index
        var dtNode=document.createElement("dt")
        dtNode.innerHTML=goodData.goodsDetail.crumbData[index].title
        dlNode.appendChild(dtNode)
        //遍历添加dd
        goodData.goodsDetail.crumbData[index].data.forEach(function(item,index){
             var dd=document.createElement("dd")
             dd.innerHTML=item.type
             //自定义属性，存储价格变化
             dd.dataset.changePrice=item.changePrice
            //  默认第一个是选中状态
            if(index===0){
                dd.classList.add("active")
            }
             dlNode.appendChild(dd)
        })
        choose.appendChild(dlNode)
        

        //获取dd元素
        var ddNode=choose.querySelectorAll("dd")
       
        //给dd添加单击事件
             ddNode.forEach(function(ddItem,ddIndex){
                ddItem.onclick=function(){
                
                    //排他
                 var ddSbling=ddItem.parentNode.querySelectorAll("dd")
                 ddSbling.forEach(function(item,index){
                 item.classList.remove("active")
                 })
                 //添加选中效果
                 ddItem.classList.add("active")

            
                //创建span元素
                 var spanItem=document.createElement("span")
                 spanItem.classList.add("mark")
                 spanItem.index=ddItem.parentNode.dataset.dlIndex
                 spanItem.dataset.changePrice=ddItem.dataset.changePrice
                 spanItem.innerHTML=ddItem.innerHTML
                //  console.log(spanItem.dataset.changePrice)
                 //将新创建的元素加入到数组中
                 selectedArr[ddItem.parentNode.dataset.dlIndex]=spanItem
                 selectedList.innerHTML=""
                //  将数组中的内容添加显示
                 selectedArr.forEach(function(span,index){
                    selectedList.appendChild(span)
                 })
                  //创建删除按钮
                  var deleteBtn=document.createElement("i")
                  deleteBtn.innerHTML="X"
                  //添加到标签
                  spanItem.appendChild(deleteBtn)
                  //点击按钮删除标签
                  deleteBtn.onclick=function(){
                      //删除标签父元素
                      selectedList.removeChild(this.parentNode)
                      //在数组中删除
                      delete selectedArr[this.parentNode.index]
                      //移除当前样式
                      ddItem.classList.remove("active")
                      //默认第一个为选中
                      ddItem.parentNode.children[1].classList.add("active")
                      computePrice()
                  }
                  computePrice()
                }
                
               
             });
    //实现点击按钮变化
    plus.onclick=function(){
        nums++
        inputBox.value=nums
        computePrice()
    }
    reduce.onclick=function(){
        nums--
        if(nums<1){
            nums=1
        }
        inputBox.value=nums
        computePrice()
    }
    //为输入框绑定事件
    inputBox.onchange=function(){
        nums=parseInt(this.value)
        if(isNaN(nums)||nums<1){
            nums=1
        }
        this.value=nums
        computePrice()
    }
    //为复选框选中绑定事件
    // console.log(selectCheckBox)
    selectCheckBox.forEach(function(item,index){
        item.onchange=function(){
            if(item.checked){
                collectionPrice+=Number(item.dataset.changePrice) 
                collectNum++
            }else{
                collectionPrice-=Number(item.dataset.changePrice) 
                collectNum--
            }
            resultPrice.innerHTML=totallPrice+collectionPrice
            resultNum.innerHTML="已选购"+collectNum+"件商品"
            // console.log(item.dataset.changePrice)
        }
        
    })

    //封装一个函数，实现价格变化
    function computePrice(){
        //定义一个默认价格
        var price=defaultPrice
        
        selectedArr.forEach(function(item){
           price+=Number(item.dataset.changePrice) 
        })
        totallPrice=price*nums
        priceBox.innerHTML=totallPrice
        totallPriceBox.innerHTML=totallPrice
        resultPrice.innerHTML=totallPrice+collectionPrice
      
    }   
    });

})();

//侧边栏选项卡切换
(function(){
    var tabTitle=document.querySelectorAll("#tabTitle h4")
    var tabContent=document.querySelectorAll("#tabContent .tab-item")
    console.log(tabTitle,tabContent)
    tabTitle.forEach(function(item,index){
        item.onclick=function(){
            //排他
         tabTitle.forEach(function(item,index){
            item.classList.remove("active")
            tabContent[index].classList.remove("active")
        })
        item.classList.add("active")
        tabContent[index].classList.add("active")
        }
      
    })
})();
//商品详情选项卡切换
(function(){
    //获取元素
    var introduct=document.querySelector("#introduct")
    var introductTitle=document.querySelectorAll("#introduct .title ul li")
    var introductItem=document.querySelectorAll("#introduct .content .item")
    //为按钮绑定事件
    introductTitle.forEach(function(item,index){
        item.onclick=function(){
            //排他
            introductTitle.forEach(function(item,index){
                item.classList.remove("active")
                introductItem[index].classList.remove("active")
            })
            item.classList.add("active")
            introductItem[index].classList.add("active")
        }
    })
})();
// 侧边栏
(function(){
    let openBtn=document.querySelector("#openBtn")
    let toTop=document.querySelector("#toTop")
    let pageAside=document.querySelector("#pageAside")
    openBtn.onclick=function(){
        pageAside.classList.toggle("open")
        openBtn.classList.toggle("open")
    }
    toTop.onclick=function(){
       scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
})()