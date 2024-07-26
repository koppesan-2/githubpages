window.addEventListener("DOMContentLoaded",function(){
    context_init();
    var context_funcjs = document.createElement("script");
    context_funcjs="js/func/contextmenu_func.js";
    document.body.appendChild(context_funcjs);
    var context_js=document.createElement("script");
    context_js="js/contextmenu.js";
    document.body.appendChild(context_js);
})
document.getElementById("contextchangep").addEventListener("contextmenu",function(){
    if (context_isopen==false){
    context_remove();
    context_add_child("gopreviouspage");
    context_rename("gopreviouspage","前のページへ<br><span style='color:gray;'>Alt+左矢印キー</span>");
    context_add_child("gonextpage");
    context_rename("gonextpage","次のページへ<br><span style='color:gray;'>Alt+右矢印キー</span>");
    }
})
document.getElementById("contextchangediv1").addEventListener("contextmenu",function(){
    if (context_isopen==false){
    context_remove();
    context_add_child("print");
    context_rename("print","このページを印刷する<br><span style='color:gray;'>Ctrl+P</span>");
    context_add_child("logcl");
    context_rename("logcl","ログをクリア");
    }
})