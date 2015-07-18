importPackage(java.net);


/////////////////////////////////////////////////////
// ��ȡ��������ҳ����Դ����Ӱ����Ѷ�����ţ���Ƭ�ȵ�
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
// ��ȡ��ǰ��Ƶ����Ϣ���������⣬ͼƬ��ַ��
///////////////////////////////////////////////////
function showQiYiVedioInfo(url) {
    var doc = $(url);
    var title = doc.select("#datainfo-timeAndShorttile").attr("title");
    var searchUrl = "http://so.iqiyi.com/so/q_" + URLEncoder.encode(title, "utf-8");
    var result = $(searchUrl);
    var imgUrl = result.select("li.list_item > a > img").attr("src");
    print("���⣺" + title);
    print("��Ƶ��ַ��" + url);
    print("ͼƬ��ַ��" + imgUrl);
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


