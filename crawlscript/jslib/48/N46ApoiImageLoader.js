

function formatDate(date, format){ 
    var o = { 
        "M+" : date.getMonth()+1, //month 
        "d+" : date.getDate(), //day 
        "h+" : date.getHours(), //hour 
        "m+" : date.getMinutes(), //minute 
        "s+" : date.getSeconds(), //second 
        "q+" : Math.floor((date.getMonth()+3)/3), //quarter 
        "S" : date.getMilliseconds() //millisecond 
    } 

    if(/(y+)/.test(format)) { 
        format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    } 

    for(var k in o) { 
        if(new RegExp("("+ k +")").test(format)) { 
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
        } 
    } 
    return format; 
} 



function downloadApopImages(startPage, endPage, url) {
    
    while(startPage <= endPage) {
        var targetUrl = url.replace("{PAGE}", startPage++);
        
        doc = $(targetUrl);
        print("Start url:" + targetUrl);
        
        doc.each(".thumbnail", function(obj) {
            
            var imgUrl = "http://www.apopidols.org" + obj.attr("href");
          
            var info = obj.select("img").attr("title").split("\n");
            
            var dts = info[2].split(" ");
            var month = dts[0].trim().replace(",", "").replace(".", "");
            var day = dts[1].trim().replace(",", "").replace(".", "");
            var year = dts[2].trim().replace(",", "").replace(".", "");
            var date = new Date(year + "/" + month + "/" + day);
            
            var dir = "result/" + info[0];
            var filename = formatDate(date, "yyMMdd") + "_" + imgUrl.substring(imgUrl.lastIndexOf("/")+1, imgUrl.length);
            HttpDownloadUtil.downloadFile(imgUrl, dir, filename);
           
        });
    }
}

