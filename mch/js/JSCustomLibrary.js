(function(global, $) {

    var Light = function() {
        return new Light.init();
    }

    Light.prototype = {}
    Light.init = function() {
        var self = this;
        self.newFileList = [],
            //檢查是否為IE瀏覽器
            self.isIE = (Browser.indexOf("IE") >= 0) ? true : false;
			self.isChrome = (Browser.indexOf("Chrome") >= 0) ? true : false;
			self.isMobile = (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) ? true : false;
        //檢查檔案名稱有特殊符號時,跳提示	  
        self.checkSpecialSymbol = function(fileName) {
            var chklimit = new Array("^", "'");
            var chklimitstr = chklimit.join(" ");
            for (var k = 0; k < chklimit.length; k++) {
                var strNo = fileName.indexOf(chklimit[k], 0);
                if (strNo != -1) {
                    msgstr = fileName + " -- \u4E0D\u5F97\u5305\u542B\u4E0B\u5217\u5B57\u4E32 " + "<b style='font-size:1.1em;color:blue;'>" + chklimitstr + "</b>";
                    //ShowModalDialog_dj(msgstr);
                    alert(msgstr);
                    return false;
                }
            }
            return true;
        }
        self.blockEventPropagation = function(event) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
    var Browser = GetCurBrowser();
    function GetCurBrowser() {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1]:
            (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
            (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
            (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
        //\u4EE5\u4E0B\u8FDB\u884C\u6D4B\u8BD5
        if (Sys.ie) return ('IE: ' + Sys.ie);
        if (Sys.firefox) return ('Firefox: ' + Sys.firefox);
        if (Sys.chrome) return ('Chrome: ' + Sys.chrome);
        if (Sys.opera) return ('Opera: ' + Sys.opera);
        if (Sys.safari) return ('Safari: ' + Sys.safari);
    }

    Light.prototype.strRight = function(SourceStr, spec) {
        var index = SourceStr.lastIndexOf(spec);
        if (index == -1) {
            return "";
        } else {
            return SourceStr.substring(index + 1, SourceStr.length);
        }
    }
    Light.prototype.strLeft = function(SourceStr, spec) {
        var index = SourceStr.indexOf(spec);
        if (index == -1) {
            return "";
        } else {
            return SourceStr.substring(0, index);
        }
    }
    Light.prototype.middle = function(SourceStr, Lspec, Rspec) {
        var index = SourceStr.indexOf(Lspec);
        var index1 = SourceStr.lastIndexOf(Rspec);
        if ((index == -1) || (index1 == -1)) {
            return "";
        } else {
            return SourceStr.substring(index + 1, index1);
        }
    }
    ltrim = function(s) {
        if (s.length == 0) return s;
        var idx = 0;
        while (s.charAt(idx).search(/\s/) == 0) idx++;
        return s.substr(idx);
    }
    rtrim = function(s) {
        if (s.length == 0) return s;
        var idx = s.length - 1;
        while (s.charAt(idx).search(/\s/) == 0) idx--;
        return s.substring(0, idx + 1);
    }
    Light.prototype.trim = function(s) {
        return rtrim(ltrim(s));
    }
    Light.prototype.replaceAll = function(SourceStr, spec1, spec2) {
        var reg = new RegExp(spec1, "g");
        var replaceS = SourceStr.replace(reg, spec2);
        return replaceS;
    }

    Light.prototype.baseHREF = function() {
        var p = location.pathname;
        var s = location.hostname;
        var port = location.port;
        path = location.protocol + '//' + s + ":" + port + '/' + p.slice(1, p.toLowerCase().lastIndexOf('.nsf') + 4) + '/';
        return path;
    }
    Light.prototype.baseHost = function() {
        var s = location.hostname;
        var po = location.port;
        path = location.protocol + '//' + s + ":" + po + '/';
        return path;
    }
    Light.prototype.getItemValue = function(itemobject) {
        var xres = new Array();
        var len = itemobject.length;
        var k = 0;

        if (itemobject.tagName == "TEXTAREA") {
            xres = itemobject.value.split('\n');
        } else if (itemobject.type == "text" || itemobject.type == "password" || itemobject.type == "hidden" || itemobject.type == "file") {
            xres[k] = itemobject.value;
        } else if (itemobject.type == "select-one") {
            for (var m = 0; m < itemobject.options.length; m++) {
                if (itemobject.options[m].selected) {
                    xres[k++] = itemobject.options[m].text;
                }
            }
        } else if (itemobject.type == "select-multiple") {
            for (var m = 0; m < itemobject.options.length; m++) {
                if (itemobject.options[m].selected) {
                    xres[k++] = itemobject.options[m].text;
                }
            }
        } else if (itemobject.type == "radio") {
            if (itemobject.checked) {
                xres[0] = itemobject.value;
            } else {
                xres[0] = "";
            }
        } else {
            if (itemobject[0].type == "radio") {
                for (var i = 0; i < len; i++) {
                    var x = itemobject[i];
                    if (x.checked) {
                        xres[k++] = x.value;
                    }
                }
            } else if (itemobject[0].type == "checkbox") {
                for (var i = 0; i < len; i++) {
                    var x = itemobject[i];
                    if (x.checked) {
                        xres[k++] = x.value;
                    }
                }
            } else if (itemobject[0].type == "text" || itemobject[0].type == "password" || itemobject[0].type == "hidden" || itemobject[0].type == "file") {
                for (var i = 0; i < len; i++) {
                    var x = itemobject[i];
                    xres[k++] = x.value;
                }

            } else {
                xres[0] = "";
            }

        }
        return xres;
    }
    Light.prototype.setItemValue = function(itemobject, values) {
        var xvalues = values.split(",");
        var len = itemobject.length;
        var k = 0;
        if (itemobject.tagName == "TEXTAREA") {
            itemobject.value = values;
        }
        if (itemobject.type == "text" || itemobject.type == "password" || itemobject.type == "hidden" || itemobject[0].type == "file") {
            itemobject.value = values;
        } else if (itemobject.type == "select-one") {
            for (var m = 0; m < itemobject.options.length; m++) {
                if (itemobject.options[m].text == values) {
                    itemobject.options[m].selected = true;
                }
            }
        } else if (itemobject.type == "select-multiple") {
            for (var m = 0; m < itemobject.options.length; m++) {
                for (n = 0; n < xvalues.length; n++) {
                    if (itemobject.options[m].text == xvalues[n]) {
                        itemobject.options[m].selected = true;
                    }
                }
            }
        } else {
            if (itemobject[0].type == "radio") {
                for (var i = 0; i < len; i++) {
                    var x = itemobject[i];
                    if (x.value == values) {
                        x.checked = true
                    }
                }
            } else if (itemobject[0].type == "checkbox") {
                for (var i = 0; i < len; i++) {
                    var x = itemobject[i];
                    for (n = 0; n < xvalues.length; n++) {
                        if (x.value == xvalues[n]) {
                            x.checked = true;
                        }
                    }
                }
            } else if (itemobject[0].type == "text" || itemobject[0].type == "password" || itemobject[0].type == "hidden" || itemobject[0].type == "file") {
                itemobject.length = xvalues.length;
                for (n = 0; n < xvalues.length; n++) {
                    var x = itemobject[i];
                    x.value = xvalues[n];
                }
            } else {}
        }
    }
    Light.prototype.removeItemValues = function(itemobject) {
        var xres = new Array();
        var len = itemobject.length;
        var k = 0;

        if (itemobject.tagName == "TEXTAREA") {
            xres = itemobject.value.split('\n');
        } else if (itemobject.type == "text" || itemobject.type == "password" || itemobject.type == "hidden" || itemobject.type == "file") {
            itemobject.value = "";
        } else if (itemobject.type == "select-one") {
            for (var m = 0; m < itemobject.options.length; m++) {
                if (itemobject.options[m].selected) {
                    itemobject.options[m].selected = false;
                }
            }
        } else if (itemobject.type == "select-multiple") {
            for (var m = 0; m < itemobject.options.length; m++) {
                if (itemobject.options[m].selected) {
                    itemobject.options[m].selected = false;
                }
            }
        } else if (itemobject.type == "radio") {
            if (itemobject.checked) {
                itemobject.checked = false;
            }
        } else if (itemobject[0].type == "checkbox") {
            for (var i = 0; i < len; i++) {
                var x = itemobject[i];
                if (x.checked) {
                    x.checked = false;
                }
            }
        }
    }
    Light.prototype.Member = function(ArrayA, NewValue) {
        //回傳index,若無則-1
        if (IsArray(ArrayA) == false) {
            return -1; //\u8868ArrayA\u4E0D\u70BA\u9663\u5217
        } else {
            var p = ArrayA.length;
            for (i = 0; i < p; i++) {
                if (trim(ArrayA[i]) == trim(NewValue)) {
                    return i;
                }
            }
        }
        return -1;
    }
    Light.prototype.Member = function(ArrayA, NewValue) {
        //回傳index,若無則-1
        if (IsArray(ArrayA) == false) {
            return -1; //\u8868ArrayA\u4E0D\u70BA\u9663\u5217
        } else {
            var p = ArrayA.length;
            for (i = 0; i < p; i++) {
                if (trim(ArrayA[i]) == trim(NewValue)) {
                    return i;
                }
            }
        }
        return -1;
    }
    Light.prototype.MemberLike = function(ArrayA, NewValue) {
        if (IsArray(ArrayA) == false) {
            return -1; //\u8868ArrayA\u4E0D\u70BA\u9663\u5217
        } else {
            var p = ArrayA.length;
            for (i = 0; i < p; i++) {
                if (trim(ArrayA[i]).indexOf(trim(NewValue)) != -1) {
                    return i;
                }
            }
        }
        return -1;
    }
    Light.prototype.getSelectedCheckBoxAmount = function(xfield) {
        xret = 0;
        if (xfield[0].type == "checkbox") {
            for (var i = 0; i < xfield.length; i++) {
                if (xfield[i].checked) {
                    xret++;
                }
            }
        }
        return xret;
    }
    Light.prototype.Sum = function(ArrayA) {
        var p = ArrayA.length;
        var total = 0;
        for (i = 0; i < p; i++) {
            total = total + parseFloat(trim(ArrayA[i]))
        }
        return total;
    }
    Light.prototype.strToken = function(SourceString, Separator, Seq) {
        if (Seq < 1) {
            return ('');
        }
        if (trim(SourceString) == "") {
            return ('');
        }
        Elements = Explode(SourceString, Separator);

        if (Seq >= Elements.length) {
            return (Elements[Elements.length - 1]);
        } else {
            return (Elements[Seq - 1]);
        }
    }
    Light.prototype.arrayUnique = function(TArray) {
        var NewArray = new Array();
        var count = 0;
        if (IsArray(TArray) == false) {
            return NewArray;
        } else {
            for (k = 0; k < TArray.length; k++) {
                if (Member(TArray[k], NewArray) == -1) {
                    NewArray[count] = TArray[k];
                    count++;
                }
            }
            return NewArray;
        }
    }
    Light.prototype.arrayAdd = function(xArray1, xArray2) {
        var xArray = new Array;
        xArray = xArray1.concat(xArray2);
        return xArray
    }
    Light.prototype.IsDigit = function(c) {
        return (c >= '0' && c <= '9');
    }
    Light.prototype.IsLetter = function(c) {
        return (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z');
    }
    Light.prototype.IsNumber = function(c) {
        return (!isNaN(parseFloat(s)))
    }
    Light.prototype.IsDate = function(c) {
        var dt = s.toDate()
        return !isNaN(dt) && dt.getTime() != JS_NO_TIME.getTime()
    }
    Light.prototype.IsArray = function(arry) {
        return (arry && arry.constructor == Array)
    }

    function copyToClipboard(urlstr) {
        // Create an auxiliary hidden input
        var aux = document.createElement("input");
        // Get the text from the element passed into the input
        aux.setAttribute("value", urlstr);
        // Append the aux input to the body
        document.body.appendChild(aux);
        // Highlight the content
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
    }
    Light.prototype.copyLink = function() {
        //複製文件連結
        var msgstr = "";
        var urlstr = window.location.href;
        urlstr = urlstr.substring(0, urlstr.lastIndexOf("?")) + "?OpenDocument";
        copyToClipboard(urlstr);
        msgstr = "文件連結已複製.";
        alert(msgstr);
    }
    Light.prototype.delStringMember = function(SourceString, Separator, Seq) {
        //要再try 這函數的功能
        var ListElements = "";
        index = 0;
        if (Seq < 1) {
            return ('');
        }
        //Elements = Explode( SourceString, Separator);
        Elements = SourceString.split(Separator);
        for (i = 0; i < Elements.length; i++) {
            if (i != (Seq - 1)) {
                if (ListElements == "") {
                    ListElements = Elements[i]
                } else {
                    ListElements = ListElements + Separator + Elements[i]
                }
            }
        }
        return ListElements;
    }
    Light.prototype.replaceStringMember = function(SourceString, Separator, Seq, ReplaceString) {
        var ListElements = "";
        index = 0;
        if (Seq < 1) {
            return ('');
        }
        Elements = SourceString.split(Separator);
        for (i = 0; i < Elements.length; i++) {
            if (i != (Seq - 1)) {
                if (ListElements == "") {
                    ListElements = Elements[i]
                } else {
                    ListElements = ListElements + Separator + Elements[i]
                }
            } else {
                if (ListElements == "") {
                    ListElements = ReplaceString
                } else {
                    ListElements = ListElements + Separator + ReplaceString
                }
            }

        }
        return ListElements;
    }
    Light.prototype.dateCompare = function(strDate1, strDate2) {
        //ex: var x =DateCompare('2005/1/1','2005/1/31')
        var d1 = Date.parse(strDate1);
        var d2 = Date.parse(strDate2);
        var xValue = d1 - d2; //d1>d2 retrun 1;d1<d2 return -1; d1=d2 retrun 0
        if (xValue == 0) {
            return 0;
        } else if (xValue < 0) {
            return 1;
        } else {
            return -1;
        }
    }
    Light.prototype.dateDifferent = function(strDate1, strDate2) {
        //ex: var x=DateDifferent('2005/1/1','2005/1/31')
        //\u56DE\u50B3\u4E8C\u500B\u65E5\u671F\u76F8\u5DEE\u7684\u79D2\u6578
        var d1 = Date.parse(strDate1);
        var d2 = Date.parse(strDate2);
        var xValue = (Math.abs(d1 - d2)) / 1000 / 60;
        return xValue
    }
    Light.prototype.checkStringByChar = function(SourceString) {
        var SpecStr = "*/;%\\,"; //檢查是否含有特殊符號
        var x1 = "";
        if (SourceString.length < 1) return false;
        for (i = 0; i < SpecStr.length; i++) {
            x1 = SourceString.indexOf(SpecStr.charAt(i), 0);
            if (x1 != -1) {
                return SpecStr;
            }
        }
        return "";
    }
    Light.prototype.CheckStringBySpecString = function(SourceString, SpecStr) {
        var x1 = "";
        if (SourceString.length < 1) return false;
        for (i = 0; i < SpecStr.length; i++) {
            x1 = SourceString.indexOf(SpecStr.charAt(i), 0);
            if (x1 != -1) {
                return true;
            }
        }
        return false;
    }
    Light.prototype.StrUnique = function(SourceString, separator) {
        var TArray = new Array();
        var NewArray = new Array();
        var count = 0;
        //explode(SourceString,separator,TArray)
        TArray = SourceString.split(separator);
        if (IsArray(TArray) == false) {
            return "";
        } else {
            for (k = 0; k < TArray.length; k++) {
                if (Member(TArray[k], NewArray) == -1) {
                    NewArray[count] = TArray[k];
                    count++;
                }
            }
            return NewArray.join(";");
        }
    }
    Light.prototype.formatCurrency = function(x) {
        return x.toFixed(2).split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g, "$1,").split("").reverse().join("").replace(/^[\,]/, "");
    }
    Light.prototype.enableAllInput = function() {
        var TgName = "INPUT,SELECT,TEXTAREA".split(",");
        var coll;
        for (var k = 0; k < TgName.length; k++) {
            coll = document.getElementsByTagName(TgName[k]);
            if (coll != null) {
                for (var i = 0; i < coll.length; i++) {
                    try {
                        coll[i].disabled = false;
                    } catch (e) {}
                }
            }
        }
    }
    Light.init.prototype = Light.prototype;
    global.Light = global.T$ = Light;

})(window, jQuery)
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //\u6708\u4EFD 
        "d+": this.getDate(), //\u65E5 
        "h+": this.getHours(), //\u5C0F\u65F6 
        "m+": this.getMinutes(), //\u5206 
        "s+": this.getSeconds(), //\u79D2 
        "q+": Math.floor((this.getMonth() + 3) / 3), //\u5B63\u5EA6 
        "S": this.getMilliseconds() //\u6BEB\u79D2 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//數字前面補零
//ex. var n = parseInt("89").LengthWithZero(9); 
//return "000000897"
Number.prototype.LengthWithZero = function(oCount) {
    var strText = this.toString();
    while (strText.length < oCount) {
        strText = '0' + strText;
    }
    return strText;
}