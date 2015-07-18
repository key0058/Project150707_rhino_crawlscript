/////////////////////////////////////////////////////
// 获取优酷电影列表的视频，只获取有视频地址的资源
///////////////////////////////////////////////////
function showYoukuAllMovies(startYear, endYear, type, videoFile, releationFile) {
	write(videoFile, "uid,title,url,imgUrl,type,website\n");
    //write(releationFile, "uid,year,label\n");
	
	var urlRegExp = /http:\/\/www.youku.com\/+/;
	var movieUrlRegExp = /http:\/\/v.youku.com\/+/;
    
	while(startYear <= endYear) {
		var contiueFlag = true;
		var page = 1;
		
		while(contiueFlag) {
			url = "http://www.youku.com/v_olist/c_96_g__a__sg__mt__lg__q__s_1_r_" + startYear + "_u_0_pt_0_av_0_ag_0_sg__pr__h__d_1_p_" + page++ + ".html";
			
			doc = $(url);
			print("Start url:" + url);
			
			result = doc.select("div.yk-col3");
			result.each("div.yk-col3", function(element) {
				var id = uid();
				var title = element.select(".p-link > a").attr("title");
				var detailURL = element.select(".p-link > a").attr("href");
				var imgURL = element.select("img").attr("src");
				
				if (element.select(".p-thumb > div > .p-status").text().charCodeAt() == 27491 && urlRegExp.test(detailURL)) {
					detail = $(detailURL);
					
					var movieURL = detail.select("a[charset=420-2-3]").attr("href");
					if (movieURL == "") {
						movieURL = detail.select("a[charset=412-2-1]").attr("href");
					}
					
					if (movieUrlRegExp.test(movieURL)) {
						if (movieURL.indexOf("?") > 0) {
							movieURL = movieURL.substring(0, movieURL.indexOf("?"));
						}
						var str = id + "," + title + "," +movieURL + "," + imgURL + "," + type + ",youku";
						print(str);
						write(videoFile, str + "\n");
						
                        /*
						detail.select("li > span > a[charset=420-2-1]").each("a", function(e) {
							var temp = id + "," + startYear + "," + e.text() + "\n";
							write(releationFile, temp);
						});
						
						detail.select("li > span > a[charset=420-2-8]").each("a", function(e) {
							var temp = id + "," + startYear + "," + e.text() + "\n";
							write(releationFile, temp);
						});
                        */
					}

				}
			});
			
			if (doc.select("div.yk-pager > ul > li > a[charset=124-4-1-" + page + "]") == "") {
				contiueFlag = false;
			}
		}
		startYear++;
	}
}


/////////////////////////////////////////////////////
// 获取优酷其他通用列表的视频，娱乐，新闻，搞笑等页面列表
///////////////////////////////////////////////////
function showYoukuAllVedios(startYear, endYear, type, indexUrl, videoFile) {
	//write(videoFile, "uid,title,url,imgUrl,type,website\n");
	
	var urlRegExp = /http:\/\/www.youku.com\/+/;
	var movieUrlRegExp = /http:\/\/v.youku.com\/+/;
    
	while(startYear <= endYear) {
		var contiueFlag = true;
		var page = 1;
		
		while(contiueFlag) {
            var tempUrl = indexUrl;
            tempUrl = tempUrl.replace("{PAGE}", page++);
			print("Start url:" + tempUrl);
            
			doc = $(tempUrl);
			
			result = doc.select("div.yk-col4");
			result.each("div.yk-col4", function(element) {
				var id = uid();
				var title = element.select(".v-link > a").attr("title");
				var vedioURL = element.select(".v-link > a").attr("href");
				var imgURL = element.select("img").attr("src");
				
                if (movieUrlRegExp.test(vedioURL)) {
                    if (vedioURL.indexOf("?") > 0) {
                        vedioURL = vedioURL.substring(0, vedioURL.indexOf("?"));
                    }
                    var str = id + "," + title + "," +vedioURL + "," + imgURL + "," + type + ",youku";
                    print(str);
                    //write(videoFile, str + "\n");
                }
			});
			
			if (doc.select("div.yk-pager > ul > li > a[charset=7001-4-1-" + page + "]") == "") {
				contiueFlag = false;
			}
		}
		startYear++;
	}
}




