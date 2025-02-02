window.addEventListener("DOMContentLoaded",function(){
    var audioplay;
    var darkmode=document.getElementById("darkmodesetting");
    darkmode.addEventListener("change",darkmodechange);
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
    error=em.indexOf("FetchError")!==-1?"データが取得できませんでした":em.indexOf("PredefinedID")!==-1?"このIDはすでに使用されています":"エラーが発生しました";

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
        document.documentElement.style.setProperty("--frontcolor","white");
        document.documentElement.style.setProperty("--backcolor","black");
    }else{
        document.documentElement.style.setProperty("--frontcolor","black");
        document.documentElement.style.setProperty("--backcolor","white");
    }
}

function eazyuichange(){
    eazyui=document.getElementById("eazyuisetting")
    if(eazyui.checked==true){
        document.getElementById("top").style.display="none";
        document.getElementById("gotop").style.display="none";
    }else{
        document.getElementById("top").style.display="block";
        document.getElementById("gotop").style.display="block";
    }
}