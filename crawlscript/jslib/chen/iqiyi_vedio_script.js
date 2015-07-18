importPackage(java.net);


/////////////////////////////////////////////////////
// 获取所有索引页的资源，电影，资讯，新闻，短片等等
///////////////////////////////////////////////////
function showQiYiAllVedios(startYear, endYear, type, indexUrl, videoFile) {
	write(videoFile, "uid,title,url,imgUrl,type,website\n");
    
	var urlRegExp = /http:\/\/www.iqiyi.com\/+/;
    
	while(startYear <= endYear) {
		var contiueFlag = true;
		var page = 1;
		
		while(contiueFlag) {
            var tempUrl = indexUrl;
            tempUrl = tempUrl.replace("{PAGE}", page++);
            tempUrl = tempUrl.replace("{YEAR}", startYear);
            print("Start url:" + tempUrl);
            
			doc = $(tempUrl);

			result = doc.select("div.site-piclist_pic > a");
			result.each("a", function(element) {
				var id = uid();
				var title = element.attr("title").replace(",", " ");
				var movieURL = element.attr("href");
				var imgURL = element.select("img").attr("src");
				
				var str = id + "," + title + "," +movieURL + "," + imgURL + "," + type + ",qiyi";
                print(str);
                write(videoFile, str + "\n");
			});
			
			if (doc.select("div.mod-page > a[data-key=" + page + "]") == "") {
				contiueFlag = false;
			}
		}
		startYear++;
	}
}

/////////////////////////////////////////////////////
// 获取当前视频的信息（包括标题，图片地址）
///////////////////////////////////////////////////
function showQiYiVedioInfo(url) {
    var doc = $(url);
    var title = doc.select("#datainfo-timeAndShorttile").attr("title");
    var searchUrl = "http://so.iqiyi.com/so/q_" + URLEncoder.encode(title, "utf-8");
    var result = $(searchUrl);
    var imgUrl = result.select("li.list_item > a > img").attr("src");
    print("标题：" + title);
    print("视频地址：" + url);
    print("图片地址：" + imgUrl);
}

function saveQiYiVedioInfo(url, type) {
    var id = uid();
    var doc = $(url);
    var title = doc.select("#datainfo-timeAndShorttile").attr("title");
    var searchUrl = "http://so.iqiyi.com/so/q_" + URLEncoder.encode(title, "utf-8");
    var result = $(searchUrl);
    var imgUrl = result.select("li.list_item > a > img").attr("src");
    var bodyObject = '{"uid":"' + id + '", "title":"' + title + '", "url":"' + url + '", "imgUrl":"' + imgUrl + '", "type":"' + type + '", "website":"qiyi"}';
    saveObjectRequest("Video", bodyObject);
}


