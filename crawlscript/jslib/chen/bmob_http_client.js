importPackage(java.util);
importPackage(com.chen.main);

function createHearders() {
    var headerObjects = new HashMap();
    headerObjects.put("X-Bmob-Application-Id", "8cd3d14a8aba3ed604857566054d9bde");
    headerObjects.put("X-Bmob-REST-API-Key", "539a161c3836483ca1a4aa3e1623dc7c");
    headerObjects.put("Content-Type", "application/json");
    return headerObjects;
}

function saveObjectRequest(object, bodyObject) {
    var url = "https://api.bmob.cn/1/classes/" + object;
    HttpClientUtil.sendHttpsRequest(HttpClientUtil.REQUEST_METHOD_POST, url, bodyObject, createHearders());
}

function deleteObjectRequest(object, objectId) {
    var url = "https://api.bmob.cn/1/classes/" + object + "/" + objectId;
    HttpClientUtil.sendHttpsRequest(HttpClientUtil.REQUEST_METHOD_DELETE, url, null, createHearders());
}

function updateObjectRequest(object) {
}

function selectObjectRequest(object) {
}