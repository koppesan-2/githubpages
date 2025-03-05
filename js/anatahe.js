init();
//redtime=[12.88,24.92,30.77,42.76,54.23,59.51,65.30,70.97,76.75,82.47,94.44,100.36,112.45,128.91,134.78,140.56,146.37,152.02,157.05,163.38,170.40,174.59,180.40,186.08,196.73,201.84,208.14];//,218.75,232.08,235.57];
redtime=[12,24,30,42,53,58,64.5,70.2,76.2,81.8,93.8,99.7,111.8,119,128,134,140,145.2,151,157,162.5,169.6,174,180,185.5,195.5,201,206.8,219];
redtime2=[12,23,29,40.5,52,58,63.5,70.2,76.2,81.8,93.8,99.7,111.8,119,128,134,140,145.2,151,157,162.5,169.6,174,180,185.5,195.5,201,206.8,219];
lyrics=30
latestredcolor=-1
latestmusic=""
audiocontext=""
track=""
audioplaygainnode=""
function init(){
    cookiemaxages=7776000
    if(document.cookie.indexOf("confirmed")!==-1){
    cookies=getCookieArray()
    if(cookies["settingsave"]=="true"){
    if(cookies["darkmode"]=="true"){
        cssvar("--frontcolor","white");
        cssvar("--backcolor","black");
    }}}

}
window.addEventListener("DOMContentLoaded",function(){
    gotop("auto");
    var audioplay;
    var darkmode=document.getElementById("darkmodesetting");
    darkmode.addEventListener("change",darkmodechange);
    loadsettings();
    document.getElementById("loadingcontent").innerText="ロード完了";
    document.getElementById("loadingdiv").setAttribute("class","loaded");
    this.setTimeout(function(){
    document.getElementById("loadingdiv").style.display="none";
    },1000);
})
function loadsettings(){
    cookies=getCookieArray()
    if(cookies["confirmed"]=="true"){cookieconfirmchange()};
    if(cookies["settingsave"]=="true"){document.getElementById("settingsave").checked=true;}else{return};
    if(cookies["darkmode"]=="true"){document.getElementById("darkmodesetting").checked=true;};
    if(cookies["scroll"]=="false"){document.getElementById("scrollcheck").checked=false;};
    if(cookies["eazyui"]=="true"){document.getElementById("eazyuisetting").checked=true;eazyuichange();};
    if(cookies["redshow"]=="true"){document.getElementById("redshow").checked=true;};
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
function scroll(to,scbehavior="smooth"){
    document.getElementById(to).scrollIntoView({behavior:scbehavior});
}
function sentaku(){
    scroll("ongen");
}
function gotop(how=undefined){
    scroll("top",how);
}
function getAudioFile(url,id){
    document.getElementById(`${id}button`).style=""
    if(document.getElementById(id)){document.getElementById(id).remove();}
    if(document.getElementById(`${id}change`)){document.getElementById(`${id}change`).remove();}
    if(document.getElementById(`${id}br`)){document.getElementById(`${id}br`).remove();}
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
        audiobr=document.createElement("br");
        audiobr.id=`${id}br`;
        document.getElementById(`${id}div`).appendChild(audiobr);
        document.getElementById(`${id}div`).appendChild(audioElement);
        document.getElementById(`${id}button`).innerHTML='<svg style="transform: translateX(-50%);" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 512 512"><path d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z"/></svg>'
        document.getElementById(`${id}button`).style="transform:translateY(20%);width:40px;height:60px;fill:#fff;"
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
function setDefault(id,disboost=false){
    latestmusic=id
    let motoname=document.getElementById(`${id}span`).cloneNode(true);
    motoname.id="playname";
    motoname.setAttribute("class","playnames");
    let moto=document.getElementById(id);
    let playaudio = moto.cloneNode();
    playaudio.id="playaudio";
    playaudio.setAttribute("class",`playingaudio plays${id}`);
    removeelm("playname")
    removeelm("playaudio")
    removeelm("anaunsu")
    removeelm("volumebutton")
    removeelm("volumespan")
    removeelm("playbr")
    removeelm("volumetogglebutton")
    removeelm("volumetogglelabel")
    document.getElementById("floatmenu2").appendChild(motoname);
    document.getElementById("floatmenu2").appendChild(playaudio);
    audioplay=document.getElementById("playaudio");
    audioplay.addEventListener("timeupdate",isscroll,false);
    if(disboost!=true){
    audiobr=document.createElement("br");
    audiobr.id="playbr";
    document.getElementById("floatmenu2").appendChild(audiobr)
    audiocontext=new AudioContext();
    audioplaygainnode=audiocontext.createGain();
    track=audiocontext.createMediaElementSource(audioplay);
    track.connect(audioplaygainnode).connect(audiocontext.destination);
    }
    volumeboostbuttonset(disboost);
    togglebuttonset("floatmenu2","volumetoggle","volumeboostonoff()",true,disboost)
    autoclose();
document.addEventListener("keydown",event=>{
    if(event.code==="KeyK"){
        if(document.getElementById("playaudio").paused){
            document.getElementById("playaudio").play()
        }else{
            document.getElementById("playaudio").pause()
        }
    }
})
}
function removeelm(id){
    if(document.getElementById(id)){
        document.getElementById(id).remove()
    }
}
function togglebuttonset(id,name=id,com=undefined,mini=false,disboost=false){
    button=document.createElement("input")
    button.type="checkbox"
    button.id=`${name}button`
    button.setAttribute("class",mini?"minitoggleswitch":"toggleswitch")
    button.setAttribute("onclick",com)
    if(disboost){button.checked=false}else{button.checked=true}
    label=document.createElement("label")
    label.id=`${name}label`
    label.setAttribute("class",mini?"minitogglelabel":"togglelabel")
    label.setAttribute("for",`${name}button`)
    document.getElementById(id).appendChild(button)
    document.getElementById(id).appendChild(label)
}
function volumeboostbuttonset(disboost){
    volumebutton=document.createElement("input");
    volumebutton.type="range"
    volumebutton.id="volumebutton"
    volumebutton.setAttribute("oninput","volumeboost()")
    volumebutton.setAttribute("max","10");
    volumebutton.setAttribute("min","0");
    volumebutton.setAttribute("value","1");
    volumebutton.setAttribute("step","0.01");
    if(disboost==true){
        volumebutton.setAttribute("disabled","");
    }
    document.getElementById("floatmenu2").appendChild(volumebutton)
    volumespan=document.createElement("span");
    volumespan.id="volumespan"
    volumespan.innerText="🔉100%"
    document.getElementById("floatmenu2").appendChild(volumespan)
}
function volumeboost(){
    volumelevel=document.getElementById("volumebutton").value
    volumeleveltext=Math.round(volumelevel*100)
    volumecontrol(audioplaygainnode,volumelevel)
    document.getElementById("volumespan").innerText=`${volumeleveltext==0?"🔇"+volumeleveltext:volumeleveltext<100?"🔈"+volumeleveltext:volumeleveltext<200?"🔉"+volumeleveltext:volumeleveltext<300?"🔊"+volumeleveltext:volumeleveltext<400?"⚠"+volumeleveltext:volumeleveltext<800?"⚠警告⚠"+volumeleveltext:"🤯"+volumeleveltext}%`
}
function volumecontrol(id,level){
    id.gain.value=level
}
function volumeboostonoff(){
    if(document.getElementById("volumetogglebutton").checked==true){
        setDefault(latestmusic,false);
    }else{
        setDefault(latestmusic,true);
    }
}
function autoclose(){
    document.getElementById("menuswitch").checked=false;
}
function redshow(){
    document.getElementById("redshow").checked==true?settingsave("redshow",true,cookiemaxages):settingsave("redshow",false,cookiemaxages);
    removeallreds();
}
function scrollchange(){
    document.getElementById("scrollcheck").checked==true?settingsave("scroll",true,cookiemaxages):settingsave("scroll",false,cookiemaxages);
}
function isscroll(){
    const duration=audioplay.duration;
    const cTime=audioplay.currentTime;
    if(document.getElementById("redshow").checked){redshowmove(cTime)};
    if(document.getElementById("scrollcheck").checked!=true){return};
    if(cTime>220){
        document.getElementById("27").scrollIntoView({behavior:"smooth"})
    }else if(cTime>195){
        document.getElementById("25").scrollIntoView({behavior:"smooth"})
    }else if(cTime>174){
        document.getElementById("22").scrollIntoView({behavior:"smooth"})
    }else if(cTime>151){
        document.getElementById("18").scrollIntoView({behavior:"smooth"})
    }else if(cTime>128){
        document.getElementById("14").scrollIntoView({behavior:"smooth"})
    }else if(cTime>82){
        document.getElementById("9").scrollIntoView({behavior:"smooth"})
    }else if(cTime>58){
        document.getElementById("5").scrollIntoView({behavior:"smooth"})
    }else if(cTime>12){
        document.getElementById("0").scrollIntoView({behavior:"smooth"})
    }else{
        document.getElementById("top").scrollIntoView({behavior:"smooth"})
    }
    //scrollBy(0,(cTime/duration)/document.documentElement.offsetHeight);
}
function removeallreds(){
    for(i=0;i<redtime.length;i++){
        document.getElementById(i).style.backgroundColor="";
    }
}
function redshowmove(time,type=redtime){
    for(i=type.length-1;type[i]>time;i--){};
    if(i==-1){document.getElementById(0).style.backgroundColor="";latestredcolor=-1;return;};
    if(latestredcolor==i){return;};
    if(latestredcolor!=-1){document.getElementById(latestredcolor).style.backgroundColor="";};
    document.getElementById(i).style.backgroundColor="red"
    latestredcolor=i
}
/*function redshowmove(time){
    colored=0
    for(var i=redtime.length;i!=-1;i--){
        if(colored==1){
            document.getElementById(i).style.backgroundColor="";
        }else if(redtime[i]<time){
            document.getElementById(i).style.backgroundColor="red";
            colored=1;
        }else{
            document.getElementById(i).style.backgroundColor="";
        }
    }
}*/
function darkmodechange(){
    if (document.getElementById("darkmodesetting").checked==true){
        settingsave("darkmode","true",cookiemaxages);
        cssvar("--frontcolor","white");
        cssvar("--backcolor","black");
    }else{
        settingsave("darkmode","false",cookiemaxages);
        cssvar("--frontcolor","black");
        cssvar("--backcolor","white");
    }
}
function deletecookie(){
    if (window.confirm("注意⚠cookieがすべて削除されます")){
        settingsave("settingsave");
        settingsave("darkmode");
        settingsave("scroll");
        settingsave("confirmed");
        settingsave("eazyui");
        settingsave("redshow")
        document.getElementById("settingsave").checked=false;
        document.getElementById("cookiesetting").checked=false;
    }else{
        window.alert("キャンセルしました")
    };}
function settingsave(cookieid,cookievalue=false,maxage=0){
    cookies=getCookieArray()
    if(cookies["confirmed"]=="true"){
        document.cookie=`${cookieid}=${cookievalue};max-age=${maxage}`
    }else if(document.cookie.indexOf("confirmed")!==-1){
        showerror("CookiesAreNotAllowed")
    }
}
function settingsaveon(){
    cookieconfirmchange()
    document.getElementById("settingsave").checked=true;
    settingsave("settingsave",true,cookiemaxages);
    settingsave("darkmode",document.getElementById("darkmodesetting").checked,cookiemaxages);
    settingsave("scroll",document.getElementById("scrollcheck").checked,cookiemaxages);
    settingsave("eazyui",document.getElementById("eazyuisetting").checked,cookiemaxages);
    settingsave("redshow",document.getElementById("redshow").checked,cookiemaxages);
}
function settingsavecancel(){
    document.getElementById("settingsave").checked=false;
    window.alert("キャンセルしました");
}
function cookieconfirmchange(user){
    if(user&&document.getElementById("cookiesetting").checked==false){
        window.alert("cookie消去を行うと、使用許可も外れます")
    }
    document.cookie=`confirmed=true;max-age=${cookiemaxages}`
    document.getElementById("cookiesetting").checked=true;
}
function settingsavechange(){
    if(document.getElementById("settingsave").checked==true){
        if(document.cookie.indexOf("confirmed")==-1){
            if(window.confirm("ページを再読込しても設定が再読込前のまま残るようになります\n注意⚠この機能は実験的に実装されています。\n表示がおかしくなった場合は、この設定をオフにしてください\nこの機能ではブラウザのcookieを使用します。\n(これを有効化するとcookieの使用に同意します)\n有効期限＝約３ヶ月")===false){
                settingsavecancel();
                return
            }
        }
        settingsaveon();
    }else{
        settingsave("settingsave",false,0);
    }
}
function eazyuichange(){
    eazyui=document.getElementById("eazyuisetting")
    if(eazyui.checked==true){
        settingsave("eazyui",true,cookiemaxages)
        document.getElementById("top").style.display="none";
        document.getElementById("gotop").style.display="none";
    }else{
        settingsave("eazyui",false,cookiemaxages)
        document.getElementById("top").style.display="block";
        document.getElementById("gotop").style.display="block";
    }
}

function floatopenclose(){
    if(document.getElementById("floatmenuswitch").checked==true){
        document.getElementById("floatmenu").setAttribute("class","closed")
    }else{
    document.getElementById("floatmenu").setAttribute("class","")
    }
}