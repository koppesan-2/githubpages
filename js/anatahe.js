window.addEventListener("DOMContentLoaded",function(){

})
function sentaku(){
    document.getElementById("ongen").scrollIntoView({behavior:"smooth"})
}
function gotop(){
    document.getElementById("top").scrollIntoView({behavior:"smooth"})
}
function getAudioFile(url,id){
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
        const elm=document.getElementById(id);
        if(elm){
            throw new Error(`PredefinedID:${id}`);
        }
        let setDefaultPlay=document.createElement("button");
        setDefaultPlay.innerText="設定";
        setDefaultPlay.id=`${id}change`;
        setDefaultPlay.setAttribute("onclick","autoclose()");
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
function autoclose(){
    document.getElementById("menuswitch").click();
}