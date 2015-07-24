
function downloadBlogImages(url) {
    
    var imgSuffixRegExp = /^jpg|png|jpeg$/;
    var dcimgUrlRegExp = /http:\/\/dcimg.awalker.jp\/+/;

    var page = 1;
    var continueFlag = true;
    while(continueFlag) {
    
        var targetUrl = url + "&p=" + page++;
        
        doc = $(targetUrl);
        print("Start url:" + targetUrl);
        
        var authors = new Array();
        doc.each(".author", function(obj) {
            authors.push(obj.text());
        });
        
        var dates = new Array();
        doc.each(".date", function(obj) {
            var yearmonth = obj.select(".yearmonth").text().substring(2).replace("/", "");
            var day = obj.select(".dd1").text();
            dates.push(yearmonth + "" + day);
        });
        
        var idx = 0;
        doc.each(".entrybody", function(obj) {
            print(authors[idx]);
            print(dates[idx]);
            
            var dir = "result2/" + authors[idx];
            
            obj.each("div > img", function(imgObj) {
                var imgUrl = imgObj.attr("src");
                var suffix = imgUrl.substring(imgUrl.lastIndexOf(".")+1, imgUrl.length());
                if (imgSuffixRegExp.test(suffix)) {
                    var filename = dates[idx] + "_" + genUidTitle() + ".jpeg";
                    HttpDownloadUtil.downloadFile(imgUrl, dir, filename);
                }
            });
            
            obj.each("div > a", function(imgObj) {
                if (dcimgUrlRegExp.test(imgObj.attr("href"))) {
                    var imgEntryUrl = imgObj.attr("href");
                    var imgTargetUrl = imgObj.attr("href").replace("img1", "img2").replace("id=", "sec_key=");
                    var filename = dates[idx] + "_" + genUidTitle() + ".jpg";
                    HttpDownloadUtil.downloadFileBySession(imgEntryUrl, imgTargetUrl, dir, filename);
                }
                
            });
            
            idx++;
        });
        
        continueFlag = false;
        doc.each(".paginate > a", function (obj) {
            var temp = obj.attr("href").split("&");
            var tempNum = temp[0].replace("?p=", "");
            if (page == tempNum) {
                continueFlag = true;
                return;
            }
        });
    }
}

function nogizaka46All() {
    doc = $("http://blog.nogizaka46.com/");
    doc.each("#sidearchives > select > option", function(obj) {
       downloadBlogImages(obj.attr("value"));
    });
}


function genUidTitle() {
    return uid().replace(/-/g, "");
}
