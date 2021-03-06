﻿/// <reference path="../typings/jquery/jquery.d.ts" />

interface HttpClientBase {
    get(url: string,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: Object
    );

    post(url: string,
        dataToSave: any,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: { [key: string]: any; }
    );

    put(url: string,
        dataToSave: any,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: { [key: string]: any; }
    );

    delete(url: string,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: { [key: string]: any; }
    );
}


class HttpClient implements HttpClientBase {
    /**
      location.origin may not be working in some releases of IE. And locationOrigin is an alternative implementation
    **/
    public static locationOrigin: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';

    /**
    **/
    get(url: string,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: Object
    ) {
        this.executeAjax(url, null, "GET", callback, errorCalback, statusCodeCallback);
    }

    post(url: string,
        dataToSave: any,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: { [key: string]: any; }
    ) {
        this.executeAjax(url, dataToSave, "POST", callback, errorCalback, statusCodeCallback);
    }

    put(url: string,
        dataToSave: any,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: { [key: string]: any; }
    ) {
        this.executeAjax(url, dataToSave, "PUT", callback, errorCalback, statusCodeCallback);
    }

    delete(url: string,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: { [key: string]: any; }
    ) {
        this.executeAjax(url, null, "DELETE", callback, errorCalback, statusCodeCallback);
    }

    private executeAjax(url: string,
        dataToSave: any,
        httpVerb: string,
        callback: (data: any) => any,
        errorCallback: (xhr, ajaxOptions, thrown) => any,
        statusCodeCallback: { [key: string]: any; }
    ) {
        //http://api.jquery.com/jquery.ajax/
        $.ajax(url,
            {
                data: JSON.stringify(dataToSave),
                type: httpVerb,
                success: (data: any, textStatus: string, jqXHR: JQueryXHR): any => {
                    if (callback !== null) {
                        callback(data);
                    }
                },
                error: (xhr, ajaxOptions, thrown) => {
                    if (errorCallback != null) {
                        errorCallback(xhr, ajaxOptions, thrown);
                    }
                },

                statusCode: statusCodeCallback,
                contentType: 'application/json; charset=UTF-8',
                headers: {
                    Accept: 'text/html,application/xhtml+xml,application/json,application/xml;q=0.9,*/*;q=0.8',

                }



            });
    }
}


class AuthHttpClient implements HttpClientBase {
    /**
      location.origin may not be working in some releases of IE. And locationOrigin is an alternative implementation
    **/
    public static locationOrigin: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';

    /**
    **/
    get(url: string,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: Object
    ) {
        this.executeAjax(url, null, "GET", callback, errorCalback, statusCodeCallback);
    }

    post(url: string,
        dataToSave: any,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: { [key: string]: any; }
    ) {
        this.executeAjax(url, dataToSave, "POST", callback, errorCalback, statusCodeCallback);
    }

    put(url: string,
        dataToSave: any,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: { [key: string]: any; }
    ) {
        this.executeAjax(url, dataToSave, "PUT", callback, errorCalback, statusCodeCallback);
    }

    delete(url: string,
        callback: (data: any) => any,
        errorCalback: (xhr: JQueryXHR, ajaxOptions: string, thrown: string) => any,
        statusCodeCallback: { [key: string]: any; }
    ) {
        this.executeAjax(url, null, "DELETE", callback, errorCalback, statusCodeCallback);
    }

    private executeAjax(url: string,
        dataToSave: any,
        httpVerb: string,
        callback: (data: any) => any,
        errorCallback: (xhr, ajaxOptions, thrown) => any,
        statusCodeCallback: { [key: string]: any; }
    ) {
        //http://api.jquery.com/jquery.ajax/
        $.ajax(url,
            {
                data: JSON.stringify(dataToSave),
                type: httpVerb,
                success: (data: any, textStatus: string, jqXHR: JQueryXHR): any => {
                    if (callback !== null) {
                        callback(data);
                    }
                },
                error: (xhr, ajaxOptions, thrown) => {
                    if (errorCallback != null) {
                        errorCallback(xhr, ajaxOptions, thrown);
                    }
                },

                statusCode: statusCodeCallback,
                contentType: 'application/json; charset=UTF-8',
                headers: {
                    Accept: 'text/html,application/xhtml+xml,application/json,application/xml;q=0.9,*/*;q=0.8',

                },

                beforeSend: (xhr, settings) => {
                    xhr.setRequestHeader('Authorization', 'bearer ' + sessionStorage.getItem('access_token'));
                }
            });
    }

    /** 
    * Get oAuth token through username and password. The token will be saved in sessionStorage.
    */
    getToken(url: string, username: string, password: string, callback: (data: any) => any,
        errorCallback: (xhr, ajaxOptions, thrown) => any,
        statusCodeCallback: { [key: string]: any; }) {
        $.ajax(url + 'token',
            {
                data: {
                    'grant_type': 'password',
                    'username': username,
                    'password': password
                },
                type: 'POST',
                success: (data: any, textStatus: string, jqXHR: JQueryXHR): any => {
                    if (data != null && data != '') {
                        sessionStorage.setItem("access_token", data.access_token);
                        sessionStorage.setItem("expires_in", data.expires_in);
                    }

                    if (callback !== null) {
                        callback(data);
                    }
                },
                error: (xhr, ajaxOptions, thrown) => {
                    if (errorCallback != null) {
                        errorCallback(xhr, ajaxOptions, thrown);
                    }
                },

                statusCode: statusCodeCallback,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                headers: {
                    Accept: 'text/html,application/xhtml+xml,application/json,application/xml;q=0.9,*/*;q=0.8',
                }

            });

    }
}