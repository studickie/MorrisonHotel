function http (method, url, params) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.onload = function () {
            resolve(xhr.response);
        }

        xhr.onerror = function() {
            reject(xhr.error);
        }

        if (params) {
            if (typeof params == 'object') {
                params = JSON.stringify(params);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            } else {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }
            
            xhr.send(params);

        } else {
            xhr.send();
        }
    });
}