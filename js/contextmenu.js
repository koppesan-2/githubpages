document.oncontextmenu=oncontextmenu;
oncontextmenu=function(e){
    if (context_number>0){
        if(context_isopen==false){
            context_open();
        }else{
            context_close();
        }
    };
}
function context_init(){
    context_number=0;
    context_isopen=false;
    let context_div_main=document.createElement("div");
    context_div_main.id="context_div_main";
    let context_ul=document.createElement("ul");
    context_ul.id="context_ul"
    context_div_main.appendChild(context_ul);
    document.body.appendChild(context_div_main);
    document.addEventListener("click",function(){
        context_close()
    })
}
function context_open(){
    let context_main_id=document.getElementById("context_div_main");
    context_main_id.style.left=e.pageX+"px";
    context_main_id.style.top=e.pageY+"px";
    context_main_id.style.display="block";
    context_main_id.classList="fadeIn";
    context_isopen=true;
}
function context_close(){
    document.getElementById("context_div_main").classList="fadeOut";
    context_isopen=false;
}
function context_add_child(name="",innerHTML=""){
    context_number+=1;
    let context_ul=document.getElementById("context_ul");
    let context_li=document.createElement("li");
    context_li.className="context_li_button";
    context_li.id=name;
    context_li.setAttribute("onclick",`${name}()`);
    context_li.innerHTML=name+innerHTML;
    context_ul.appendChild(context_li);
}
function context_remove_child(name){
    context_number-=1;
    let context_li=document.getElementById(name);
    context_li.remove();
}
function context_rename(name,replace){
    if (context_number>0){
        let context_li=document.getElementById(name);
        context_li.innerHTML=replace;
    }
}
function context_remove(){
    let context_ul=document.getElementById("context_div_main");
    context_ul.remove();
    context_init();
}
function context_change_border(border){
    document.documentElement.style.setProperty("--context_border",border);
}
function context_change_radius(radius){
    document.documentElement.style.setProperty("--context_radius",radius);
}
function context_change_color_main(fg_color,bg_color){
    document.documentElement.style.setProperty("--context_fg_color_main",fg_color);
    document.documentElement.style.setProperty("--context_bg_color_main",bg_color);
};
function context_change_color_child(id,fg_color,bg_color,hover_color){
    if (id==""){
        var context_change_class=document.querySelectorAll(".context_li_button");
    }else{
        var context_change_class=document.querySelectorAll(`#${id}`);
    };
    context_change_class.forEach(function(value){
        value.style.setProperty("--context_hover_color",hover_color);
        value.style.setProperty("--context_fg_color",fg_color);
        value.style.setProperty("--context_bg_color",bg_color);
    })
};