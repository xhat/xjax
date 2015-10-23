/*=================================================
 * Ajax.get('request.php',{a:2015,b:'wqyn'},function(response){
 *    console.log(response);
 * },'json');
 *=================================================
 * Ajax.post('request.php',{C:'This is request！',D:'datamap'},function(response){
 *  console.log(response);
 * },'json');
 *=================================================
 * Ajax.json('request.php',{xcv:'This is request！',vcd:'datamap'},function(response){
 *  console.log(response);
 * });
 *=================================================
 */
var Ajax = {};
(function(Ajax){
    
    Ajax.get = function(url,data,func,dataType){
        init(url,data,'GET',func,dataType);
    }
    
    Ajax.post = function(url,data,func,dataType){
        init(url,data,'POST',func,dataType);
    }
    
    Ajax.json = function(url,data,func){
        init(url,data,'GET',func,'json');
    };
    Ajax.upload = function(params){
        //do something, not realized, follow up!!
    }
    function init(url,data,requestType,func,dataType){

        if(!url){
            alert('Request url can not be empty!');
            return false;
        }   
        
        var dlen = count(data);
        if(requestType=='GET'){
            if(dlen){
                var search = kvalue(data);
                url = (url.indexOf('?')==-1)?(url+'?'+search):(url+search);
            }
            data = null;
        }else if(requestType=='POST'){
            if(!dlen)
            data = null;
            else
            data = kvalue(data);
        }
        
        var xmlHttp        = false,
            requestType    = requestType || 'GET';
            dataType       = dataType || 'json';
            func           = func || function(param){};
        
        if(window.XMLHttpRequest){
            xmlHttp = new XMLHttpRequest();
        }else{
            try
            {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP.5.0");
            }catch(e){
                try
                {
                    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP.4.0");
                }catch(e){
                    try
                    {
                        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                    }catch(e){
                        try{
                            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                        }catch(e){

                        }
                    }   
                }
            }           
        }
        
        if(!xmlHttp){
            alert('Your browser does not support Ajax!');
            return false;
        }
        if(xmlHttp.overrideMimeType){ 
            xmlHttp.overrideMimeType('text/html');
        }
        var accept =  {
            text: 'text/plain',
            html: 'text/html',
            xml : 'application/xml,text/xml',
            json: 'application/json,text/javascript'
        };
        //get,post,put,delete
        xmlHttp.open(requestType,url,true);
        if(requestType == 'POST'){
            xmlHttp.setRequestHeader('Content-type','application/x-www-form-urlencoded;charset=UTF-8');
            //xmlHttp.setRequestHeader('Content-type','multipart/form-data');
        }
        xmlHttp.setRequestHeader('Accept', accept[dataType]+';q=0.9,image/webp,*/*;q=0.8');
        xmlHttp.setRequestHeader('Accept-Language', 'zh-cn,zh;q=0.8');
        xmlHttp.setRequestHeader('Cache-Control', 'max-age=21600');
        xmlHttp.onreadystatechange = function(){
            if((xmlHttp.readyState == 4) && xmlHttp.status == 200){
                var d = xmlHttp.responseText;
                if(dataType == 'json'){
                    d = JSON.parse(d);
                }
                func(d);
            };
        } 
        xmlHttp.send(data);
    }
    
    function kvalue(params,sep)
    {
        var kv  = '';
            sep = sep || '&';
        for(key in params){
            kv+=key+'='+params[key]+sep;
        }
        return kv.substring(0,kv.length-1);
    }
    
    function count(data)
    {
        var index = 0;
        for(i in data){
           index++;
        }
        return index;
    }
    
})(Ajax);
