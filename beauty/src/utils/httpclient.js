import http from 'superagent';

const baseUrl = 'http://10.3.133.75:88/';

let filterUrl = (_url) => {
    if(_url && _url.startsWith('http')){
        return _url;
    }
    return baseUrl + _url;
}

export default {
    get(url, data){
        return new Promise((resolve, reject) => {
            http.get(filterUrl(url)).query(data).end((error, res) => {
                if(error){
                    reject(error)
                } else {
                    resolve(res.body)
                }
            })
        }) 
    },

    post(url, data){
        return new Promise((resolve, reject) => {
            http.post(filterUrl(url))
                .set({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "auth": window.localStorage.getItem('token')
                })
                .send(data)
                .end((error, res) => {
                if(error){
                    reject(error)
                } else {
                    resolve(res)
                }
            })
        })
    }
}