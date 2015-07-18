function showQiYiAllZongyi(videoFile) {
	write(videoFile, "uid,title,url,imgUrl,website,type,episode,subTitle\n");
    
	var urlRegExp = /http:\/\/www.iqiyi.com\/+/;
	
	var contiueFlag = true;
    var page = 1;
    
    while(contiueFlag) {
        url = "http://list.iqiyi.com/www/6/-------------11-" + page++ + "-1-iqiyi--.html";
        
        doc = $(url);
        print("Start url:" + url);
        
        result = doc.select("ul.site-piclist > li");
        
        result.each("li", function(element) {
            var id = uid();
            var title = element.select(".site-piclist_pic > a").attr("title").replace(",", " ");
            var imgURL = element.select(".site-piclist_pic > a > img").attr("src");
            var episode = element.select(".site-piclist_pic > a > .wrapper-listTitle > div > p").text().replace(",", " ");
            var subTitle = element.select(".site-piclist_info > div > a").attr("title").replace(",", " ");
            var vedioURL = element.select(".site-piclist_info > div > a").attr("href");
            
            if (urlRegExp.test(vedioURL)) {
                var str = id + "," + title + "," +vedioURL + "," + imgURL + ",iqiyi,zongyi," + episode + "," + subTitle;
                print(str);
                write(videoFile, str + "\n");
            }
            
        });
        
        
        if (doc.select("div.mod-page > a[data-key=" + page + "]") == "") {
            contiueFlag = false;
        }
    }
}