/**
 * @author ISAAC :)
 */
//Global functions
loadTransXml();
try {
    $(window).bind("beforeunload", function () {
        Ext.Ajax.request({
            url: 'Property3001.asmx/closeDrawing',
            success: function (data) {
            }
        });
    })
}
catch (gg) { }
try {
    window.onbeforeunload = function () {
        Ext.Ajax.request({
            url: 'Property3001.asmx/closeDrawing',
            success: function (data) {
            }
        });
        if (Application.alertLeave != false) {
            Application.alertLeave = true;
            if (Application.SaveFlag == true)
                return 'Saving Remind!!!';
        }
    };
} catch (pp) { }
try {
    window.onunload = function () {
        Ext.Ajax.request({
            url: 'Property3001.asmx/closeDrawing',
            success: function (data) {
            }
        });
    }
} catch (pp) { }
function Captcha() {
    var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    var i;
    for (i = 0; i < 6; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
        var f = alpha[Math.floor(Math.random() * alpha.length)];
        var g = alpha[Math.floor(Math.random() * alpha.length)];
    }
    var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
    document.getElementById("mainCaptcha").innerHTML = code
    document.getElementById("mainCaptcha").value = code
}
function ValidCaptcha() {
    var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
    var string2 = removeSpaces(document.getElementById('txtInput').value);
    if (string1 == string2) {
        return true;
    } else {
        return false;
    }
}
function removeSpaces(string) {
    return string.split(' ').join('');
}

function getpolyByName(id) {
    var it = "";
    Application.DocumentManager.items.items[0].database.objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.UnitName[0] == id) {
                it = item;
                return false;
            }
        }
    });
    return it;
}

var cmb;
var m_type = "rdNoFilter";
var m_type_second = "rdNoFilter";
function addToArr(st, arr) {
    var i = 0;
    for (i = 0; i < arr.length; i++) {
        if (st == arr[i])
            return;
    }
    arr[arr.length] = st;
}

function getURLParameters(paramName, parms) {
    var sURL = window.document.URL.toString();
    if (parms != undefined)
        sURL = parms;

    if (sURL.indexOf("?") > -1) {
        var arrParams = decodeURIComponent(sURL).split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);
        var i = 0;
        for (i = 0; i < arrURLParams.length; i++) {
            var sParam = arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for (i = 0; i < arrURLParams.length; i++) {
            if (arrParamNames[i] == paramName) {
                //alert("Param:"+arrParamValues[i]);
                return arrParamValues[i];
            }
        }
        return "No Parameters Found";
    }
    return undefined;

}
function getAttribute(node, attribName) {
    var att = node.attributes.getNamedItem(attribName);
    if (att != null)
        return att.value;
    else
        return "";
}

var moz = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined');
var ie = (typeof window.ActiveXObject != 'undefined');
function importXML(file, xmlDoc) {
    if (moz) {
        xmlDoc = document.implementation.createDocument("", "", null)
    } else if (ie) {
        xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
        xmlDoc.async = false;
    }
    xmlDoc.load(file);
}

if (document.implementation.hasFeature("XPath", "3.0")) {
    if (typeof XMLDocument == "undefined") { XMLDocument = Document; }
    XMLDocument.prototype.selectNodes = function (cXPathString, xNode) {
        if (!xNode) { xNode = this; }
        var oNSResolver = this.createNSResolver(this.documentElement)
        var aItems = this.evaluate(cXPathString, xNode, oNSResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
        var aResult = [];
        for (var i = 0; i < aItems.snapshotLength; i++) { aResult[i] = aItems.snapshotItem(i); }
        return aResult;
    }
    XMLDocument.prototype.selectSingleNode = function (cXPathString, xNode) {
        if (!xNode) { xNode = this; }
        var xItems = this.selectNodes(cXPathString, xNode);
        if (xItems.length > 0) { return xItems[0]; }
        else { return null; }
    }
    Element.prototype.selectNodes = function (cXPathString) {
        if (this.ownerDocument.selectNodes) { return this.ownerDocument.selectNodes(cXPathString, this); }
        else { throw "For XML Elements Only"; }
    }
    Element.prototype.selectSingleNode = function (cXPathString) {
        if (this.ownerDocument.selectSingleNode) { return this.ownerDocument.selectSingleNode(cXPathString, this); }
        else { throw "For XML Elements Only"; }
    }
}


function setAttribute(node, attribName, attribValue) {
    var xmlDoc = node.ownerDocument;
    var att = xmlDoc.createAttribute(attribName);
    att.value = attribValue;
    node.attributes.setNamedItem(att);
}

function translate(str) {
    return str;
}

var ext;
function addToArrColor(node) {
    var i = 0;
    var useType = getAttribute(node, "ColorType");
    useType = translate(useType);
    var code = getAttribute(node, "Code");
    switch (code) {
        case "Cat1": //מבנה ציבורי
            if (useType != translate("חלל לא לחיוב"))
                useType = translate("שטח ציבורי");
            break;
        case "Cat3": //חניה ציבורית
            useType = translate("חניה ציבורית");
            break;
        case "Cat5": //קרקע ציבורית
            useType = translate("קרקע ציבורית");
            break;
        case "Cat7": //קרקע ציבורית
            useType = translate("חניה בקרקע");
            break;
        case "Cat9": //גינון משותף
            useType = translate("גינון משותף");
            break;
        case "Cat11": //גינון משותף
            useType = translate("משותף קומתי");
            break;
        default:
            break;
    }
    for (i = 0; i < newColorArr.length; i++) {
        var onearea = newColorArr[i];
        if (onearea[0] == useType)
            return;
    }
    var RGB = getAttribute(node, "RGB");
    var s = new Array(useType, RGB);
    newColorArr[newColorArr.length] = s;
}
var newColorArr = new Array();
function clearLeggend() {
    DivLeggend.innerHTML = "";
}
var hD = "0123456789abcdef";
function toHex(str) {
    var d = parseInt(str, 10);
    var h = hD.substr(d & 15, 1);
    while (d > 15) {
        d >>= 4;
        h = hD.substr(d & 15, 1) + h;
    }
    if (h.length == 1)
        h = "0" + h;
    return h;
}

function getColorHex(color) {
    //#479a74; 
    var arr = new Array();
    arr = color.split(",");
    var str = "#" + toHex(arr[0]) + toHex(arr[1]) + toHex(arr[2]);
    return str;
}
function loadCmb(str, name, bcheckPropNumber) {
    var i = 0;
    var st = "";
    var arr = new Array();
    for (i = 0; i < Application.Data.DrawingAssets.length; i++) {
        st = Application.Data.DrawingAssets[i][name];
        if (st.indexOf(",") > -1) {
            var strs = st.split(",");
            for (var r = 0; r < strs.length; r++) {
                if (strs[r] != "")
                    addToArr(strs[r], arr);
            }
        }
        else {
            if (bcheckPropNumber) {
                if (Application.Data.DrawingAssets[i][1] == 0 || Application.Data.DrawingAssets[i][14] == "0")
                    continue;
            }
            if (st != "")
                addToArr(st, arr);
        }
    }
    addToCombo(arr);
}

function loadDrCmb(str, name, bcheckPropNumber) {
    if (Application.Data.Drawings.length > 0 && Application.SelectedDrawing != undefined)
        addToCombo(Application.SelectedDrawing[7].split(";"));
}
function isNumber(val) {
    if (isNaN(val)) {
        return false;
    }
    else {
        if (val.toString().includes("e") || val.toString().includes("E")) {
            return false;
        }
        else {
            return true;
        }
    }
}

function order(arr) {
    var i = 0;
    var bStop = false;
    var type1, type1str;
    var type2;
    while (!bStop) {
        bStop = true;
        for (i = 0; i < arr.length - 1; i++) {
            if (isNumber(arr[i])) {
                type1 = parseFloat(arr[i]);
                type2 = parseFloat(arr[i + 1]);
            }
            else {
                type1 = arr[i];
                type2 = arr[i + 1];
            }

            if (type1 > type2) {
                bStop = false;
                temp = type1;
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
}
function getFirstLatterArr(arr, AllArr) {
    var firstLatter = new Array();
    var temp = new Array();
    if (arr.length > 0) {
        var str = arr[0];
        var latter = str.substring(0, 1);
        firstLatter[0] = latter;
    }
    else return;

    for (i = 1; i < arr.length; i++) {
        str = arr[i];
        latter = str.substring(0, 1);
        if (firstLatter[firstLatter.length - 1] != latter) {
            AllArr[firstLatter[firstLatter.length - 1]] = temp
            firstLatter[firstLatter.length] = latter;
            temp = new Array();
            var t = new Array();
            t[0] = str;
            t[1] = str;
            temp[temp.length] = t;
        }
        else {
            var t = new Array();
            t[0] = str;
            t[1] = str;
            temp[temp.length] = t;
        }
    }
}
function addToMyCombo(arr) {
    order(arr);
    for (i = cmb.options.length - 1; i >= 0; i--)
        cmb.options.remove(i);
    for (i = 0; i < arr.length; i++) {
        var st = arr[i].split(";");
        var oOption = document.createElement("OPTION");

        oOption.value = st[1];
        oOption.text = st[0];
        cmb.options.add(oOption);
    }
}

function addToCombo(arr, dontSort) {

    if (!dontSort) {
        order(arr);
    }

    if (arr.length == 0)
        arr[arr.length] = " ";
    for (var i = 0; i < arr.length; i++)
        arr[i] = [arr[i]];
    cmb.store.loadData(arr);
}

function loadPayerNameToCmb(cmb) {
    var str = "//*/Object";
    var name = 10; //"MeasurerPayerName";
    loadCmb(str, name, true);
}
function loadUsageToCmb(cmb) {
    var str = "//*/Object";
    var name = 8; //"MeasurerPayerName";
    loadCmb(str, name, true);
}
function loadShiftsToCmb(cmb) {
    addToCombo(["A", "B", "C", "D", "None"]);
}
function loadCompanyToCmb(cmb) {
    var i = 0;
    var st = "";
    var arr = new Array();
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].company != "") {
                        addToArr(item.objects[i].company, arr);
                    }
                }
            }
        }
    });
    addToCombo(arr);
}
function loadAreaUsageToCmb(cmb) {
    //    var str = "//*/Object";
    //    var name = 8; //"MeasurerPayerName";
    //    loadCmb(str, name, true);
    var k = new Array();
    for (i = 0; i < Application.Data.Drawing.length; i++) {
        for (j = 1; j < Application.Data.Drawing[i].length; j++) {
            addToArr(trns(Application.Data.Drawing[i][j][6][0]), k);
        }
    }
    addToCombo(k);
}
function loadPayerNumberToCmb(cmb) {
    var str = "//*/Object";
    var name = 13; //"MeasurerPayerNumber";
    loadCmb(str, name, true);
}
//function loadTagNameToCmb2(c, n) {
//    var name = 1; //"MeasurerPropNumber";
//    var i = 0;
//    var st = "";
//    var arr = new Array();
//    arr[arr.length] = trns("כולם");
//    arr[arr.length] = trns("ללא");
//    var numCol = 0;

//        var r = "";
//        for (i = 0; i < Application.Data.DrawingAssets.length; i++) {
//            if (m_type == 'rdPayerName')
//                numCol = 10;
//            else numCol = 13;
//            st = Application.Data.DrawingAssets[i][numCol];
//            if (st == n) {
//                r += Application.Data.DrawingAssets[i][11];
//                // addToArr(Application.Data.DrawingAssets[i][11], r);
//            }
//        }

//    order(arr);
//    if (arr.length == 1)
//        arr[0] = " ";
//    for (var i = 0; i < arr.length; i++)
//        arr[i] = [arr[i]];
//    c.store.loadData(arr);
//}
function loadHotDeskToCmb() {
    addToCombo([trns("חמות"), trns("הברידיות"), trns("עמדות קבועות"), trns("פנויות"), trns("מחלקות משותפות")]);//trns("כולן"),trns("מאויישות"),
}
function loadMobilityToCmb() {
    addToCombo(["Homer", "Zoner", "Roamer", "Off Site"]);
}
function loadEquipmentToCmb() {

    var k = new Array();
    for (var a = 0; a < Application.storeAllAdditional.length; a++) {
        addToArr(Application.storeAllAdditional[a].Name, k);
    }
    addToCombo(k);
    //Application.storeAllAdditional = new Ext.data.XmlStore({
    //    url: 'Property3001.asmx/getAdditional?drawingId=' + Application.SelectedDrawing[1] + '&numArea=All',
    //    root: 'addtionals',
    //    autoDestroy: false,
    //    record: 'additional',
    //    fields: ['Name', 'Date', 'Info', 'CatNumber', 'Count', 'Id']//, 'PolyNum'
    //});
    //Application.storeAllAdditional.load();
    //var k = new Array();
    //for (var a = 0; a < Application.storeAllAdditional.data.items.length; a++) {
    //    addToArr(Application.storeAllAdditional.data.items[a].data.Name, k);
    //}
    //addToCombo(k);
}
function loadTagsToCmb(cmb) {

    addToCombo(Application.TagsForDrawing.split(','));
}
function loadAssetNameToCmb2(c, n) {
    var name = 1; //"MeasurerPropNumber";
    var i = 0;
    var st = "";
    var arr = new Array();
    arr[arr.length] = trns("כולם");

    var numCol = 0;
    if (Application.DocumentManager.items.items[0].database.mode != "Objects") {
        for (i = 0; i < Application.Data.DrawingAssets.length; i++) {
            if (m_type == 'rdPayerName')
                numCol = 10;
            else numCol = 13;
            st = Application.Data.DrawingAssets[i][numCol];
            if (st == n) {
                addToArr(trns(Application.Data.DrawingAssets[i][name]), arr);
            }
        }
    }
    else {// for all assetes open area with objects inside and add if not exist to arr
        var r = "";
        for (i = 0; i < Application.Data.DrawingAssets.length; i++) {
            if (m_type == 'rdPayerName')
                numCol = 10;
            else numCol = 13;
            st = Application.Data.DrawingAssets[i][numCol];
            if (st == n) {
                r += Application.Data.DrawingAssets[i][11];
                // addToArr(Application.Data.DrawingAssets[i][11], r);
            }
        }
        //        for (var ob = 0; ob < Application.DocumentManager.ActiveDocument().objects; ob++) {
        //            var p = Application.Data.objects[ob];
        //            
        //            if (r.indexOf("," + Application.Data.ObjectsInDrawing[ob][3] + ",") > -1) {
        //                var gg = Application.Data.ObjectsInDrawing[ob][5].replace("&amp;", "&")
        //                addToArr(gg.split(";")[6], arr);
        //            }
        //    c.txt = raph.paper.text(c.attrs.x + (Application.ObjectsScale / 2), parseFloat(c.attrs.y), yy[1] + " " + yy[2]).attr({ 'font-size': (Application.TextScale / 3) * 2 });

        //        }

    }
    order(arr);
    if (arr.length == 1)
        arr[0] = " ";
    for (var i = 0; i < arr.length; i++)
        arr[i] = [arr[i]];
    c.store.loadData(arr);
}
function loadAssetNameToCmb(cmb) {
    var str = "//*/Object";
    var name = 1; //"MeasurerPropNumber";
    loadCmb(str, name, true);
}
function loadPolyNumberToCmb(cmb) {
    var str = "//*/Object";
    var name = 11; //"MeasurerAreaNumber";
    loadCmb(str, name, false);
}
function loadShopNameToCmb(sto) {
    //    var str = "//*/Object";
    //    var name = 7; //"MeasurerShopName";
    //    loadCmb(str, name, false);
    var k = new Array();
    if (Application.Data.Drawings.length > 0 && Application.SelectedDrawing != undefined) {
        for (i = 0; i < Application.Data.Drawing.length; i++) {
            for (j = 1; j < Application.Data.Drawing[i].length; j++) {
                addToArr(trns(Application.Data.Drawing[i][j][M_UNIT][0]), k);
            }
        }
    }
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].ObjectType == "WorkingStation") {
                        addToArr(item.objects[i].UnitName, k);
                    }
                }
            }
        }
    });

    addToCombo(k);
}
function loadFloorNumberToCmb() {
    var str = "//*/Folder";
    var name = 8; //"Number";
    var k = new Array();
    if (Application.Data.Drawings.length > 0 && Application.SelectedDrawing != undefined) {
        for (i = 0; i < Application.Data.Drawing.length; i++) {
            k[i] = trns(Application.Data.Drawing[i][0][6][0]);
        }
    }

    for (var i = 0; i < k.length; i++)
        k[i] = [k[i]];
    cmb.store.loadData(k);
    //addToCombo(k);

}

function loadRoomSizeToCmb() {
    var k = new Array();
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                var count = 0;
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].ObjectType != "WorkingStation") count++;
                }
                if (count < item.MaxEmpInRoom && count > 0)
                    addToArr(item.UnitName, k);
            }
        }
    });
    if (k.length > 1)
        addToCombo(k);
}
function loadMoreSpacePostionToCmb() {
    var k = new Array();
    k[0] = trns("כל העמדות");
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                var count = 0;
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].ObjectType != "WorkingStation") count++;
                }
                if (count < item.MaxEmpInRoom && count > 0)
                    addToArr(item.UnitName, k);
            }
        }
    });
    if (k.length > 1)
        addToCombo(k);
}
function loadOpenPostionToCmb() {
    var k = new Array();
    var u = trns("כל העמדות");
    k[0] = u;
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                var count = 0;
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].ObjectType == "WorkingStation" && item.objects[i].ico == "tableEmpty.png" && item.UnitName.toString() != "") {
                        addToArr(item.objects[i].UnitName[0].toString(), k);
                    }
                    else if (item.objects[i].ObjectType != "WorkingStation") count++;
                }
                if (count < item.MaxEmpInRoom && item.UnitName.toString() != "")
                    addToArr(item.UnitName[0].toString(), k);
            }
            else if (item.MaxEmpInRoom > 0 && item.isPublic == false && item.UnitName.toString() != "")
                addToArr(item.UnitName[0].toString(), k);
        }
    });
    if (k.length > 1) {
        addToCombo(k);

        // cmb.setValue(u);

    }
}

function loadOverCapacityToCmb() {
    var k = new Array();
    k[0] = trns("כל העמדות");
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                var count = 0;
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].ObjectType != "WorkingStation" && item.isPublic == false) {
                        count++;
                    }
                }
                if (count > item.MaxEmpInRoom)
                    addToArr(item.UnitName, k);
            }
        }
    });
    if (k.length > 1)
        addToCombo(k);
}

function loadBillingMenuCmb() {

    var arayToLoad = [
        { value: trns("מד מים"), id: 1 },
        { value: trns("מונה חשמל"), id: 2 },
        { value: trns("מד אנרגיה"), id: 3 },
        { value: trns("מספר הסכם שכירות"), id: 4 },
    ];

    var k = new Array();
    for (var a = 0; a < arayToLoad.length; a++) {
        addToArr(arayToLoad[a].value, k);
    }

    addToCombo(k, true);
}

function loadEmpTypeToCmb() {
    var i = 0;
    var st = "";
    var arr = new Array();
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                for (var i = 0; i < item.objects.length; i++) {
                    addToArr(item.objects[i].homePhone, arr);
                }
            }
        }
    });
    addToCombo(arr);
}
function loadEmpNumberToCmb() {
    var i = 0;
    var st = "";
    var arr = new Array();
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                for (var i = 0; i < item.objects.length; i++) {
                    addToArr(item.objects[i].companyId, arr);
                }
            }
        }
    });
    for (var i = 0; i < Application.myWaitList.length; i++) {
        addToArr(Application.myWaitList[i].companyId, arr);
    }
    for (var i = 0; i < Application.myHiddenList.length; i++) {
        addToArr(Application.myHiddenList[i].companyId, arr);
    }
    addToCombo(arr);
}
function loadGroupToCmb() {
    var i = 0;
    var st = "";
    var arr = new Array();
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                for (var i = 0; i < item.objects.length; i++) {
                    addToArr(item.objects[i].unit, arr);
                }
            }
        }
    });
    addToCombo(arr);
}
function loadEmpToCmb() {
    var i = 0;
    var st = "";
    var arr = new Array();
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].ObjectType.toLowerCase() == "male" || item.objects[i].ObjectType.toLowerCase() == "female" || item.objects[i].ObjectType.toLowerCase() == "עובד" || item.objects[i].ObjectType.toLowerCase() == "עובדת")
                        addToArr(item.objects[i].firstName + " " + item.objects[i].lastName + "-" + item.UnitName, arr);
                }
            }
        }
    });
    for (var i = 0; i < Application.myWaitList.length; i++) {
        addToArr(Application.myWaitList[i].name + " " + Application.myWaitList[i].lastName + "-" + trns("טרקלין"), arr);
    }
    for (var i = 0; i < Application.myHiddenList.length; i++) {
        addToArr(Application.myHiddenList[i].name + " " + Application.myHiddenList[i].lastName + "-" + trns("מוסתר"), arr);
    }
    addToCombo(arr);
}
function loadObjectToCmb() {
    var i = 0;
    var st = "";
    var arr = new Array();
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].ObjectType.toLowerCase() != "male" && item.objects[i].ObjectType.toLowerCase() != "female" && item.objects[i].ObjectType.toLowerCase() != "עובד" && item.objects[i].ObjectType.toLowerCase() != "עובדת")
                        addToArr(item.objects[i].firstName + " " + item.objects[i].lastName + "-" + item.objects[i].ObjectType, arr);
                }
            }
        }
    });
    addToCombo(arr);
}
function getAssetArea(name) {
    for (i = 0; i < newArr.length; i++) {
        var onearea = newArr[i];
        if (name == onearea.name) {
            return onearea.area;
        }
    }
}

function addToArrIfNotExist(node) {
    var i = 0;
    //   for (i = 0; i < newArr.length; i++)
    //   {
    //        var st = getAttribute(node, "MeasurerPropNumber");
    //        var onearea = newArr[i];
    //        var name = onearea.name;
    //        if (st == name)
    //        {
    //            onearea.number +=1;
    //            onearea.area += parseFloat(getAttribute(node, "MeasurerAreaSize"));
    //            onearea.areaNames += "," + getAttribute(node, "UID");
    //            return;
    //        }
    //   }
    //   var st = getAttribute(node, "MeasurerPropNumber");
    //   var area = getAttribute(node, "MeasurerAreaSize");
    //   var Names = getAttribute(node, "UID");

    //   var s = new areaStruct(st, 1, parseFloat(area), Names);
    //   newArr[newArr.length] = s;
}

function areaStruct(name, number, area, areaNames) {
    this.name = name;
    this.number = number;
    this.area = area;
    this.areaNames = areaNames;
}
var begin = false;

function clearTree() {
    var xslSheet = "<?xml version=\"1.0\"?>";
    xslSheet += "<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\">";
    xslSheet += "<xsl:output method=\"html\"/>";
    xslSheet += "<table border=\"0\" width=\"100%\" height=\"100%\">";
    xslSheet += "<tr><td>";
    xslSheet += "<div id=\"tree\" class=\"frame\">";
    xslSheet += "</div>";
    xslSheet += "</td></tr>";
    xslSheet += "</table>";
    parent.frames(0).Data.innerHTML = xslSheet;
    //	window.parent.parent.frames("blm").frames("down").clearAll();
}
function replaceAll(str, s, t) {
    while (str.indexOf(s) > -1) {
        str = str.replace(s, t);
    }
    return str;
}
function getNameByUid(id) {
    for (var k = 0; k < Application.Data.Drawing.length; k++) {
        for (var h = 1; h < Application.Data.Drawing[k].length; h++) {
            var ar = Application.Data.Drawing[k][h][M_ID];
            if (ar[0] == id) {
                return Application.Data.Drawing[k][h][M_NAME];
            }
        }
    }
}
function getAreaUsageByUid(id) {
    for (var k = 0; k < Application.Data.Drawing.length; k++) {
        for (var h = 1; h < Application.Data.Drawing[k].length; h++) {
            var ar = Application.Data.Drawing[k][h][M_ID];
            if (ar[0] == id) {
                return Application.Data.Drawing[k][h][6];
            }
        }
    }
}
function getUnitNameByUid(id) {
    var it = "";
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.UId[0] == id) {
                if (Application.ViewArea == Application.constantMain.unit)
                    it = item.UnitName;
                else
                    it = getTannetBypolyNumber(item.UId[0], item.Name);
                return false;
            }
        }
    });
    return it;
}
function createUnicNumber(ind, sn) {
    for (var i = 0; i < Application.Data.DrawingAssets.length; i++) {
        if (Application.Data.DrawingAssets[i][ind] == sn) {
            sn += 1;
            i = 0;
        }
    }
    return sn;
}
function getNumObjectsByAssetName(asset, floor) {

    var it = 0;
    var count = 0;
    var vtt = getURLParameters("vt")
    // if (vtt == "reportgen") {

    for (var i = 0; i < Application.Data.DrawingAssets.length; i++) {
        if (asset == Application.Data.DrawingAssets[i][10]) {
            //if ((Application.Data.DrawingAssets[i][11]).indexOf("," + Application.moreInfo[j][0] + ",") > -1) {
            //var polys = Application.Data.DrawingAssets[i][11].split(",");
            // for (var p = 1; p < polys.length - 1; p++) {
            for (var f = 1; f < Application.Data.Drawing[floor].length; f++) {
                if (Application.Data.DrawingAssets[i][11].indexOf("," + Application.Data.Drawing[floor][f][M_ID][0] + ",") > -1) {
                    var bfound = false;
                    var jj = [];
                    for (var j = Application.moreInfo.length - 1; j >= 0; j--) {
                        if (Application.moreInfo[j][0] == Application.Data.Drawing[floor][f][M_ID][0]) {
                            jj.push(j);
                            bfound = true;
                            //break;

                        }
                    }
                    if (bfound)
                        count += parseInt(Application.moreInfo[jj[0]][1]);
                    else count += 1;
                }
            }
            // }
            break;
            //}
        }
    }
    //     return count;
    //}
    var it = 0;
    try {

        //var it = 1;
        for (var i = 0; i < Application.Data.DrawingAssets.length; i++) {
            if (asset == Application.Data.DrawingAssets[i][10]) {
                Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
                    if (item.UId != undefined && Application.Data.DrawingAssets[i][11].indexOf("," + item.UId[0] + ",") > -1 && item.floorInd == floor) {
                        it += item.MaxEmpInRoom;
                    }
                });
                break;
            }
        }
    }
    catch (GG) { }
    if (vtt == "reportgen")
        return count;
    return it;
}

function getNumObjectsByUid(id) {
    var it = 1;
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.UId[0] == id) {
                it = item.MaxEmpInRoom;
                return false;
            }
        }
    });
    return it;
}


function getCountObjectsByUidAndAssetName(id, asset) {
    var it = 0;
    var count = 0;
    if (getURLParameters("vt") == "reportgen") {
        for (var i = 0; i < Application.Data.ObjectsInDrawing.length; i++) {
            if (Application.Data.ObjectsInDrawing[i][3] == id && Application.Data.ObjectsInDrawing[i][6] == asset) {
                count++;
            }
        }
        return count;
    }
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.UId[0] == id) {
                if (item.objects == undefined)
                    return false;
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].division == asset)
                        it++;
                }
                return false;
            }
        }
    });
    return it;
}

function getCountObjectsByUid(id) {
    var it = 0;
    var count = 0;
    if (getURLParameters("vt") == "reportgen") {
        for (var i = 0; i < Application.Data.ObjectsInDrawing.length; i++) {
            if (Application.Data.ObjectsInDrawing[i][3] == id) {
                count++;
            }
        }
        return count;
    }
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.UId[0] == id) {
                if (item.objects == undefined)
                    return false;
                it = item.objects.length;
                return false;
            }
        }
    });
    return it;
}

function getObjectsByName(name) {
    var it = "";
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].Firstname + item.objects[i].LastName == name) {
                        it = item.objects[i];
                        return false;
                    }
                }
            }
        }
    });
    if (it == "") {
        for (var i = 0; i < Application.myWaitList.length; i++) {
            if (Application.myWaitList[i].Firstname + Application.myWaitList[i].LastName == name) {
                it = Application.myWaitList[i];
                break;
            }
        }
    }
    return it;
}
function getObjectsByCompanyId(cid) {
    var it = "";
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].companyId == cid) {
                        it = item.objects[i];
                        return false;
                    }
                }
            }
        }
    });
    if (it == "") {
        for (var i = 0; i < Application.myWaitList.length; i++) {
            if (Application.myWaitList[i].companyId == cid) {
                it = Application.myWaitList[i];
                break;
            }
        }
    }
    return it;
}
function getObjectsByUid(id) {
    var it = "";
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.UId[0] == id) {
                if (item.objects == undefined)
                    return false;
                it = item.objects;
                return false;
            }
        }
    });
    return it;
}
function getObjectsPropsByUid(id) {
    var st = "";
    for (var i = 0; i < Application.Data.ObjectsInDrawing.length; i++) {
        if (Application.Data.ObjectsInDrawing[i][3] == id) {
            //  str = Application.Data.ObjectsInDrawing[i][5];
            //  var ss = str.split(";");
            if (st != "")
                st += ",";
            st += i;
        }
    }
    return st;
}
function getObjectsNameByUid(id) {
    var st = "";
    for (var i = 0; i < Application.Data.ObjectsInDrawing.length; i++) {
        if (Application.Data.ObjectsInDrawing[i][3] == id) {
            str = Application.Data.ObjectsInDrawing[i][5];
            var ss = str.split(";");
            if (st != "")
                st += ",";
            st += ss[0] + " " + ss[1];
        }
    }
    return st;
    //    Application.DocumentManager.ActiveDocument().objects.each(function(item, index, length) {
    //        if (item.UId != undefined) {
    //            if (item.UId[0] == id) {
    //                it = item.UnitName;
    //                return false;
    //            }
    //        }
    //    });
    return it;
}
function showAllBorders() {
    var i = 0;
    var j = 0;
    for (; i < Application.Data.Drawing.length; i++) {
        Application.ShowText = true;
        shownOneBorder(true, Application.Data.Drawing[i][0][M_ID]);
        Application.ShowText = false;
        for (j = 1; j < Application.Data.Drawing[i].length; j++) {
            shownOneBorder(true, Application.Data.Drawing[i][j][M_ID]);
        }
    }

}
function showBorderOfFloor(ar) {
    var i = 0;
    var j = 0;
    for (; i < Application.Data.Drawing.length; i++) {
        for (j = 1; j < Application.Data.Drawing[i].length; j++) {
            var r = "," + Application.Data.Drawing[i][j][M_ID] + ",";
            if (r.indexOf(ar)) {
                for (j = 1; j < Application.Data.Drawing[i].length; j++) {
                    shownOneBorder(true, Application.Data.Drawing[i][j][M_ID]);
                }
                break;
            }
        }
    }

}
function filter(numCol, bPartial) {
    var o = undefined;
    Application.AreaTree.root.removeAll();
    //if (bPartial != true)
    //    showAllBorders();
    var nod = null;
    var viewfloors = [];
    for (i = 0; i < Application.Data.DrawingAssets.length; i++) {
        if (numCol == -1 || Application.Data.DrawingAssets[i][numCol] == cmb.value) {
            st = Application.Data.DrawingAssets[i][11];
            var ar = st.split(",");
            for (var j = 0; j < ar.length; j++) {
                if (ar[j] != "") {
                    var r = (Application.ViewArea == Application.constantMain.polygon) ? ar[j] : getUnitNameByUid(ar[j]);
                    var Onearea = shownOneArea(true, ar[j]);
                    if (Onearea == undefined)
                        continue;
                    if (viewfloors.indexOf(Onearea.floorInd) == -1) {
                        viewfloors.push(Onearea.floorInd);
                        //    if (Application.BackSVGElement != undefined && Application.DocumentManager.items.items[0].viewport.paper.showBack == true) {
                        //        for (var s = 0; s < Application.BackSVGElement.length; s++) {
                        //            if (Application.BackSVGElement[s].floorInd == Onearea.floorInd && Onearea.paper.showBack == true)
                        //                Application.BackSVGElement[s].show();
                        //        }
                        //    }
                    }
                    var node;
                    if (nod == null || Application.AreaTree.root.findChild("text", Application.Data.Drawing[Onearea.floorInd][0][6].toString()) == null) {
                        nod = Application.AreaTree.root.appendChild({ expanded: false, text: Application.Data.Drawing[Onearea.floorInd][0][6].toString(), children: [{ expanded: true, text: r + "-" + getTannetBypolyNumber(ar[j], getNameByUid(ar[j])), leaf: true, uid: ar[j] }] });
                        node = nod;
                        nod.expand();
                    }
                    else {
                        nod = Application.AreaTree.root.findChild("text", Application.Data.Drawing[Onearea.floorInd][0][6].toString());
                        node = nod.appendChild({ expanded: true, text: r + "-" + getTannetBypolyNumber(ar[j], getNameByUid(ar[j])), leaf: true, uid: ar[j] });
                    }
                    if (o == undefined)
                        o = Onearea;
                    if (Onearea != undefined && Application.DocumentManager.items.items[0].database.mode == "Objects")//ניתן להציג אובייקטים
                    {
                        if (Onearea.objects != undefined && Onearea.paper.showObjects == true) {
                            for (var k = 0; k < Onearea.objects.length; k++) {
                                var f = Onearea.objects[k].ico.substring(0, Onearea.objects[k].ico.indexOf(".")); //(Onearea.objects[k].ObjectType == "עובד" || Onearea.objects[k].ObjectType == "Male") ? "male" : (Onearea.objects[k].ObjectType == "עובדת" || Onearea.objects[k].ObjectType == "Female") ? "female" : "objects";
                                node.appendChild({ text: Onearea.objects[k].firstName + " " + Onearea.objects[k].lastName, iconCls: f, leaf: true, uid: ar[j] + "." + k });
                            }
                        }
                    }
                }
            }
        }
    }

    showHiddenPolyBordersByShawnFloor(viewfloors);

    var r = getTreeSorter(Application.AreaTree);

    r.doSort(Application.AreaTree.root);
    return o;
}

function viewRelevantFloors(ar) {
    var o = undefined;
    Application.AreaTree.root.removeAll();

    var nod = null;
    var viewfloors = [];
    for (var j = 0; j < ar.length; j++) {
        if (ar[j] != "") {
            var r = (Application.ViewArea == Application.constantMain.polygon) ? ar[j] : getUnitNameByUid(ar[j]);
            var Onearea = shownOneArea(true, ar[j]);
            if (Onearea == undefined)
                continue;
            if (viewfloors.indexOf(Onearea.floorInd) == -1) {
                viewfloors.push(Onearea.floorInd);
            }
            var node;
            if (nod == null || Application.AreaTree.root.findChild("text", Application.Data.Drawing[Onearea.floorInd][0][6].toString()) == null) {
                nod = Application.AreaTree.root.appendChild({ expanded: false, text: Application.Data.Drawing[Onearea.floorInd][0][6].toString(), children: [{ expanded: true, text: r + "-" + getTannetBypolyNumber(ar[j], getNameByUid(ar[j])), leaf: true, uid: ar[j] }] });
                node = nod;
                nod.expand();
            }
            else {
                nod = Application.AreaTree.root.findChild("text", Application.Data.Drawing[Onearea.floorInd][0][6].toString());
                node = nod.appendChild({ expanded: true, text: r + "-" + getTannetBypolyNumber(ar[j], getNameByUid(ar[j])), leaf: true, uid: ar[j] });
            }
            if (o == undefined)
                o = Onearea;
            if (Onearea != undefined && Application.DocumentManager.items.items[0].database.mode == "Objects")//ניתן להציג אובייקטים
            {
                if (Onearea.objects != undefined && Onearea.paper.showObjects == true) {
                    for (var k = 0; k < Onearea.objects.length; k++) {
                        var f = Onearea.objects[k].ico.substring(0, Onearea.objects[k].ico.indexOf(".")); //(Onearea.objects[k].ObjectType == "עובד" || Onearea.objects[k].ObjectType == "Male") ? "male" : (Onearea.objects[k].ObjectType == "עובדת" || Onearea.objects[k].ObjectType == "Female") ? "female" : "objects";
                        node.appendChild({ text: Onearea.objects[k].firstName + " " + Onearea.objects[k].lastName, iconCls: f, leaf: true, uid: ar[j] + "." + k });
                    }
                }
            }
        }
    }

    showHiddenPolyBordersByShawnFloor(viewfloors);

    var r = getTreeSorter(Application.AreaTree);

    r.doSort(Application.AreaTree.root);
    return o;
}

function getTreeSorter(areaTree) {
    return new Ext.tree.TreeSorter(areaTree, {
        folderSort: true,
        dir: "asc",
        property: "uid",
        sortType: function (node) {
            // sort by a custom, typed attribute:
            return parseFloat(node);
        }
    });
}

function showHiddenPolyBordersByShawnFloor(viewfloors) {
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined && item.UId.toString().indexOf("F") == -1 && viewfloors.indexOf(item.floorInd) > -1 && item.isVisable == false)
            item.hide(true);
    });
}
function showTreeByEmpType() {
    Application.AreaTree.root.removeAll();
    showAllBorders();
    var o = undefined;
    for (i = 0; i < Application.Data.Drawing.length; i++) {
        for (j = 1; j < Application.Data.Drawing[i].length; j++) {
            if (Application.Data.Drawing[i][j][M_ID][0] != "") {
                if (Application.DocumentManager.items.items[0].database.mode == "Objects")//ניתן להציג אובייקטים
                {
                    var Onearea = shownOneArea(false, Application.Data.Drawing[i][j][M_ID][0], true);
                    if (o == undefined && Onearea != undefined)
                        o = Onearea;
                    if (Onearea && Onearea.objects != undefined && Onearea.paper.showObjects == true) {
                        for (var k = 0; k < Onearea.objects.length; k++) {
                            if (Onearea.objects[k].homePhone == cmb.value) {
                                var r = (Application.ViewArea == Application.constantMain.polygon) ? Application.Data.Drawing[i][j][M_ID][0] : getUnitNameByUid(Application.Data.Drawing[i][j][M_ID][0]);
                                var node = Application.AreaTree.root.appendChild({ expanded: true, text: /*trns("שטח") + " " +*/r + "-" + getTannetBypolyNumber(Application.Data.Drawing[i][j][M_ID][0], getNameByUid(Application.Data.Drawing[i][j][M_ID][0])), leaf: true, uid: Application.Data.Drawing[i][j][M_ID][0] });
                                var f = Onearea.objects[k].ico.substring(0, Onearea.objects[k].ico.indexOf(".")); //var f = (Onearea.objects[k].ObjectType == "עובד" || Onearea.objects[k].ObjectType == "Male") ? "male" : (Onearea.objects[k].ObjectType == "עובדת" || Onearea.objects[k].ObjectType == "Female") ? "female" : "objects";
                                node.appendChild({ text: Onearea.objects[k].firstName + " " + Onearea.objects[k].lastName, iconCls: f, leaf: true, uid: Application.Data.Drawing[i][j][M_ID][0] + "." + k });
                                Onearea = shownOneArea(true, Application.Data.Drawing[i][j][M_ID][0]);
                            }
                        }

                    }
                }
            }
        }
    }
    var r = new Ext.tree.TreeSorter(Application.AreaTree, {
        folderSort: true,
        dir: "asc",
        property: "uid",
        sortType: function (node) {
            // sort by a custom, typed attribute:
            return parseFloat(node);
        }
    });
    r.doSort(Application.AreaTree.root);
    return o;
}
function showTreeByGroup() {
    Application.AreaTree.root.removeAll();
    showAllBorders();
    var o = undefined;
    for (i = 0; i < Application.Data.DrawingAssets.length; i++) {
        st = Application.Data.DrawingAssets[i][11];
        var ar = st.split(",");
        //            showBorderOfFloor(st);
        for (var j = 0; j < ar.length; j++) {
            if (ar[j] != "") {
                if (Application.DocumentManager.items.items[0].database.mode == "Objects")//ניתן להציג אובייקטים
                {
                    var Onearea = shownOneArea(false, ar[j], true);
                    if (o == undefined)
                        o = Onearea;
                    if (Onearea && Onearea.objects != undefined && Onearea.paper.showObjects == true) {
                        for (var k = 0; k < Onearea.objects.length; k++) {
                            if (Onearea.objects[k].unit == cmb.value) {
                                var r = (Application.ViewArea == Application.constantMain.polygon) ? ar[j] : getUnitNameByUid(ar[j]);
                                var node = Application.AreaTree.root.appendChild({ expanded: true, text: /*trns("שטח") + " " +*/r + "-" + getTannetBypolyNumber(ar[j], getNameByUid(ar[j])), leaf: true, uid: ar[j] });
                                var f = Onearea.objects[k].ico.substring(0, Onearea.objects[k].ico.indexOf(".")); //var f = (Onearea.objects[k].ObjectType == "עובד" || Onearea.objects[k].ObjectType == "Male") ? "male" : (Onearea.objects[k].ObjectType == "עובדת" || Onearea.objects[k].ObjectType == "Female") ? "female" : "objects";
                                node.appendChild({ text: Onearea.objects[k].firstName + " " + Onearea.objects[k].lastName, iconCls: f, leaf: true, uid: ar[j] + "." + k });
                                Onearea = shownOneArea(true, ar[j]);
                            }
                        }

                    }
                }
            }
        }
    }
    var r = new Ext.tree.TreeSorter(Application.AreaTree, {
        folderSort: true,
        dir: "asc",
        property: "uid",
        sortType: function (node) {
            // sort by a custom, typed attribute:
            return parseFloat(node);
        }
    });
    r.doSort(Application.AreaTree.root);
    return o;
}
function showTreeByCompany() {
    Application.AreaTree.root.removeAll();
    showAllBorders();
    var o = undefined;
    for (i = 0; i < Application.Data.DrawingAssets.length; i++) {
        st = Application.Data.DrawingAssets[i][11];
        var ar = st.split(",");
        //            showBorderOfFloor(st);
        for (var j = 0; j < ar.length; j++) {
            if (ar[j] != "") {
                if (Application.DocumentManager.items.items[0].database.mode == "Objects")//ניתן להציג אובייקטים
                {
                    var Onearea = shownOneArea(false, ar[j], true);
                    if (o == undefined)
                        o = Onearea;
                    if (Onearea && Onearea.objects != undefined && Onearea.paper.showObjects == true) {
                        for (var k = 0; k < Onearea.objects.length; k++) {
                            if (Onearea.objects[k].company == cmb.value) {
                                var r = (Application.ViewArea == Application.constantMain.polygon) ? ar[j] : getUnitNameByUid(ar[j]);
                                var node = Application.AreaTree.root.appendChild({ expanded: true, text: /*trns("שטח") + " " +*/r + "-" + getTannetBypolyNumber(ar[j], getNameByUid(ar[j])), leaf: true, uid: ar[j] });
                                var f = Onearea.objects[k].ico.substring(0, Onearea.objects[k].ico.indexOf(".")); //var f = (Onearea.objects[k].ObjectType == "עובד" || Onearea.objects[k].ObjectType == "Male") ? "male" : (Onearea.objects[k].ObjectType == "עובדת" || Onearea.objects[k].ObjectType == "Female") ? "female" : "objects";
                                node.appendChild({ text: Onearea.objects[k].firstName + " " + Onearea.objects[k].lastName, iconCls: f, leaf: true, uid: ar[j] + "." + k });
                                Onearea = shownOneArea(true, ar[j]);
                            }
                        }

                    }
                }
            }
        }
    }
    var r = new Ext.tree.TreeSorter(Application.AreaTree, {
        folderSort: true,
        dir: "asc",
        property: "uid",
        sortType: function (node) {
            // sort by a custom, typed attribute:
            return parseFloat(node);
        }
    });
    r.doSort(Application.AreaTree.root);
    return o;
}
function fillAssetListByPayerName(b) {
    return filter(10, b);
    //        fillbyType(str, witoutSelect);
    //        clearTree();
}
function insertUnitToProjectByFloors(uid, xmlDoc) {

}
function showBuildingName() {
    rdBuildingName.style.visibility = "";
    tdBuildingName.style.visibility = "";
}
function clearAll() {
    //    if (m_type != "rdBuildingName")
    //        input1.value = "";
    //    if (newArr.length > 0)
    //    {
    //        var lastCount = newArr.length;
    //        newArr.length = 0;
    //        var newh = (0 - lastCount) * 19 - 25;
    //        begin = false;
    //        var t = window.parent.document.body.rows;
    //        var arr=new Array();
    //        arr = t.split(",");
    //        var h = arr[1];
    //        height = parseFloat(h);
    //        count = newh;
    //        height += newh;
    //        window.parent.document.body.rows = "80,"+ height +",*,188";
    //       // setTimeout("l()",100);
    //    }
    clearTree();
    clearLeggend();
}



function floorStruct(name, number) {
    this.name = name;
    this.number = number;
}

function getSubIds(name, arrIds, strXml) {
    var myXml = strXml;
    var folderNode = xmlDocAll.documentElement.selectSingleNode("Folder[@Name='" + name + "']");
    var i;

    if (folderNode == null)
        return;
    for (i = 0; i < arrIds.length; i++) {
        var node = folderNode.selectSingleNode("Object[@UID='" + arrIds[i] + "']");
        if (node != null) {
            myXml += node.xml;
        }
    }
    return myXml;
}


function addToFloors(floors, uid) {
    var node = xmlDocAll.documentElement.selectSingleNode("Folder/Object[@UID='" + uid + "']");

    if (node == null)
        return;
    var par = node.parentNode;

    var floorName = getAttribute(par, "Name");
    var floorNumber = getAttribute(par, "Number");

    var fs = new floorStruct(floorName, floorNumber);

    var i;

    for (i = 0; i < floors.length; i++) {
        if (floorName == floors[i].name)
            return;
    }
    floors[floors.length] = fs;
}

function showTreeByAssetName(uids) {
    var arrIds = new Array();
    arrIds = uids.split(",");
    var strXml = "";
    var i, j;
    strXml += "<Project Name=\"Project\">";
    var floors = new Array();

    for (i = 0; i < arrIds.length; i++) {
        addToFloors(floors, arrIds[i]);
    }

    for (i = 0; i < floors.length; i++) {
        var subArrIds = new Array();

        strXml += "<Folder Name=\"";
        strXml += floors[i].name;
        strXml += "\"";
        strXml += " Number=\""
        strXml += floors[i].number;
        strXml += "\">";

        strXml = getSubIds(floors[i].name, arrIds, strXml);
        strXml += "</Folder>";
    }
    strXml += "</Project>";
    loadFilterXmlDoc(strXml);
    parent.frames(0).initTree();
    var firstNode = xmlDocAll.selectSingleNode("//*/Object[@UID='" + arrIds[0] + "']");
    if (firstNode == null)
        return;
    windowload(firstNode, xmlDocAll);
    if (floors.length > 0) {
        window.parent.frames('guide').showbrByName(m_selfloor);
    }

}

function selectme(tr) {
    var index = 0;
    while (true) {
        var t = document.getElementById("tr-" + index);
        if (t != null) {
            t.style.backgroundColor = "silver";
            for (var i = 0; i < 3; i++)
                t.childNodes[i].style.color = "black";
        }
        else break;
        index += 1;
    }
    tr.style.backgroundColor = "#85b000";
    for (var i = 0; i < 3; i++)
        tr.childNodes[i].style.color = "white";
    var id = tr.id;
    var ar = new Array();
    ar = id.split("-");
    index = parseInt(ar[1]);
    //    if (newArr.length > index)
    //    {
    //        var s = newArr[index];
    //        showTreeByAssetName(s.areaNames);
    //    }

}

function selectPoly(num) {
    //   rdPolyNumber.checked = true;
    setcheced(rdPolyNumber);
    cmb.value = num;
    input1.value = num;
    Application.selectChange();
}

function selectFloor(num) {
    setcheced(rdFloorNumber);
    cmb.value = num;
    input1.value = num;
    Application.selectChange();
}
function selectAsset(num) {
    setcheced(rdAssetName);
    cmb.value = num;
    input1.value = num;
    Application.selectChange();
}

function moveToFloorMode(FloorNumber) {
    rdFloorNumber_onclick(rdFloorNumber);
    cmb.value = FloorNumber;
    input1.value = FloorNumber;
    Application.selectChange();
    return "ok";
}
function moveToAssetMode(MeasurerPropNumber, MeasurerPayerName, name) {
    rdAssetName_onclick(rdAssetName);
    m_trid = MeasurerPropNumber;
    m_selfloor = ""
    cmb.value = MeasurerPropNumber;
    input1.value = MeasurerPropNumber;
    m_trid = "tr-0";
    m_selfloor = "F1";
    Application.selectChange();
    return "ok";
}

function fillbyType(str, witoutSelect) {
    //    var lastCount = newArr.length;
    //    newArr.length = 0;
    var nodes;
    if (witoutSelect == true)
        nodes = xmlDocAll.selectNodes("//*/Object");
    else
        nodes = xmlDocAll.selectNodes(str);
    for (i = 0; i < nodes.length; i++) {
        var node = nodes.item(i);
        if (witoutSelect == true)
            if (getAttribute(node, "MeasurerPayerName") != str)
                continue;
        addToArrIfNotExist(node);
    }
    //    var strInner = "<table align=center><table id='tableAssets'><tr>";
    //    strInner += "<tr style='BORDER-RIGHT: silver thin solid; BORDER-TOP: silver thin solid; FONT-SIZE: 0pt; BORDER-LEFT: silver thin solid; BORDER-BOTTOM: silver thin solid' ><td style='width: 30px; height: 15px; text-align: center; font-weight: bold; font-size: 9pt; color: white;' >"+translate("כמות")+"</td>";
    //    strInner += "<td style='width: 50px; height: 15px; text-align: center; font-weight: bold; font-size: 9pt; color: white;' >"+translate("שטח נטו")+"</td>";
    //    strInner += "<td style='width: 80px; height: 15px; text-align: center; font-weight: bold; font-size: 9pt; color: white;' >"+translate("מספר נכס")+"</td></tr>";
    //	for (var j = 0; j < newArr.length; j++)
    //	{
    //	    var OneAsset = newArr[j];
    //	    if (m_trid != "tr-0")
    //	    {
    //	        if (m_trid == OneAsset.name)
    //	            m_trid = "tr-" + j;
    //	    }
    //	    strInner += "<tr onclick='selectme(this);' id='tr-"+j+"' style='cursor: hand; background-color: LightYellow; BORDER-RIGHT: silver thin solid; BORDER-TOP: silver thin solid; FONT-SIZE: 0pt; BORDER-LEFT: silver thin solid; BORDER-BOTTOM: silver thin solid'><td style='width: 20px; height: 15px; text-align: center; font-weight: bold; font-size: 9pt; color: white;'  >"+ OneAsset.number +"</td>";
    //        strInner += "<td style='height: 15px; text-align: center; font-weight: bold; font-size: 9pt; color: white;' >"+ OneAsset.area.toFixed(2) +"</td>";
    //        strInner += "<td style='height: 15px; text-align: center; font-weight: bold; font-size: 9pt; color: white;' >"+ OneAsset.name +"</td></tr>";
    //  	}
    //  	strInner += "</table>";
    //	var newh = 0;
    //	newArr[newArr.length] = 0; 
    //	if (begin == false)
    //	{
    //	    if (newArr.length > 0)
    //	        newh = 25 + newArr.length * 19;
    //	}
    //	else
    //	{
    //	    newh = (newArr.length - lastCount) * 19;
    //	}
    //	if (newArr.length > 0)
    //	{
    //	    rowsAsset.innerHTML = strInner;
    //	}
    //	else rowsAsset.innerHTML = "";
    //	
    //    begin = true;
    //    var t = window.parent.document.body.rows;
    //    var arr=new Array();
    //    arr = t.split(",");
    //    var h = arr[1];
    //    height = parseFloat(h);
    //    count = newh;
    //    height += newh;
    //    window.parent.document.body.rows = "80,"+ height +",*,188";
    //setTimeout("l()",100);
}
function showTreeFloorByUsage(b) {
    filter(8, b);
}
function fillAssetListByPayerNumber(b) {
    return filter(13, b);
}
function fillAssetListByAssetName(b) {
    return filter(1, b);
}
function showTreeFloorByAreaUsage(b) {
    Application.AreaTree.root.removeAll();
    // showAllBorders();
    var viewfloors = [];
    var result = Application.Data.ObjectsInDrawing;
    for (i = 0; i < Application.Data.DrawingAssets.length; i++) {
        st = Application.Data.DrawingAssets[i][11];
        var ar = st.split(",");
        for (var j = 0; j < ar.length; j++) {
            if (ar[j] != "") {

                try {
                    var r = getAreaUsageByUid(ar[j]);
                    if (r == cmb.value) {
                        r = (Application.ViewArea == Application.constantMain.polygon) ? ar[j] : getUnitNameByUid(ar[j]);
                        var node = Application.AreaTree.root.appendChild({ expanded: true, text: /*trns("שטח") + " " +*/r + "-" + getTannetBypolyNumber(ar[j], getNameByUid(ar[j])), leaf: true, uid: ar[j] });
                        var Onearea = shownOneArea(true, ar[j]);
                        if (viewfloors.indexOf(Onearea.floorInd) == -1) {
                            viewfloors.push(Onearea.floorInd);
                            //    if (Application.BackSVGElement != undefined && Application.DocumentManager.items.items[0].viewport.paper.showBack == true) {
                            //        Application.BackSVGElement[Onearea.floorInd].show();
                            //    }
                        }

                    }


                }
                catch (ex) {
                    // alert(ex);
                }


            }
        }
    }
    showHiddenPolyBordersByShawnFloor(viewfloors);
    var r = new Ext.tree.TreeSorter(Application.AreaTree, {
        folderSort: true,
        dir: "asc",
        property: "uid",
        sortType: function (node) {
            // sort by a custom, typed attribute:
            return parseFloat(node);
        }
    });
    r.doSort(Application.AreaTree.root);
}
function fillAssetListByShopName() {
    Application.AreaTree.root.removeAll();
    showAllBorders();
    var result = Application.Data.ObjectsInDrawing;
    for (i = 0; i < Application.Data.DrawingAssets.length; i++) {
        st = Application.Data.DrawingAssets[i][11];
        var ar = st.split(",");
        for (var j = 0; j < ar.length; j++) {
            if (ar[j] != "") {

                try {
                    var r = getUnitNameByUid(ar[j]);
                    if (r == cmb.value) {
                        r = (Application.ViewArea == Application.constantMain.polygon) ? ar[j] : getUnitNameByUid(ar[j]);
                        var node = Application.AreaTree.root.appendChild({ expanded: true, text: /*trns("שטח") + " " +*/r + "-" + getTannetBypolyNumber(ar[j], getNameByUid(ar[j])), leaf: true, uid: ar[j] });
                        var Onearea = shownOneArea(true, ar[j]);
                    }


                }
                catch (ex) {
                    // alert(ex);
                }


            }
        }
    }
    var r = new Ext.tree.TreeSorter(Application.AreaTree, {
        folderSort: true,
        dir: "asc",
        property: "uid",
        sortType: function (node) {
            // sort by a custom, typed attribute:
            return parseFloat(node);
        }
    });
    r.doSort(Application.AreaTree.root);
}
function showTreeFloorByPolyNumber() {
    //  if (Application.DocumentManager.items.items[0].database.mode == "Objects")
    Application.AreaTree.root.removeAll();
    //  filter(-1);
}

function checkObject() {
    return;
    var str = "//*/Area";
    var root = xmlDocAll.documentElement;
    if (root == null)
        return;
    var nodes = xmlDocAll.selectNodes(str);
    if (nodes.length > 0) {
        tdobject.style.visibility = "";
        rdObject.style.visibility = "";
    }
    else {
        tdobject.style.visibility = "hidden";
        rdObject.style.visibility = "hidden";
    }
}
function loadFilterXmlDoc(str) {
    var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
    xmlDoc.async = false;
    xmlDoc.loadXML(str);
    parent.frames(0).xmlDoc = xmlDoc;
    loadLeggand(xmlDoc)
}

function shownAreas(arr) {
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            item.hide(true);
        }
    });
    for (var i = 0; i < arr.length; i++) {
        Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
            if (item.UId != undefined && item.UnitName.toString() != "") {
                if (arr[i].data.name.toString() != "") {
                    if (item.objects != undefined) {
                        for (var j = 0; j < item.objects.length; j++) {
                            if (item.objects[j].UnitName != undefined && item.objects[j].UnitName.toString() == arr[i].data.name.toString()) {
                                item.show();
                                return false;
                            }
                        }
                    }
                    if (arr[i].data.name.toString() == item.UnitName[0].toString() && item.UnitName[0].toString() != "" && item.isPublic == false) {
                        item.show();
                        return false;
                    }
                }
            }
        });
    }
}

function shownAllAreas(bShow, bFromChangeView) {
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (bShow == true)
                item.show();
            else// if ((bFromChangeView == true && item.UId != undefined) || bFromChangeView == undefined || bFromChangeView == false) {
                item.hide(false);
        }
        //} 
    });
}
function shownOneBorder(bShow, uid) {
    var it = undefined;
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.UId[0] == uid) {
                item.hide(bShow);
                it = item;
                return false;
            }
        }
    });
    return it;
}
function shownOneArea(bShow, uid, border) {
    if (border == undefined)
        border = bShow;
    var it = undefined;
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        //        return false;
        if (item.UId != undefined) {
            if (item.UId[0] == uid) {
                if (bShow == true) {
                    item.show();
                    if (Application.BackSVGElement != undefined) {
                        for (var s = 0; s < Application.BackSVGElement.length; s++) {
                            if (Application.BackSVGElement[s].floorInd == item.floorInd && item.paper.showBack == true)
                                Application.BackSVGElement[s].show();
                        }
                    }
                    var floor = getpolyByUid(Application.Data.Drawing[item.floorInd][0][3][0]);
                    if (floor && m_type != "rdFloorNumber") {
                        floor.hide(true);
                    }

                }

                else item.hide(border);
                it = item;
                return false;
            }
        }
    });
    return it;
}
var selStr;
function getTannetBypolyNumber(ar, n) {
    var s = "";
    var cat = "";
    for (var i = 0; i < Application.Data.DrawingAssets.length; i++) {
        if (Application.Data.DrawingAssets[i][11].indexOf("," + ar + ",") > -1) {
            s = Application.Data.DrawingAssets[i][10];
            cat = Application.Data.DrawingAssets[i][18];
            if (s == "")
                s = n;
            break;
        }
    }
    //if (Application.ShowPublicUsage == false && cat == "Cat1")
    //    return "";
    return trns(s);
}
function showTreeByFloorNameForObjects(e, t) {
    /* if (Application.SelectedDrawing[0].toLowerCase().indexOf("tower") > -1) {
         for (i = 0; i < Application.Data.Drawing[t].length; i++) {
             var ar = Application.Data.Drawing[t][i][M_ID];
             var Onearea = shownOneArea(true, ar);
 //            for (var c = 0; c < Onearea.objects.length; c++) {
 //            {
 //                
 //            }
         }
         return;

var size = 0;
    for (i = 0; i < Application.Data.Drawing[selInd].length; i++) {
        var ar = Application.Data.Drawing[selInd][i][M_ID];
        var Onearea = shownOneArea(true, ar);
        var h = [];
        if (i == 0)
            continue;
        if (o == undefined)
            o = Onearea;
        if (Onearea.Name[0].indexOf("לא לחיוב") == -1)
            size += Onearea.area / Application.SqDevider;
        var r = (Application.ViewArea == Application.constantMain.polygon) ? ar : getUnitNameByUid(ar[0]);
        if (nod == null) {
            c = { expanded: true, text: /* trns("שטח") + " " + r + "-" + getTannetBypolyNumber(ar, Application.Data.Drawing[selInd][i][M_NAME]), leaf: true, uid: ar, children: h
};
p.push(c);
nod = Application.AreaTree.root.appendChild({ expanded: false, text: floorName + "-" + size.toFixed(0) + " " + trns("מ''ר"), children: p });
        }

     }*/

    var a = void 0;
    Application.AreaTree.root.removeAll();
    var n = null;
    var floor = null;
    var p = [];
    var o = null;
    var size = 0;

    for (i = 0; i < Application.Data.Drawing[t].length; i++) {
        try {
            var ar = Application.Data.Drawing[t][i][M_ID];
            var Onearea = shownOneArea(true, ar);
            var h = [];
            if (i == 0)
                continue;
            o = Onearea;
            if (Onearea.Name[0].indexOf("לא לחיוב") == -1 && (Onearea.Cat < 5 || Onearea.Cat > 8))
                size += Onearea.area / Application.SqDevider;
            var r = (Application.ViewArea == Application.constantMain.polygon) ? ar : getUnitNameByUid(ar[0]);
            if (o.objects) {
                for (var c = 0; c < o.objects.length; c++) {
                    var pobj = o.objects[c].ico.substring(0, o.objects[c].ico.indexOf("."));
                    h.push({ text: o.objects[c].firstName + " " + o.objects[c].lastName, iconCls: pobj, leaf: true, uid: ar + "." + c })
                }
            }

            s = { expanded: true, text: r + "-" + getTannetBypolyNumber(ar, Application.Data.Drawing[t][i][M_NAME]), leaf: (h.length > 0) ? false : true, uid: ar, children: h };
            p.push(s);
        }
        catch (gg) { alert(gg) }
    }



    //for (i = 0; i < Application.Data.Drawing[t].length; i++) {
    //    var r = Application.Data.Drawing[t][i][M_ID];
    //    o = shownOneArea(true, r);

    //    if (floor == null)
    //        floor = o;
    //    if (0 != i) {
    //        if (o.Name[0].indexOf("לא לחיוב") == -1)
    //            size += o.area / Application.SqDevider;
    //        var s;
    //        l = (Application.ViewArea == Application.constantMain.polygon) ? r : getUnitNameByUid(r[0]);
    //        if (n == null ? (n = Application.AreaTree.root.appendChild({ expanded: !1, text: e, children: [{ expanded: !0, text: l + "-" + getTannetBypolyNumber(r, Application.Data.Drawing[t][i][M_NAME]), leaf: !0, uid: r }] }), s = n, n.expand()) : s = n.appendChild({ expanded: !0, text: l + "-" + getTannetBypolyNumber(r, Application.Data.Drawing[t][i][M_NAME]), leaf: !0, uid: r }), void 0 != o && void 0 != o.objects && 1 == o.paper.showObjects)
    //            for (var c = 0; c < o.objects.length; c++) {
    //                var p = o.objects[c].ico.substring(0, o.objects[c].ico.indexOf("."));  //(o.objects[c].ObjectType == "עובד" || o.objects[c].ObjectType == "Male") ? "male" : (o.objects[c].ObjectType == "עובדת" || o.objects[c].ObjectType == "Female") ? "female" : "objects";
    //                //var p = "עובד" == o.objects[c].ObjectType || "Male" == o.objects[c].ObjectType ? "male" : "female";
    //                s.appendChild({ text: o.objects[c].firstName + " " + o.objects[c].lastName, iconCls: p, leaf: !0, uid: r[0] + "." + c })
    //            }
    //    }
    //    //  else o.show();
    //}
      txt = ClickedFloor(e, size, p);

    n = Application.AreaTree.root.appendChild({ expanded: true, text: txt, children: p });
    var l = new Ext.tree.TreeSorter(Application.AreaTree, { folderSort: !0, dir: "asc", property: "uid", sortType: function (e) { return parseFloat(e) } });
    l.doSort(Application.AreaTree.root);
    return o;
}
function createPolyReportFromArr(t) {
    //t = Application.ReportView.fillReportParams(trns("דוח לפי פוליגונים"), t);
    Application.NewGenAutoReport(trns("דוח לפי פוליגונים"), t);
}
function clickFloorMouseOver(t) {
    t.style.textDecoration = 'underline';
    t.style.color = '#1db6bd';
}
function clickFloorMouseOut(t) {
    t.style.textDecoration = 'none';
    t.style.color ='#000000';
}
function ClickedFloor(e, size, p) {
    var english = /^[A-Za-z0-9]*$/;
    var txt = "";
    if (english.test(e.replaceAll(" ", "")))
        txt = " SqM]</span>";
    else txt = " מ''ר]</span>";
    txt = e + "<span onmouseover='clickFloorMouseOver(this)' onmouseout='clickFloorMouseOut(this)' onclick='createPolyReportFromArr(\""+e+"\")'> [" + size.toFixed(2) + txt;
    return txt;
}
function showTreeByFloorName(floorName, selInd) {
    for (selInd = 0; selInd < Application.Data.Drawing.length; selInd++) {
        if (Application.Data.Drawing[selInd][0][6].toString() == floorName) { break; }
    }
    if (Application.DocumentManager.items.items[0].database.mode == "Objects")
        return showTreeByFloorNameForObjects(floorName, selInd);
    //  setTimeout(function() {
    var o = undefined;
    var p = [];
    var c = [];
    Application.AreaTree.root.removeAll();
    var nod = null;
    var size = 0;
    for (i = 0; i < Application.Data.Drawing[selInd].length; i++) {
        var ar = Application.Data.Drawing[selInd][i][M_ID];
        var Onearea = shownOneArea(true, ar);
        var h = [];
        if (i == 0)
            continue;
        if (o == undefined)
            o = Onearea;
        if (Onearea.Name[0].indexOf("לא לחיוב") == -1 && (Onearea.Cat < 5 || Onearea.Cat > 8))
            size += Onearea.area / Application.SqDevider;
        var r = (Application.ViewArea == Application.constantMain.polygon) ? ar : getUnitNameByUid(ar[0]);
        c = { expanded: true, text: r + "-" + getTannetBypolyNumber(ar, Application.Data.Drawing[selInd][i][M_NAME]), leaf: true, uid: ar, children: h };
        p.push(c);
    }
    var txt = ClickedFloor(floorName, size, p);
    nod = Application.AreaTree.root.appendChild({ expanded: false, text: txt, children: p });
    var r = new Ext.tree.TreeSorter(Application.AreaTree, {
        folderSort: true,
        dir: "asc",
        property: "uid",
        sortType: function (node) {
            // sort by a custom, typed attribute:
            return parseFloat(node);
        }
    });
    r.doSort(Application.AreaTree.root);
    nod.expand();
    return o;
    //  }, 200, floorName, selInd, Application);
}
function getfloorByObject(arr, u) {
    var it = undefined;
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                for (var ob = 0; ob < item.objects.length; ob++) {
                    if (item.objects[ob].firstName + " " + item.objects[ob].lastName + "-" + item.UnitName == u) {
                        arr[0] = Application.Data.Drawing[item.floorInd][0][6].toString();
                        arr[1] = item.floorInd;
                        arr[2] = item;
                        item.show(true);
                        it = item.objects[ob];
                        return false;
                    }
                }

            }
            item.hide(false);
        }
    });
    return it;
}
function getfloorByObjectID(arr, u) {
    var it = undefined;
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.objects != undefined) {
                for (var ob = 0; ob < item.objects.length; ob++) {
                    if (item.objects[ob].companyId == u) {
                        arr[0] = Application.Data.Drawing[item.floorInd][0][6].toString();
                        arr[1] = item.floorInd;
                        arr[2] = item;
                        item.show(true);
                        it = item.objects[ob];
                        return false;
                    }
                }

            }
            item.hide(false);
        }
    });
    return it;
}
function getfloorByShopName(arr, u) {
    var it = undefined;
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            var bFound = false;
            if (item.objects != undefined) {
                for (var i = 0; i < item.objects.length; i++) {
                    if (item.objects[i].ObjectType == "WorkingStation" && item.objects[i].UnitName == u) {
                        bFound = true;
                        arr[0] = Application.Data.Drawing[item.floorInd][0][6].toString();
                        arr[1] = item.floorInd;
                        arr[2] = item;
                        item.show(true);
                        it = item.objects[i];
                        return false;
                    }
                }
            }
            if (item.UnitName == u || bFound) {
                arr[0] = Application.Data.Drawing[item.floorInd][0][6].toString();
                arr[1] = item.floorInd;
                item.show(true);
                it = item;
                return false;
            }
            item.hide(false);
        }
    });
    return it;
}
function getfloorByPolyNumber(arr, ind) {
    var it = undefined;
    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
        if (item.UId != undefined) {
            if (item.UId[0] == ind) {
                arr[0] = Application.Data.Drawing[item.floorInd][0][6].toString();
                arr[1] = item.floorInd;
                item.show(true);
                it = item;
                return false;
            }
            item.hide(false);
        }
    });
    return it;
}
function showTreeByFloorNumber() {
    return showTreeByFloorName(cmb.getValue(), cmb.selectedIndex);
}
var m_selfloor = "F1";
function menualpress() {

}
var lastPath = "";
function openSelDrawing() {
    var selStr = cmb.value; // event.newText;
    var path = "";
    for (var i = 0; i < m_FilesArr.length; i++) {
        if (selStr == m_FilesArr[i]) {
            path = m_PatsArr[i] + "\\" + selStr;
            break;
        }
    }
    if (path != lastPath) {
        lastPath = path;
        window.parent.parent.frames("blm").frames("blm").ToLoadTree = true;
        window.parent.parent.frames("blm").frames("blm").initPath(path);
    }
}
function removenbsp(str) {
    return str.replace("&nbsp;", " ");
}
function insertnbsp(str) {
    return str.replace(" ", "&nbsp;");
}
var winShImg;
function closeWinImage() {
    try { winShImg.close(); }
    catch (oo) { }
}
function stopWebCam() {
    video.pause();
    localMediaStream.stop();
    //   video.fadeOut(500);
    //$("#canvas").hide();
}
var video;
var localMediaStream;
function takePicture() {
    try {
        winTkImg = new Ext.Window({
            title: 'click on video to make a picture',
            shim: true,
            width: 650,
            height: 450,
            closable: false, // hides the normal close button
            plain: true,
            bodyStyle: 'padding:5px;',
            items: [{
                xtype: 'box',
                autoEl: {
                    tag: 'div',
                    width: 650,
                    height: 450,
                    //                style: 'max-width: 100%; max-height: 100%; height: auto;',<button id="snap">Snap Photo</button>
                    html: '<video id="video" width="320" height="240" autoplay></video><canvas id="canvas" width="320" height="240"></canvas>'
                }
            }],
            bbar: [
                {
                    text: trns("העלה תמונה"),
                    handler: function () {
                        var uploadFile = document.getElementById("canvas").toDataURL("image/png", 1.0);
                        var formData = new FormData();
                        var fileData = "Image" + new Date().toDateString() + ".png";
                        formData.append(fileData, uploadFile);
                        formData.append('drawingId', Application.SelectedDrawing[1]);
                        formData.append('number', Application.DocumentManager.items.items[0].viewport.paper.selObj.UId[0]);
                        //send formData with an Ajax-request to the Target-Url
                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', 'getRequest.aspx', true);
                        xhr.setRequestHeader("Content-Disposition", "form-data; name='photo'; filename='" + fileData + "'");
                        xhr.setRequestHeader("Content-Type", "image/png");
                        //                xhr.setRequestHeader("Content-length", formData.length);

                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                console.log('Upload Done', xhr.responseText);
                            } else {
                                alert('An error occurred!');
                            }
                        };
                        xhr.send(formData);

                    }
                },
                {
                    text: trns('סגור'),
                    handler: function () {
                        try {

                            stopWebCam();

                        }
                        catch (l) { }
                        winTkImg.close();
                    }
                }
            ]
        });
        winTkImg.show();
        var canvas = document.getElementById("canvas"),
            context = canvas.getContext("2d"),
            videoObj = { "video": true },
            errBack = function (error) {
                console.log("Video capture error: ", error.code);
            };
        video = document.getElementById("video");
        // Put video listeners into place
        if (navigator.getUserMedia) { // Standard
            navigator.getUserMedia(videoObj, function (stream) {
                localMediaStream = stream;
                video.src = stream;
                video.play();
            }, errBack);
        } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia(videoObj, function (stream) {
                localMediaStream = stream;
                video.src = window.URL.createObjectURL(stream);
                video.play();
            }, errBack);
        }
        else if (navigator.mozGetUserMedia) { // Firefox-prefixed
            navigator.mozGetUserMedia(videoObj, function (stream) {
                localMediaStream = stream;
                video.src = window.URL.createObjectURL(stream);
                video.play();
            }, errBack);
        }
        document.getElementById("video").addEventListener("click", function () {
            context.drawImage(video, 0, 0, 320, 240);
        });


    }
    catch (oo) { }

}
function showWinImage(im) {
    try {
        winShImg = new Ext.Window({
            title: trns('תצוגה'),
            shim: true,
            width: 650,
            height: 450,
            plain: true,
            bodyStyle: 'padding:5px;',
            items: [{
                xtype: 'box',
                autoEl: {
                    tag: 'div',
                    width: 650,
                    height: 450,
                    //                style: 'max-width: 100%; max-height: 100%; height: auto;',.replace(" " , "%20")
                    html: '<img style="max-width: 100%; max-height: 100%; height: auto;" id="pic1" src=' + im.data.url + ' />'
                }
            }]
        });
        winShImg.show();
    }
    catch (oo) { }
}
function loadLeng() {

    tdassetNumber.innerHTML = insertnbsp(translate(removenbsp(tdassetNumber.innerHTML)));
    tdfloorNumber.innerHTML = insertnbsp(translate(removenbsp(tdfloorNumber.innerHTML)));
    tdPayName.innerHTML = insertnbsp(translate(removenbsp(tdPayName.innerHTML)));
    tdpayNumber.innerHTML = insertnbsp(translate(removenbsp(tdpayNumber.innerHTML)));
    tdpolyNumber.innerHTML = insertnbsp(translate(removenbsp(tdpolyNumber.innerHTML)));
    tdBuildingName.innerHTML = insertnbsp(translate(removenbsp(tdBuildingName.innerHTML)));
    tdShopName.innerHTML = insertnbsp(translate(removenbsp(tdShopName.innerHTML)));
}

var extbase = 'ext-3.4.0';
include("WcDb/Database.js");
include("WcAp/Application.js");
include("WcUi/DocumentManager.js");
include("WcUi/LibraryTree.js");
include("WcUi/ColorTree.js");
include("WcUi/AreaTree.js");
include("WcUi/PropertyPage.js");
include("WcUi/Grid.js");
include("WcUi/GeneralProps.js");
include("WcUi/MeusermentProps.js");
include("WcUi/AreaProps.js");
include("WcUi/MunicialProps.js?ver=2");
include("WcUi/MainToolbar.js");
include("WcUi/ReportView.js");
include("WcUi/GraphReport.js");
//include("WcUi/WorkerProps.js");
include("WcUi/MellWorkerProps.js");
include("WcUi/GenObjProps.js");
include("WcUi/BenchProps.js");
include("WcUi/RackProps.js");
include("WcUi/AssetProps.js");
include("WcUi/NormaGrid.js");

include("WcUi/Settings.js");
include("WcUi/SelectionProps.js");
include("WcUi/Tasks.js");
include("WcUi/Audit.js");
include('WcUi/PrintView.js');
include('WcUi/PrintGrid.js');
include('WcUi/AssetsGrid.js');
include('WcUi/AssetsGridSelect.js');
include('WcUi/PolyGrid.js');
include('WcUi/SeperateFloorsMeusermentProps.js');
include("WcUi/ReportGrid.js");
include("WcUi/digitalArchive.js");
include('WcUi/BillingProps.js');

function is_touch_device() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}
if (is_touch_device()) {

    //  include("touch/sencha-touch-all.js");
}
var M_PTS = 0;
var M_SCALE = 1;
var M_THICKS = 2;
var M_ID = 3;
var M_NUMPOS = 4;
var M_HCOLOR = 5;
var M_NAME = 6;
var M_BUILD = 7;
var M_UNIT = 8;




var base64 = {};
base64.PADCHAR = '=';
base64.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

base64.makeDOMException = function () {
    // sadly in FF,Safari,Chrome you can't make a DOMException 
    var e, tmp;

    try {
        return new DOMException(DOMException.INVALID_CHARACTER_ERR);
    } catch (tmp) {
        // not available, just passback a duck-typed equiv 
        // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Error 
        // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Error/prototype 
        var ex = new Error("DOM Exception 5");

        // ex.number and ex.description is IE-specific. 
        ex.code = ex.number = 5;
        ex.name = ex.description = "INVALID_CHARACTER_ERR";

        // Safari/Chrome output format 
        ex.toString = function () { return 'Error: ' + ex.name + ': ' + ex.message; };
        return ex;
    }
}

base64.getbyte64 = function (s, i) {
    // This is oddly fast, except on Chrome/V8. 
    // Minimal or no improvement in performance by using a 
    // object with properties mapping chars to value (eg. 'A': 0) 
    var idx = base64.ALPHA.indexOf(s.charAt(i));
    if (idx === -1) {
        throw base64.makeDOMException();
    }
    return idx;
}

base64.decode = function (s) {
    // convert to string 
    s = '' + s;
    var getbyte64 = base64.getbyte64;
    var pads, i, b10;
    var imax = s.length
    if (imax === 0) {
        return s;
    }

    if (imax % 4 !== 0) {
        throw base64.makeDOMException();
    }

    pads = 0
    if (s.charAt(imax - 1) === base64.PADCHAR) {
        pads = 1;
        if (s.charAt(imax - 2) === base64.PADCHAR) {
            pads = 2;
        }
        // either way, we want to ignore this last block 
        imax -= 4;
    }

    var x = [];
    for (i = 0; i < imax; i += 4) {
        b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12) |
            (getbyte64(s, i + 2) << 6) | getbyte64(s, i + 3);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
    }

    switch (pads) {
        case 1:
            b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12) | (getbyte64(s, i + 2) << 6);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
            break;
        case 2:
            b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12);
            x.push(String.fromCharCode(b10 >> 16));
            break;
    }
    return x.join('');
}

base64.getbyte = function (s, i) {
    var x = s.charCodeAt(i);
    if (x > 255) {
        throw base64.makeDOMException();
    }
    return x;
}

base64.encode = function (s) {
    if (arguments.length !== 1) {
        throw new SyntaxError("Not enough arguments");
    }
    var padchar = base64.PADCHAR;
    var alpha = base64.ALPHA;
    var getbyte = base64.getbyte;

    var i, b10;
    var x = [];

    // convert to string 
    s = '' + s;

    var imax = s.length - s.length % 3;

    if (s.length === 0) {
        return s;
    }
    for (i = 0; i < imax; i += 3) {
        b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8) | getbyte(s, i + 2);
        x.push(alpha.charAt(b10 >> 18));
        x.push(alpha.charAt((b10 >> 12) & 0x3F));
        x.push(alpha.charAt((b10 >> 6) & 0x3f));
        x.push(alpha.charAt(b10 & 0x3f));
    }
    switch (s.length - imax) {
        case 1:
            b10 = getbyte(s, i) << 16;
            x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
                padchar + padchar);
            break;
        case 2:
            b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8);
            x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
                alpha.charAt((b10 >> 6) & 0x3f) + padchar);
            break;
    }
    return x.join('');
}



/**
The missing SVG.toDataURL library for your SVG elements
	
SVG.toDataURL( [type], [keepNonSafe=false], [keepOutsideViewport=false] )

type	MIME type of the exported data.
Default: image/svg+xml.
Must support: image/png.
	
[the rest of the parameters only apply when exportin image/png (or other non-svg)]

keepNonSafe
Export non-safe (image and foreignObject) elements.
This will set the Canvas origin-clean property to false, if this data is transferred to Canvas.
Default: false (to keep origin-clean true).

keepOutsideViewport
Export all drawn content, even if not visible.
Default: false, export only visible viewport, similar to Canvas toDataURL().
    	
IMPLEMENTATION NOTES
	
keepNonSafe and keepOutsideViewport are not supported at all and will be ignored.
	
if you don't have canvg, a client-side hack¹ is attempted, 
but this will fail on all current browsers (as of 2010-08)
	
¹ http://svgopen.org/2010/papers/62-From_SVG_to_Canvas_and_Back/#svg_to_canvas
*/
try {
    SVGElement.prototype.toDataURL = function (type, keepNonSafe, keepOutsideViewport) {
        var _svg = this;

        function debug(s) {
            //     console.log("SVG.toDataURL: " + s);
        }

        function exportSVG() {
            var svg_xml = XMLSerialize(_svg);
            var svg_dataurl = base64dataURLencode(svg_xml);
            return svg_dataurl;
        }

        function XMLSerialize(svg) {

            // quick-n-serialize an SVG dom, needed for IE9 where there's no XMLSerializer nor SVG.xml
            // s: SVG dom, which is the <svg> elemennt
            function XMLSerializerForIE(s) {
                var out = "";

                out += "<" + s.nodeName;
                for (var n = 0; n < s.attributes.length; n++) {
                    out += " " + s.attributes[n].name + "=" + "'" + s.attributes[n].value + "'";
                }

                if (s.hasChildNodes()) {
                    out += ">\n";

                    for (var n = 0; n < s.childNodes.length; n++) {
                        out += XMLSerializerForIE(s.childNodes[n]);
                    }

                    out += "</" + s.nodeName + ">" + "\n";

                } else out += " />\n";

                return out;
            }


            if (window.XMLSerializer) {
                debug("using standard XMLSerializer.serializeToString")
                return (new XMLSerializer()).serializeToString(svg);
            } else {
                debug("using custom XMLSerializerForIE")
                return XMLSerializerForIE(svg);
            }

        }


        var Base64 = {

            // private property
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            // public method for encoding
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = Base64._utf8_encode(input);

                while (i < input.length) {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
            },

            // public method for decoding
            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                }

                output = Base64._utf8_decode(output);

                return output;

            },

            // private method for UTF-8 encoding
            _utf8_encode: function (string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            },

            // private method for UTF-8 decoding
            _utf8_decode: function (utftext) {
                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;

                while (i < utftext.length) {

                    c = utftext.charCodeAt(i);

                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if ((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }

                }

                return string;
            }

        }

        function base64dataURLencode(s) {
            var b64 = "data:image/svg+xml;base64,";

            if (window.btoa) {
                debug("using btoa for base64 encoding");
                b64 += btoa(s);
            } else {
                debug("using custom base64 encoding");
                b64 += Base64.encode(s);
            }

            return b64;
        }
        //<image style="cursor: move;" preserveAspectRatio="none meet" x="18174.2" y="-5575.29" width="100" height="100" xmlns:NS1="http://www.w3.org/1999/xlink" NS1:href="resources/images/male.png" />
        function removeImages(svg_xml, images) {
            while (true) {
                if (svg_xml.indexOf("<image") == -1)
                    break;
                var s = svg_xml.indexOf("<image");
                var eee = svg_xml.indexOf("/>", s) + 2;
                if (eee == 1)
                    alert(svg_xml.substr(s));
                eee = svg_xml.indexOf("</image>", s) + 8;
                if (eee == 1)
                    break;
                images[images.length] = svg_xml.substring(s, eee);
                svg_xml = svg_xml.replace(images[images.length - 1], "");
            }
            return svg_xml;
        }

        function exportPNGcanvg() {
            var canvas = document.getElementById("canvas2");
            var ctx = canvas.getContext("2d");
            //        var canvas = document.createElement("canvas");
            //        var ctx = canvas.getContext('2d');

            // TODO: canvg issue don't require parentNode
            //canvas.setAttribute("style", "display: none;");
            //        canvas.setAttribute("style", "position: absolute; bottom:0; left:0;");
            //        document.body.appendChild(canvas);

            var svg_xml = XMLSerialize(_svg);
            var images = new Array();
            svg_xml = removeImages(svg_xml, images);
            //    svg_xml = '<svg id="ext-gen253" viewBox="950.3 -11847.2 36751.5 13400.6" width="1651" height="602" xmlns="http://www.w3.org/2000/svg" version="1.1"><desc>Created with Raphaël</desc><defs /><path style="stroke-linejoin: round; stroke-width: 10;" fill="none" stroke="#0000ff" stroke-linejoin="round" stroke-width="10" d="M 69.16 -8777.16 L 69.16 -113.25 L 12711.2 -113.25 L 12711.2 -8777.16 L 69.16 -8777.16" /><image style="cursor: move;" preserveAspectRatio="none meet" x="18174.2" y="-5575.29" width="100" height="100" xmlns:NS1="http://www.w3.org/1999/xlink" NS1:href="http://bermad-air.com/resources/images/login_down.png" /></svg>'; //svg_xml.replace(/>\s+/g, ">").replace(/\s+</g, "<"); 
            canvg(canvas, svg_xml, { ignoreMouse: true, ignoreAnimation: true });
            //var png_dataurl = canvas.toDataURL();
            //        document.body.removeChild(canvas);

            return images;
        }

        // BEGIN MAIN

        if (!type) type = "image/svg+xml";

        if (keepOutsideViewport) debug("keepOutsideViewport NOT supported and will be ignored!");
        if (keepNonSafe) debug("keepNonSafe is NOT supported and will be ignored!");

        switch (type) {
            case "image/svg+xml":
                return exportSVG(this);
                break;

            case "image/png":

                if (window.canvg) {
                    debug("Using canvg for png exporting")
                    return exportPNGcanvg(this);
                } else {
                    debug("Sorry! You don't have canvg. Using native hack for png exporting, THIS WILL FAIL!")
                    return exportPNGcanvg(this);
                }

                break;

            default:
                debug("Sorry! Exporting as \"" + type + "\" is not supported!")
        }
    }
}
catch (OO) { }


//include("Files/guide.js");
Ext.onReady(function () {

    Ext.fly(document).addListener("keydown", function (e, t) {
        if (e.getKey() == 8) {
            if (t.tagName.toUpperCase() != "INPUT" && t.tagName.toUpperCase() != "TEXTAREA") {
                e.preventDefault();
                return false;
            }
        }
        try {
            if (e.getKey() == 27) {
                if (Application.DocumentManager.items.items[0].viewport.paper.selRedLine != null)
                    Application.DocumentManager.items.items[0].viewport.unClick(Application.DocumentManager.items.items[0].viewport.paper.selRedLine);
                if (Application.DocumentManager.items.items[0].viewport.paper.selObj != null) {
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.unClickonObj(Application.DocumentManager.items.items[0].viewport.paper.selObj, false);
                    Application.DocumentManager.items.items[0].viewport.paper.selObj = null;
                }
                if (Application.DocumentManager.items.items[0].viewport.sliceObj != null) {
                    var view = Application.DocumentManager.items.items[0].viewport;
                    view.startSlice = false;
                    view.Slice = false;
                    view.sliceObj.remove();
                    view.Select = true;
                    view.sliceObj = null;
                    view.startPos = null;
                    view.FromSlice = true;
                    view.SetSelect(true);
                }
                if (Application.polysPrint != undefined) {
                    //                    for (var b = 0; b < Application.polysPrint.length; b++) {
                    //                        for (var j = 0; j < Application.DocumentManager.items.items[0].viewport.database.objects.length; j++) {
                    //                            if (Application.DocumentManager.items.items[0].viewport.database.objects.items[j] instanceof WcDb.PolyLine && Application.polysPrint[b].toString() == Application.DocumentManager.items.items[0].viewport.database.objects.items[j].UId.toString()) {
                    //                                bord = false;
                    //                                var obj = Application.DocumentManager.items.items[0].viewport.database.objects.items[j];
                    //                                obj.unClickonObj(obj, false);
                    //                                break;
                    //                            }

                    //                        }
                    //                    }
                    Application.polysPrint = undefined;
                }
                Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
                    if (item.UId != undefined) {
                        item.unClickonObj(item, false);
                    }
                });


            }
            if (e.getKey() == 46) {
                if (Application.DocumentManager.items.items[0].viewport.paper.selRedLine != null) {
                    Application.DocumentManager.items.items[0].viewport.removeLine(Application.DocumentManager.items.items[0].viewport.paper.selRedLine);
                }
            }
            if (e.getKey() == 90 && e.ctrlKey) {
                //                if (Application.DocumentManager.items.items[0].viewpor.isOnAction() != undefined)//בדיקה אם המהלך פיצול, מדידה
                //                {
                //                    Application.DocumentManager.items.items[0].viewport.inActionUndo(1);
                //                }
                //                else
                //                {    
                Application.DocumentManager.items.items[0].viewport.database.Undo(1);
                //                }

            }
        }
        catch (gg) { }
    });
    Ext.QuickTips.init();
    Application = new WcAp.Application({});
    Application.ButtonsAlt = function () {
        var arr = [];
        Ext.Ajax.request({
            url: 'ButtonService.asmx/GetAllButtons',
            jsonData: { a: "100" },
            method: 'POST',
            success: function (response, opts) {
                var result = Ext.decode(response.responseText).d;

                console.log(result)
                for (var j = 0; j < result.length; j++) {
                    var o = "";

                    var u = {
                        id: result[j][0],
                        BtnId: result[j][1],
                        BtnName: result[j][2],
                        AltHeb: result[j][3],
                        AltEng: result[j][4],
                        LinkManualHeb: result[j][5],
                        LinkManualEng: result[j][6],
                        LinkVideoHeb: result[j][7],
                        LinkVideoEng: result[j][8]
                    };
                    arr[result[j][1]] = u;
                    try {
                        if (location.href.indexOf("En.aspx") > -1) {

                            if (result[j][4] == "") {
                                Ext.getCmp(result[j][1]).tooltip = "";
                            }
                            else {
                                var tll = "<b>" + result[j][4] + "</b>";
                                if (result[j][6] != "") {
                                    tll += "<br><br>";
                                }
                                result[j][6] = result[j][6].replaceAll('\n', '<br>')

                                tll += result[j][6];
                                if (result[j][8] != "") {
                                    tll += "<br><br>" + trns("למדריך") + " <a target='_blank' href=" + result[j][8] + ">" + trns("לחץ כאן") + "</a>";
                                }
                                if (result[j][8] == "" && result[j][10] != "") {
                                    tll += "<br>";
                                }

                                if (result[j][10] != "") {
                                    tll += "<br>" + trns("לסרטון") + " <a target='_blank' href=" + result[j][10] + "> " + trns("לחץ כאן") + "</a>";
                                }
                                try {

                                    Ext.getCmp(result[j][1]).tooltip = tll;

                                }
                                catch (e) {

                                    console.log(e);
                                }
                            }
                        }
                        else {
                            if (result[j][3] == "") {
                                Ext.getCmp(result[j][1]).tooltip = "";
                            }
                            else {
                                var tll = "<b>" + result[j][3] + "</b>";
                                if (result[j][5] != "") {
                                    tll += "<br><br>";
                                }
                                result[j][5] = result[j][5].replaceAll('\n', '<br>')

                                tll += result[j][5];
                                if (result[j][7] != "") {
                                    tll += "<br><br>" + trns("למדריך") + " <a target='_blank' href=" + result[j][7] + ">" + trns("לחץ כאן") + "</a>";
                                }
                                if (result[j][7] == "" && result[j][9] != "") {
                                    tll += "<br>";
                                }
                                if (result[j][9] != "") {
                                    tll += "<br>" + trns("לסרטון") + " <a target='_blank' href=" + result[j][9] + "> " + trns("לחץ כאן") + "</a>";
                                }
                                try {

                                    Ext.getCmp(result[j][1]).tooltip = tll;

                                }
                                catch (e) {

                                    console.log(e);
                                }
                            }
                        }
                    } catch (e) {
                        console.log(result[j])
                        console.log(e)
                    }

                }

            },
            failure: function (response, opts) {
                alert("GetAjaxDataTable " + response.responseText);
            }
        });
        return arr;
    }
    Application.RanderDrawing = true;
    Application.Data = new WcDb.Database();
    Application.readOnly = false;
    Application.canChangeDrawing = false;
    Application.SnapToMids = true;
    Application.SnapToEnds = true;
    Application.SnapToBack = true;
    Application.distanceUnit = "cm";
    Application.SqDevider = 10000;
    Application.ShowPublicUsage = false;
    Application.AreaUnit = "m²";
    Application.zmulti = 50;
    Application.SaveFlag = false;
    Application.Template = "<table style='height: 140px; border: 1px solid black;' width='366'><tbody><tr><td colspan='3' rowspan='3'><img src='https://property1.poc-system.com/resources/images/poclogo.png' width='150' height='91' /></td><td><span style='font-size: 12pt;'><strong>{Room Number}</strong></span></td></tr><tr><td>{Department}</td></tr><tr><td>{Job}</td></tr><tr><td colspan='4'><span style='font-size: 10pt;'><strong>{Name}</strong></span></td></tr></tbody></table>";
    Application.MoreMails = "";
    Application.ShowSepFloors = false;
    Application.IsDerty = true;
    Application.insearch = false;
    Application.MeusermentProps = new WcUi.MeusermentProps();
    Application.UpdateReadOnly = function () {
        Ext.Ajax.request({
            url: 'Property3001.asmx/GetPermisions',
            method: 'POST',
            jsonData: { ok: "" },
            success: function (response, opts) {
                var d = Ext.decode(response.responseText).d;
                var spl = d.split(";");
                Application.UserLavel = spl[0];
                Application.readOnly = (spl[0] == "ReadOnly") ? true : false;
                Application.lreadOnly = Application.readOnly;
                Application.canChangeDrawing = (spl[1] == "True");
                Application.canSplitJoin = (spl[2] == "True");
                Application.UserName = spl[3];
                Application.Man = (spl[4] == "True");
                Application.Sv = (spl[5] == "True");
                Application.UserMail = spl[6];
                Application.IsZivUser = (spl[10] == "True");
                Application.SiteName = spl[11];
                Application.UserLogo = spl[12];
                Application.FullName = spl[13];

                if (spl[7].indexOf("$") > -1) {
                    var spers = spl[7].split("$");
                    Application.MoreMails = spers[0];
                    var ggg = spers[1].split(":");
                    Application.ObjectMoveAlert = ggg[0];
                    Application.ObjectEnterAlert = ggg[1];
                    Application.ObjectDeleteAlert = ggg[2];
                    Application.TannentMoveAlert = "ללא";
                    if (ggg.length > 3)
                        Application.TannentMoveAlert = ggg[3];
                }
                else Application.MoreMails = spl[7];

                try {
                    Application.ShowSepFloors = (spl[8] == "True");
                }
                catch (hh) { }
                if (parseFloat(spl[9]) > 120) {
                    Application.ChangeWind = new Ext.Window({
                        title: 'Please change your password',
                        width: 365,
                        top: 0,
                        height: 300,
                        minWidth: 100,
                        defaultType: 'textfield',
                        minHeight: 100,
                        labelWidth: 150,
                        layout: 'fit',
                        plain: true,
                        //                                            closeAction: 'hide',
                        shim: true,

                        bodyStyle: 'padding:5px;',
                        buttonAlign: 'center',
                        //                                            items: Application.LibraryTree,
                        items: new Ext.FormPanel({
                            items: [
                                {
                                    name: 'username',
                                    fieldLabel: 'User Name',
                                    allowBlank: false,
                                    hidden: true,
                                    height: 25,
                                    width: 150,
                                    xtype: "textfield",
                                    style: "text-align: left; float: left;",
                                    labelStyle: 'float: left;direction: ltr;text-align: left;'
                                },
                                {
                                    html: "<div style='height: 5px;' ></div>", //<p><input type='button' style='width: 20px;' id='refresh' onclick='Captcha();'/></p>
                                    xtype: "box"
                                },
                                {
                                    name: 'password',
                                    fieldLabel: 'Current Password',
                                    //                                                allowBlank: false,
                                    xtype: "textfield",
                                    style: "text-align: left; float: left; direction: ltr;",
                                    labelStyle: 'float: left;direction: ltr;text-align: left;',
                                    //                                                    labelStyle: 'width: 170px; padding:5px;',
                                    width: 150,
                                    height: 25,
                                    //                                                inputType: 'password',
                                    //                                                validateOnBlur: false,
                                    allowBlank: false
                                },
                                {
                                    html: "<div class='capt' style='padding: 5px; width: 285px; float: left; text-align: left; dir: ltr'>New Password should contain minimum 8 characters with alphanumeric and special characters like !, @, #, $, %, ^, *</div>", //<p><input type='button' style='width: 20px;' id='refresh' onclick='Captcha();'/></p>
                                    xtype: "box"
                                },
                                {
                                    name: 'Newpassword',
                                    fieldLabel: 'New password',
                                    style: "text-align: left; float: left;direction: ltr;",
                                    labelStyle: 'float: left; direction: ltr;text-align: left;',
                                    xtype: "textfield",
                                    //                                                labelStyle: 'width: 170px; padding:5px;',
                                    width: 150,
                                    height: 25,
                                    allowBlank: false
                                },
                                {
                                    name: 'Repeatpassword',
                                    fieldLabel: 'Retype your new password',
                                    xtype: "textfield",
                                    //                                                labelStyle: 'width: 170px; padding:5px;',
                                    style: "text-align: left; float: left;direction: ltr",
                                    labelStyle: 'float: left; direction: ltr;text-align: left;',
                                    width: 150,
                                    height: 25,
                                    allowBlank: false
                                },
                                //                                            {
                                //                                                name: "boxCaptcha",
                                //                                                id: "boxCaptcha",
                                //                                                html: "<div class='g-recaptcha' data-sitekey='6LezqSkTAAAAAJQDnZyz5Nsc_CSvhE2jLYwFuXNN'></div>", //<p><input type='button' style='width: 20px;' id='refresh' onclick='Captcha();'/></p> <div class='capt' style='padding: 5'><h2 type='text' id='mainCaptcha' style='background-image:url(resources/images/captback.png); color: #222222; height: 22px; direction: ltr; font-weight: 100; background-repeat: no-repeat; background-position: center top; -webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none; text-align: center; font-size: 16px; font-family: 'Times New Roman, Times, serif; padding: 5px 0px 5px 0px'></h2><input type='text' id='txtInput' style='width: 150px; float: left; margin-left: 88; text-align: left;'/></div>
                                //                                                xtype: "box"
                                //                                            }
                            ]
                        }),
                        buttons: [{
                            text: "Change",
                            handler: function () {
                                //                                if (ValidCaptcha() == false) {
                                //                                    Ext.MessageBox.alert(trns("הודעה"), "Check Captcha Code");
                                //                                    return;
                                //                                }
                                var f = Application.ChangeWind.items.items[0].getForm();
                                if (f.findField('Newpassword').getValue() == "") {
                                    Ext.MessageBox.alert(trns("הודעה"), "New password is empty !!");
                                    return;
                                }
                                if (f.findField('Repeatpassword').getValue() == "") {
                                    Ext.MessageBox.alert(trns("הודעה"), "Reapet password is empty !!");
                                    return;
                                }
                                if (f.findField('Newpassword').value != f.findField('Repeatpassword').value) {
                                    Ext.MessageBox.alert(trns("הודעה"), "Reapet password not equel to your new password !!");
                                    return;
                                }
                                if (f.findField('Newpassword').getValue().length < 8) {
                                    Ext.MessageBox.alert(trns("הודעה"), "Password length less then 8 characters");
                                    return;
                                }
                                if (f.findField('Newpassword').getValue().indexOf('*') == -1 && f.findField('Newpassword').getValue().indexOf('!') == -1 && f.findField('Newpassword').getValue().indexOf('@') == -1 && f.findField('Newpassword').getValue().indexOf('#') == -1 && f.findField('Newpassword').getValue().indexOf('$') == -1 && f.findField('Newpassword').getValue().indexOf('%') == -1 && f.findField('Newpassword').getValue().indexOf('^') == -1) {
                                    Ext.MessageBox.alert(trns("הודעה"), "New Password should contain special characters like !, @, #, $, %, ^, *");
                                    return;
                                }

                                if (f.findField('Newpassword').getValue() == f.findField('Repeatpassword').getValue()) {

                                    Ext.Ajax.request({
                                        url: 'Property3001.asmx/ChangeOb',
                                        method: 'POST',
                                        jsonData: { o: f.findField('password').getValue(), n: f.findField('Newpassword').getValue() },
                                        success: function (response, opts) {
                                            var d = Ext.decode(response.responseText).d;
                                            if (d == "Password Succesfuly Changed!") {
                                                Application.ChangeWind.close();
                                                Application.MainMenu.wind.show();
                                            }
                                            Ext.MessageBox.alert(trns("הודעה"), d);
                                        },
                                        failure: function (response, opts) {
                                        }
                                    });
                                }

                            }
                        },
                        {
                            text: "Cancel",
                            handler: function () {
                                Application.ChangeWind.close();
                            }
                        }]
                    });
                    Application.ChangeWind.show();
                    //                    Captcha();
                }
                //         Application.Template = (d.split(";")[9] != undefined)? d.split(";")[9]: "";
                //                Ext.fly("btnPrintReadOnly").setVisible(false);
                try {
                    (spl[2] == "True") ? Ext.getCmp("btnSplit").show() : false;
                    (spl[2] == "True") ? Ext.getCmp("btnMarge").show() : false;
                    (spl[4] == "True") ? Ext.getCmp("btnManage").show() : false;
                    if (spl[4] === "True") {
                        var optsi = {
                            angle: -0.2, // The span of the gauge arc
                            lineWidth: 0.2, // The line thickness
                            radiusScale: 0.86, // Relative radius
                            pointer: {
                                length: 0.46, // // Relative to gauge radius
                                strokeWidth: 0.035, // The thickness
                                color: '#000000' // Fill color
                            },
                            limitMax: false,     // If false, max value increases automatically if value > maxValue
                            limitMin: false,     // If true, the min value of the gauge will be fixed
                            //colorStart: '#00FF00',   // Colors

                            //colorStop: '#FF0000',    // just experiment with them
                            percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
                            strokeColor: '#E0E0E0',  // to see which ones work best for you
                            generateGradient: true,
                            highDpiSupport: true     // High resolution support

                        };
                        var target = document.getElementById('gagueCanvas'); // your canvas element
                        Application.gauge = new Gauge(target).setOptions(optsi); // create sexy gauge!
                        Application.gauge.maxValue = 100; // set max gauge value
                        Application.gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                        Application.gauge.animationSpeed = 32; // set animation speed (32 is default value)
                        Application.gauge.set(80); // set actual value
                    }
                    if (Application.ShowSepFloors == false)
                        Application.MeusermentProps.tools["refresh"].hide();


                }
                catch (gy) { }

            },
            failure: function (response, opts) {
                alert(response.responseText);
            }
        });
    }
    //Ext.Ajax.request({

    //    url: 'Property3001.asmx/GetTemplate',
    //    method: 'POST',
    //    jsonData: { ok: "" },
    //    success: function (response, opts) {
    //        var d = Ext.decode(response.responseText).d;
    //        Application.Template = d;
    //    },
    //    failure: function (response, opts) {
    //        alert(response.responseText);
    //    }
    //});
    Application.Template = "<table style='height: 140px; border: 1px solid black;' width='366'><tbody><tr><td colspan='3' rowspan='3'><img src='resources/images/poclogo.png' width='150' height='91' /></td><td><span style='font-size: 12pt;'><strong>{Room Number}</strong></span></td></tr><tr><td>{Department}</td></tr><tr><td>{Job}</td></tr><tr><td colspan='4'><span style='font-size: 10pt;'><strong>{Name}</strong></span></td></tr></tbody></table>";
    Application.UpdateReadOnly();
    Application.AreaTree = new WcUi.AreaTree();
    Application.ColorTree = new WcUi.ColorTree();
    Application.LibraryTree = new WcUi.LibraryTree();
    Application.PropertyPage = new WcUi.PropertyPage();
    Application.MyGrid = new WcUi.MyGrid();
    Application.CurObjectId = 0;
    Application.ZoomAssets = 300;
    Application.ZoomObjects = 100;
    Application.NewObjectsIds = function () {
        Application.CurObjectId -= 1;
        return Application.CurObjectId;
    }

    Application.MyGridTabs = new Ext.TabPanel({
        split: true,
        titleCollapse: true,
        region: (location.href.indexOf("En.aspx") > -1) ? 'east' : "west",
        border: false,
        activeTab: 0,
        deferredRender: false, // determining whether or not each tab is rendered only when first accessed (defaults to true).
        viewConfig: {
            forceFit: true,
            scrollOffset: 2 // the grid will never have scrollbars
        },

        width: (location.href.indexOf("En.aspx") > -1) ? 185 : 160,
        autoScroll: false
    });

    Application.MyGridTabs.add(Application.MyGrid);
    // new WcUi.MyGrid();
    Application.GeneralProps = new WcUi.GeneralProps();
    Application.Floors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Application.CurDrawingName = "";
    Application.SepFloorMeusermentProps = new WcUi.SeperateFloorsMeusermentProps();
    Application.MunicialProps = new WcUi.MunicialProps();
    Application.AreaProps = new WcUi.AreaProps();
    //  Application.ReportView = new WcUi.ReportView();

    Application.JobsStore = new Ext.data.SimpleStore({
        fields: ['txt']
        , data: [[""]]
    });
    Application.NormaGrid = new WcUi.NormaGrid();

    Application.SelectionProps = new WcUi.SelectionProps();
    //        Application.SelectionProps.getColumnModel().getColumnById('name').sortable = false;
    //        Application.SelectionProps.colModel.config[0].sortable = false;
    Application.MainMenu = new WcUi.MainToolbar();
    Application.ReportView = new WcUi.ReportView();
    Application.mapMode = "Select";
    Application.myWaitList = [];
    Application.myNewWaitList = [];
    Application.myHiddenList = [];

    //// Column Model shortcut array
    var cols = [
        { id: 'eid', width: 0, sortable: false, hidden: true, dataIndex: 'eid' },
        { id: 'name', header: trns("שם פרטי"), autoSizeColumn: true, hidden: false, sortable: true, dataIndex: 'FirstName' },
    ];

    Application.storeObjects = new Ext.data.JsonStore({
        fields: [],
        data: Application.myWaitList
    });
    Application.hiddenObjects = new Ext.data.JsonStore({
        fields: [],
        data: Application.myHiddenList
    });

    var editorWaitingList = new Ext.ux.grid.RowEditor({
        saveText: 'Update',
        errorSummary: false,
        listeners: {
            afteredit: function (object, changes, r, rowIndex) {
                // Do custom things
                r.set("BackDate", new Date(changes.BackDate).format("d/m/Y"));
                for (var i = 0; i < Application.myWaitList.length; i++) {
                    if (Application.myWaitList[i].eid == r.data.eid) {
                        Application.myWaitList[i].BackDate = new Date(changes.BackDate).format("d/m/Y");
                        var ss = Application.myWaitList[i].data[5].split(";");
                        ss[15] = Application.myWaitList[i].BackDate;
                        Application.myWaitList[i].data[5] = ss.join(";");
                        var dto = Application.SelectedDrawing[1];
                        Ext.Ajax.request({
                            url: 'Property3001.asmx/MoveObjectToWaitingList',
                            method: 'POST',
                            jsonData: { uid: r.data.eid, Info: Application.myWaitList[i].data[5], gen: ss[0], DrawingTo: dto },
                            success: function (response, opts) { }
                        });
                    }
                }
            }
        }
    });

    // declare the source Grid
    var firstGrid = new Ext.grid.GridPanel({
        ddGroup: 'LibraryTreeDD',
        id: "Lounge",
        store: Application.storeObjects,
        columns: cols,
        enableDragDrop: true,
        border: false,
        autoScroll: false,
        listeners: {

            // This listener will trigger when the grid is rendered
            render: function (grid) {
                renderEmployeeGrid(grid, false);
                return;
            },

            // This listener will trigger when the store data changes
            viewready: function (grid) {
                console.log('Store data changed');
            },

            rowcontextmenu: function (grid, rowIndex, event) {
                var record = grid.getStore().getAt(rowIndex);
                //   grid.deselectAll();
                //    grid.setSelection(record);
                var xy = event.getXY();
                xy[1] += 10;
                new Ext.menu.Menu({
                    items: [{
                        iconCls: 'hidden16',
                        text: trns('הסתרת עובד'),
                        handler: function () {
                            var c = Application.myWaitList.find(o => o.eid == record.data.eid);

                            var commonData = getWaitListObjectFromSelectedObject(c, c.Info, c.Icon, c.canbooknearbyseats, c.emptype, c.data, c.Position, trns("מוסתר"), c.eid);
                            commonData.dertyFlag = true;
                            Application.myHiddenList.push(commonData);

                            Application.myWaitList.remove(c);
                            Application.storeObjects.loadData(Application.myWaitList);
                            Application.hiddenObjects.loadData(Application.myHiddenList);
                            if (Application.MyGridTabs.items.length < 3)
                                Application.MyGridTabs.add(Application.HiddenList);
                            else
                                Application.MyGridTabs.unhideTabStripItem(2);

                            //    Application.storeObjects.reload();
                            //    Application.hiddenObjects.reload();
                        }
                    }]
                }).showAt(xy)
            }
        },
        autoExpandColumn: 'name'
    });

    var SecoundGrid = new Ext.grid.GridPanel({
        //ddGroup: 'LibraryTreeDD',
        id: "HiddenLounge",
        store: Application.hiddenObjects,
        columns: cols,
        //enableDragDrop: true,
        border: false,
        autoScroll: false,
        listeners: {
            render: function (grid) {
                renderEmployeeGrid(grid, true);
                return;
            },
            rowcontextmenu: function (grid, rowIndex, event) {
                var record = grid.getStore().getAt(rowIndex);
                //   grid.deselectAll();
                //    grid.setSelection(record);
                var xy = event.getXY();
                xy[1] += 10;
                new Ext.menu.Menu({
                    items: [{
                        iconCls: 'unhide',
                        text: trns('ביטול הסתרה'),
                        handler: function () {
                            var c = Application.myHiddenList.find(o => o.eid == record.data.eid);

                            var commonData = getWaitListObjectFromSelectedObject(c, c.Info, c.Icon, c.canbooknearbyseats, c.emptype, c.data, c.Position, trns("טרקלין"), c.eid);
                            commonData.dertyFlag = true;

                            Application.myWaitList.push(commonData);

                            Application.myHiddenList.remove(c);
                            Application.storeObjects.loadData(Application.myWaitList);
                            Application.hiddenObjects.loadData(Application.myHiddenList);
                            if (Application.myHiddenList.length == 0) {
                                Application.MyGridTabs.hideTabStripItem(2);
                                Application.MyGridTabs.setActiveTab(1);
                            }

                            //   Application.storeObjects.reload();
                            //   Application.hiddenObjects.reload();
                            //   Application.myWaitList[rowIndex].isHidden = true;
                            //   Application.storeObjects.loadData(Application.myWaitList);
                        }
                    }]
                }).showAt(xy)
            }
        },
        autoExpandColumn: 'name'
    });

    Application.HiddenList = new Ext.Panel({
        autoScroll: false,
        layout: 'fit',
        trackMouse: false,
        iconCls: 'hidden',
        title: '',//עובדים שכרגע אינם נמצאים בעמדה..(עובדים חדשים שלא שובצו,..חופשת לידה,חופש ארוך וכו.)
        items: [SecoundGrid],
        bbar: [
            {
                text: trns('הצג כרטיס עובד'),
                handler: function () {
                    var sel;
                    var data = SecoundGrid.selModel.selections.items[0].data;
                    for (var i = 0; i < Application.myHiddenList.length; i++) {
                        if (Application.myHiddenList[i].eid == data.eid) {
                            sel = Application.myHiddenList[i];
                        }
                    }

                    var c = initializeObjectFromInfo(sel.Info);

                    c.SaveRealTime = true;
                    c.uid = sel.eid;
                    c.ico = sel.Icon
                    c.x = sel.Position.split(",")[0];
                    c.y = sel.Position.split(",")[1];
                    c.areaId = trns("מוסתר");

                    c.emptype = sel.emptype;
                    c.canbooknearbyseats = sel.canbooknearbyseats;
                    Application.openWorkerPropes(c);
                }
            }
        ]
    });

    Application.WaitingList = new Ext.Panel({
        autoScroll: false,
        layout: 'fit',
        trackMouse: false,
        title: trns("טרקלין"),//עובדים שכרגע אינם נמצאים בעמדה..(עובדים חדשים שלא שובצו,..חופשת לידה,חופש ארוך וכו.)
        tabTip: "<b>" + trns('טרקלין') + "</b>" + "<br><br>" + "Lounge, Employees that are<br/>currently not occupying<br/>or have not been allocated<br/>a specific seat / working station<br/>(Example: 'Employees On Leave',<br/>'New Employees', Etc..)",
        items: [firstGrid],
        bbar: [
            {
                text: trns('הצג כרטיס עובד'),
                handler: function () {
                    var sel;

                    if (!firstGrid.selModel || !firstGrid.selModel.selections || !firstGrid.selModel.selections.items || firstGrid.selModel.selections.items.length == 0) {
                        return;
                    }

                    var data = firstGrid.selModel.selections.items[0].data;
                    for (var i = 0; i < Application.myWaitList.length; i++) {
                        if (Application.myWaitList[i].eid == data.eid) {
                            sel = Application.myWaitList[i];
                        }
                    }

                    var c = initializeObjectFromInfo(sel.Info);
                    c.SaveRealTime = true;
                    c.uid = sel.eid;
                    c.ico = sel.Icon
                    c.x = sel.Position.split(",")[0];
                    c.y = sel.Position.split(",")[1];
                    c.areaId = sel.AreaNum;



                    c.emptype = sel.emptype;
                    c.canbooknearbyseats = sel.canbooknearbyseats;
                    Application.openWorkerPropes(c);
                }
            },
            {
                text: trns('הושב עובד'),
                handler: function () {
                    var data = firstGrid.selModel.selections.items[0].data;
                    for (var i = 0; i < Application.myWaitList.length; i++) {
                        if (Application.myWaitList[i].eid == data.eid) {
                            sel = Application.myWaitList[i];
                        }
                    }
                    var PolyStore = [' '];

                    var RcolModel = new Ext.grid.ColumnModel([
                        { id: 'report', header: trns("דוחות"), sortable: true, width: 450, locked: true, dataIndex: 'report' }
                    ]);
                    var Rform = new Ext.form.FormPanel({
                        baseCls: 'x-plain',
                        labelWidth: 100,
                        defaultType: 'textfield',
                        //   bodyStyle: 'padding:5px; background-color: #5f6063',
                        items: [{
                            xtype: 'combo',
                            store: PolyStore,
                            name: 'cmbPoly',
                            fieldLabel: Application.ViewArea
                        }]
                    });

                    var ReportArr = [];
                    var GraphArr = new Array();



                    var Rwind = new Ext.Window({
                        title: trns('בחר שטח להעברה'),
                        width: 300,
                        height: 200,
                        minWidth: 200,
                        minHeight: 200,
                        layout: 'fit',
                        plain: true,
                        //      bodyStyle: 'padding:5px; background-color: #5f6063;',
                        buttonAlign: 'center',
                        items: Rform,
                        buttons: [{
                            text: trns('אישור'),
                            handler: function () {
                                var c = null;
                                var combobox = Rform.items.items[0];
                                var v = combobox.getValue();
                                var index = areasName.indexOf(v[0]);
                                var centerPt = areasCPTS[index];
                                var UId = areasUid[index];
                                var cpt = centerPt.split(",");
                                Application.SaveFlag = true;
                                var dest = null;
                                if (Destinations[index] == "Object") {
                                    dest = Application.DocumentManager.items.items[0].viewport.findObjectById(UId);
                                    if (dest.ico == "tableEmpty.png") {
                                        Application.DocumentManager.items.items[0].viewport.DrawObject(dest, cpt, "Male.png", sel.Info, sel.eid, true, false, sel.emptype, false, sel.canbooknearbyseats);
                                    }
                                }
                                else {
                                    var raphShp = Application.DocumentManager.items.items[0].viewport.findTargetBy(UId, trns("מספר פוליגון"));
                                    c = Application.DocumentManager.items.items[0].viewport.DrawObject(raphShp, cpt, "Male.png", sel.Info, sel.eid, true, false, sel.emptype, false, sel.canbooknearbyseats);
                                }

                                var data = firstGrid.selModel.selections.items[0].data;
                                for (var i = 0; i < Application.myWaitList.length; i++) {
                                    if (Application.myWaitList[i].eid == data.eid) {
                                        sel = Application.myWaitList[i];
                                    }
                                }

                                if (c != null && c.parent) {
                                    var notifyRequest = getEmployeeNotifyRequest(c.companyId, c.parent.floorInd, c.areaId, c.parent.UnitName[0], 'none', 'none', 'lounge');
                                    c.employeeNotifyRequest = notifyRequest;
                                }

                                Application.myWaitList.remove(sel);
                                Rwind.close();
                                firstGrid.store.remove(firstGrid.selModel.selections.items[0]);
                            }
                        }, {
                            text: trns('ביטול'),
                            handler: function () {
                                Rwind.close();
                            }
                        }]
                    });
                    FindAreasWithMoreSpace(Application.SelectedDrawing[1], Rform.items.items[0].store, Application.ind);
                    Rwind.show();
                }
            }
        ]
    });

    Application.dirWind = new Ext.Window({
        title: trns('בחר כיוון ומרחק'),
        shim: true,
        width: 400,
        height: 200,
        closeAction: 'hide',
        plain: true,
        items: new Ext.FormPanel({
            //  bodyStyle: 'background-color: #5f6063;',
            frame: true,
            border: false,
            items: [

                {
                    xtype: 'numberfield',
                    fieldLabel: trns('זווית'),
                    name: 'angle',
                    value: 0,
                    minValue: 0,
                    labelWidth: 80,
                    maxValue: 360
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: trns('מרחק'),
                    name: 'distance',
                    labelWidth: 80,
                    value: 0,
                    minValue: 0
                    //                maxValue: 360
                },
                {
                    xtype: 'radio',
                    id: 'rb1',
                    name: 'rbGroup',
                    fieldLabel: trns('תזוזה'),
                    checked: true
                }, {
                    xtype: 'radio',
                    id: 'rb2',
                    fieldLabel: trns('שרטוט'),
                    name: 'rbGroup',
                    checked: false
                }
            ]
        }),
        buttons: [{
            scope: this,
            text: trns('אישור'),
            handler: function () {
                var x = Math.cos(Application.dirWind.items.items[0].getForm().findField('angle').getValue() * 0.0174532925 - Math.PI / 2) * Application.dirWind.items.items[0].getForm().findField('distance').getValue();
                var y = Math.sin(Application.dirWind.items.items[0].getForm().findField('angle').getValue() * 0.0174532925 - Math.PI / 2) * Application.dirWind.items.items[0].getForm().findField('distance').getValue();
                Application.direct.translate(x, y);
                Application.direct.cx += x;
                Application.direct.cy += y;
                if (Application.dirWind.items.items[0].getForm().findField('rb2').getValue() == true) {
                    try {
                        var newPath = Application.direct.view.sliceObj.attrs.path;
                        var coords = new Array();
                        var a = [];
                        a.push("L");
                        a.push(Application.direct.cx);
                        a.push(Application.direct.cy);
                        Application.direct.view.sliceObj.attrs.path.push(a);
                        Application.direct.view.sliceObj.attr({ path: Application.direct.view.sliceObj.attrs.path });
                    }
                    catch (gg) { }
                }
                else {
                    if (Application.direct.view.sliceObj.attrs.path.length == 1) {
                        Application.direct.view.sliceObj.attrs.path[0][1] = Application.direct.cx;
                        Application.direct.view.sliceObj.attrs.path[0][2] = Application.direct.cy;
                        Application.direct.view.sliceObj.attr({ path: Application.direct.view.sliceObj.attrs.path });
                    }
                }
                Application.dirWind.hide();
            }
        }
            ,
        {
            scope: this,
            text: trns("השלם חישוב בכיוון בנבחר"),
            handler: function () {
                var dx = Application.direct.cx + Math.cos(Application.dirWind.items.items[0].getForm().findField('angle').getValue() * 0.0174532925 - Math.PI / 2) * 10;
                var dy = Application.direct.cy + Math.sin(Application.dirWind.items.items[0].getForm().findField('angle').getValue() * 0.0174532925 - Math.PI / 2) * 10;
                //        Application.direct.translate(x, y);
                //        var path1 = "M" + Application.direct.cx + "," + Application.direct.cy + "L" + Application.direct.cx + "," + Application.direct.cy + "L" + x + "," + y;
                //        var arr = Raphael.pathIntersection(Application.direct.view.paper.selObj.path.attrs.path.toString() , path1);


                for (var i = 0; i < Application.direct.view.paper.selObj.points.length; i++) {
                    var path = Application.direct.view.paper.selObj.points[i];
                    var j = i + 1;
                    if (i == Application.direct.view.paper.selObj.points.length - 1)
                        j = 0;
                    var path2 = Application.direct.view.paper.selObj.points[j];
                    var cx = Application.direct.cx;
                    var cy = Application.direct.cy;
                    var x = dx;
                    var y = dy;
                    var v = Application.checkLineIntersection(path[0], path[1], path2[0], path2[1], cx, cy, x, y);
                    if (v.onLine1 == true && v.onLine2 == false || v.onLine1 == false && v.onLine2 == true) {
                        cx = Application.direct.cx;
                        cy = Application.direct.cy;
                        var dist = Math.sqrt((cx -= v.x) * cx + (cy -= v.y) * cy);
                        if (dist < 0.01)
                            continue;
                        x = dx;
                        y = dy;
                        var d2 = Math.sqrt((x -= v.x) * x + (y -= v.y) * y);
                        if (dist > d2) {
                            Application.dirWind.items.items[0].getForm().findField('distance').setValue(dist);
                            return;
                        }
                    }
                    //            if (Application.direct.cx != arr[i].x && Application.direct.cy != arr[i].y) {
                    //                Application.dirWind.items.items[0].getForm().findField('distance').setValue(Math.sqrt((Application.direct.cx -= arr[i].x) * Application.direct.cx + (Application.direct.cy -= arr[i].y) * Application.direct.cy))
                    //            }
                }
                //  Application.dirWind.hide();
            }
        },
        {
            scope: this,
            text: trns("בצע פיצול וסגור"),
            handler: function () {

                var x = Math.cos(Application.dirWind.items.items[0].getForm().findField('angle').getValue() * 0.0174532925 - Math.PI / 2) * Application.dirWind.items.items[0].getForm().findField('distance').getValue();
                var y = Math.sin(Application.dirWind.items.items[0].getForm().findField('angle').getValue() * 0.0174532925 - Math.PI / 2) * Application.dirWind.items.items[0].getForm().findField('distance').getValue();
                Application.direct.translate(x, y);
                Application.direct.cx += x;
                Application.direct.cy += y;
                //        if (Application.dirWind.items.items[0].getForm().findField('rb2').getValue() == true) {
                try {
                    var newPath = Application.direct.view.sliceObj.attrs.path;
                    var coords = new Array();
                    var a = [];
                    a.push("L");
                    a.push(Application.direct.cx);
                    a.push(Application.direct.cy);
                    Application.direct.view.sliceObj.attrs.path.push(a);
                    Application.direct.view.sliceObj.attr({ path: Application.direct.view.sliceObj.attrs.path });
                }
                catch (gg) { }
                //        }
                //        else {
                //            if (Application.direct.view.sliceObj.attrs.path.length == 1) {
                //                Application.direct.view.sliceObj.attrs.path[0][1] = Application.direct.cx;
                //                Application.direct.view.sliceObj.attrs.path[0][2] = Application.direct.cy;
                //                Application.direct.view.sliceObj.attr({ path: Application.direct.view.sliceObj.attrs.path });
                //            }
                //        }
                Application.dirWind.hide();

                var view = Application.direct.view;
                var newPath = view.sliceObj.attrs.path;
                view.splitAreas(newPath, view)
                view.startSlice = false;
                view.Slice = false;
                view.sliceObj.remove();
                view.sliceObj = null;
                view.startPos = null;
                view.Select = true;
                Application.direct.remove();
                Application.direct = null;
                view.paper.canvas.style.cursor = "";
            }
        }, {
            scope: this,
            text: trns("בטל פיצול"),
            handler: function () {
                var view = Application.direct.view;
                Application.dirWind.hide();
                if (view.sliceObj) {
                    view.sliceObj.remove();
                    view.sliceObj = null;
                }
                Application.direct.remove();
                view.startSlice = false;
                view.Slice = false;
                view.sliceObj = null;
                view.startPos = null;
                view.Select = true;
                Application.direct = null;
                view.paper.canvas.style.cursor = "";
            }
        }
        ]
    });
    Application.checkLineIntersection = function (line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
        // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
        var denominator, a, b, numerator1, numerator2, result = {
            x: null,
            y: null,
            onLine1: false,
            onLine2: false
        };
        denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
        if (denominator == 0) {
            return result;
        }
        a = line1StartY - line2StartY;
        b = line1StartX - line2StartX;
        numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
        numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
        a = numerator1 / denominator;
        b = numerator2 / denominator;

        // if we cast these lines infinitely in both directions, they intersect here:
        result.x = line1StartX + (a * (line1EndX - line1StartX));
        result.y = line1StartY + (a * (line1EndY - line1StartY));
        /*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
        // if line1 is a segment and line2 is infinite, they intersect if:
        if (a > 0 && a < 1) {
            result.onLine1 = true;
        }
        // if line2 is a segment and line1 is infinite, they intersect if:
        if (b > 0 && b < 1) {
            result.onLine2 = true;
        }
        // if line1 and line2 are segments, they intersect if both of the above are true
        return result;
    };
    Application.showdirwind = function (angle) {
        Application.dirWind.items.items[0].getForm().findField('angle').setValue(angle);
        Application.dirWind.show();
    };
    Application.directive = function (R, x, y, view) {
        var st = R.set();
        st.push(
            R.circle(x, y, 5)); //.click(function() { Application.dirWind.show(); alert("center"); }),
        var b = R.ball(x + 67.5 - 100, y + 22.5 - 55, 12, 12, 0.2, 0);
        b.click(function () { Application.showdirwind(315); });
        b.touchstart(function () { Application.showdirwind(315); });
        st.push(b);
        b = R.ball(x + 132.5 - 100, y + 22.5 - 55, 12, 12, 0.2, 0);
        b.click(function () { Application.showdirwind(45); });
        b.touchstart(function () { Application.showdirwind(45); });
        st.push(b);
        b = R.ball(x + 67.5 - 100, y + 87 - 55, 12, 12, 0.2, 0); b.click(function () {
            Application.showdirwind(225);

        });
        b.touchstart(function () { Application.showdirwind(225); });
        st.push(b);
        b = R.ball(x + 132.5 - 100, y + 87 - 55, 12, 12, 0.2, 0); b.click(function () { Application.showdirwind(135); });
        b.touchstart(function () { Application.showdirwind(135); });
        st.push(b);

        b = R.ball(x + 100 - 100, y + 10 - 55, 12, 12, 0.7, 0); b.click(function () { Application.showdirwind(0); });
        b.touchstart(function () { Application.showdirwind(0); });
        st.push(b);
        b = R.ball(x + 100 - 100, y + 100 - 55, 12, 12, 0.7, 0); b.click(function () {

            Application.showdirwind(180);
        });
        b.touchstart(function () { Application.showdirwind(180); });
        st.push(b);
        b = R.ball(x + 55 - 100, y + 55 - 55, 12, 12, 0.7, 0); b.click(function () {
            Application.showdirwind(270);
        });
        b.touchstart(function () { Application.showdirwind(270); });
        st.push(b);
        b = R.ball(x + 145 - 100, y + 55 - 55, 12, 12, 0.7, 0); b.click(function () {
            Application.showdirwind(90);
        });
        b.touchstart(function () { Application.showdirwind(90); });
        st.push(b);

        st.view = view;
        st.cx = x;
        st.cy = y;

        return st;
    }
    Application.findUnconnectedAreas = function () {
        var objs = ",";
        for (var i = 0; i < Application.DocumentManager.ActiveDocument().objects.items.length; i++) {
            if (Application.DocumentManager.ActiveDocument().objects.items[i].UId != undefined && Application.DocumentManager.ActiveDocument().objects.items[i].UId.toString().indexOf("F") == -1) {
                var f = false;
                for (var j = 0; j < Application.Data.DrawingAssets.length; j++) {
                    var assetProps = Application.Data.DrawingAssets[j];
                    if (assetProps[11].indexOf("," + Application.DocumentManager.ActiveDocument().objects.items[i].UId[0] + ",") > -1) {
                        f = true;
                        break;
                    }
                }
                if (f == false) {
                    objs += Application.DocumentManager.ActiveDocument().objects.items[i].UId[0];
                    objs += ",";
                }
            }
        }
        return objs;
    }
    Application.AssetPropsWindow = new WcUi.AssetProps({ items: theForm, closable: false });

    Application.TaskWindow = new WcUi.Tasks({ items: tskfrm });
    Application.AuditWindow = new WcUi.Audit({ items: Auditfrm });
    Application.WorkerIdExist = function (gg, stv) {
        var count = 0;
        for (var i = 0; i < Application.Data.ObjectsInDrawing.length; i++) {
            if (Application.Data.ObjectsInDrawing[i][5].toString().split(";")[4] == gg.toString()) {
                count++;
            }
        }
        if (stv != gg)
            count++;
        if (count > 1) {
            return true;
        }
        return false;
    };

    // Application.WaitingList.show();
    Application.Workspace = new Ext.Panel({
        region: (location.href.indexOf("En.aspx") > -1) ? "west" : 'east', //west for english ok
        title: trns('בחירה וניווט'),
        split: true,
        width: 190,
        margins: '0 0 0 0',
        cmargins: '0 0 0 0',
        useSplitTips: true,
        collapsible: true,
        layout: {
            type: 'border',
            animate: true
        },
        items: [
            new Ext.Panel({
                layout: 'border',
                margins: '0 0 0 0',
                cmargins: '0 0 0 0',
                region: 'center',
                items: [Application.SelectionProps, Application.AreaTree, Application.PropertyPage]
            })]

    }
    );
    Application.updateAllAreas = function (dt) {

        Application.inSaving = true;
        try {           
            Application.DocumentManager.getActiveTab().database.objects.each(function (item, index, length) {
                if (item.UId != undefined) {                 
                    setTimeout(() => { item.update(dt); }, 0);
                }
            });
        }
        catch (hhhhh) { }
        Application.inSaving = false;
    }
    Application.openRackObjPropes = function (t) {
        if (t.storeAdditional == undefined) {
            t.storeAdditional = new Ext.data.XmlStore({
                url: 'Property3001.asmx/getAdditional?drawingId=' + Application.SelectedDrawing[1] + '&numArea=' + t.uid,
                root: 'additionals',
                autoDestroy: false,
                record: 'additional',
                fields: ['Name', 'Date', 'Info', 'CatNumber', 'Count', 'Id']
            });
            t.storeAdditional.load();
        }
        var panelAdditional = new Ext.Panel({
            id: 'add-view',
            frame: true,
            layout: 'fit',
            items: new Ext.grid.EditorGridPanel({
                columns: [{
                    hidden: true,
                    width: 0,
                    dataIndex: 'Id'
                }, {
                    header: trns('שם'),
                    width: 100,
                    dataIndex: 'Name'
                    ,
                    editor: new Ext.form.ComboBox({
                        store: new Ext.data.SimpleStore({
                            fields: ['txt']
                            , data: [[trns('ארון')], [trns('טלויזיה')], [trns('טלפון')], [trns('מדפסת')], [trns('מקרן')], [trns('שולחן')], [trns('שידה')], [trns('שקע תקשורת')], [trns('שקע חשמל')]]
                        })
                        , triggerAction: 'all'
                        , valueField: 'txt'
                        , displayField: 'txt'
                        , mode: 'local'
                        ,
                        onSelect: function (record, n) {
                            var newVal = record.data[this.valueField || this.displayField];
                            this.setValue(newVal);
                            this.collapse();
                        }
                    })
                    //editor: new Ext.form.TextField({
                    //    allowBlank: true
                    //})
                },
                //{
                //header: trns('תאריך הוספה'),
                //xtype: 'datecolumn',
                //width: 80,
                //dataIndex: 'date'
                //},
                {
                    header: trns('תאור'),
                    width: 200,
                    dataIndex: 'Info',
                    editor: new Ext.form.TextField({
                        allowBlank: true
                    })
                }, {
                    header: trns('כמות'),
                    width: 60,
                    type: 'boolean',
                    dataIndex: 'Count',
                    editor: new Ext.form.TextField({
                        allowBlank: true
                    })
                }, {
                    header: trns('מקט'),
                    width: 80,
                    dataIndex: 'CatNumber',
                    editor: new Ext.form.TextField({
                        allowBlank: true
                    })
                }],
                clicksToEdit: 1,
                dropOK: false,
                tbar: [{
                    text: 'Add Item',
                    icon: 'resources/images/icons16/document_into.png',
                    handler: function () {
                        // access the Record constructor through the grid's store
                        var grid = panelAdditional.items.items[0];
                        var Additional = grid.getStore().recordType;
                        var p = new Additional({
                            Id: -1,
                            Name: 'New Item',
                            Info: 'Information',
                            Count: 1,
                            CatNumber: '0000000'
                        });
                        grid.stopEditing();
                        t.storeAdditional.insert(0, p);
                        grid.startEditing(0, 0);
                    }
                }, {
                    text: 'Delete Item',
                    icon: 'resources/images/icons16/document_out.png',
                    //                text: 'Zoom Rectangle',
                    scope: this,
                    handler: function () {
                        var selModel = panelAdditional.items.items[0].getSelectionModel();
                        if (!selModel.hasSelection()) {
                            Ext.Msg.alert(trns('לא ניתן למחוק'), trns('לא נבחרה שורה'));
                            return true;
                        }
                        var rec = selModel.selection.record;
                        var r = rec.data.Id; //chovav
                        t.storeAdditional.remove(rec);
                        if (parseInt(r) > -1) {
                            Ext.Ajax.request({
                                url: 'Property3001.asmx/deleteAdditional',
                                method: 'POST',
                                jsonData: { id: parseInt(r) },
                                success: function (response, opts) {
                                    //    selModel.removeitem(rec);
                                },
                                failure: function (response, opts) {
                                    alert(response.responseText);
                                }
                            });
                        }
                    }
                }],
                store: t.storeAdditional,
                //  tpl: tpl,
                height: 500,
                multiSelect: false,
                //viewConfig: {
                //    emptyText: trns('אין')
                //},
                prepareData: function (data) {
                    //data.shortName = Ext.util.Format.ellipsis(data.name, 15);
                    //                data.sizeString = Ext.util.Format.fileSize(data.size);
                    //                data.dateString = data.lastmod.format("m/d/Y g:i a");
                    return data;
                }
            })
        });
        var witems;
        if (Application.readOnly != true) {
            witems = [{
                region: 'center',
                xtype: 'tabpanel',
                activeItem: 0,
                items: [
                    {
                        title: trns('נתונים'),
                        items: [/*Application.ObjRackForm*/]
                    },
                    {
                        title: trns('ציוד נוסף'),
                        items: [panelAdditional]
                    }]
            }];
        }
        else {
            witems = [{
                region: 'center',
                xtype: 'tabpanel',
                activeItem: 0,
                items: [
                    {
                        title: trns('נתונים'),
                        items: [/*Application.ObjRackForm*/]
                    }]
            }];
        }

        Application.ObjRackWindow = new WcUi.RackProps({
            items: witems
        });
        Application.ObjRackWindow.Obj = t;
        var room = "";
        if (t.parent != undefined) {
            room = t.parent.UnitName;
            t.UnitName = t.parent.UnitName;
        }
        Application.drawingUnitNames = new Array();
        Application.areasCPTS = [];
        Application.areasIds = [];
        var k = new Array();
        Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
            if (item.UId !== undefined) {
                if (item.objects !== undefined) {
                    for (var i = 0; i < item.objects.length; i++) {
                        if (item.objects[i].ObjectType === "WorkingStation" && item.objects[i].UnitName !== "") {
                            Application.drawingUnitNames[Application.drawingUnitNames.length] = [item.objects[i].UnitName];
                            Application.areasCPTS.push(item.NumPos[0][0] + "," + item.NumPos[1][0]);
                            Application.areasIds.push(item.UId[0]);
                        }
                    }
                }
                if (item.UnitName[0] !== "") {
                    Application.drawingUnitNames[Application.drawingUnitNames.length] = [item.UnitName[0]];
                    Application.areasCPTS.push(item.NumPos[0][0] + "," + item.NumPos[1][0]);
                    Application.areasIds.push(item.UId[0]);
                }
            }
        });
        Application.drawingUnitNames[Application.drawingUnitNames.length] = [trns("טרקלין")];
        if (t.parent != undefined && t.ObjectType != "WorkingStation") {
            room = t.parent.UnitName;
            t.UnitName = room;
        }
        updateRackContant(t, room);
        Application.ObjRackWindow.show();
    };
    Application.openBenchObjPropes = function (t) {
        if (t.storeAdditional == undefined) {
            t.storeAdditional = new Ext.data.XmlStore({
                url: 'Property3001.asmx/getAdditional?drawingId=' + Application.SelectedDrawing[1] + '&numArea=' + t.uid,
                root: 'additionals',
                autoDestroy: false,
                record: 'additional',
                fields: ['Name', 'Date', 'Info', 'CatNumber', 'Count', 'Id']
            });
            t.storeAdditional.load();
        }
        var panelAdditional = new Ext.Panel({
            id: 'add-view',
            frame: true,
            layout: 'fit',
            items: new Ext.grid.EditorGridPanel({
                columns: [{
                    hidden: true,
                    width: 0,
                    dataIndex: 'Id'
                }, {
                    header: trns('שם'),
                    width: 100,
                    dataIndex: 'Name'
                    ,
                    editor: new Ext.form.ComboBox({
                        store: new Ext.data.SimpleStore({
                            fields: ['txt']
                            , data: [[trns('ארון')], [trns('טלויזיה')], [trns('טלפון')], [trns('מדפסת')], [trns('מקרן')], [trns('שולחן')], [trns('שידה')], [trns('שקע תקשורת')], [trns('שקע חשמל')]]
                        })
                        , triggerAction: 'all'
                        , valueField: 'txt'
                        , displayField: 'txt'
                        , mode: 'local'
                        ,
                        onSelect: function (record, n) {
                            var newVal = record.data[this.valueField || this.displayField];
                            this.setValue(newVal);
                            this.collapse();
                        }
                    })
                    //editor: new Ext.form.TextField({
                    //    allowBlank: true
                    //})
                },
                //{
                //header: trns('תאריך הוספה'),
                //xtype: 'datecolumn',
                //width: 80,
                //dataIndex: 'date'
                //},
                {
                    header: trns('תאור'),
                    width: 200,
                    dataIndex: 'Info',
                    editor: new Ext.form.TextField({
                        allowBlank: true
                    })
                }, {
                    header: trns('כמות'),
                    width: 60,
                    type: 'boolean',
                    dataIndex: 'Count',
                    editor: new Ext.form.TextField({
                        allowBlank: true
                    })
                }, {
                    header: trns('מקט'),
                    width: 80,
                    dataIndex: 'CatNumber',
                    editor: new Ext.form.TextField({
                        allowBlank: true
                    })
                }],
                clicksToEdit: 1,
                dropOK: false,
                tbar: [{
                    text: 'Add Item',
                    icon: 'resources/images/icons16/document_into.png',
                    handler: function () {
                        // access the Record constructor through the grid's store
                        var grid = panelAdditional.items.items[0];
                        var Additional = grid.getStore().recordType;
                        var p = new Additional({
                            Id: -1,
                            Name: 'New Item',
                            Info: 'Information',
                            Count: 1,
                            CatNumber: '0000000'
                        });
                        grid.stopEditing();
                        t.storeAdditional.insert(0, p);
                        grid.startEditing(0, 0);
                    }
                }, {
                    text: 'Delete Item',
                    icon: 'resources/images/icons16/document_out.png',
                    //                text: 'Zoom Rectangle',
                    scope: this,
                    handler: function () {
                        var selModel = panelAdditional.items.items[0].getSelectionModel();
                        if (!selModel.hasSelection()) {
                            Ext.Msg.alert(trns('לא ניתן למחוק'), trns('לא נבחרה שורה'));
                            return true;
                        }
                        var rec = selModel.selection.record;
                        var r = rec.data.Id; //chovav
                        t.storeAdditional.remove(rec);
                        if (parseInt(r) > -1) {
                            Ext.Ajax.request({
                                url: 'Property3001.asmx/deleteAdditional',
                                method: 'POST',
                                jsonData: { id: parseInt(r) },
                                success: function (response, opts) {
                                    //    selModel.removeitem(rec);
                                },
                                failure: function (response, opts) {
                                    alert(response.responseText);
                                }
                            });
                        }
                    }
                }],
                store: t.storeAdditional,
                //  tpl: tpl,
                height: 500,
                multiSelect: false,
                //viewConfig: {
                //    emptyText: trns('אין')
                //},
                prepareData: function (data) {
                    //data.shortName = Ext.util.Format.ellipsis(data.name, 15);
                    //                data.sizeString = Ext.util.Format.fileSize(data.size);
                    //                data.dateString = data.lastmod.format("m/d/Y g:i a");
                    return data;
                }
            })
        });
        var witems;
        if (Application.readOnly != true) {
            witems = [{
                region: 'center',
                xtype: 'tabpanel',
                activeItem: 0,
                items: [
                    {
                        title: trns('נתונים'),
                        items: [/*Application.ObjBenchForm*/]
                    },
                    {
                        title: trns('ציוד נוסף'),
                        items: [panelAdditional]
                    }]
            }];
        }
        else {
            witems = [{
                region: 'center',
                xtype: 'tabpanel',
                activeItem: 0,
                items: [
                    {
                        title: trns('נתונים'),
                        items: [/*Application.ObjBenchForm*/]
                    }]
            }];
        }

        Application.ObjBenchWindow = new WcUi.BenchProps({
            items: witems
        });
        Application.ObjBenchWindow.Obj = t;
        var room = "";
        if (t.parent != undefined) {
            room = t.parent.UnitName;
            t.UnitName = t.parent.UnitName;
        }
        Application.drawingUnitNames = new Array();
        Application.areasCPTS = [];
        Application.areasIds = [];
        var k = new Array();
        Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
            if (item.UId !== undefined) {
                if (item.objects !== undefined) {
                    for (var i = 0; i < item.objects.length; i++) {
                        if (item.objects[i].ObjectType === "WorkingStation" && item.objects[i].UnitName !== "") {
                            Application.drawingUnitNames[Application.drawingUnitNames.length] = [item.objects[i].UnitName];
                            Application.areasCPTS.push(item.NumPos[0][0] + "," + item.NumPos[1][0]);
                            Application.areasIds.push(item.UId[0]);
                        }
                    }
                }
                if (item.UnitName[0] !== "") {
                    Application.drawingUnitNames[Application.drawingUnitNames.length] = [item.UnitName[0]];
                    Application.areasCPTS.push(item.NumPos[0][0] + "," + item.NumPos[1][0]);
                    Application.areasIds.push(item.UId[0]);
                }
            }
        });
        Application.drawingUnitNames[Application.drawingUnitNames.length] = [trns("טרקלין")];
        if (t.parent != undefined && t.ObjectType != "WorkingStation") {
            room = t.parent.UnitName;
            t.UnitName = room;
        }
        updateBenchContant(t, room);
        Application.ObjBenchWindow.show();
    };
    Application.openGenObjPropes = function (t) {
        var storeWorkerTasks = new Ext.data.XmlStore({
            url: 'Property3001.asmx/getTasks?drawingId=' + Application.SelectedDrawing[1] + '&numArea=Object' + t.uid,
            root: 'tasks',
            autoDestroy: true,
            record: 'task',
            fields: ['name', 'date', 'returnTask', 'active', 'mail', 'id']
        });
        storeWorkerTasks.load();
        var panelWorkerTasks = new Ext.Panel({
            id: 'tasks-view',
            frame: true,
            layout: 'fit',
            tbar: [{
                //                text: 'Zoom Extents',
                text: trns('צור משימה'),
                icon: 'resources/images/icons16/icon-show-active.gif',
                scope: this,
                handler: function () {
                    var k = "Object" + Application.ObjGenWindow.Obj.uid;
                    var ar = [k, Application.SelectedDrawing[1], Application.ObjGenWindow.Obj.firstName + " " + Application.ObjGenWindow.Obj.lastName, storeWorkerTasks];
                    Application.TaskWindow.updateContantWorker(ar, Application.ObjGenWindow.Obj);
                    Application.TaskWindow.show();

                }
            },
            {
                text: trns('מחק משימה'),
                icon: 'resources/images/icons16/cross.gif',
                //                text: 'Zoom Rectangle',
                scope: this,
                handler: function () {
                    var selModel = panelWorkerTasks.items.items[0].getSelectionModel();
                    if (!selModel.hasSelection()) {
                        Ext.Msg.alert(trns('לא ניתן למחוק משימה'), trns('לא נבחרה משימה, בחר משימה למחיקה'));
                        return true;
                    }
                    var rec = selModel.getSelected();
                    var r = rec.data.id; //chovav
                    Ext.Ajax.request({
                        url: 'Property3001.asmx/deleteTask',
                        method: 'POST',
                        jsonData: { id: parseInt(r) },
                        success: function (response, opts) {
                            storeWorkerTasks.load();
                        },
                        failure: function (response, opts) {
                            alert(response.responseText);
                        }
                    });

                }
            },
            {
                //                text: 'Pan',
                text: trns('הצג/עדכן משימה'),
                icon: 'resources/images/icons16/icon-by-date.gif',
                scope: this,
                handler: function () {
                    var selModel = panelWorkerTasks.items.items[0].getSelectionModel();
                    if (!selModel.hasSelection()) {
                        Ext.Msg.alert(trns('לא ניתן לעדכן משימה'), trns('לא נבחרה משימה, בחר משימה לעדכון'));
                        return true;
                    }
                    var rec = selModel.getSelected();
                    var ar = ["Object" + Application.ObjGenWindow.Obj.uid, rec.data.userName, rec.data.active, rec.data.mail, rec.data.date.split(" ")[0], rec.data.date.split(" ")[1], rec.data.returnTask, rec.data.name, Application.ObjGenWindow.Obj.firstName + " " + Application.ObjGenWindow.Obj.lastName, rec.data.id, Application.SelectedDrawing[1], storeWorkerTasks];
                    Application.TaskWindow.updateContantWorker(ar, Application.ObjGenWindow.Obj);
                    Application.TaskWindow.show();
                }
            }],
            items: new Ext.grid.GridPanel({
                columns: [{
                    header: trns('תאור'),
                    width: 150,
                    renderer: function (value) {
                        var val = value.replace(/<.*?>/g, ' ');
                        return Ext.util.Format.ellipsis(val, 30);
                    },
                    dataIndex: 'name'
                }, {
                    header: trns('תאריך'),
                    xtype: 'datecolumn',
                    //                        renderer: function(v) {
                    //                            var d = new Date(v);
                    //                            return d.dateFormat("d/m/Y");
                    //                        },
                    width: 80,
                    dataIndex: 'date'
                }, {
                    header: trns('חזרה'),
                    width: 50,
                    dataIndex: 'returnTask'
                }, {
                    header: trns('פעיל'),
                    width: 30,
                    type: 'boolean',
                    dataIndex: 'active'
                }, {
                    header: trns('אימייל'),
                    width: 80,
                    dataIndex: 'mail'
                }],

                store: storeWorkerTasks,
                //  tpl: tpl,
                height: 300,
                multiSelect: false,
                viewConfig: {
                    emptyText: trns('אין תזכורות/משימות')
                },
                prepareData: function (data) {
                    data.shortName = Ext.util.Format.ellipsis(data.name, 15);
                    //                data.sizeString = Ext.util.Format.fileSize(data.size);
                    //                data.dateString = data.lastmod.format("m/d/Y g:i a");
                    return data;
                }
            })
        });
        var witems;
        if (Application.readOnly != true) {
            witems = [{
                region: 'center',
                xtype: 'tabpanel',
                activeItem: 0,
                items: [
                    {
                        title: trns('נתונים'),
                        items: [ObjGenForm]
                    },
                    {
                        title: trns('תזכורות ומשימות'),
                        items: [panelWorkerTasks]
                    }]
            }];
        }
        else {
            witems = [{
                region: 'center',
                xtype: 'tabpanel',
                activeItem: 0,
                items: [
                    {
                        title: trns('נתונים'),
                        items: [ObjGenForm]
                    }]
            }];
        }
        ObjGenForm.Obj = t;
        Application.ObjGenWindow = new WcUi.GenObjProps({
            items: witems
        });
        var room = "";
        if (t.parent != undefined) {
            room = t.parent.UnitName;
            t.UnitName = t.parent.UnitName;
        }
        Application.ObjGenWindow.updateContant(t, room);
        Application.ObjGenWindow.show();
    }

    Application.openWorkerPropes = function (t) {
        if (t.ObjectType == "GenObj")
            return Application.openGenObjPropes(t);
        if (t.ObjectType == "BenchObj")
            return Application.openBenchObjPropes(t);
        if (t.ObjectType == "RackObj")
            return Application.openRackObjPropes(t);
        if (Application.readOnly != true) {
            Application.witems = {
                region: 'center',
                xtype: 'tabpanel',
                activeItem: 0, items: [
                    {
                        title: trns('נתונים'),
                        items: [/*contactForm*/]
                    },
                    {
                        title: trns('תזכורות ומשימות'),
                        items: [/*panelWorkerTasks*/]
                    },
                    {
                        title: trns('ציוד נוסף'),
                        items: [/*panelWorkerAdditional*/]
                    }]
            };
        }
        else {
            Application.witems = {
                region: 'center',
                xtype: 'tabpanel',
                activeItem: 0, items: [
                    {
                        title: trns('נתונים'),
                        items: [/*contactForm*/]
                    }]
            };
        }
        //        if (Application.SelectedDrawing[0].indexOf("mellanox") > -1 || Application.SelectedDrawing[0].indexOf("כלל") < -1)
        //Application.WorkerWindow = new WcUi.MellWorkerProps();
        //        else {
        //Application.WorkerWindow = new WcUi.MellWorkerProps({ items: Application.witems, id: t.companyId });
        if (Application.WorkerWindow) {
            if (Application.WorkerWindow.destroying == false) {
                Application.WorkerWindow = new WcUi.MellWorkerProps({ items: Application.witems, id: t.companyId });
            }
            else {
                //Ext.MessageBox.alert(trns("שימו לב: כרטיס עובד אחר פתוח. אנא סגור אותו כדי לפתוח כרטיס חדש."));
                Ext.MessageBox.show({
                    width: (location.href.indexOf("En.aspx") > -1) ? 470 : 430,
                    msg: trns("שימו לב: כרטיס עובד אחר פתוח. אנא סגור אותו כדי לפתוח כרטיס חדש."),
                    closable: true,
                    buttons: Ext.Msg.OK,
                    ok: 4,
                    OK: 4


                });
                return;
            }

        }
        else {
            Application.WorkerWindow = new WcUi.MellWorkerProps({ items: Application.witems, id: t.companyId });
        }
        //        }
        var room = "";
        Application.drawingUnitNames = new Array();
        Application.areasCPTS = [];
        Application.areasIds = [];
        var k = new Array();
        Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
            if (item.UId !== undefined) {
                if (item.objects !== undefined) {
                    for (var i = 0; i < item.objects.length; i++) {
                        if (item.objects[i].ObjectType === "WorkingStation" && item.objects[i].UnitName !== "") {
                            Application.drawingUnitNames[Application.drawingUnitNames.length] = [item.objects[i].UnitName];
                            Application.areasCPTS.push(item.NumPos[0][0] + "," + item.NumPos[1][0]);
                            Application.areasIds.push(item.UId[0]);
                        }
                    }
                }
                if (item.UnitName[0] !== "") {
                    Application.drawingUnitNames[Application.drawingUnitNames.length] = [item.UnitName[0]];
                    Application.areasCPTS.push(item.NumPos[0][0] + "," + item.NumPos[1][0]);
                    Application.areasIds.push(item.UId[0]);
                }
            }
        });
        Application.drawingUnitNames[Application.drawingUnitNames.length] = [trns("טרקלין")];
        if (t.parent != undefined && t.ObjectType != "WorkingStation") {
            room = t.parent.UnitName;
            t.UnitName = room;
        }
        Application.WorkerWindow.updateContant(t, room);

        Application.WorkerWindow.show();
    };
    Application.OpenSettings = function () {
        Application.Settings.show();
    };
    //Application.TagsStore = new Ext.data.SimpleStore({
    //    fields: ['name'],
    //    data: [['Window'], ['Room'], ['Cubic'], ['EVP'], ['CEO'], ['Office * 2'], ['Office * 3'], ['Office * 4'], ['Manager'], ['Accessibility'], ['Help Desk'], ['Corner'], ['O. S.'], ['Manager O. S.']],
    //    sortInfo: { field: 'name', direction: 'ASC' }
    //}),

    //Application.TagsStore.load();
    function findin(item, name, isDep) {
        //{ text: item.objects[i].unit, leaf: true, checked: false }
        if (isDep) {
            for (var i = 0; i < item.length; i++) {
                if (item[i].text == name)
                    return item[i];
            }
        }
        else {
            for (var i = 0; i < item.children.length; i++) {
                if (item.children[i].text == name)
                    return item.children[i];
            }
        }
        return undefined;
    }

    Application.showDeparetmentTree = function () {
        //if (Application.DeparetmentTree)
        //    return;
        if (Application.DeparetmentTree != undefined && Application.DeparetmentTree.destroying != false)
            return;

        var treedepartments = new Ext.tree.TreePanel({
            title: trns("מחלקות"),
            autoScroll: true,
            animate: true,
            // enableDD: true,
            containerScroll: true,
            collapsible: false,
            //title: 'DataBase',
            border: true,
            height: 300,
            width: 300,
            rootVisible: false,
            frame: false,
            viewConfig: {
                toggleOnDblClick: false
            },
            //loader: new Ext.tree.TreeLoader({
            //    url: '4493.json'
            //}),
            //renderTo: Ext.getBody(),
            listeners: {
                //beforeitemdblclick: function (node, checked, eOpts) {
                //    alert();
                //},
                checkchange: function (node, checked, eOpts) {
                    //if (node.hasChildNodes()) {
                    //    for (i = 0; i < treedepartments.root.attributes.children.length; i++) {
                    //        var childNode = treedepartments.root.attributes.children[i];
                    //        if (node.text == childNode.text) {
                    //            for (j = 0; j < childNode.children.length; j++) {
                    //                childNode.children[j].checked = checked;
                    //            }
                    //        }
                    //    }
                    if (event.type != "dblclick") {
                        node.eachChild(function (childNode) {
                            childNode.ui.checkbox.checked = checked;
                            childNode.attributes.checked = checked;
                        });
                    }
                    else {
                        node.ui.checkbox.checked = !checked;
                        node.attributes.checked = !checked;
                    }

                    //}
                }

//CHOVV IN THE MIDDLE


            },
            //root: new Ext.tree.TreeNode({
            //    expand: true,
            //    text: "/",
            //    id: "/"
            //}),
            root: {
                expanded: true,
                children: Application.SubDepartments

            }
        })
        //  treedepartments.on('beforeitemdblclick', function () { return false; });
        Application.DeparetmentTree = new Ext.Window({
            title: '',
            width: 365,
            height: 300,
            minWidth: 100,
            defaultType: 'textfield',
            minHeight: 100,
            labelWidth: 150,
            layout: 'fit',
            plain: true,
            closeAction: 'destroy',
            //                                            closeAction: 'hide',
            shim: true,

            bodyStyle: 'padding:5px;',
            //buttonAlign: 'center',
            //                                            items: Application.LibraryTree,
            items: treedepartments,
            buttons: [
                '->', {
                    text: trns("שמור"),
                    handler: function () {
                        Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments = "";
                        for (i = 0; i < treedepartments.root.attributes.children.length; i++) {
                            var childNode = treedepartments.root.attributes.children[i];
                            if (childNode.children != undefined && childNode.hidden == false) {
                                for (j = 0; j < childNode.children.length; j++) {
                                    if (childNode.children[j].checked == true) {
                                        if (Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments != "")
                                            Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments += ",";
                                        Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments += childNode.children[j].text;
                                    }
                                }
                            }
                        }
                        Application.DocumentManager.items.items[0].viewport.paper.selObj.isDerty = true
                        Application.DeparetmentTree.close();
                    }
                }]
        });

        var visabledepartments = Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingDepartments;
        for (i = 0; i < treedepartments.root.attributes.children.length; i++) {
            treedepartments.root.attributes.children[i].hidden = false;
        }
        for (i = 0; i < treedepartments.root.attributes.children.length; i++) {
            var childNode = treedepartments.root.attributes.children[i];
            //for (j = 0; j < childNode.children.length; j++) {
            ////    childNode.children[j].remove(children);
            //}
            if (visabledepartments.indexOf(childNode.text) > -1) {
                childNode.hidden = false;
                //if (Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments != undefined && Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments != "") {
                if (childNode.children != undefined) {
                    childNode.expanded = true;
                    for (j = 0; j < childNode.children.length; j++) {
                        if (Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments == childNode.children[j].text || Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments.indexOf(childNode.children[j].text + ",") > -1 || Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments.indexOf("," + childNode.children[j].text) > -1)
                            childNode.children[j].checked = true;
                        else childNode.children[j].checked = false;
                    }
                }
                //}
                //else {
                //if (childNode.children != undefined) {
                //    childNode.expanded = true;
                //    childNode.checked = true;
                //    for (j = 0; j < childNode.children.length; j++) {
                //        childNode.children[j].allowchildren = false;
                //        childNode.children[j].checked = true;
                //    }
                //}
                //}
            }
            else {
                childNode.hidden = true;
            }
        }

        //treedepartments.expandAll();
        Application.DeparetmentTree.show();
        for (i = 0; i < treedepartments.root.childNodes.length; i++) {
            if (treedepartments.root.childNodes[i].hidden == false) {
                treedepartments.root.childNodes[i].collapse();
                var childNode = treedepartments.root.attributes.children[i];
                var isMix = false;
                if (childNode.children.length == 0)
                    continue;
                var chk = childNode.children[0].checked;
                for (j = 1; j < childNode.children.length; j++) {
                    if (chk != childNode.children[j].checked) {
                        isMix = true;
                        break;
                    }
                }
                if (isMix == false) {
                    childNode.checked = chk;
                    treedepartments.root.childNodes[i].attributes.checked = chk;
                    // childNode.attributes.checked = chk;
                }
            }
        }
        // treedepartments.load();
        //treedepartments.getRootNode().expand();

    }

    //Application.comboUsage = new Ext.form.ComboBox({
    //    name: 'UsageCmb',
    //    allowBlank: false,
    //    store: new Ext.data.SimpleStore({
    //        fields: ['txt']
    //        , data: [["New"]]
    //    }),
    //    hideTrigger: false,
    //    typeAhead: false,
    //    mode: 'local',
    //    triggerAction: 'all',
    //    //selectOnFocus: true,
    //    listeners: {
    //        'keypress': function (e) {
    //            if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
    //                console.log(this.getRawValue())
    //            }
    //            //console.log(this.getRawValue())
    //            //this.store.filter('name', this.getRawValue(), true, false);
    //        },

    //    }
    //});
    Application.BookingDepartmentsBox = new Ext.ux.form.SuperBoxSelect({
        msgTarget: 'under',
        allowAddNewData: false,
        autoScroll: true,

        id: 'selector222',
        fieldLabel: '',
        emptyText: 'Select Departments',
        //resizable: false,
        editable: false,
        //hideTrigger: true,

        //useClearButton: false,
        //grow: true,
        //resizable: false,
        //growMax: 3,
        //fixFocusOnTabSelect: false,
        //boxMaxHeight: 40,
        resizable: true,
        value: "",
        name: 'departments',
        anchor: '100%',
        layout: 'fit',
        store: new Ext.data.SimpleStore({
            fields: ['txt']
            , data: [["New"]]
        }),
        mode: 'local',
        displayField: 'txt',
        valueField: 'txt',
        //extraItemCls: 'x-tag',
        listeners: {
            //newitem: function (comp, v) {
            //    v = v + '';
            //    //v = v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase();
            //    var newObj = {
            //        txt: v//,
            //        // name: v
            //    };
            //    comp.addItem(newObj);
            //    if (Application.TagsForDrawing.indexOf("," + v) == -1)
            //        Application.TagsForDrawing += "," + v;
            //    if (Application.DocumentManager.items.items[0].viewport.paper.selObj != null) {
            //        Application.DocumentManager.items.items[0].viewport.paper.selObj.PolyTags = comp.getValue();
            //        Application.DocumentManager.items.items[0].viewport.paper.selObj.dertyFlag = true;
            //    }

            //},
            //focus: function (comp, v) {
            //    Application.BookingDepartmentsBox.expand()
            //},
            additem: function (comp, v) {
                if (Application.DocumentManager.items.items[0].viewport.paper.selObj != null) {
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingDepartments = comp.getValue();
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.dertyFlag = true;
                    if (Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments == undefined)
                        Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments = "";
                    if (Application.BookingDepartmentsBox.FromSet == true)
                        return;
                    for (var i = 0; i < Application.SubDepartments.length; i++) {
                        if (Application.SubDepartments[i].children && Application.SubDepartments[i].text == v) {
                            for (var ci = 0; ci < Application.SubDepartments[i].children.length; ci++) {
                                if (Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments.indexOf(Application.SubDepartments[i].children[ci].text) == -1) {
                                    if (Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments != "")
                                        Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments += ","
                                    Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments += Application.SubDepartments[i].children[ci].text;
                                }
                            }
                        }
                    }
                }
            },
            removeitem: function (comp, v) {
                if (Application.DocumentManager.items.items[0].viewport.paper.selObj != null) {
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingDepartments = comp.getValue();
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.dertyFlag = true;
                    if (Application.BookingDepartmentsBox.FromSet == true)
                        return;
                    for (var i = 0; i < Application.SubDepartments.length; i++) {
                        if (Application.SubDepartments[i].children && Application.SubDepartments[i].text == v) {
                            for (var ci = 0; ci < Application.SubDepartments[i].children.length; ci++) {
                                if (Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments.indexOf(Application.SubDepartments[i].children[ci].text) > -1) {
                                    Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments.replace(Application.SubDepartments[i].children[ci].text, "");
                                    Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments.replace(",,", ",");
                                }
                            }
                            if (Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments == ",")
                                Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments += "";
                        }
                    }
                    // Application.BookingDepartmentsBox.setValue(Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingDepartments);
                }
            },
            clear: function (comp, v) {
                if (Application.DocumentManager.items.items[0].viewport.paper.selObj != null) {
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingDepartments = comp.getValue();
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.dertyFlag = true;
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.BookingSubDepartments = "";
                }
            }
        }
    });

    Application.superBox = new Ext.ux.form.SuperBoxSelect({
        msgTarget: 'under',
        allowAddNewData: true,

        id: 'selector2',
        fieldLabel: 'Tags',
        emptyText: 'Enter or select the category tags',
        resizable: true,
        value: "",
        name: 'tags',
        anchor: '100%',
        layout: 'fit',
        store: new Ext.data.SimpleStore({
            fields: ['txt']
            , data: [["New"]]
        }),
        mode: 'local',
        displayField: 'txt',
        valueField: 'txt',
        //extraItemCls: 'x-tag',
        listeners: {
            newitem: function (comp, v) {
                v = v + '';
                //v = v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase();
                var newObj = {
                    txt: v//,
                    // name: v
                };
                comp.addItem(newObj);
                if (Application.TagsForDrawing.indexOf("," + v) == -1)
                    Application.TagsForDrawing += "," + v;
                if (Application.DocumentManager.items.items[0].viewport.paper.selObj != null) {
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.PolyTags = comp.getValue();
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.dertyFlag = true;
                }

            },
            additem: function (comp, v) {
                if (Application.DocumentManager.items.items[0].viewport.paper.selObj != null) {
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.PolyTags = comp.getValue();
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.dertyFlag = true;
                }
            },
            removeitem: function (comp, v) {
                if (Application.DocumentManager.items.items[0].viewport.paper.selObj != null) {
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.PolyTags = comp.getValue();
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.dertyFlag = true;
                }
            },
            clear: function (comp, v) {
                if (Application.DocumentManager.items.items[0].viewport.paper.selObj != null) {
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.PolyTags = comp.getValue();
                    Application.DocumentManager.items.items[0].viewport.paper.selObj.dertyFlag = true;
                }
            }
        }
    });

    Application.Prop = new Ext.Panel({
        region: 'south',
        //        title: 'נתונים לשטח הנבחר',
        height: 163,
        margins: '0 0 0 0',
        cmargins: '0 0 0 0',
        collapsible: true,
        layout: 'column',
        width: 800,
        tools: [{
            type: 'refrash',
            id: 'refresh',
            //cls: 'settings',
            //id: 'btnSepFloors',
            //tooltip: 'פתח חישוב קומתי',
            //type: 'help',
            handler: function (event, toolEl, panel) {
                if (Application.uwin == undefined) {
                    Application.uwin = new Ext.Window({
                        width: 300,
                        height: 250,
                        closeAction: 'hide',
                        plain: true,
                        //       bodyStyle: 'padding:5px; background-color: #5f6063;',
                        buttonAlign: 'center',
                        items: [Application.SepFloorMeusermentProps]
                    });
                }
                Application.uwin.show();
            }
        }],
        items: [
            new Ext.Panel({
                margins: '0 0 0 0',
                cmargins: '0 0 0 0',
                layout: 'fit',
                // width: 300,
                columnWidth: .333,
                items: [Application.MunicialProps, {
                    xtype: 'box',
                    style: "position: absolute; left: 0",
                    html: '<img onclick="Application.showDeparetmentTree()" src="resources/images/tree.png" style="padding: 2px; cursor: hand;" width="23px"/>',
                }, new Ext.FormPanel({
                    autoHeight: true,
                    layout: 'fit',
                    style: 'padding-left: 25px',
                    //layout: {
                    //    type: 'hbox',
                    //    //align: 'stretch'
                    //},
                    items: [
                        Application.BookingDepartmentsBox//,
                        //{
                        //    xtype: 'box',
                        //    html: '<img src="resources/images/cross.gif" onclick="Application.BookingDepartmentsBox.clearValue()" style="padding: 1px; cursor: hand;" width="24px" />',
                        //    flex: 0.0
                        //},
                        //{
                        //    xtype: 'box',
                        //    html: '<img src="resources/images/down2.gif" onclick="Application.BookingDepartmentsBox.expand()" style="padding: 1px; cursor: hand;" width="24px" />',
                        //    flex: 0.0
                        //}
                    ]
                })]
            }),
            Application.MeusermentProps,
            new Ext.Panel({
                margins: '0 0 0 0',
                cmargins: '0 0 0 0',
                layout: 'fit',
                // width: 300,
                columnWidth: .333,
                items: [Application.GeneralProps, new Ext.form.FormPanel({
                    autoHeight: true,
                    layout: 'fit',
                    items: Application.superBox
                })]
            })

        ]
        // items: [Application.PropertyPage, Application.PropertyPage, Application.PropertyPage, Application.PropertyPage]

    });
    var xd = Ext.data;
    var tpl = new Ext.XTemplate(
        '<tpl for=".">',
        '<div class="thumb-wrap" id="{name}">',
        '<div class="thumb"><img width="100px" height="100px" src="{url}"></div>', //onmouseover="showWinImage(this.src, this)" onmouseenter="showWinImage(this.src, this)" onmouseout="closeWinImage()"
        '<span class="x-editable">{shortName}</span></div>',
        '</tpl>',
        '<div class="x-clear"></div>'
    );

    Application.importWind = new Ext.Window({
        title: trns('יבוא אובייקטים'),
        shim: true,
        width: 450,
        height: 600,
        closeAction: 'hide',
        minWidth: 300,
        minHeight: 200,
        plain: true,
        //		bodyStyle: 'padding:5px; background-color: #5f6063;',
        buttonAlign: 'center',
        items: [
            {
                boxLabel: trns('מחק אובייקטים קיימים'),
                xtype: 'checkbox',
                name: 'chkDelObjects',
                //labelStyle: 'width: 0px;',
                id: 'chkDelObjects'
            }
            , {
                boxLabel: trns('צבע פוליגונים בהתאם למחלקה'),
                xtype: 'checkbox',
                name: 'chkColorPolygones',
                // labelStyle: 'width: 0px;',
                id: 'chkColorPolygones'
            },
            {
                boxLabel: trns('עדכן נתונים באובייקטים קיימים'),
                xtype: 'checkbox',
                name: 'chkUpdateDetails',
                //  labelStyle: 'width: 0px;',
                id: 'chkUpdateDetails'
            },
            {
                xtype: 'box',
                //    labelStyle: 'width: 0px;',
                autoEl: {
                    html: trns('בחר קובץ להוספה או החלפת נתוני אובייקטים')
                }

            }
            , {
                xtype: 'box',
                autoEl: {
                    width: 400,
                    height: 400,
                    src: 'index.html?drawingId=&number=chovav',
                    tag: 'iframe'
                }
            }


        ]



        //       new Ext.form.FormPanel({
        ////       bodyStyle: 'padding:5px; background-color: #5f6063;',
        //       frame: true,
        //       border: false,
        //      // layout: 'column',
        //       items: [
        //           {
        //               //columnWidth: .5,
        //               layout: 'form',
        //               items: [
        //                   ]
        //           }
        //           ,
        //           {
        //             //  columnWidth: .5,
        //               layout: 'form',
        //               items: [{
        //                   xtype: 'fieldset',
        //                   autoHeight: true,
        //                   defaultType: 'textfield',
        //                   items: [
        //                       {
        //                           xtype: 'box',
        //                           labelStyle: 'width: 0px;',
        //                           autoEl: {
        //                               html: trns('בחר קובץ להוספה או החלפת נתוני אובייקטים')
        //                           }

        //                       }
        //                       , {
        //                           xtype: 'box',
        //                           autoEl: {
        //                               width: 400,
        //                               height: 400,
        //                               src: 'index.html?drawingId=&number=chovav',
        //                               tag: 'iframe'
        //                           }
        //                       }
        //                   ]
        //               }]
        //           }

        //       ]
        //   })
        ,

        buttons: [{
            text: trns('סגור'),
            handler: function () {
                Application.importWind.hide();
            }
        },
        {
            text: trns('עדכן'),
            handler: function () {
                Ext.Ajax.request({
                    url: 'getRequest.aspx?xl=okget&name=chovav',
                    //            method: 'GET',
                    //            jsonData: { xl: "okget" },
                    success: function (response, opts) {
                        var s = response.responseText;
                        Application.GetDataFromXml(s, Ext.getCmp("chkDelObjects").checked, Ext.getCmp("chkColorPolygones").checked, Ext.getCmp("chkUpdateDetails").checked);
                        Application.importWind.hide();

                        //                Ext.Ajax.request({
                        //                    url: 'Property3001.asmx/getuplExcel',
                        //                    method: 'POST',
                        //                    jsonData: { xl: s },
                        //                    success: function (response, opts) {
                        //                        var s = Ext.decode(response.responseText).d;
                        //                        Application.GetDataFromXml(s, Application.importWind.items.items[0].items.items[1].checked, Application.importWind.items.items[0].items.items[3].checked, Application.importWind.items.items[0].items.items[5].checked);
                        //                        Application.importWind.hide();
                        //                    }
                        //                });
                    }
                });
            }
        }]
    }); /* , {
                                    xtype: 'box',
                                    tooltip: 'Import section data',
                                    autoEl: {
                                        html: '<span id="ImportContent"></span>'//style="visibilty: hidden;"
                                    }

                                }*/
    Application.setXmlToList = function (serverData) {
        var arrTables = serverData.split("<Table>");
        var p = 0;
        var dt = [];
        var ind = 0;
        for (var i = 0; i < arrTables.length; i++) {
            var arr = [];
            var ar = [];
            var str = arrTables[i];
            var Name = "", EmployeeId = "", NewStation = "", LastStation = "", company = "", companyId = "", division = "", unit = "", email = "", url = "", imAddress = "", homePhone = "", busPhone = "", fax = "",
                mobPhone = "", OfficeAddress = "", homeAddress = "", PolyId = "";
            if (str.indexOf("</Table>") == -1)
                continue;
            str = str.replace(/&nbsp;/g, "");
            str = str.replace(/&amp;/g, "");
            //EmployeeId	 Name	NewStation	LastStation

            if (str.indexOf("<EmployeeId>") > -1)//שם מלא
                EmployeeId = str.substring(str.indexOf("<EmployeeId>") + 12, str.indexOf("</EmployeeId>"));
            if (str.indexOf("<Name>") > -1)//שם מלא
                Name = str.substring(str.indexOf("<Name>") + 6, str.indexOf("</Name>"));
            if (str.indexOf("<LastStation>") > -1)//מספר פוליגון
                LastStation = str.substring(str.indexOf("<LastStation>") + 13, str.indexOf("</LastStation>"));
            if (str.indexOf("<NewStation>") > -1)//סוג אובייקט
                NewStation = str.substring(str.indexOf("<NewStation>") + 12, str.indexOf("</NewStation>"));

            for (var k = 0; k < Application.DocumentManager.ActiveDocument().objects.items.length; k++) {
                if (Application.DocumentManager.ActiveDocument().objects.items[k].UId != undefined && Application.DocumentManager.ActiveDocument().objects.items[k].objects != undefined) {
                    for (var j = 0; j < Application.DocumentManager.ActiveDocument().objects.items[k].objects.length; j++) {
                        if (Application.DocumentManager.ActiveDocument().objects.items[k].objects[j].companyId == EmployeeId) {
                            var u = new Application.relocWind.items.items[0].store.recordType({//Id,Name,DrawingId,Munichipal,Area,Path,Folder,Version,Floors,AreaNumberScale,DimsScale,ObjectScale,LineScale,xLeng,yLeng,ViewType,SystemType
                                Id: EmployeeId,
                                EmpName: Name,
                                LastLocation: LastStation,
                                NewLocation: NewStation,
                                DrawingFrom: Application.CurDrawingName,
                                UId: Application.DocumentManager.ActiveDocument().objects.items[k].objects[j].uid,
                                ObjectType: Application.DocumentManager.ActiveDocument().objects.items[k].objects[j].ObjectType,
                                Icon: Application.DocumentManager.ActiveDocument().objects.items[k].objects[j].ico,

                            });
                            Application.relocWind.items.items[0].store.insert(ind++, u);
                        }
                    }
                }
            }



        }

    }
    Application.MessageMoveToAdmin = function (c, par, tar) {
        var mobileyeMove = false;
        var addtoFirst = "";
        var addtoSecound = "";
        if (c.parent != undefined && Application.isEmpty(par.PolyTags) == false && (par.PolyTags.toLowerCase().indexOf("access control") > -1 || par.PolyTags.toLowerCase().indexOf("floor ert") > -1)) {
            mobileyeMove = true;
            addtoFirst = (par.PolyTags.toLowerCase().indexOf("access control") > -1) ? "Access control" : (par.PolyTags.toLowerCase().indexOf("floor ert") > -1) ? "Floor ERT" : "";
        }
        if (tar != undefined && Application.isEmpty(tar.PolyTags) == false && (tar.PolyTags.toLowerCase().indexOf("access control") > -1 || tar.PolyTags.toLowerCase().indexOf("floor ert") > -1)) {
            mobileyeMove = true;
            addtoSecound = (tar.PolyTags.toLowerCase().indexOf("access control") > -1) ? "Access control" : (tar.PolyTags.toLowerCase().indexOf("floor ert") > -1) ? "Floor ERT" : "";
        }
        var user = Application.UserName;
        if (user.split(".").length > 1)
            user = Application.UserName.split(".")[1].charAt(0).toUpperCase() + Application.UserName.split(".")[1].slice(1);
        var Obj = Application.DocumentManager.items.items[0].viewport.paper.getById(tar.path[0].raphaelid);
        Application.DocumentManager.items.items[0].viewport.database.Log(trns("העברת עובד לעמדה") + " " + tar.UId[0], [c.parent.UId[0], tar.UId[0]], "", [c.uid]);

        var hhh = trns("למתחם");
        if (hhh.indexOf(":"))
            hhh = hhh.replace(":", ":<br>");
        var subject = trns("עדכון על שינוי מקום ישיבה לעובד") + "-" + c.firstName + " " + c.lastName;

        var emailBody = "<br><br>" + trns("שלום רב") + ",<br/>" + user + " " + trns("מעוניין לעדכן אותך") + " " + trns("בביצוע שינוי מקום ישיבה") + "<br/>" + c.firstName + " " + c.lastName + " " + trns("עובר") + "<br/>" + trns("ממתחם") + ": " + Application.SelectedDrawing[0] + "<br>" + trns("בכתובת") + ": " + Application.SelectedDrawing[3].split(";")[1] + "<br>";
        emailBody += trns("מעמדה") + ": " + "<a href='" + Application.SiteName + "/Default.aspx?bn=" + Application.SelectedDrawing[0] + "&vt=UnitName&val=" + c.parent.UnitName + "'>" + c.parent.UnitName + "</a> " + addtoFirst + "<br/>" + hhh + " " + Application.SelectedDrawing[0] + "<br>" + trns("בכתובת") + ": " + Application.SelectedDrawing[3].split(";")[1] + "<br>" + trns("לעמדה") + ": " + "<a href='" + Application.SiteName + "/Default.aspx?bn=" + Application.SelectedDrawing[0] + "&vt=UnitName&val=" + tar.UnitName + "'>" + tar.UnitName + "</a> " + addtoSecound;
        if (Application.ObjectMoveAlert == trns("תצוגה מקדימה") || Application.ObjectMoveAlert == "תצוגה מקדימה") {
            var frm = new Ext.form.FormPanel({
                baseCls: 'x-plain',
                labelWidth: 100,
                defaultType: 'textfield',
                items: [
                    {
                        fieldLabel: trns('אל'),
                        xtype: 'textfield',
                        name: 'email',
                        vtype: 'email',
                        readOnly: true,
                        value: Application.MoreMails,
                        anchor: '95%'
                    }, {
                        fieldLabel: trns('נושא'),
                        name: 'sub',
                        xtype: 'textfield',
                        //maskRe: new RegExp("^[a-zA-Z0-9א-ת_ \r\n]*$"),
                        anchor: '95%',
                        value: subject
                    },
                    //{
                    //    hideLabel: true,
                    //    value: emailBody,
                    //    id: 'txt',
                    //    name: 'txt',
                    //    multiline: true,
                    //    height: 400,
                    //    width: 300,
                    //    maxLength: 500,
                    //    maskRe: new RegExp("^[a-zA-Z0-9א-ת_ \r\n]*$"),
                    //    allowBlank: false,
                    //    xtype: 'textarea'
                    //}]
                    new Ext.form.HtmlEditor({ id: 'txt', name: 'txt', hideLabel: true, value: emailBody, readOnly: true })]
            });
            var win = new Ext.Window({
                title: trns('העברת עובד בין עמדות'),
                shim: true,
                width: 500,
                height: 500,
                minWidth: 300,
                minHeight: 200,
                layout: 'fit',
                plain: true,
                bodyStyle: 'padding:5px;',
                buttonAlign: 'center',
                items: frm,
                buttons: [{
                    text: trns('ביטול'),
                    handler: function () {
                        win.close();
                    }
                },
                {
                    xtype: 'label',
                    html: "<div style='color: red;'>" + trns("ההתראה תשלח רק לאחר שמירה") + "</div>"
                },
                {
                    text: trns('שלח התראה'),
                    scope: this,
                    handler: function () {
                        var p = frm.getForm();
                        var lang = (location.href.indexOf("En.aspx") > -1) ? "dir=ltr" : "dir=rtl";
                        Application.SendEmailsAlerts.push({ did: Application.SelectedDrawing[1], subject: p.findField("sub").getValue(), txt: "<div " + lang + ">" + p.findField("txt").getValue() + "</div>" });

                        win.close();
                    }
                }]
            });
            $(".x-btn-text.x-edit-sourceedit").css("visibility", "collapse");
            win.show();

        }
        else if (Application.ObjectMoveAlert == trns("שלח") || Application.ObjectMoveAlert == "שלח" || mobileyeMove == true) {
            var lang = (location.href.indexOf("En.aspx") > -1) ? "dir=ltr" : "dir=rtl";
            Application.SendEmailsAlerts.push({ did: Application.SelectedDrawing[1], subject: subject, txt: "<div " + lang + ">" + emailBody + "</div>" });
        }

    }
    Application.relocationObject = function (cPoly, o2) {
        try {
            //      var xyForm = [c.attrs.x, c.attrs.y];
            if (o2.parent == undefined) {
                var p = cPoly.NumPos;
                p[0] += Application.ObjectsScale / 2;
                p[1] += Application.ObjectsScale / 2;
                if (o2.Icon.indexOf("עובדת") > -1)
                    o2.Icon = "Female.png";
                else o2.Icon = "Male.png";
                var c = Application.DocumentManager.items.items[0].viewport.DrawObject(cPoly.path, p, o2.Icon, o2.Info, o2.eid, false, false, o2.emptype, false, o2.canbooknearbyseats);
                c.dertyFlag = true;
                var sel = undefined;
                for (var i = 0; i < Application.myWaitList.length; i++) {
                    if (Application.myWaitList[i].eid == o2.eid) {
                        sel = Application.myWaitList[i];
                        Application.myWaitList.remove(sel);
                    }
                }

                Application.storeObjects.loadData(Application.myWaitList);
            }
            else {
                var o2Poly = o2.parent;
                if (o2Poly.isPublic == false && o2Poly.MaxEmpInRoom > o2Poly.countEmployees() - 1)
                    o2Poly.path.attr({ fill: "red" });
                o2Poly.objects.remove(o2);
                if (cPoly.objects == undefined)
                    cPoly.objects = [];
                cPoly.objects.push(o2);
                if (cPoly.isPublic == false && cPoly.MaxEmpInRoom <= cPoly.countEmployees())
                    cPoly.path.attr({ fill: cPoly.thisC });

                //   o2Poly.
                o2.show(); //מוודא שרואים את האובייקט גם אם הפוליגון שלו מוסתר
                o2.txt.show();
                o2.animate({ x: cPoly.NumPos[0], y: cPoly.NumPos[1] + 25 }, 2000, "backOut");
                o2.txt.animate({ x: cPoly.NumPos[0], y: cPoly.NumPos[1] + 75 }, 2000, "backOut");
                o2.dertyFlag = true;
            }

            // Lwind.close();
        }
        catch (gt) { }
    },
        Application.isEmpty = function (val) {
            return (val === undefined || val == null || val.length <= 0) ? true : false;
        },
        Application.MoveEmployeeToNewLoaction = function (centerPt, UId, destination, isCurDrawing, c, UnitName, drawingTo, CUID, Icon, ObjectType, AutoColor = false) {
            Application.SaveFlag = true;

            if (isCurDrawing) {
                var cpt = centerPt.split(",");
                var dest = null;
                if (destination == "Object") {
                    dest = Application.DocumentManager.items.items[0].viewport.findObjectById(UId);
                    if (c.ico == "tableWithMan.png") {
                        if (dest.ico == "tableEmpty.png") {
                            var unitName = dest.UnitName;
                            dest.UnitName = c.UnitName;
                            c.UnitName = unitName;
                            //                                                        var txtX = dest.txt.attrs.x;
                            //                                                        var txtY = dest.txt.attrs.y;
                            var text = dest.txt1.attrs.text;
                            //                                                        var txt1X = dest.txt1.attrs.x;
                            //                                                        var txt1Y = dest.txt1.attrs.y;
                            dest.attr({ x: c.attrs.x, y: c.attrs.y });
                            dest.txt.attr({ x: parseFloat(c.attrs.x) + (c.attrs.width / 2), y: parseFloat(c.attrs.y) + c.attrs.height * 1.2 });
                            dest.txt1.attr({ x: parseFloat(c.attrs.x) + 65, y: parseFloat(c.attrs.y) + 40, text: dest.UnitName });
                            c.attr({ x: cpt[0], y: cpt[1] });
                            c.txt.attr({ x: parseFloat(cpt[0]) + (parseFloat(c.attrs.width) / 2), y: parseFloat(cpt[1]) + parseFloat(c.attrs.height) * 1.2 });
                            c.txt1.attr({ text: text, x: parseFloat(cpt[0]) + 65, y: parseFloat(cpt[1]) + 40 });
                            var p = c.parent
                            p.objects.remove(c);
                            dest.parent.objects.remove(dest);
                            c.parent = dest.parent;
                            dest.parent = p;
                            c.parent.objects.push(c);
                            dest.dertyFlag = true;
                            dest.parent.objects.push(dest);
                        }
                        else {
                            Application.DocumentManager.items.items[0].viewport.DrawTableObject(c.parent, [c.attrs.x, c.attrs.y], "tableEmpty.png", "WorkingStation" + ";;;;;;;;;;;;;;;;;" + c.UnitName, Application.NewObjectsIds(), false, false);
                            c.ico = "Male.png";
                            c.ObjectType = "Male";
                            var tar = Application.DocumentManager.items.items[0].viewport.findTargetBy(UId, trns("מספר פוליגון"));
                            if (tar != null) {
                                c.UnitName = tar.UnitName;
                            }
                            c.txt1.attr({ text: "" });
                            c.dertyFlag = true;
                            c.attr({ src: "resources/images/Male.png", height: Application.ObjectsScale, width: Application.ObjectsScale });
                        }
                    }
                    else if (dest.ico == "tableEmpty.png") {
                        if (c.parent.isPublic == false && c.parent.MaxEmpInRoom > c.parent.countEmployees() - 1)
                            c.parent.path.attr({ fill: "red" }); //לא לצבוע שטח משותף
                        c.ObjectType = "WorkingStation";
                        c.ico = "tableWithMan.png";
                        c.attr({ src: "resources/images/tableWithMan.png" });
                        c.UnitName = dest.UnitName;
                        c.dertyFlag = true;
                        c.attr({ x: dest.attrs.x, y: dest.attrs.y, width: 130, height: 120 });
                        c.txt.attr({ x: parseFloat(dest.attrs.x) + (parseFloat(c.attrs.width) / 2), y: parseFloat(dest.attrs.y) + parseFloat(c.attrs.height) * 1.2 });
                        c.txt1.attr({ x: parseFloat(dest.attrs.x) + 65, y: parseFloat(dest.attrs.y) + 40, text: c.UnitName });
                        c.parent.objects.remove(c);
                        dest.parent.objects.push(c);
                        c.parent = dest.parent;
                        c.areaId = dest.areaId;
                        if (dest.parent)
                            dest.parent.objects.remove(dest);
                        if (dest.uid > 0) {
                            var OldId = dest.uid;
                            try {
                                dest.txt.remove();
                            }
                            catch (g) { }
                            try {
                                dest.txt1.remove();
                            }
                            catch (g) { }
                            //                                                        Application.DeletedObjects.push(OldId);
                            dest.remove();
                        }
                        else {
                            try {
                                dest.txt.remove();
                            }
                            catch (g) { }
                            try {
                                dest.txt1.remove();
                            }
                            catch (g) { }
                            dest.remove();
                        }



                    }
                    Rwind.close();
                }
                else if (destination == "Lounge") {
                    if (c.uid > 0) {
                        Application.SaveFlag = true;
                        var Info = c.firstName + ";" + c.lastName + ";" + c.UnicNumber + ";" + c.company + ";" + c.companyId + ";" + c.division + ";" + c.unit + ";" + c.email + ";" + c.url + ";" + c.imAddress + ";" + c.homePhone + ";" + c.busPhone + ";" + c.mobPhone + ";" + c.fax + ";" + c.OfficeAddress + ";" + c.homeAddress + ";" + c.UnitName + ";" + c.job + ";" + c.shift;
                        var dto = Application.SelectedDrawing[1];
                        Ext.Ajax.request({
                            url: 'Property3001.asmx/MoveObjectToWaitingList',
                            method: 'POST',
                            jsonData: { uid: parseInt(c.uid), Info: Info, gen: c.ObjectType, DrawingTo: dto },
                            success: function (response, opts) {

                                var commonData = getWaitListObjectFromSelectedObject(c, c.ico.replace(".png", "") + ";" + Info, c.ico, c.canbooknearbyseats, c.emptype, findByObjectid(c.uid), c.attrs.x + "," + c.attrs.y, c.parent.UId, c.uid);
                                commonData.dertyFlag = true;

                                Application.myWaitList.push(commonData);

                                Application.storeObjects.loadData(Application.myWaitList);
                                if (c.parent.isPublic == false && c.parent.MaxEmpInRoom > c.parent.countEmployees() - 1)
                                    c.parent.path.attr({ fill: "red" });
                                c.animate({ x: Application.DocumentManager.items.items[0].viewport.database.origin[0], y: Application.DocumentManager.items.items[0].viewport.database.origin[1] }, 1000, "backOut");
                                Application.DocumentManager.items.items[0].viewport.database.Log(trns("העברת עובד לטרקלין"), [-1, c.parent.UId[0]], "", [c.uid]);
                                c.parent.objects.remove(c);
                                try {
                                    c.txt.remove();
                                }
                                catch (g) { }
                                try {
                                    c.txt1.remove();
                                }
                                catch (g) { }

                                c.remove();

                            },
                            failure: function (response, opts) {
                            }
                        });

                    }
                    else {
                        Ext.MessageBox.alert(trns("הודעה"), trns("ניתן להעביר לטרקלין רק אובייקטים שמורים"));
                    }
                }
                else {
                    if (c.ico == "tableWithMan.png") {
                        Application.DocumentManager.items.items[0].viewport.DrawTableObject(c.parent, [c.attrs.x, c.attrs.y], "tableEmpty.png", "WorkingStation" + ";;;;;;;;;;;;;;;;;" + c.UnitName, Application.NewObjectsIds(), false, false);
                        c.ico = "Male.png";
                        c.ObjectType = "Male";
                        var tar = Application.DocumentManager.items.items[0].viewport.findTargetBy(UId, trns("מספר פוליגון"));
                        if (tar != null) {
                            c.UnitName = tar.UnitName;
                        }
                        c.txt1.attr({ text: "" });
                        c.dertyFlag = true;
                        c.attr({ src: "resources/images/Male.png", height: Application.ObjectsScale, width: Application.ObjectsScale });
                    }


                    var tar = Application.DocumentManager.items.items[0].viewport.findTargetBy(UId, trns("מספר פוליגון"));
                    if (tar != null) {
                        c.attr({ x: parseFloat(cpt[0]) - 10, y: parseFloat(cpt[1]) + Application.ObjectsScale / 4 });
                        try {
                            c.txt.attr({ x: parseFloat(cpt[0]) + (Application.ObjectsScale / 2), y: parseFloat(cpt[1]) + Application.ObjectsScale * 1.2 });
                            //c.txt1.attr({ x: cpt[0], y: cpt[1] });
                        }
                        catch (hh) { }
                        try {
                            if (tar.UId.toString().indexOf("F") > -1) {
                                //                                                            if (c.uid > 0) {
                                //                                                                Application.DeletedObjects.push(c.uid);
                                //                                                            }
                                c.remove();
                            }
                            if (c.parent.isPublic == false && c.parent.MaxEmpInRoom > c.parent.countEmployees() - 1)
                                c.parent.path.attr({ fill: "red" }); //לא לצבוע שטח משותף

                            c.parent.objects.remove(c);
                            Application.MessageMoveToAdmin(c, c.parent, tar);
                            var Obj = Application.DocumentManager.items.items[0].viewport.paper.getById(tar.path[0].raphaelid);
                            var sw = 1;
                            if (Application.removeBorders == true)// Application.SelectedDrawing[0].toLowerCase().indexOf("stratasys") > -1 || Application.SelectedDrawing[0].toLowerCase().indexOf("-nice") > -1 || Application.SelectedDrawing[0].toLowerCase().indexOf("-typeform") > -1 || Application.SelectedDrawing[0].toLowerCase().indexOf("myheritage") > -1 || Application.SelectedDrawing[0].toLowerCase().indexOf("cyberarc") > -1)
                                sw = 0;
                            if (Obj.parent != undefined) {
                                Obj.attr({ fill: Obj.parent.thisC, stroke: String.format('rgb({0}, {1}, {2})', 0, 0, 0), "stroke-width": sw });
                                if (Obj.parent.objects == undefined) {
                                    Obj.parent.objects = [];
                                }

                                var notifyRequest = getEmployeeNotifyRequest(c.companyId, Obj.parent.floorInd, Obj.parent.UId[0], Obj.parent.UnitName[0], c.parent.floorInd, c.areaId, c.parent.UnitName[0]);
                                c.employeeNotifyRequest = notifyRequest;

                                Obj.parent.objects.push(c);
                                c.areaId = Obj.parent.UId[0];
                                c.dertyFlag = true;
                                c.parent = Obj.parent;
                                if (c.division !== c.parent.tannent && Application.MyGrid.getColorFor(c.division) !== undefined && Application.getCat(c.parent.UId[0]) !== 1) {
                                    var dev = c.parent.tannent;
                                    var machlaka = c.division;
                                    if (AutoColor == true)
                                        c.parent.setNewColor(Application.MyGrid.getColorFor(machlaka), machlaka, "Cat" + Application.getCat(c.parent.UId[0]));
                                    else if (AutoColor == false) {
                                        var r = (Application.ViewArea !== Application.constantMain.unit) ? c.parent.UId[0] : c.parent.UnitName;
                                        Ext.MessageBox.show(
                                            {
                                                title: trns('העברת שטח למחלקה'),
                                                msg: trns("להעביר שטח") + " " + r + " " + trns("למחלקת") + " " + machlaka + " ?",
                                                buttons: Ext.MessageBox.YESNO,
                                                fn: function (btn) {
                                                    if (btn === 'yes') {
                                                        c.parent.setNewColor(Application.MyGrid.getColorFor(machlaka), machlaka, "Cat" + Application.getCat(c.parent.UId[0]));
                                                    }
                                                }
                                            });
                                    }
                                }

                            }
                            if (Rwind)
                                Rwind.close();
                        }
                        catch (gt) { }
                    }
                    else return "Empty Field";
                }
            }
            else {

                Ext.Ajax.request({
                    url: 'Property3001.asmx/MoveObject',
                    method: 'POST',
                    jsonData: { objid: parseInt(CUID), drawingIdTo: drawingTo[1], areaTo: UId, point: centerPt, ObjectType: ObjectType, Icon: Icon },
                    success: function (response, opts) {
                        if (c != "") {
                            if (c.parent.isPublic == false && c.parent.MaxEmpInRoom > c.parent.countEmployees() - 1)
                                c.parent.path.attr({ fill: "red" }); //לא לצבוע שטח משותף
                            Application.SaveFlag = true;
                            c.dertyFlag = true;
                            //Application.MessageMoveToAdmin(c, c.parent, tar);
                            var addtoFirst = "";
                            var addtoSecound = "";
                            if (c.parent != undefined && Application.isEmpty(c.parent.PolyTags) == false && (c.parent.PolyTags.toLowerCase().indexOf("access control") > -1 || c.parent.PolyTags.toLowerCase().indexOf("floor ert") > -1)) {
                                mobileyeMove = true;
                                addtoFirst = (c.parent.PolyTags.toLowerCase().indexOf("access control") > -1) ? "Access control" : (c.parent.PolyTags.toLowerCase().indexOf("floor ert") > -1) ? "Floor ERT" : "";
                            }
                            if (tar != undefined && Application.isEmpty(tar.PolyTags) == false && (tar.PolyTags.toLowerCase().indexOf("access control") > -1 || tar.PolyTags.toLowerCase().indexOf("floor ert") > -1)) {
                                mobileyeMove = true;
                                addtoSecound = (c.parent && tar.PolyTags.toLowerCase().indexOf("access control") > -1) ? "Access control" : (tar.PolyTags.toLowerCase().indexOf("floor ert") > -1) ? "Floor ERT" : "";
                            }
                            var user = Application.UserName;
                            if (user.split(".").length > 1)
                                user = Application.UserName.split(".")[1].charAt(0).toUpperCase() + Application.UserName.split(".")[1].slice(1);
                            var hhh = trns("למתחם");
                            if (hhh.indexOf(":"))
                                hhh = hhh.replace(":", ":<br>");
                            Application.DocumentManager.items.items[0].viewport.database.Log(trns("העברת עובד לשרטוט") + " " + drawingTo[1], [c.parent.UId[0], drawingTo[1] + ";" + UId], "", [c.uid]);
                            var subject = trns("עדכון על שינוי מקום ישיבה לעובד") + "-" + c.firstName + " " + c.lastName;
                            var emailBody = "<br><br>" + trns("שלום רב") + ",<br/>" + user + " " + trns("מעוניין לעדכן אותך") + " " + trns("בביצוע שינוי מקום ישיבה") + "<br/>" + c.firstName + " " + c.lastName + " " + trns("עובר") + " " + "<br/>" + trns("ממתחם") + ": " + Application.SelectedDrawing[0] + "<br>" + trns("בכתובת") + ": " + Application.SelectedDrawing[3].split(";")[1] + "<br>" + trns("מעמדה") + ": " + "<a href=" + Application.SiteName + "'/Default.aspx?bn=" + Application.SelectedDrawing[0] + "&vt=UnitName&val=" + c.parent.UnitName + "'>" + c.parent.UnitName + "</a> " + addtoFirst;
                            emailBody += "<br/>" + hhh + " " + drawingTo[0] + "<br>" + trns("בכתובת") + ": " + drawingTo[3].split(";")[1] + "<br>" + trns("לעמדה") + ": " + "<a href='" + Application.SiteName + "/Default.aspx?bn=" + Application.SelectedDrawing[1] + "&vt=UnitName&val=" + UnitName + "'>" + UnitName + "</a> " + addtoSecound;
                            var mobileyeMove = false;

                            if (Application.ObjectMoveAlert == trns("תצוגה מקדימה") || Application.ObjectMoveAlert == "תצוגה מקדימה") {

                                //                                      window.open('mailto:' + email + '?subject=' + subject + '&body=' + emailBody);
                                var frm = new Ext.form.FormPanel({
                                    baseCls: 'x-plain',
                                    labelWidth: 100,
                                    // bodyStyle: 'background-color: #5f6063;',
                                    //        url:'save-form.php',
                                    defaultType: 'textfield',
                                    items: [
                                        //{
                                        //    xtype: 'box',
                                        //    height: 25,
                                        //    anchor: '95%',
                                        //    autoEl: { cn: "<span style='font-size: 12px; display:inline-block;text-align:center;font-weight: bold'> " + trns("לתשומת ליבך, הנמען יוכל לראות רק את היחידה ממנה נוצרה ההפניה ולא מעבר לכך") + " </span>" }
                                        //},
                                        {
                                            fieldLabel: trns('אל'),
                                            xtype: 'textfield',
                                            name: 'email',
                                            vtype: 'email',
                                            value: Application.MoreMails,
                                            anchor: '95%'
                                        }, {
                                            fieldLabel: trns('נושא'),
                                            name: 'sub',
                                            xtype: 'textfield',
                                            anchor: '95%',
                                            value: subject
                                        }, {
                                            hideLabel: true,
                                            value: emailBody,
                                            id: 'txt',
                                            name: 'txt',
                                            multiline: true,
                                            height: 400,
                                            width: 300,
                                            maxLength: 300,
                                            //maskRe: new RegExp("^[a-zA-Z0-9א-ת_ \r\n]*$"),
                                            allowBlank: false,
                                            xtype: 'textarea'
                                        }]//new Ext.form.HtmlEditor({ id: 'txt', name: 'txt', hideLabel: true, value: emailBody })]
                                });
                                var win = new Ext.Window({
                                    title: trns('העברת עובד בין עמדות'),
                                    shim: true,
                                    width: 500,
                                    height: 500,
                                    minWidth: 300,
                                    minHeight: 200,
                                    layout: 'fit',
                                    plain: true,
                                    bodyStyle: 'padding:5px;',
                                    buttonAlign: 'center',
                                    items: frm,
                                    buttons: [{
                                        text: trns('ביטול'),
                                        handler: function () {
                                            win.close();
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        html: "<div style='color: red;'>" + trns("ההתראה תשלח רק לאחר שמירה") + "</div>"
                                    },
                                    {
                                        text: trns('שלח התראה'),
                                        scope: this,
                                        handler: function () {
                                            var p = frm.getForm();
                                            var lang = (location.href.indexOf("En.aspx") > -1) ? "dir=ltr" : "dir=rtl";
                                            Application.SendEmailsAlerts.push({ did: Application.SelectedDrawing[1], subject: p.findField("sub").getValue(), txt: "<div " + lang + ">" + p.findField("txt").getValue() + "</div>" });
                                            win.close();
                                        }
                                    }]
                                });
                                win.show();
                            }
                            else if (Application.ObjectMoveAlert == trns("שלח") || Application.ObjectMoveAlert == "שלח" || mobileyeMove == true) {
                                var lang = (location.href.indexOf("En.aspx") > -1) ? "dir=ltr" : "dir=rtl";
                                Application.SendEmailsAlerts.push({ did: Application.SelectedDrawing[1], subject: subject, txt: "<div " + lang + ">" + emailBody + "</div>" });

                            }

                            if (c.ico == "tableWithMan.png") {
                                Application.DocumentManager.items.items[0].viewport.DrawTableObject(c.parent, [c.attrs.x, c.attrs.y], "tableEmpty.png", "WorkingStation" + ";;;;;;;;;;;;;;;;;" + c.UnitName, Application.NewObjectsIds(), false, false);
                                c.ico = "Male.png";
                                c.ObjectType = "Male";
                                c.attr({ src: "resources/images/Male.png", height: Application.ObjectsScale, width: Application.ObjectsScale });
                            }
                            //c.parent.objects.remove(c);
                            try {
                                c.parent.objects.remove(c);
                                if (c.txt)
                                    c.txt.remove();
                                if (c.txt1)
                                    c.txt1.remove();
                                c.remove();
                            }
                            catch (uy) { }
                        }
                        Rwind.close();

                    }
                });
            }
            return "Relocation";
        }
    Application.relocationEmployees = function () {
        Application.relocWind = new Ext.Window({
            title: trns('מיקום אובייקטים'),
            shim: true,
            width: 600,
            height: 300,
            y: 70,
            x: 0,
            closeAction: 'hide',
            minWidth: 300,
            minHeight: 200,
            plain: true,
            //		bodyStyle: 'padding:5px; background-color: #5f6063;',
            buttonAlign: 'center',
            items: new Ext.grid.EditorGridPanel({
                columns: [{
                    header: trns('מספר עובד'),
                    width: 100,
                    dataIndex: 'Id',
                    editor: new Ext.form.TextField({
                        allowBlank: true
                    })
                }, {
                    header: trns('שם העובד'),
                    width: 80,
                    dataIndex: 'EmpName'
                }
                    , {
                    header: trns('מיקום נוכחי'),
                    width: 100,
                    dataIndex: 'LastLocation'
                }
                    , {
                    // header: trns('שרטוט חדש'),
                    width: 0,
                    hidden: true,
                    dataIndex: 'DrawingTo'
                    //editor: new Ext.form.TextField({
                    //    allowBlank: true
                    //})
                }
                    , {
                    header: trns('מיקום חדש'),
                    width: 100,
                    dataIndex: 'NewLocation',
                    editor: new Ext.form.TextField({
                        allowBlank: true
                    })
                },

                {
                    header: trns('סטטוס'),
                    width: 150,
                    dataIndex: 'Status'
                }],

                store: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]],
                //  tpl: tpl,
                height: 270,
                multiSelect: false,
                clicksToEdit: 0
                //viewConfig: {
                //    emptyText: trns('אין תזכורות/משימות')
                //},

            })
            ,

            buttons: [
                {
                    text: trns('תחום במלבן עובדים'),//בעזרת מלבן תוחם
                    tooltip: {
                        text: "<b>" + trns('בחר עובדים בעזרת מלבן תוחם') + "</b>" + "<br><br>" + trns('לחיצה על הכפתור הזה תסייע להכניס עובד או קבוצות.. יש ללחוץ על הכפתור השמאלי בעכבר לסמן בעזרת מלבן חוסם את האזור שבו יש עובדים שנרצה למקם מחדש.').split("..").join(".<br/><br/>") + "<hr><img src='resources/images/forward.gif'/> Press F1 for more help",
                        width: 200,
                        autoHide: false
                    },
                    listeners: {
                        mouseout: function (c) {
                            Ext.QuickTips.getQuickTip().hide();
                        }
                    },
                    handler: function () {
                        Application.DocumentManager.items.items[0].viewport.SetRectFindEmployyes(true);
                        //Application.relocWind.hide();
                    }
                },
                {
                    text: trns('תחום במלבן מקומות ישיבה פנויים'),//בחר מקומות פנויים ומקם באופן רנדומלי
                    tooltip: {
                        text: "<b>" + trns('בחר מקומות ישיבה פנויים בעזרת מלבן תוחם') + "</b>" + "<br><br>" + trns('לחיצה על הכפתור הזה תסייע להזין מקמות ישיבה חדשיםלעובדים ברשימה באופן אקראי.. יש ללחוץ על הכפתור השמאלי בעכבר לסמן בעזרת מלבן חוסם את האזור שבו נרצה למקם מחדש עובדים.').split("..").join(".<br/><br/>") + "<hr><img src='resources/images/forward.gif'/> Press F1 for more help",
                        width: 200,
                        autoHide: false
                    },
                    listeners: {
                        mouseout: function (c) {
                            Ext.QuickTips.getQuickTip().hide();
                        }
                    },
                    handler: function () {
                        Application.DocumentManager.items.items[0].viewport.SetRectFindEmptys(true);
                    }
                },
                {
                    text: trns('יבוא רשימה מאקסל'),
                    handler: function () {
                        Application.importXlWind = new Ext.Window({
                            title: trns('יבוא אקסל מיקומים'),
                            shim: true,
                            width: 450,
                            height: 600,
                            closeAction: 'hide',
                            minWidth: 300,
                            minHeight: 200,
                            plain: true,
                            //		bodyStyle: 'padding:5px; background-color: #5f6063;',
                            buttonAlign: 'center',
                            items: new Ext.form.FormPanel({
                                //      bodyStyle: 'padding:5px; background-color: #5f6063;',
                                frame: true,
                                border: false,
                                items: [
                                    {
                                        xtype: 'box',
                                        autoEl: {
                                            html: trns('בחר קובץ לעדכון מקומות ישיבה')//style="visibilty: hidden;"
                                        }

                                    }, {
                                        xtype: 'box',
                                        autoEl: {
                                            width: 300,
                                            height: 300,
                                            src: 'index.html?drawingId=&number=chovav',
                                            tag: 'iframe'
                                        }

                                    }]
                            })
                            ,

                            buttons: [{
                                text: trns('סגור'),
                                handler: function () {
                                    Application.importXlWind.hide();
                                }
                            },
                            {
                                text: trns('עדכן מקומות ישיבה'),
                                tooltip: {
                                    text: "<b>" + trns('עדכן מקומות ישיבה') + "</b>" + "<br><br>" + trns('Import Excel by columns EmployeeId, Name, LastStation, NewStation').split("..").join(".<br/><br/>") + "<hr><img src='resources/images/forward.gif'/> Press F1 for more help",
                                    width: 200,
                                    autoHide: false
                                },
                                listeners: {
                                    mouseout: function (c) {
                                        Ext.QuickTips.getQuickTip().hide();
                                    }
                                },
                                handler: function () {
                                    Ext.Ajax.request({
                                        url: 'getRequest.aspx?xl=okget&name=chovav',
                                        //            method: 'GET',
                                        //            jsonData: { xl: "okget" },
                                        success: function (response, opts) {
                                            var s = response.responseText;
                                            Application.setXmlToList(s);
                                            //Application.GetDataFromXml(s, Application.importWind.items.items[0].items.items[1].checked, Application.importWind.items.items[0].items.items[3].checked, Application.importWind.items.items[0].items.items[5].checked);
                                            Application.importXlWind.hide();

                                        }
                                    });
                                }
                            }]
                        });
                        Application.importXlWind.show();
                    }
                },
                {
                    text: trns('עדכן'),
                    handler: function () {
                        for (var i = 0; i < Application.relocWind.items.items[0].store.data.items.length; i++) {
                            if (Application.relocWind.items.items[0].store.data.items[i].data.NewLocation == "" || Application.relocWind.items.items[0].store.data.items[i].data.NewLocation == undefined) {
                                if (Application.relocWind.items.items[0].store.data.items[i].data.Id != "" && Application.relocWind.items.items[0].store.data.items[i].data.Id != undefined) Application.relocWind.items.items[0].store.data.items[i].set("Status", "Poly name is empty");
                                continue;
                            }
                            var poly = getpolyByName(Application.relocWind.items.items[0].store.data.items[i].data.NewLocation);
                            if (poly) {
                                try {
                                    var centerPt = poly.NumPos[0][0] + "," + poly.NumPos[1][0];
                                    var UId = poly.UId[0];
                                    var c = getObjectsByCompanyId(Application.relocWind.items.items[0].store.data.items[i].data.Id);
                                    var Status = Application.MoveEmployeeToNewLoaction(centerPt, UId, "Area", Application.CurDrawingName == Application.relocWind.items.items[0].store.data.items[i].data.DrawingFrom, c, Application.relocWind.items.items[0].store.data.items[i].data.NewLocation, Application.SelectedDrawing, Application.relocWind.items.items[0].store.data.items[i].data.UId, Application.relocWind.items.items[0].store.data.items[i].data.Icon, Application.relocWind.items.items[0].store.data.items[i].data.ObjectType, true);
                                    Application.relocWind.items.items[0].store.data.items[i].set("Status", Status);
                                }
                                catch (tt) { }
                            }
                        }
                    }
                },
                {
                    text: trns('סגור'),
                    handler: function () {
                        Application.relocWind.hide();
                    }
                }
            ]
        });
        Application.relocWind.show();
    }
    Application.searchEmployee = function () {
        Application.DocumentManager.AddSearchEmp(new WcDb.Database({
            name: trns("איתור עובד")
        }));
        //var objects = [];
        //Ext.Ajax.request({
        //    url: 'Property3001.asmx/SearchEmp',
        //    method: 'POST',
        //    jsonData: { ss: " " },
        //    success: function (response, opts) {
        //        objects = Ext.decode(response.responseText).d;

        //        //                        var jsonFiles = [];
        //        //                        for (var i = 0; i < objects.length; i++) {
        //        //                            var s = objects[i][5].toString().substring(0, objects[i][5].toString().indexOf(';'));
        //        //                            jsonFiles.push([[s]]);
        //        //                            //  cmb.store.data.addAll(jsonFiles);
        //        //                        }
        //        //                        cmb.store.data.clear();
        //        //                        cmb.store.data.addAll(jsonFiles);
        //    }
        //});
    };
    Application.importObjects = function () {
        if (Application.readOnly != true)
            Application.importWind.show();
    };
    Application.ExportObjects = function () {
        Application.ReportView.fillReport(trns("דוח אובייקטים"));
        Application.NewReport(trns("דוח אובייקטים"));
    };
    function squash(arr) {
        var tmp = [];
        for (var i = 0; i < arr.length; i++) {
            if (tmp.indexOf(arr[i]) === -1 || arr[i] !== "") {
                tmp.push(arr[i]);
            }
        }
        return tmp;
    }
    Application.RecalcAssetes = function () {
        var ground = 0;
        for (var i = 0; i < Application.Data.DrawingAssets.length; i++) {
            var polys = squash(assetProps[11].split(','));
            Application.Data.DrawingAssets[i][11] = polys.join(',');
            var area = 0;
            for (var j = 0; j < polys.length; j++) {
                if (polys[j] != "") {
                    area += Application.buildings[0].PolySize[parseInt(polys[j])];
                }
            }
            if (assetProps[18].toString() === "Cat5")
                ground += area;
            Application.Data.DrawingAssets[i][2] = area;
        }
        for (var i = 0; i < Application.Data.DrawingAssets.length; i++) {
            var objs = Application.Data.DrawingAssets[i];
            var cat = objs[18].toString();
            var area = 0;
            var PArea = 0;
            var num = parseInt(cat.replace("Cat", "")) - 1;
            if (num % 2 == 1) {
                for (var j = 0; j < Application.Data.DrawingAssets.length; j++) {
                    var obj = Application.Data.DrawingAssets[j];
                    if (obj[18].indexOf("Cat" + num.toString()) > -1) {
                        PArea += parseFloat(obj[2]);
                    }
                    if (obj[18].indexOf(cat) > -1) {
                        area += parseFloat(obj[2]);
                    }
                }
                Application.Data.DrawingAssets[i][14] = parseFloat(objs[2]) + PArea * (parseFloat(objs[2]) / area);
                Application.Data.DrawingAssets[i][17] = parseFloat(objs[2]) * 100 / area;
                if (cat == "Cat6")
                    Application.Data.DrawingAssets[i][17] = 0;
                if (cat == "Cat2") {
                    Application.Data.DrawingAssets[i][16] = ground * (parseFloat(objs[2]) / area);
                }
            }
        }
    };
    Application.PolySize = new Array();
    Application.preLoad = function () {
        if (!this.support.loading) {
            alert("You need the Flash Player 9.028 or above to use SWFUpload.");
            return false;
        }
    };
    Application.getAreaOfTannet = function (tannet) {
        var c = 0;
        for (var i = 0; i < Application.Data.DrawingAssets.length; i++) {
            if (Application.Data.DrawingAssets[i][10] == tannet)
                c += parseFloat(Application.Data.DrawingAssets[i][14]);
        }
        return c.toFixed(2);
    };
    Application.GetDataFromXml = function (serverData, deleteAllObjectsBefore, ColorByDepartment, UpdateEmployees) {
        if (deleteAllObjectsBefore == true && UpdateEmployees == false) {
            Application.DocumentManager.items.items[0].database.objects.each(function (item, index, length) {
                if (item.UId != undefined) {
                    if (item.objects != undefined) {
                        for (i = item.objects.length - 1; i >= 0; i--) {
                            //                            item.objects.remove(item.objects[i].node);
                            if (this.objects[i].txt != undefined)
                                item.objects[i].txt.remove();
                            if (this.objects[i].txt1 != undefined)
                                item.objects[i].txt1.remove();
                            item.objects[i].remove();
                            item.objects.remove(item.objects[i]);
                        }
                    }
                }
            });

        }

        var arrTables = serverData.split("<Table>");
        var p = 0;
        var dt = [];
        for (var i = 0; i < arrTables.length; i++) {
            var arr = [];
            var ar = [];
            var str = arrTables[i];
            var LastName = "", Firstname = "", objectType = "", UnicNumber = "", company = "", companyId = "", division = "", unit = "", email = "", url = "", imAddress = "", homePhone = "", busPhone = "",
                fax = "", mobPhone = "", OfficeAddress = "", homeAddress = "", PolyId = "", job = "", shift = "";
            if (str.indexOf("</Table>") == -1)
                continue;
            str = str.replace(/&nbsp;/g, "");
            str = str.replace(/&amp;/g, "");
            if (str.indexOf("<FirstName>") > -1)//שם מלא
                Firstname = str.substring(str.indexOf("<FirstName>") + 11, str.indexOf("</FirstName>"));
            if (str.indexOf("<LastName>") > -1)//שם מלא
                LastName = str.substring(str.indexOf("<LastName>") + 10, str.indexOf("</LastName>"));
            if (str.indexOf("<objectType>") > -1)//סוג אובייקט
                objectType = str.substring(str.indexOf("<objectType>") + 12, str.indexOf("</objectType>"));
            if (str.indexOf("<PolyId>") > -1)//מספר פוליגון
                PolyId = str.substring(str.indexOf("<PolyId>") + 8, str.indexOf("</PolyId>"));
            if (str.indexOf("<UnicNumber>") > -1)//מספר עובד
                UnicNumber = str.substring(str.indexOf("<UnicNumber>") + 12, str.indexOf("</UnicNumber>"));
            if (str.indexOf("<company>") > -1)//חברה
                company = str.substring(str.indexOf("<company>") + 9, str.indexOf("</company>"));
            if (str.indexOf("<companyId>") > -1)//מספר עובד
                companyId = str.substring(str.indexOf("<companyId>") + 11, str.indexOf("</companyId>"));
            if (str.indexOf("<division>") > -1)//חטיבה
                division = str.substring(str.indexOf("<division>") + 10, str.indexOf("</division>"));
            if (str.indexOf("<unit>") > -1)//מחלקה
                unit = str.substring(str.indexOf("<unit>") + 6, str.indexOf("</unit>"));
            if (str.indexOf("<email>") > -1)//מייל
                email = str.substring(str.indexOf("<email>") + 7, str.indexOf("</email>"));
            if (str.indexOf("<url>") > -1)//מייל פנימי
                url = str.substring(str.indexOf("<url>") + 5, str.indexOf("</url>"));
            if (str.indexOf("<imAdress>") > -1)//מסר מיידי
                imAddress = str.substring(str.indexOf("<imAdress>") + 10, str.indexOf("</imAdress>"));
            if (str.indexOf("<homePhone>") > -1)//טלפון בבית
                homePhone = str.substring(str.indexOf("<homePhone>") + 11, str.indexOf("</homePhone>"));
            if (str.indexOf("<busPhone>") > -1)//מסר מיידי
                busPhone = str.substring(str.indexOf("<busPhone>") + 10, str.indexOf("</busPhone>"));
            if (str.indexOf("<mobPhone>") > -1)//מסר מיידי
                mobPhone = str.substring(str.indexOf("<mobPhone>") + 10, str.indexOf("</mobPhone>"));
            if (str.indexOf("<fax>") > -1)//מסר מיידי
                fax = str.substring(str.indexOf("<fax>") + 5, str.indexOf("</fax>"));
            if (str.indexOf("<OfficeAddress>") > -1)//מסר מיידי
                OfficeAddress = str.substring(str.indexOf("<OfficeAddress>") + 15, str.indexOf("</OfficeAddress>"));
            if (str.indexOf("<homeAddress>") > -1)//מסר מיידי
                homeAddress = str.substring(str.indexOf("<homeAddress>") + 13, str.indexOf("</homeAddress>"));
            if (str.indexOf("<shift>") > -1)//מסר מיידי
                shift = str.substring(str.indexOf("<shift>") + 7, str.indexOf("</shift>"));
            if (str.indexOf("<job>") > -1)//מסר מיידי
                job = str.substring(str.indexOf("<job>") + 5, str.indexOf("</job>"));


            if (objectType == "")
                objectType = "male";
            var data = Firstname + ";" + LastName + ";" + UnicNumber + ";" + company + ";" + companyId + ";" + division + ";" + unit + ";" + email + ";" + url + ";" + imAddress + ";" + homePhone + ";" + busPhone + ";" + mobPhone + ";" + fax + ";" + OfficeAddress + ";" + homeAddress + ";" + PolyId + ";" + job + ";" + shift;//";" + c.UnitName + ";" + c.job + ";" + c.shift
            var Info = objectType + ";" + data;
            var Icon = objectType + ".png";
            var uid = Application.NewObjectsIds(); //לא קיים בבסיס הנתונים עדיין
            if (PolyId == "-1") {
                Icon = objectType + "waiting.png";
            }
            var tar = Application.DocumentManager.items.items[0].viewport.findTargetBy(PolyId, Application.ViewArea);

            if (tar != null) {
                try {
                    if (tar.UId.toString().indexOf("F") > -1) {
                        continue;
                    }
                    if (deleteAllObjectsBefore && UpdateEmployees == false) {
                        if (i < Application.Data.ObjectsInDrawing.length)
                            uid = Application.Data.ObjectsInDrawing[i][1];
                    }


                    var p = tar.NumPos[1][0];
                    var Position = tar.NumPos[0][0] + "," + p;
                    var raphShp = Application.DocumentManager.items.items[0].viewport.paper.getById(tar.path[0].raphaelid);
                    var c = undefined;
                    if (UpdateEmployees == true) {
                        if (companyId != "")
                            c = getObjectsByCompanyId(companyId);
                        else if (Firstname + LastName != "")
                            c = getObjectsByName(Firstname + LastName);
                        if (c != undefined) {
                            c.firstName = Firstname;
                            c.lastName = LastName;
                            c.UnicNumber = UnicNumber;
                            c.company = company;
                            c.division = division;
                            c.unit = unit;
                            c.email = email;
                            c.url = url;
                            c.imAdress = imAddress;
                            c.homePhone = homePhone;
                            c.busPhone = busPhone;
                            c.mobPhone = mobPhone;
                            c.fax = fax;
                            c.OfficeAddress = OfficeAddress;
                            c.homeAddress = homeAddress;
                            c.job = job;
                            c.shift = shift;
                        }
                    }
                    if (c == undefined) {
                        c = Application.DocumentManager.items.items[0].viewport.DrawObject(raphShp, Position.split(","), Icon, Info, uid, false, false, "Homer", false, false);
                    }
                    c.dertyFlag = true;
                    if (ColorByDepartment) {
                        var uid = raphShp.parent.UId[0];
                        var bExist = false;
                        var devId = -1;
                        for (var h = 0; h < Application.Data.DrawingAssets.length; h++) {
                            if (division == Application.Data.DrawingAssets[h][10]) {
                                bExist = true;
                                devId = h;
                                break;
                            }
                        }
                        if (bExist == false) {
                            var assetNumber = 0;
                            var OwnerNumber = 0;
                            for (var j = Application.Data.DrawingAssets.length - 1; j >= 0; j--) {
                                if (Application.Data.DrawingAssets[j][1] != "" && assetNumber < Application.Data.DrawingAssets[j][1])
                                    assetNumber += 1;
                                if (Application.Data.DrawingAssets[j][13] != "" && OwnerNumber < Application.Data.DrawingAssets[j][13])
                                    OwnerNumber += 1;
                                if (Application.Data.DrawingAssets[j][11].indexOf("," + uid + ",") > -1) {
                                    Application.Data.DrawingAssets[j][11] = Application.Data.DrawingAssets[j][11].replace("," + uid + ",", ",");
                                }
                            }
                            var da = Application.Data.DrawingAssets[0];
                            var dat = new Date();
                            Application.Data.DrawingAssets.push([-1, (assetNumber + 1).toString(), 0, 0, 0, da[5], dat.getDate() + "/" + dat.getMonth() + "/" + dat.getFullYear(), "", "", da[9], division, "," + uid + ",", 0, (OwnerNumber + 1).toString(), 0, 0, 0, 0, "Cat2", 0.15, 0]);
                        }
                        else {
                            for (var j = Application.Data.DrawingAssets.length - 1; j >= 0; j--) {
                                if (Application.Data.DrawingAssets[j][11].indexOf("," + uid + ",") > -1) {
                                    Application.Data.DrawingAssets[j][11] = Application.Data.DrawingAssets[j][11].replace("," + uid + ",", ",");
                                    Application.Data.DrawingAssets[devId][11] += uid + ",";
                                    break;
                                }
                            }
                        }
                    }

                }
                catch (gt) { }
            }
            else {
                var c = undefined;
                if (UpdateEmployees == true) {
                    if (companyId != "")
                        c = getObjectsByCompanyId(companyId);
                    else if (Firstname + LastName != "")
                        c = getObjectsByName(Firstname + LastName);
                    if (c != undefined) {
                        c.firstName = Firstname;
                        c.lastName = LastName;
                        c.UnicNumber = UnicNumber;
                        c.company = company;
                        c.division = division;
                        c.unit = unit;
                        c.email = email;
                        c.url = url;
                        c.imAdress = imAddress;
                        c.homePhone = homePhone;
                        c.busPhone = busPhone;
                        c.mobPhone = mobPhone;
                        c.fax = fax;
                        c.OfficeAddress = OfficeAddress;
                        c.homeAddress = homeAddress;
                        c.job = job;
                        c.shift = shift;
                        c.dertyFlag = true;
                    }
                }
                if (c == undefined) {
                    var AreaNum = -1;
                    var Position = "0,0";
                    Application.myWaitList.push({ eid: -(Application.myWaitList.length + 1), uid: uid, name: Firstname, lastName: LastName, Department: division, Unit: unit, BackDate: "", Info: Info, Icon: Icon, AreaNum: AreaNum, Position: Position, data: data })
                }
            }
        }
        Application.storeObjects.loadData(Application.myWaitList);
        Application.updateAllAreas(new Date());
        //Application.MyGrid.store.loadData(Application.MyGrid.getLegend(result));
        Application.calcSizes();
    };
    Application.uploadProgress = function (file, bytesComplete, bytesTotal) {
        if (bytesComplete == 0) {
            Ext.MessageBox.show({
                title: trns('המתן בבקשה'),
                msg: trns('מעלה קבצים'),
                progressText: trns('מעלה') + "...",
                width: 300,
                progress: true,
                closable: false

                //,
                //icon:'ext-mb-download', //custom class in msg-box.html
                //animEl: 'mb7'
            });
        }
        //     Ext.MessageBox.updateText('Saving your nodes and pipes');
        Ext.MessageBox.updateProgress(bytesComplete / bytesTotal, Math.round(100 * bytesComplete / bytesTotal) + '%');
    };
    Application.uploadError = function (file, errorCode, message) {
        //        Ext.MessageBox.alert('Alert', "The format is not current");
    };
    Application.myuploadComplete = function (file, serverData) {
        try {
            //Application.m_serverData = serverData;
        } catch (ex) {
            this.debug(ex);
        }
    };
    Application.UploadSuccess = function (file, serverData) {


        try {

            Application.m_serverData = serverData;
            Ext.MessageBox.hide();
        } catch (ex) {
            this.debug(ex);
        }
    };
    var statusIconRenderer = function (value) {
        switch (value) {
            default:
                return value;
            case 'Pending':
                return '<img src="hourglass.png" width=16 height=16>';
            case 'Sending':
                return '<img src="loading.gif" width=16 height=16>';
            case 'Error':
                return '<img src="cross.png" width=16 height=16>';
            case 'Cancelled':
            case 'Aborted':
                return '<img src="cancel.png" width=16 height=16>';
            case 'Uploaded':
                return '<img src="tick.png" width=16 height=16>';
        }
    },

        progressBarColumnTemplate = new Ext.XTemplate(
            '<div class="ux-progress-cell-inner ux-progress-cell-inner-center ux-progress-cell-foreground">',
            '<div>{value} %</div>',
            '</div>',
            '<div class="ux-progress-cell-inner ux-progress-cell-inner-center ux-progress-cell-background" style="left:{value}%">',
            '<div style="left:-{value}%">{value} %</div>',
            '</div>'
        ),

        progressBarColumnRenderer = function (value, meta, record, rowIndex, colIndex, store) {
            meta.css += ' x-grid3-td-progress-cell';
            return progressBarColumnTemplate.apply({
                value: value
            });
        },

        updateFileUploadRecordImages = function (id, column, value) {
            var rec = fileUploadImagesPanel.awesomeUploaderGrid.store.getById(id);
            rec.set(column, value);
            rec.commit();
        };

    updateFileUploadRecord = function (id, column, value) {
        var rec = fileUploadDocsPanel.awesomeUploaderGrid.store.getById(id);
        rec.set(column, value);
        rec.commit();
    };


    var fileUploadImagesPanel;
    var fileUploadDocsPanel;

    Application.currentPolygonWindow = null;

    Application.openDialog = function (uid, t) {
        Application.CurrentPolygonId = uid;

        var prp = new WcUi.AreaProps();
        var tabItems = [
            {
                region: 'center',
                xtype: 'tabpanel',
                activeItem: 3,
                items: [
               
                ]
            }
        ];
        /* */
        if (Application.IsSeatingAllocation) {

            var storeImages1 = new Ext.data.XmlStore({
                url: 'Property3001.asmx/getImages?drawingId=' + Application.SelectedDrawing[1] + '&numArea=' + uid,
                root: 'images',
                autoDestroy: true,
                record: 'images',
                fields: ['name', 'date', 'url']
            });
            storeImages1.load();
            var storeBooking = new Ext.data.XmlStore({
                url: 'Property3001.asmx/GetBooking?drawingId=' + Application.SelectedDrawing[1] + '&numArea=' + uid,
                root: 'Reservation',
                autoDestroy: true,
                record: 'Reservation',
                fields: ['userId', 'userName', 'FromTime', 'ToTime']
            });
            storeBooking.load();
            var storeTasks = new Ext.data.XmlStore({
                url: 'Property3001.asmx/getTasks?drawingId=' + Application.SelectedDrawing[1] + '&numArea=' + uid,
                root: 'tasks',
                autoDestroy: true,
                record: 'task',
                fields: ['name', 'date', 'returnTask', 'active', 'mail', 'id']
            });
            storeTasks.load();
            //      fileUploadDocsPanel = new Ext.Panel({
            //          frame: true
            //, width: 500
            //, height: 600
            //, items: [
            //      {
            //          autoEl: {
            //              width: 400,
            //              height: 550,
            //              src: 'index.html?drawingId=' + Application.SelectedDrawing[1] + '&number=' + uid,
            //              tag: 'iframe'
            //          }
            //      }]
            //      });
            fileUploadImagesPanel = new Ext.Panel({
                //title: trns('העלאת תמונות')
                //		,renderTo:'container1'
                frame: true
                , width: 500
                , height: 600
                , items: [
                    {
                        autoEl: {
                            width: 400,
                            height: 550,
                            src: 'index.html?drawingId=' + Application.SelectedDrawing[1] + '&number=' + uid,
                            tag: 'iframe'
                        }
                    }]
            });



            var panelImages = new Ext.Panel({
                id: 'images-view',
                frame: true,
                autoHeight: true,
                layout: 'fit',
                tbar: [{
                    //                text: 'Zoom Extents',
                    text: trns('העלה תמונות'),
                    icon: 'resources/images/icons16/plugin_add.gif',
                    scope: this,
                    handler: function () {
                        var winUpdImg = new Ext.Window({
                            title: trns('העלאת תמונות'),
                            shim: true,
                            width: 520,
                            height: 620,
                            closeAction: 'hide',
                            minWidth: 300,
                            minHeight: 200,
                            layout: 'fit',
                            plain: true,
                            bodyStyle: 'padding:5px;',
                            buttonAlign: 'center',
                            items: fileUploadImagesPanel,

                            buttons: [{
                                text: trns('סגור'),
                                handler: function () {
                                    winUpdImg.hide();
                                }
                            }]
                        });

                        winUpdImg.show();
                    }
                },
                {
                    text: trns('מחק תמונות'),
                    icon: 'resources/images/icons16/cross.gif',
                    //                text: 'Zoom Rectangle',
                    scope: this,
                    handler: function () {
                        var selModel = panelImages.items.items[0].selected;
                        if (panelImages.items.items[0].selected.getCount() == 0) {
                            Ext.Msg.alert('', trns('בחר תמונה למחיקה'));
                            return true;
                        }
                        var rec = panelImages.items.items[0].store.data.items[panelImages.items.items[0].selected.elements[0].viewIndex];
                        var r = rec.data.url.replace("getfile.aspx?path=", ""); //chovav
                        Ext.Ajax.request({
                            url: 'Property3001.asmx/deletefile',
                            method: 'POST',
                            jsonData: { file: r },
                            success: function (response, opts) {
                                storeImages1.load();
                            },
                            failure: function (response, opts) {
                                alert(response.responseText);
                            }
                        });
                    }
                },
                {
                    //                text: 'Pan',
                    text: trns('הצג תמונה'),
                    icon: 'resources/images/icons16/topic.gif',
                    scope: this,
                    handler: function () {
                        var selModel = panelImages.items.items[0].selected;
                        if (panelImages.items.items[0].selected.getCount() == 0) {
                            Ext.Msg.alert('', trns('בחר תמונה לתצוגה'));
                            return true;
                        }
                        var rec = panelImages.items.items[0].store.data.items[panelImages.items.items[0].selected.elements[0].viewIndex];
                        showWinImage(rec);
                    }
                }
                    //{
                    //    //                text: 'Pan',
                    //    text: trns('צלם תמונה'),
                    //    icon: 'resources/images/icons16/topic.gif',
                    //    scope: this,
                    //    handler: function () {
                    //        takePicture();
                    //    }
                    //}
                ],
                items: new Ext.DataView({
                    store: storeImages1,
                    tpl: tpl,
                    height: 300,
                    multiSelect: true,
                    overClass: 'x-view-over',
                    itemSelector: 'div.thumb-wrap',
                    viewConfig: {
                        emptyText: trns('אין תמונות מצורפות')
                    },
                    autoHeight: true,
                    prepareData: function (data) {
                        data.shortName = Ext.util.Format.ellipsis(data.name, 15);


                        //                data.sizeString = Ext.util.Format.fileSize(data.size);
                        //                data.dateString = data.lastmod.format("m/d/Y g:i a");
                        return data;
                    },

                    listeners: {
                        selectionchange: {
                            fn: function (dv, nodes) {
                                var l = nodes.length;
                                var s = l != 1 ? 's' : '';
                            }
                        }
                    }
                })
            });
            var panelTasks = new Ext.Panel({
                id: 'tasks-view',
                frame: true,
                autoHeight: true,
                layout: 'fit',
                tbar: [{
                    //                text: 'Zoom Extents',
                    text: trns('צור משימה'),
                    icon: 'resources/images/icons16/icon-show-active.gif',
                    scope: this,
                    handler: function () {
                        var k = uid;
                        var ar = [k, Application.SelectedDrawing[1], getTannetBypolyNumber(uid, getNameByUid(uid)), storeTasks];
                        Application.TaskWindow.updateContant(ar, Application.DocumentManager.items.items[0].viewport.paper.selObj);
                        Application.TaskWindow.show();
                    }
                },
                {
                    text: trns('מחק משימה'),
                    icon: 'resources/images/icons16/cross.gif',
                    //                text: 'Zoom Rectangle',
                    scope: this,
                    handler: function () {
                        var selModel = panelTasks.items.items[0].getSelectionModel();
                        if (!selModel.hasSelection()) {
                            Ext.Msg.alert(trns('לא ניתן למחוק משימה'), trns('לא נבחרה משימה, בחר משימה למחיקה'));
                            return true;
                        }
                        var rec = selModel.getSelected();
                        var r = rec.data.id; //chovav
                        Ext.Ajax.request({
                            url: 'Property3001.asmx/deleteTask',
                            method: 'POST',
                            jsonData: { id: parseInt(r) },
                            success: function (response, opts) {
                                storeTasks.load();
                                Application.DocumentManager.items.items[0].viewport.paper.selObj.SetReminders(false);
                            },
                            failure: function (response, opts) {
                                alert(response.responseText);
                            }
                        });

                    }
                },
                {
                    //                text: 'Pan',
                    text: trns('הצג/עדכן משימה'),
                    icon: 'resources/images/icons16/icon-by-date.gif',
                    scope: this,
                    handler: function () {
                        var selModel = panelTasks.items.items[0].getSelectionModel();
                        if (!selModel.hasSelection()) {
                            Ext.Msg.alert(trns('לא ניתן לעדכן משימה'), trns('לא נבחרה משימה, בחר משימה לעדכון'));
                            return true;
                        }
                        var rec = selModel.getSelected();
                        var ar = [uid, rec.data.userName, rec.data.active, rec.data.mail, rec.data.date.split(" ")[0], rec.data.date.split(" ")[1], rec.data.returnTask, rec.data.name, getTannetBypolyNumber(uid, getNameByUid(uid)), rec.data.id, Application.SelectedDrawing[1], storeTasks];
                        Application.TaskWindow.updateContant(ar);
                        Application.TaskWindow.show();

                    }
                }],
                items: new Ext.grid.GridPanel({
                    columns: [{
                        header: trns('תאור'),
                        width: 150,
                        renderer: function (value) {
                            var val = value.replace(/<.*?>/g, ' ');
                            return Ext.util.Format.ellipsis(val, 30);
                        },
                        dataIndex: 'name'
                    }, {
                        header: trns('תאריך'),
                        xtype: 'datecolumn',
                        //                        renderer: function(v) {
                        //                            var d = new Date(v);
                        //                            return d.dateFormat("d/m/Y");
                        //                        },
                        width: 80,
                        dataIndex: 'date'
                    }, {
                        header: trns('חזרה'),
                        width: 50,
                        dataIndex: 'returnTask'
                    }, {
                        header: trns('פעיל'),
                        width: 30,
                        type: 'boolean',
                        dataIndex: 'active'
                    }, {
                        header: trns('אימייל'),
                        width: 80,
                        dataIndex: 'mail'
                    }],

                    store: storeTasks,
                    //  tpl: tpl,
                    height: 300,
                    multiSelect: false,
                    viewConfig: {
                        emptyText: trns('אין תזכורות/משימות')
                    },
                    prepareData: function (data) {
                        data.shortName = Ext.util.Format.ellipsis(data.name, 15);
                        //                data.sizeString = Ext.util.Format.fileSize(data.size);
                        //                data.dateString = data.lastmod.format("m/d/Y g:i a");
                        return data;
                    }
                })
            });
            var panelBooking = new Ext.Panel({
                id: 'Booking-view',
                frame: true,
                autoHeight: true,
                layout: 'fit',
                items: new Ext.grid.GridPanel({
                    columns: [{
                        header: trns('שם עובד'),
                        flex: 33,
                        dataIndex: 'userName'
                    }, {
                        header: trns('תאריך התחלה'),
                        xtype: 'datecolumn',
                        format: 'm/d/Y g:i a',
                        flex: 33,
                        dataIndex: 'FromTime'
                    }, {
                        header: trns('תאריך סיום'),
                        xtype: 'datecolumn',
                        format: 'm/d/Y g:i a',
                        flex: 33,
                        dataIndex: 'ToTime'
                    }],//'userId', 'userName', 'FromTime', 'ToTime'

                    store: storeBooking,
                    //  tpl: tpl,
                    height: 300,
                    multiSelect: false,
                    //      overClass: 'x-view-over',
                    //                itemSelector: 'div.thumb-wrap',
                    viewConfig: {
                        emptyText: trns('אין הזמנות עתדיות לחדר')
                    },
                    prepareData: function (data) {
                        //data.shortName = Ext.util.Format.ellipsis(data.name, 15);
                        //                data.sizeString = Ext.util.Format.fileSize(data.size);
                        //                data.dateString = data.lastmod.format("m/d/Y g:i a");
                        return data;
                    }
                })
            });
            var editor = new Ext.form.TextArea({ id: 'sug', multiline: true, height: 300, width: 620, name: 'suggest', hideLabel: true/*, maskRe: new RegExp("^[a-zA-Z0-9א-ת_ \r\n]*$")*/ });

            Ext.Ajax.request({
                url: 'Property3001.asmx/getInfo',
                method: 'POST',
                jsonData: { number: uid, drawingId: Application.SelectedDrawing[1] },
                success: function (response, opts) {
                    if (Ext.decode(response.responseText).d != "") {
                        var r = Ext.decode(response.responseText).d;
                        // r = r.replace(/<br\s*\/?>/gi, "\r\n").replace(/<[^>]+>/g, '')
                        r = r.replaceAll("&amp;", "&");
                        editor.setValue(r);
                    }
                    else {
                        //    editor.setValue("כתוב הערות כאן!!!");
                    }
                },
                failure: function (response, opts) {
                    //    editor.setValue("כתוב הערות כאן!!!");
                }
            });
            
            var tab = 3;
            if (t.storeAdditional == undefined) {
                t.storeAdditional = new Ext.data.XmlStore({
                    url: 'Property3001.asmx/getAdditional?drawingId=' + Application.SelectedDrawing[1] + '&numArea=' + uid,
                    root: 'additionals',
                    autoDestroy: false,
                    record: 'additional',
                    fields: ['Name', 'Date', 'Info', 'CatNumber', 'Count', 'Id']
                });
                t.storeAdditional.load();
            }
            var panelAdditional = new Ext.Panel({
                id: 'add-view',
                frame: true,
                layout: 'fit',
                items: new Ext.grid.EditorGridPanel({
                    columns: [{
                        hidden: true,
                        width: 0,
                        dataIndex: 'Id'
                    }, {
                        header: trns('שם'),
                        width: 100,
                        dataIndex: 'Name'
                        ,
                        editor: new Ext.form.ComboBox({
                            store: new Ext.data.SimpleStore({
                                fields: ['txt']
                                , data: [[trns('ארון')], [trns('טלויזיה')], [trns('טלפון')], [trns('מדפסת')], [trns('מקרן')], [trns('שולחן')], [trns('שידה')], [trns('שקע תקשורת')], [trns('שקע חשמל')]]
                            })
                            , triggerAction: 'all'
                            , valueField: 'txt'
                            , displayField: 'txt'
                            , mode: 'local'
                            ,
                            onSelect: function (record, n) {
                                var newVal = record.data[this.valueField || this.displayField];
                                this.setValue(newVal);
                                this.collapse();
                            }
                        })
                        //editor: new Ext.form.TextField({
                        //    allowBlank: true
                        //})
                    },
                    //{
                    //header: trns('תאריך הוספה'),
                    //xtype: 'datecolumn',
                    //width: 80,
                    //dataIndex: 'date'
                    //},
                    {
                        header: trns('תאור'),
                        width: 200,
                        dataIndex: 'Info',
                        editor: new Ext.form.TextField({
                            allowBlank: true
                        })
                    }, {
                        header: trns('כמות'),
                        width: 30,
                        type: 'boolean',
                        dataIndex: 'Count',
                        editor: new Ext.form.TextField({
                            allowBlank: true
                        })
                    }, {
                        header: trns('מקט'),
                        width: 80,
                        dataIndex: 'CatNumber',
                        editor: new Ext.form.TextField({
                            allowBlank: true
                        })
                    }],
                    clicksToEdit: 1,
                    dropOK: false,
                    tbar: [{
                        text: 'Add Item',
                        icon: 'resources/images/icons16/document_into.png',
                        handler: function () {
                            // access the Record constructor through the grid's store
                            var grid = panelAdditional.items.items[0];
                            var Additional = grid.getStore().recordType;
                            var p = new Additional({
                                Id: -1,
                                Name: 'New Item',
                                Info: 'Information',
                                Count: 1,
                                CatNumber: '0000000'
                            });
                            grid.stopEditing();
                            t.storeAdditional.insert(0, p);
                            grid.startEditing(0, 0);
                        }
                    }, {
                        text: 'Delete Item',
                        icon: 'resources/images/icons16/document_out.png',
                        //                text: 'Zoom Rectangle',
                        scope: this,
                        handler: function () {
                            var selModel = panelAdditional.items.items[0].getSelectionModel();
                            if (!selModel.hasSelection()) {
                                Ext.Msg.alert(trns('לא ניתן למחוק'), trns('לא נבחרה שורה'));
                                return true;
                            }
                            var rec = selModel.selection.record;
                            var r = rec.data.Id; //chovav
                            t.storeAdditional.remove(rec);
                            if (parseInt(r) > -1) {
                                Ext.Ajax.request({
                                    url: 'Property3001.asmx/deleteAdditional',
                                    method: 'POST',
                                    jsonData: { id: parseInt(r) },
                                    success: function (response, opts) {
                                        //    selModel.removeitem(rec);
                                    },
                                    failure: function (response, opts) {
                                        alert(response.responseText);
                                    }
                                });
                            }
                        }
                    }],
                    store: t.storeAdditional,
                    //  tpl: tpl,
                    height: 500,
                    multiSelect: false,
                    //viewConfig: {
                    //    emptyText: trns('אין')
                    //},
                    prepareData: function (data) {
                        //data.shortName = Ext.util.Format.ellipsis(data.name, 15);
                        //                data.sizeString = Ext.util.Format.fileSize(data.size);
                        //                data.dateString = data.lastmod.format("m/d/Y g:i a");
                        return data;
                    }
                })
            });
            tabItems[0].items.push({
                title: trns('טקסט חופשי'),
                items: [editor]
            },{
                title: trns('תמונות מצורפות'),
                items: [panelImages]
            },{
                title: trns('תזכורות ומשימות'),
                items: [panelTasks]
            }, {
                title: trns('ציוד נוסף'),
                items: [panelAdditional]
            },{
                title: 'Booking',
                items: [panelBooking]
            });
           // tabItems.setActiveTab(tab);
        }

        var winform = new Ext.form.FormPanel({
            baseCls: 'x-plain',
            layout: 'border',
            bodyStyle: 'padding: 5px;',
            items: [Application.IsSeatingAllocation ? tabItems : new Ext.Panel({
                region: 'center', items: [] })]
        });

        if (Application.currentPolygonWindow != null) {
            return;
        }

        Application.currentPolygonWindow = new Ext.Window({
            title: trns('נתונים נוספים לשטח'),
            shim: true,
            width: 620,
            height: 400,
            minWidth: 300,
            minHeight: 200,
            layout: 'fit',
            plain: true,
            bodyStyle: 'padding:5px;',
            buttonAlign: 'center',
            items: winform,
            cls: 'additional-data-window',
            buttons: [
                {
                    text: trns('ארכיון דיגיטלי'),
                    id: 'archive',
                    hidden: Application.IsSeatingAllocation,
                    cls: 'additional-data-window-btn',
                    handler: function () {
                        if (Application.SelectedDrawing) {
                            if (Application.DigitalArchive) {

                                if (Application.DigitalArchive.isVisible()) {
                                    return;
                                }

                                Application.DigitalArchive.destroy();
                                Application.DigitalArchive = null;
                            }

                            Application.DigitalArchive = new WcUi.DigitalArchive(getMainDrawingIdFromPath(Application.SelectedDrawing));
                            Application.DigitalArchivePathToNavigate = "Home/Polygons/" + winform.currentPolygonId;
                            Application.DigitalArchive.show();
                        }
                    }
                },
                {
                    text: trns('שמור'),
                    id: 'save',
                    hidden: false,
                    cls: 'additional-data-window-btn ' + " " + (isInReadonly() ? 'readonly-btn' : ''),
                    overCls: 'additional-data-window-btn-over',
                    handler: function () {
                        if (Application.IsSeatingAllocation) {
                            var v = editor.getValue();
                            if (editor.getValue() != editor.value) {
                                Ext.Ajax.request({
                                    url: 'Property3001.asmx/setInfo',
                                    method: 'POST',
                                    jsonData: { number: uid, drawingId: Application.SelectedDrawing[1], info: v },
                                    success: function (response, opts) {
                                        Application.DocumentManager.items.items[0].viewport.paper.selObj.SetInfo(v);
                                    },
                                    failure: function (response, opts) {

                                    }
                                });
                            }
                        }
                        else
                        {
                            var billingPanel = winform.items.get(0).items.items.filter(function (el) { return el.id == 'billing-view'; })[0];
                            if (!billingPanel) {
                                return;
                            }
                            var store = billingPanel.items.items[0].getStore();
                            postData(Application.SelectedDrawing[1], winform.currentPolygonId, store, billingPanel.items.items[2]);
                            //editor.setValue(billingPanel.items.items[1].getValue());
                        }
                        Application.currentPolygonWindow.close();
                        Ext.QuickTips.enable();
                    }
                },
                {
                    text: trns('סגור'),
                    id: 'close',
                    cls: 'additional-data-window-btn',
                    handler: function () {
                        
                        Application.currentPolygonWindow.close();
                        Ext.QuickTips.enable();
                    }
                },
            ],
            listeners: {
                afterrender: function (panel) {
                    if (!Application.IsSeatingAllocation) {
                        launchBillingInForm(Application.SelectedDrawing[1], Application.CurrentPolygonId, winform);
                    }

                    Ext.getDoc().on('keydown', function (event) {
                        if (event.getKey() == Ext.EventObject.ESC) {
                            Application.currentPolygonWindow.close();
                        }
                    });
                }
            }

        });

        Application.currentPolygonWindow.on('hide', function () {
            Application.currentPolygonWindow = null;
        });

        prp.updateProps(Application.AreaProps.source["tanet"], Application.AreaProps.source["unitName"], Application.AreaProps.source["AgreementSize"], Application.AreaProps.source["GrossPoly"], Application.AreaProps.source["GrossAsset"], Application.AreaProps.source["AssetBySelPercent"]);
        Ext.QuickTips.disable();
        Application.currentPolygonWindow.show();
    };

    Application.DocumentManager = new WcUi.DocumentManager({
        region: 'center',
        margins: '0 0 0 0',
        cmargins: '0 0 0 0'
    });
    Application.Center = new Ext.Panel({
        region: 'center',
        layout: 'border',
        items: [Application.DocumentManager, Application.Prop/*, Application.LibraryTree*/]
        //        items: [
        //        Application.DocumentManager, Application.Prop
        //        ]
    });
    var xmlDocAll;

    Application.strLock = "";
    Application.MainView = [[1, trns('שם דייר')], [2, trns('שם יחידה')], [3, trns('מספר פוליגון')]];

    Application.SecondaryView = [[1, trns('גודל פוליגון')], [2, trns('גודל ברוטו מחושב')], [3, trns('שטח ברוטו מועמס')],
    [4, trns('שטח ברוטו מועמס קומתי')],
    [5, trns('שם יחידה')],
    [6, trns('מס פוליגון + גודל נטו')],
    [7, trns('שם יחידה + שטח הסכמי')],
    [8, trns('נטו + סיום הסכם')],
    [9, trns('שם יחידה + גודל נטו')],
    [10, trns("עמדה חמה")],
    [11, trns("כמות עובדים מומלצת")],
    [12, trns("ללא")]];
    Application.constantMain = {
        tanent: 1,
        unit: 2,
        polygon: 3
    }

    Application.constantsec = {
        polygunArea: 1,
        polygunBroto: 2,
        manualGrossArea: 3,
        grossFloorArea: 4,
        unit: 5,
        polygunAndNeto: 6,
        unitAndArea: 7,
        netoAndDate: 8,
        unitAndNeto: 9,
        hotdesk: 10,
        numberOfEmployee: 11,
        none: 12,
    }

    Application.header = new Ext.Panel({
        border: false,
        region: 'north',
        unstyled: true,
        height: 42,
        items: [
            Application.MainMenu, {
                xtype: 'panel', height: 30, bodyStyle: { "background-color": "#EF8861" },
                layout: {
                    type: 'hbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [
                    {

                        xtype: 'displayfield',
                        id: 'notificationMsg',
                        value: trns('השרטוט הנוכחי לצפייה בלבד לא ניתן לשנותו')
                    }]
            }]
    });

    Application.Viewport = new Ext.Viewport({
        layout: 'border',
        defaults: {},
        items: [Application.header, Application.Workspace, Application.Center]
    });
    cmb = Application.Workspace.items.items[0].items.items[0].secoundSel;
    Application.selectChange = function (bPartial, bFromChangeView) {

        RoutingEngine.addPolygonIdToUrl('');

        Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
            if (item.ShiftDemo === true) {
                item.path.attr({ fill: item.thisC });
                item.ShiftDemo = undefined;
            }
        });

        if (m_type == "rdNoFilter") {
            showTreeFloorByPolyNumber();
            if (Application.DocumentManager.items.items[0].viewport.paper.selObj != null) {
                Application.DocumentManager.items.items[0].viewport.paper.selObj.unClickonObj(Application.DocumentManager.items.items[0].viewport.paper.selObj, false);
                Application.DocumentManager.items.items[0].viewport.paper.selObj = null;
            }
            Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
                if (Application.svgBackground || item.UId != undefined) item.show();//(Application.SelectedDrawing[0].toLowerCase().indexOf("solaredge") == -1 || Application.SelectedDrawing[0].toLowerCase().indexOf("stratasys") == -1 || Application.SelectedDrawing[0].toLowerCase().indexOf("-nice") > -1 || Application.SelectedDrawing[0].toLowerCase().indexOf("-typeform") > -1 || Application.SelectedDrawing[0].toLowerCase().indexOf("myheritage") > -1 || Application.SelectedDrawing[0].toLowerCase().indexOf("cyberarc") > -1) item.show();
                //else if (item.UId != undefined) item.show();
            });
            // item.paper.showBack
            if (Application.BackSVGElement != undefined && Application.DocumentManager.items.items[0].viewport.paper.showBack == true) {
                Application.BackSVGElement.show();
                // Application.BackSVGElement[obj.floorInd].show();
            }
            return;

        }
        else {
            if (cmb.getValue() == "" || m_type == "")
                return;
            if (bPartial != true) {
                if (m_type == "rdEmployee" && cmb.getValue().indexOf(trns("טרקלין")) == -1 && cmb.getValue().indexOf(trns("מוסתר")) == -1) {
                    if (Application.BackSVGElement != undefined) {
                        Application.BackSVGElement.hide();
                    }
                    shownAllAreas(false, bFromChangeView);
                }
                else if (m_type == "rdEmployee" && (cmb.getValue().indexOf(trns("טרקלין")) > -1 || cmb.getValue().indexOf(trns("מוסתר")) > -1)) {

                }
                else {
                    if (m_type != "rdShift" && m_type != "rdEmpNumber" && m_type != "rdHotDesk" && m_type != "rdMobility" && m_type != "rdEquipment" && cmb.getValue() != trns("כל העמדות") && Application.BackSVGElement != undefined) {
                        Application.BackSVGElement.hide();
                    }
                    if (m_type != "rdEmployee")
                        shownAllAreas(false, bFromChangeView);

                }
            }
            else if (Application.BackSVGElement != undefined) {
                if ((m_type == "rdEmployee" && cmb.getValue().indexOf(trns("טרקלין")) == -1 && cmb.getValue().indexOf(trns("מוסתר")) == -1) || m_type != "rdEmployee")
                    Application.BackSVGElement.hide();
            }
            //  window.parent.parent.frames("blm").frames("down").clearAll();
            switch (m_type) {
                case "rdPayerName":
                    var o = fillAssetListByPayerName(bPartial);
                    o.clickonObj(o);
                    break;
                case "rdPayerNumber":
                    var o = fillAssetListByPayerNumber(bPartial);
                    o.clickonObj(o);
                    break;

                case "rdAssetName":
                    var o = fillAssetListByAssetName(bPartial);
                    if (bFromChangeView == undefined && o)
                        o.clickonObj(o);
                    break;
                case "rdFloorNumber":
                    var o = showTreeByFloorNumber(bPartial);
                    if (bFromChangeView == undefined)
                        o.clickonObj(o);
                    break;
                case "rdGroup":
                    var o = showTreeByGroup();
                    o.clickonObj(o);
                    break;
                case "rdCompany":
                    var o = showTreeByCompany();
                    // o.clickonObj(o);
                    break;
                case "rdEmpType":
                    var o = showTreeByEmpType();
                    // o.clickonObj(o);
                    break;
                case "rdPolyNumber":
                    var arr = [];
                    var o = getfloorByPolyNumber(arr, cmb.getValue());
                    showTreeByFloorName(arr[0], arr[1]);
                    o.clickonObj(o);
                    var b = { x: o.attrs.x, y: o.attrs.y, width: 100, height: 100 };
                    Application.DocumentManager.items.items[0].viewport.zoomToPoint(b);
                    //                                            showTreeFloorByPolyNumber();
                    //                                            Application.DocumentManager.items.items[0].viewport.ZoomExtence();
                    break;
                case "rdBuildingName":
                    openSelDrawing();
                    break;
                case "rdBillingInformationWater":
                case "rdBillingInformationElectricity":
                case "rdBillingInformationEnergy":
                case "rdBillingInformationLease":
                    var o = BillingModule.initializeFilterBillingInformation(m_type);
                    if (o) {
                        o.clickonObj(o);
                    }
                    break;
                case "rdEquipment":

                    var k = new Array();
                    for (var a = 0; a < Application.storeAllAdditional.length; a++) {
                        if (Application.storeAllAdditional[a].Name == cmb.getValue()) {
                            if (Application.storeAllAdditional[a].PolyNum.indexOf("Object") == 0) {
                                var uid = Application.storeAllAdditional[a].PolyNum.replace("Object", "");
                                Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
                                    if (item.UId != undefined && item.objects != undefined) {
                                        var bshow = false;
                                        for (var i = 0; i < item.objects.length; i++) {
                                            if (item.objects[i].uid === uid) {
                                                bshow = true;
                                            }
                                        }
                                        if (bshow == true) {
                                            item.show();
                                        }
                                        //  else item.hide(true);
                                    }
                                });
                            }
                            else {
                                Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
                                    if (item.UId != undefined)
                                        if (item.UId.toString() == Application.storeAllAdditional[a].PolyNum) {
                                            item.show();
                                        }
                                    //     else item.hide(true);
                                });
                            }
                        }
                    }

                    break;
                case "rdHotDesk":
                    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
                        if (item.UId != undefined && item.isPublic != true) {
                            if (cmb.getValue() == trns("עמדות קבועות") || cmb.getValue() == trns("פנויות")) {
                                if (item.mobiltyUsage == "No") {
                                    if (cmb.getValue() == trns("פנויות") && ((item.objects == undefined) || (item.objects != undefined && item.countEmployees() < item.MaxEmpInRoom)))
                                        item.show();
                                    else if (cmb.getValue() == trns("עמדות קבועות") && item.objects != undefined && item.countEmployees() >= item.MaxEmpInRoom)
                                        item.show();
                                }
                                else item.hide(true);
                            }
                            else {
                                if (item.mobiltyUsage != "No") {
                                    //if (cmb.getValue() == trns("כולן")) {
                                    //    item.show();
                                    //}
                                    //else if (cmb.getValue() == trns("פנויות") && ((item.objects == undefined) || (item.objects != undefined && item.objects.length < item.MaxEmpInRoom))) {
                                    //    item.show();
                                    //}
                                    //else if (cmb.getValue() == trns("מאויישות") && item.objects != undefined && item.objects.length == item.MaxEmpInRoom) {
                                    //    item.show();
                                    //}
                                    if (cmb.getValue() == trns("חמות") && item.mobiltyUsage == "Yes") {
                                        item.show();
                                    }
                                    else if (cmb.getValue() == trns("הברידיות") && item.mobiltyUsage != "Yes") {
                                        item.show();
                                    }
                                    else if (cmb.getValue() == trns("מחלקות משותפות") && item.BookingDepartments != undefined && item.BookingDepartments != "") {
                                        item.show();
                                    }
                                    else item.hide(true);
                                }
                                else item.hide(true);
                            }

                        }
                    });
                    //trns("כולן"), trns("פנויות"), trns("מאויישות"), trns("עמדות קבועות")
                    break;
                case "rdShift":
                    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
                        item.show();
                        if (item.UId != undefined) {
                            // var bshow = "false";
                            //if (item.PolyTags != undefined && (item.PolyTags.indexOf("Shift-" + cmb.getValue() + ",") > -1 || item.PolyTags.indexOf("," + "Shift-" + cmb.getValue()) > -1 || item.PolyTags == "Shift-" + cmb.getValue())) {
                            //    bshow = true;
                            //}
                            //else
                            if (item.objects != undefined) {
                                var max = item.MaxEmpInRoom;
                                for (var i = 0; i < item.objects.length; i++) {
                                    if (item.objects[i].shift === cmb.getValue() || (item.objects[i].shift == "" || item.objects[i].shift == undefined)) {
                                        item.objects[i].show();
                                        max--;
                                    }
                                    else if (item.objects[i].shift !== cmb.getValue()) {
                                        item.objects[i].hide();
                                        item.objects[i].txt.hide();
                                        // item.hide(true);
                                    }
                                }
                                if (max > 0) {
                                    item.ShiftDemo = true;
                                    item.path.attr({ fill: "rgb(255, 0, 0)" });
                                }
                                else item.path.attr({ fill: item.thisC });

                            }
                            //if (bshow == true) {
                            //    item.show();
                            //    if (item.objects != undefined) {
                            //        for (var i = 0; i < item.objects.length; i++) {
                            //            if (item.objects[i].shift === cmb.getValue() || (item.objects[i].shift == "" || item.objects[i].shift == undefined)) {
                            //                item.objects[i].show();
                            //            }
                            //            else {
                            //                item.objects[i].hide();
                            //                item.objects[i].txt.hide();
                            //                //item.objects[i].txt1.hide();
                            //            }
                            //        }
                            //    }
                            //}
                            //else item.hide(true);
                        }
                        //else item.hide(true);
                    });
                    break;
                case "rdMobility":
                    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
                        if (item.UId != undefined && item.objects != undefined) {
                            var bshow = false;
                            for (var i = 0; i < item.objects.length; i++) {
                                if (item.objects[i].emptype === cmb.getValue() || (cmb.getValue() == "Homer" && (item.objects[i].emptype == undefined || item.objects[i].emptype == ""))) {
                                    bshow = true;
                                }
                            }
                            if (bshow == true)
                                item.show();
                            else item.hide(true);
                        }
                        else item.hide(true);
                    });
                    break;
                case "rdTags":
                    var arr = [];
                    searchTag = cmb.getValue();
                    if (cmb.getValue() == "Undefined") {
                        searchTag = undefined;
                    }
                    Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
                        if (item.UId != undefined)
                            if ((item.PolyTags == undefined && item.PolyTags == searchTag) || (item.PolyTags == "" && searchTag == undefined)) {
                                item.show();
                            }
                            else if (item.PolyTags != undefined && (item.PolyTags.indexOf(searchTag + ",") > -1 || item.PolyTags.indexOf("," + searchTag) > -1 || item.PolyTags == searchTag)) {
                                item.show();
                            }
                            else item.hide(true);
                    });
                    break;
                case "rdOverCapacity":
                case "rdOpenPostion":
                case "rdMoreSpacePostion":
                    var arr = [];

                    if (cmb.getValue() == trns("כל העמדות")) {
                        shownAreas(cmb.getStore().data.items);
                    }
                    else {
                        var o = getfloorByShopName(arr, cmb.getValue());
                        showTreeByFloorName(arr[0], arr[1]);
                        if (o.path != undefined) {
                            o.clickonObj(o);
                        }
                        else {
                            try {
                                arr[2].clickonObj(arr[2]);
                            }
                            catch (ggg) { }
                            var b = { x: o.attrs.x, y: o.attrs.y, width: 100, height: 100 };
                            Application.DocumentManager.items.items[0].viewport.zoomToPoint(b);

                        }
                    }
                    break;
                case "rdShopName":
                    var arr = [];
                    var o = getfloorByShopName(arr, cmb.getValue())
                    showTreeByFloorName(arr[0], arr[1]);
                    if (o.path != undefined)
                        o.clickonObj(o);
                    else {
                        try {
                            arr[2].clickonObj(arr[2]);
                        }
                        catch (ggg) { }
                        var b = { x: o.attrs.x, y: o.attrs.y, width: 100, height: 100 };
                        Application.DocumentManager.items.items[0].viewport.zoomToPoint(b);

                    }
                    return;
                    // fillAssetListByShopName();
                    break;
                case "rdEmpNumber":
                    try {
                        var arr = [];
                        var o = getfloorByObjectID(arr, cmb.getValue());
                        if (o == undefined) {
                            for (var i = 0; i < Application.myWaitList.length; i++) {
                                if (cmb.getValue() == Application.myWaitList[i].companyId) {
                                    Application.MyGridTabs.setActiveTab(1);
                                    Application.MyGridTabs.items.items[1].items.items[0].getSelectionModel().clearSelections();
                                    for (var row = 0; row < Application.MyGridTabs.items.items[1].items.items[0].getView().getRows().length; row++) {
                                        if (Application.MyGridTabs.items.items[1].items.items[0].getView().getRows()[row].firstChild.firstChild.firstChild.firstChild.innerText == Application.myWaitList[i].eid) {
                                            Application.MyGridTabs.items.items[1].items.items[0].getSelectionModel().selectRow(row);
                                            Application.MyGridTabs.items.items[1].items.items[0].getView().focusRow(row);

                                        }
                                    }
                                    // var c = Application.myWaitList.find(o => o.eid == Application.myWaitList[i].eid);

                                    //           Application.MyGridTabs.items.items[1].items.items[0].getSelectionModel().select(0);
                                    //Application.MyGridTabs.items.items[1].items.items[0].getSelectionModel().selectRow(i);
                                    //  var row = Application.MyGridTabs.items.items[1].items.items[0].getView().findRowIndex(c); // Getting HtmlElement here
                                    //  Application.MyGridTabs.items.items[1].items.items[0].getView().focusRow(row);
                                    //                            Ext.get(row).highlight();
                                    //                            Ext.get(row).focus();
                                    break;
                                }
                            }
                            if (o == undefined) {
                                for (i = 0; i < Application.myHiddenList.length; i++) {
                                    if (cmb.getValue() == Application.myHiddenList[i].companyId) {
                                        Application.MyGridTabs.setActiveTab(2);
                                        Application.MyGridTabs.items.items[2].items.items[0].getSelectionModel().clearSelections();
                                        for (var row = 0; row < Application.MyGridTabs.items.items[2].items.items[0].getView().getRows().length; row++) {
                                            if (Application.MyGridTabs.items.items[2].items.items[0].getView().getRows()[row].firstChild.firstChild.firstChild.firstChild.innerText == Application.myHiddenList[i].eid) {
                                                Application.MyGridTabs.items.items[2].items.items[0].getSelectionModel().selectRow(row);
                                                Application.MyGridTabs.items.items[2].items.items[0].getView().focusRow(row);

                                            }
                                        }
                                        // Application.MyGridTabs.items.items[2].items.items[0].getSelectionModel().selectRow(i);
                                        // var row = Application.MyGridTabs.items.items[2].items.items[0].getView().getRow(i); 
                                        // Application.MyGridTabs.items.items[2].items.items[0].getView().focusRow(row);
                                        break;
                                    }
                                }
                            }
                        }
                        else {
                            showTreeByFloorName(arr[0], arr[1]);
                            try {
                                arr[2].clickonObj(arr[2]);
                            }
                            catch (ggg) { }
                            var b = { x: o.attrs.x, y: o.attrs.y, width: 100, height: 100 };
                            Application.DocumentManager.items.items[0].viewport.zoomToPoint(b);
                        }
                        return;
                    }
                    catch (r) { }
                    break;
                case "rdEmployee":
                case "rdObject":
                    var arr = [];
                    if (cmb.getValue().indexOf("-" + trns("טרקלין")) > -1) {
                        for (i = 0; i < Application.myWaitList.length; i++) {
                            if (cmb.getValue() == Application.myWaitList[i].name + " " + Application.myWaitList[i].lastName + "-" + trns("טרקלין")) {
                                Application.MyGridTabs.setActiveTab(1);
                                Application.MyGridTabs.items.items[1].items.items[0].getSelectionModel().clearSelections();
                                //           Application.MyGridTabs.items.items[1].items.items[0].getSelectionModel().select(0);
                                //Application.MyGridTabs.items.items[1].items.items[0].getSelectionModel().selectRow(i);
                                //var c = Application.myWaitList.find(o => o.eid == Application.myWaitList[i].eid);

                                //           Application.MyGridTabs.items.items[1].items.items[0].getSelectionModel().select(0);
                                //Application.MyGridTabs.items.items[1].items.items[0].getSelectionModel().selectRow(i);
                                //Application.MyGridTabs.items.items[1].items.items[0].getView().focusEl = c;

                                for (var row = 0; row < Application.MyGridTabs.items.items[1].items.items[0].getView().getRows().length; row++) {
                                    if (Application.MyGridTabs.items.items[1].items.items[0].getView().getRows()[row].firstChild.firstChild.firstChild.firstChild.innerText == Application.myWaitList[i].eid) {
                                        Application.MyGridTabs.items.items[1].items.items[0].getSelectionModel().selectRow(row);
                                        Application.MyGridTabs.items.items[1].items.items[0].getView().focusRow(row);

                                    }
                                }


                                //var row = Application.MyGridTabs.items.items[1].items.items[0].getView().findRowIndex(i); // Getting HtmlElement here
                                //                            Ext.get(row).highlight();
                                //                            Ext.get(row).focus();
                                break;
                            }
                        }
                    }
                    else if (cmb.getValue().indexOf("-" + trns("מוסתר")) > -1) {
                        for (i = 0; i < Application.myHiddenList.length; i++) {
                            if (cmb.getValue() == Application.myHiddenList[i].name + " " + Application.myHiddenList[i].lastName + "-" + trns("מוסתר")) {
                                Application.MyGridTabs.setActiveTab(2);
                                Application.MyGridTabs.items.items[2].items.items[0].getSelectionModel().clearSelections();
                                for (var row = 0; row < Application.MyGridTabs.items.items[2].items.items[0].getView().getRows().length; row++) {
                                    if (Application.MyGridTabs.items.items[2].items.items[0].getView().getRows()[row].firstChild.firstChild.firstChild.firstChild.innerText == Application.myHiddenList[i].eid) {
                                        Application.MyGridTabs.items.items[2].items.items[0].getSelectionModel().selectRow(row);
                                        Application.MyGridTabs.items.items[2].items.items[0].getView().focusRow(row);

                                    }
                                }
                                ////           Application.MyGridTabs.items.items[1].items.items[0].getSelectionModel().select(0);
                                //Application.MyGridTabs.items.items[2].items.items[0].getSelectionModel().selectRow(i);
                                //var row = Application.MyGridTabs.items.items[2].items.items[0].getView().getRow(i); // Getting HtmlElement here
                                //Application.MyGridTabs.items.items[2].items.items[0].getView().focusRow(row);
                                ////                            Ext.get(row).highlight();
                                //                            Ext.get(row).focus();
                                break;
                            }
                        }
                    }
                    else {
                        var o = getfloorByObject(arr, cmb.getValue())
                        showTreeByFloorName(arr[0], arr[1]);
                        try {
                            arr[2].clickonObj(arr[2]);
                        }
                        catch (ggg) { }
                        var b = { x: o.attrs.x, y: o.attrs.y, width: 100, height: 100 };
                        Application.DocumentManager.items.items[0].viewport.zoomToPoint(b);
                    }
                    return;
                    //  showTreeFloorByObject();
                    break;
                case "rdUsage":
                    showTreeFloorByUsage();
                    break;
                case "rdAreaUsage":
                    showTreeFloorByAreaUsage();
                    break;
            }
        }
        if (bPartial)
            return;
        var extbox = new WcDb.Extents();
        var f = [];
        Application.DocumentManager.ActiveDocument().objects.each(function (item, index, length) {
            if (Application.Man != true) {
                if (item.UId == undefined && item.paper.showBack == true) {
                    for (var i = 0; i < f.length; i++) {
                        if (f[i].floorInd == item.floorInd) {
                            item.show();
                        }
                    }
                }
            }
            if (item.isVisable == true && item.UId != undefined) {
                if (item.UId.toString().indexOf("F") > -1)
                    f.push(item);
                extbox.add(this.getBBox());
            }

        });

        var bx = extbox.minx;
        var by = extbox.miny;
        var bw = extbox.width;
        var bh = extbox.height;
        var w = Application.DocumentManager.items.items[0].viewport.getWidth();
        var h = Application.DocumentManager.items.items[0].viewport.getHeight();

        var coords1 = new Array();
        coords1[0] = bx;
        coords1[1] = by;
        Application.DocumentManager.items.items[0].database.zoomlevel = Math.max(bw / w, bh / h);
        var coords2 = new Array();
        coords2[0] = bx + bw;
        coords2[1] = by + bh;

        var maxx = coords2[0];
        var maxy = coords2[1];
        var minx = coords1[0];
        var miny = coords1[1];
        var offsetX = 0, offsetY = 0;
        if ((maxx - minx) / w < (maxy - miny) / h) {
            offsetX = -(w * Application.DocumentManager.items.items[0].database.zoomlevel) / 2 + (maxx - minx) / 2;
        }
        else {
            offsetY = -(h * Application.DocumentManager.items.items[0].database.zoomlevel) / 2 + (maxy - miny) / 2;
        }
        Application.DocumentManager.items.items[0].database.origin[0] = bx + offsetX;
        Application.DocumentManager.items.items[0].database.origin[1] = by + offsetY;
        if (Raphael.vml)
            Application.DocumentManager.items.items[0].database.origin[1] -= (extbox.maxy + extbox.miny); //extbox.maxy;
        Application.DocumentManager.items.items[0].viewport.SetViewbox(true);
        //                                if (f.
        //                                obj.removeGlow(obj.paper.selObj);

    }

    Application.NewDocument();
    $('.x-superboxselect-item').dblclick(function () { });

    RoutingEngine.processUrl();

});

function initializeObjectFromInfo(info) {
    var c = {};

    if (!info) {
        return c;
    }

    var arr = info.split(";");

    c.ObjectType = arr[0];
    c.firstName = arr[1];
    c.lastName = arr[2];
    c.UnicNumber = arr[3];
    c.company = arr[4];
    c.companyId = arr[5];
    c.division = arr[6];
    c.unit = arr[7];
    c.email = arr[8];
    c.url = arr[9];
    c.homePhone = arr[11];
    c.busPhone = arr[12];
    c.mobPhone = arr[13];
    c.fax = arr[14];
    c.OfficeAddress = arr[15];
    c.homeAddress = arr[16];
    c.imAddress = arr[10];
    c.shift = arr[17];
    c.job = arr[18];

    return c;
}

// building object for waiting list and hidden list  
function getWaitListObjectFromSelectedObject(c, info, icon, canbooknearbyseats, emptype, moreData, pos, area, eid) {
    var data = {
        job: c.job,
        shift: c.shift,
        companyId: c.companyId,
        homeAddress: c.homeAddress,
        UnicNumber: c.UnicNumber,
        url: c.url,
        imAddress: c.imAddress,
        homePhone: c.homePhone,
        company: c.company,
        eid: eid,
        name: c.firstName ? c.firstName : c.name,
        lastName: c.lastName,
        Department: c.division ? c.division : c.Department,
        Unit: c.Unit ? c.Unit : c.unit,
        BackDate: c.OfficeAddress,
        Info: info,
        Icon: icon,
        AreaNum: area,
        Position: pos,
        data: moreData,
        emptype: emptype,
        canbooknearbyseats: canbooknearbyseats
    };

    return data;
}

function renderEmployeeGrid(grid, isHidden) {

    //Application.storeObjects.fields.clear();

    var fields = getFieldMappingForEmployeeLounge();

    var cols = getEmployeeColumnsByDrawing();

    var store = null;

    if (isHidden) {

        Application.hiddenObjects = new Ext.data.JsonStore({
            fields: fields,
            data: Application.myHiddenList
        });

        Application.hiddenObjects.on('datachanged', function (store) {

            if (Application.myHiddenList) {
                renderEmployeeGrid(Application.HiddenList.items.get(0), true);
            }
        });

        store = Application.hiddenObjects;
    } else {

        Application.storeObjects = new Ext.data.JsonStore({
            fields: fields,
            data: Application.myWaitList
        });

        Application.storeObjects.on('datachanged', function (store) {

            if (Application.WaitingList) {
                renderEmployeeGrid(Application.WaitingList.items.get(0), false);
            }
        });

        store = Application.storeObjects;
    }

    // Recreate store with dynamic fields
    grid.reconfigure(store, new Ext.grid.ColumnModel(cols));

    // Set the dynamically generated columns to the grid
    grid.getColumnModel().setConfig(cols);
    grid.getView().refresh(); // Refresh the view to reflect changes
}

// is the drawing opened in readonly mode? 
function isInReadonly() {

    if (Application.readOnly || Application.UserLavel == "ReadOnly") {
        return true;
    }

    if (Application.UserLavel == "SimulationUser") {

        if (isNullOrEmptyOrWhiteSpace(Application.SelectedDrawing)) {
            return true;
        }

        if (!Application.SelectedDrawing[27].endsWith("s")) {
            return true;
        }

        return false;
    }

    return false;
}
