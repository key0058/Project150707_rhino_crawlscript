# 打開crawlscript.bat
# 複製下面的代碼，然後回車運行即可。

#####################################################

# 奇艺部分
# 获取奇艺的列表页的所有视频数据
# 综艺，动漫，电视剧等只能获取信息页(没有年份信息的列表随意相同数字即可）
showQiYiAllVedios(2014, 2015, "dianying", "http://list.iqiyi.com/www/1/-----------{YEAR}--11-{PAGE}-1-iqiyi--.html", "./iqiyi.csv");
showQiYiAllVedios(2015, 2015, "zixun", "http://list.iqiyi.com/www/25/-------------4-{PAGE}-2-iqiyi-1-.html", "./iqiyi.csv");
showQiYiAllVedios(2015, 2015, "yule", "http://list.iqiyi.com/www/7/-------------4-{PAGE}-2-iqiyi-1-.html", "./iqiyi.csv");
showQiYiAllVedios(2015, 2015, "weidianying", "http://list.iqiyi.com/www/16/-------------11-{PAGE}-2-iqiyi-1-.html", "./iqiyi.csv");
如此类推

# 根据奇艺的视频页获取该视频的标题与图片地址
showQiYiVedioInfo("http://www.iqiyi.com/dianying/20100421/n4892.html#vfrm=3-2-0-0");
# 这个函数可以保存到数据库中（如果数据有错会报Exception）
saveQiYiVedioInfo("http://www.iqiyi.com/v_19rrool6r4.html#vfrm=2-4-0-1", "dianying");
#####################################################

# 优酷部分
# 获取优酷的电影列表页的所有视频数据
showYoukuAllMovies(2015, 2015, "dianying", "./youku.csv", "./youku_relation.csv");

# 获取优酷的其他列表页的所有视频数据
showYoukuAllVedios(2015, 2015, "zixun", "http://www.youku.com/v_showlist/c91g0d1s1p{PAGE}.html", "./youku.csv");
showYoukuAllVedios(2015, 2015, "yule", "http://www.youku.com/v_showlist/c86g0d1s1p{PAGE}.html", "./youku.csv");
showYoukuAllVedios(2015, 2015, "tiyu", "http://www.youku.com/v_showlist/c98g0d1s1p{PAGE}.html", "./youku.csv");
如此类推

#####################################################
