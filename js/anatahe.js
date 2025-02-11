init()
function init(){
    cookies=getCookieArray()
    if(cookies["darkmode"]=="true"){
        cssvar("--frontcolor","white");
        cssvar("--backcolor","black");
    }
}
function getCookieArray(){
    var arr = new Array();
    if(document.cookie != ''){
        var tmp = document.cookie.split('; ');
        for(var i=0;i<tmp.length;i++){
            var data = tmp[i].split('=');
            arr[data[0]] = decodeURIComponent(data[1]);
        }
    }
    return arr;
}

function cssvar(cssid,value){
    document.documentElement.style.setProperty(cssid,value);
}

window.addEventListener("DOMContentLoaded",function(){
    var audioplay;
    var darkmode=document.getElementById("darkmodesetting");
    darkmode.addEventListener("change",darkmodechange);
    document.getElementById("darkmodesetting").checked=true;
})
function sentaku(){
    document.getElementById("ongen").scrollIntoView({behavior:"smooth"})
}
function gotop(){
    document.getElementById("top").scrollIntoView({behavior:"smooth"})
}
function getAudioFile(url,id){
    document.getElementById(`${id}button`).innerText="ダウンロード中...";
    fetch(url)
    .then(response => {
        if(response.ok){
        return response.blob()
    }else{
        throw new Error(`FetchError:${response.status}`);
    }
    })
    .then(blobData => {
        if(blobData){
        var blobUrl=URL.createObjectURL(blobData);
        let audioElement=document.createElement("audio");
        audioElement.id=id;
        audioElement.src=blobUrl;
        audioElement.controls=true
        audioElement.setAttribute("class","testaudio")
        const elm=document.getElementById(id);
        if(elm){
            throw new Error(`PredefinedID:${id}`);
        }
        let setDefaultPlay=document.createElement("button");
        setDefaultPlay.innerText="設定";
        setDefaultPlay.id=`${id}change`;
        setDefaultPlay.setAttribute("onclick",`setDefault('${id}')`);
        setDefaultPlay.setAttribute("class","buttons");
        document.getElementById(`${id}div`).appendChild(setDefaultPlay);
        document.getElementById(`${id}div`).appendChild(document.createElement("br"));
        document.getElementById(`${id}div`).appendChild(audioElement);
        document.getElementById(`${id}button`).remove();
    }
    })
    .catch(e => {
        console.log(e.message);
        showerror(e.message);
    })
}
function showerror(em){
    error=em.indexOf("FetchError")!==-1?"データが取得できませんでした":em.indexOf("PredefinedID")!==-1?"このIDはすでに使用されています":em.indexOf("CookiesAreNotAllowed")!==-1?"cookieの使用が許可されていません":"不明なエラーが発生しました";

}
function setDefault(id){
    let motoname=document.getElementById(`${id}span`).cloneNode(true);
    motoname.id="playname";
    motoname.setAttribute("class","playnames");
    let moto=document.getElementById(id);
    let playaudio = moto.cloneNode();
    playaudio.id="playaudio";
    playaudio.setAttribute("class","plaingaudio");
    let elm=document.getElementById("playname");
    if(elm){elm.remove()}
    elm=document.getElementById("playaudio");
    if(elm){elm.remove()}
    elm=document.getElementById("anaunsu")
    if(elm){elm.remove()}
    document.getElementById("floatmenu2").appendChild(motoname);
    document.getElementById("floatmenu2").appendChild(playaudio);
    audioplay=document.getElementById("playaudio");
    audioplay.addEventListener("timeupdate",isscroll,false);
    autoclose();
}
function autoclose(){
    document.getElementById("menuswitch").click();
}
function isscroll(){
    const duration=audioplay.duration;
    const cTime=audioplay.currentTime;
    if(document.getElementById("scrollcheck").checked!=true){return};
    if(cTime>220){
        document.getElementById("30").scrollIntoView({behavior:"smooth"})
    }else if(cTime>195){
        document.getElementById("28").scrollIntoView({behavior:"smooth"})
    }else if(cTime>174){
        document.getElementById("25").scrollIntoView({behavior:"smooth"})
    }else if(cTime>151){
        document.getElementById("21").scrollIntoView({behavior:"smooth"})
    }else if(cTime>128){
        document.getElementById("16").scrollIntoView({behavior:"smooth"})
    }else if(cTime>82){
        document.getElementById("10").scrollIntoView({behavior:"smooth"})
    }else if(cTime>58){
        document.getElementById("6").scrollIntoView({behavior:"smooth"})
    }else if(cTime>12){
        document.getElementById("1").scrollIntoView({behavior:"smooth"})
    }else{
        document.getElementById("top").scrollIntoView({behavior:"smooth"})
    }
    //scrollBy(0,(cTime/duration)/document.documentElement.offsetHeight);
}

function darkmodechange(){
    if (document.getElementById("darkmodesetting").checked==true){
        settingsave("darkmode","true",180);
        cssvar("--frontcolor","white");
        cssvar("--backcolor","black");
    }else{
        settingsave("darkmode","false",180);
        cssvar("--frontcolor","black");
        cssvar("--backcolor","white");
    }
}

function deletecookie(){
    if (window.confirm("注意⚠cookieがすべて削除されます")){
        document.cookie="confirmed='true';max-age=0";
        document.getElementById("settingsave").checked=false;
        document.getElementById("cookiesetting").checked=false;
    }else{
        window.alert("キャンセルしました")
    };}
function cookieconfirm(){
    document.cookie="confirmed=true;max-age=180"
    document.getElementById("cookiesetting").checked=true;

}
function settingsave(cookieid,cookievalue,maxage=0){
    cookies=getCookieArray()
    if(cookies["confirmed"]=="true"){
        document.cookie=`${cookieid}=${cookievalue};max-age=${maxage}`
    }else if(document.cookie.indexOf("confirmed")!==-1){
        showerror("CookiesAreNotAllowed")
    }
}
function settingsavecancel(){
    document.getElementById("settingsave").checked=false;
    window.alert("キャンセルしました");
}
function settingsavechange(){
    if(document.getElementById("settingsave").checked==true){
        if(document.cookie.indexOf("confirmed")==-1){
            window.confirm("注意⚠この機能は実験的に実装されています。\n表示がおかしくなった場合は、この設定をオフにしてください\nこの機能ではブラウザのcookieを使用します。(これを有効化するとcookieの使用に同意します)\n有効期限＝約３ヶ月")?cookieconfirm():settingsavecancel();
        }
    }

}