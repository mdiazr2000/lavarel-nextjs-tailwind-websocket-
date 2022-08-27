import  axios  from "axios";

const buildRequestConfig = (accessToken) => ({
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
    }
});


const GetRequest = (url, accessToken = '') => {
    return axios.get(url, buildRequestConfig(accessToken))
        .catch(error => {
            const status = error.response.status;
            let objResponse = {}
            if (status == 401) {
                objResponse =  {
                    data: {
                        error : error.response.data.message
                    },
                    status: error.response.status
                };
            } else if (status == 422) {
                objResponse =   {
                    data: {
                        error : error.response.data.message
                    },
                    status: status
                };
            }
            return objResponse;
        });;
};

const PostWithoutTokenRequest = (url, data) => {
    return axios.post(url, data)
        .catch(error => {
            const status = error.response.status;
            let objResponse = {}
            if (status == 422) {
                objResponse =  {
                    data: {
                        error : error.response.data.message
                    },
                    status: error.response.status
                };
            } else if (status == 401) {
                objResponse =   {
                    data: {
                        error : error.response.data.message
                    },
                    status: status
                };
            }
            return objResponse;
        });
}

const PostRequest = (url, data, accessToken = '') => {
    return axios.post(url, data, buildRequestConfig(accessToken))
        .catch(error => {
            const status = error.response.status;
            let objResponse = {}
            if (status == 401) {
                objResponse =  {
                    data: {
                        error : error.response.data.message
                    },
                    status: error.response.status
                };
            } else if (status == 422) {
                objResponse =   {
                    data: {
                        error : error.response.data.message
                    },
                    status: status
                };
            } else {
                objResponse =   {
                    data: {
                        error : error
                    },
                    status: status
                };
            }
            return objResponse;
        });
}

export {GetRequest, PostWithoutTokenRequest, PostRequest}