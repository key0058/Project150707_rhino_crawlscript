importPackage(java.net);


/////////////////////////////////////////////////////
// 获取所有电影资源
///////////////////////////////////////////////////
function showQiYiAllMovies(startYear, endYear, videoFile, releationFile) {
	write(videoFile, "uid,title,url,imgUrl,website,type\n");
    write(releationFile, "uid,year,label\n");
    
	var urlRegExp = /http:\/\/www.iqiyi.com\/+/;
	
	while(startYear <= endYear) {
		var contiueFlag = true;
		var page = 1;
		
		while(contiueFlag) {
			url = "http://list.iqiyi.com/www/1/-----------" + startYear + "--1-" + page++ + "-1-iqiyi--.html";
			
			doc = $(url);
			print("Start url:" + url);
			
			result = doc.select("div.site-piclist_pic > a");
			result.each("a", function(element) {
				var id = uid();
				var title = element.attr("title").replace(",", " ");
				var movieURL = element.attr("href");
				var imgURL = element.select("img").attr("src");
				
				if (urlRegExp.test(movieURL)) {
					detail = $(movieURL);
					detail.select("#datainfo-taglist").each("a", function(e) {
						var relStr = id + "," + startYear + "," + e.attr("title");
						write(releationFile, relStr + "\n");
					});
					
					var str = id + "," + title + "," +movieURL + "," + imgURL + ",iqiyi,movie";
					print(str);
					write(videoFile, str + "\n");
				}
			});
			
			
			
			if (doc.select("div.mod-page > a[data-key=" + page + "]") == "") {
				contiueFlag = false;
			}
		}
		startYear++;
	}
}

/////////////////////////////////////////////////////
// Get info from an vedio page
///////////////////////////////////////////////////
function showQiYiVedioInfo(url) {
    var doc = $(url);
    var title = doc.select("#datainfo-timeAndShorttile").attr("title");
    var searchUrl = "http://so.iqiyi.com/so/q_" + URLEncoder.encode(title, "utf-8");
    var result = $(searchUrl);
    var imgUrl = result.select("li.list_item > a > img").attr("src");
    print(title + "=[" + imgUrl + "]");
}


