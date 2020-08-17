(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{199:function(e,a,t){e.exports=t(402)},204:function(e,a,t){},205:function(e,a,t){},402:function(e,a,t){"use strict";t.r(a);var n=t(1),l=t.n(n),c=t(59),r=t.n(c),i=(t(204),t(19)),s=t(7),m=(t(205),t(87)),o=t.n(m),d=t(15),u=t(155),p=t(45),E=(t(96),function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("nav",{className:"navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row"},l.a.createElement("div",{className:"text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"},l.a.createElement(i.b,{className:"navbar-brand brand-logo",to:"/"},l.a.createElement("h3",null,"Scrap Me")),l.a.createElement(i.b,{className:"navbar-brand brand-logo-mini",to:"/"},l.a.createElement("img",{src:"/assets/images/logo-mini.svg",alt:"logo"}))),l.a.createElement("div",{className:"navbar-menu-wrapper d-flex align-items-stretch"},l.a.createElement("button",{className:"navbar-toggler navbar-toggler align-self-center",type:"button","data-toggle":"minimize"},l.a.createElement("span",{className:"mdi mdi-menu"})),l.a.createElement("ul",{className:"navbar-nav navbar-nav-right"},l.a.createElement("li",{className:"nav-item full-screen-link"},l.a.createElement("a",{className:"nav-link"},l.a.createElement("i",{className:"mdi mdi-fullscreen",id:"fullscreen-button"}))),l.a.createElement("li",{className:"nav-item "},l.a.createElement("a",{className:"nav-link",href:"#"},l.a.createElement("i",{className:"mdi mdi-format-line-spacing"})))),l.a.createElement("button",{className:"navbar-toggler navbar-toggler-right d-lg-none align-self-center",type:"button","data-toggle":"offcanvas"},l.a.createElement("span",{className:"mdi mdi-menu"})))))}),f=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("nav",{className:"sidebar sidebar-offcanvas",id:"sidebar"},l.a.createElement("ul",{className:"nav"},l.a.createElement("li",{className:"nav-item"},l.a.createElement(i.b,{className:"nav-link",to:"/"},l.a.createElement("span",{className:"menu-title"},"Home"),l.a.createElement("i",{className:"mdi mdi-home menu-icon"}))))))},g=t(157),b=t.n(g),v={serverURL:window.location.origin,showNotification:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Something went wrong",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"error";b.a.show({title:"",message:e,messageSize:12,position:"topRight",theme:"dark",pauseOnHover:!0,progressBarColor:"success"===a?"#00ffb8":"#ffafb4",color:"#565c70",messageColor:"success"===a?"#00ffb8":"#ffafb4",icon:"success"===a?"mdi mdi-check":"mdi mdi-alert-circle-outline"})}},N=t(158),h=t.n(N),x=t(159),w=t.n(x),y=t(62),C=t(37),j=t(44),O=["#0088FE","#00C49F","#fe7c96"],k=Math.PI/180,S=function(e){var a=e.cx,t=e.cy,n=e.midAngle,c=e.innerRadius,r=e.outerRadius,i=e.percent,s=(e.index,c+.5*(r-c)),m=a+s*Math.cos(-n*k),o=t+s*Math.sin(-n*k);return l.a.createElement("text",{x:m,y:o,fill:"white",textAnchor:m>a?"start":"end",dominantBaseline:"central"},"".concat((100*i).toFixed(0),"%"))},F=function(e){var a=Object(n.useState)({site:"",currentCopiedText:"",displayFilter:"all",isLoading:!1}),t=Object(p.a)(a,2),c=t[0],r=t[1],i=Object(n.useState)([]),s=Object(p.a)(i,2),m=s[0],g=s[1],b=Object(n.useState)([{name:"Total Email",value:100},{name:"Copied",value:50},{name:"Not Copied",value:50}]),N=Object(p.a)(b,2),x=N[0],k=N[1];Object(n.useEffect)((function(){m.length&&k([{name:"Total Email",value:m.length},{name:"Copied",value:m.filter((function(e){return!0===e.isCopied})).length},{name:"Not Copied",value:m.filter((function(e){return!1===e.isCopied})).length}])}),[m,c.currentCopiedText]);var F=Object(n.useState)(),T=Object(p.a)(F,2)[1],R=Object(n.useRef)(new w.a({autoForceUpdate:{forceUpdate:T},className:"small text-danger text-left mdi mdi-alert pt-1 pl-1"})),I=function(){var e=Object(u.a)(o.a.mark((function e(){var a,t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!R.current.allValid()){e.next=15;break}return r(Object(d.a)(Object(d.a)({},c),{},{isLoading:!0})),e.prev=2,e.next=5,h.a.post("/api/scrap",{site:c.site});case 5:a=e.sent,r(Object(d.a)(Object(d.a)({},c),{},{isLoading:!1})),"success"!==a.data.data.status?v.showNotification(void 0!==typeof a.data.data.result?a.data.data.result:"Server error","error"):"success"===a.data.data.status&&(a.data.data.result.length?v.showNotification("Scrap is successful","success"):v.showNotification("No Email can be scrapped","error"),t=[],a.data.data.result.forEach((function(e,a){var n={index:a,email:e,isCopied:!1};t.push(n)})),g(t)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),v.showNotification(void 0!==typeof e.t0.response.data.data.result?e.t0.response.data.data.result:"Server error","error");case 13:e.next=17;break;case 15:R.current.showMessages(),T(1);case 17:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(){return e.apply(this,arguments)}}(),L=function(e,a){r(Object(d.a)(Object(d.a)({},c),{},{currentCopiedText:a})),m[e].isCopied=!0};return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"container-scroller"},l.a.createElement(E,null),l.a.createElement("div",{className:"container-fluid page-body-wrapper"},l.a.createElement(f,null),l.a.createElement("div",{className:"main-panel"},l.a.createElement("div",{className:"content-wrapper"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-12 grid-margin stretch-card"},l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body text-center"},l.a.createElement("div",{className:"forms-sample"},l.a.createElement("div",{className:"form-group"},l.a.createElement("input",{type:"text",id:"site",name:"site",onChange:function(e){r(Object(d.a)(Object(d.a)({},c),{},{site:e.target.value}))},value:c.site,className:"form-control",placeholder:"Enter Site Name"}),R.current.message("site name",c.site,"required|url")),l.a.createElement("button",{type:"button",disabled:c.isLoading,className:"btn btn-gradient-primary mr-2",onClick:I},"Start Scrapping",c.isLoading?"...":""))))),l.a.createElement("div",{className:"col-md-12 grid-margin stretch-card"},l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body text-center"},l.a.createElement("h4",{className:"card-title"},"Total Email Scrapped: ",m.length),l.a.createElement(j.d,{width:220,height:220,className:"mx-auto"},l.a.createElement(j.c,{data:x,cx:110,cy:110,labelLine:!1,label:S,outerRadius:55,fill:"#da8cff",dataKey:"value",isAnimationActive:!0},x.map((function(e,a){return l.a.createElement(j.a,{key:"cell-".concat(a),fill:O[a%O.length]})}))),l.a.createElement(j.b,null))))),l.a.createElement("div",{className:"col-md-12 grid-margin stretch-card"},l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement("div",{className:"pt-3 pb-3"},l.a.createElement("div",{className:"d-flex flex-column flex-md-row justify-content-md-between"},l.a.createElement("div",{className:"d-flex flex-row"},l.a.createElement("div",{className:"p-2"},l.a.createElement("div",{className:"input-group input-group-sm"},l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"Display")),l.a.createElement("select",{className:"form-control form-control-sm btn btn-primary",defaultValue:c.displayFilter,onChange:function(e){r(Object(d.a)(Object(d.a)({},c),{},{displayFilter:e.target.value}))}},l.a.createElement("option",{value:"all"},"All"),l.a.createElement("option",{value:"copied"},"Copied"),l.a.createElement("option",{value:"not-copied"},"Not Copied"))))))),l.a.createElement("div",{className:"table-responsive"},l.a.createElement("table",{className:"table table-striped scrapped-email-table"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null," # "),l.a.createElement("th",null," Email "),l.a.createElement("th",{style:{width:"160px"}}," Action "))),l.a.createElement("tbody",null,function(){var e=1;return m.map((function(a,t){return l.a.createElement(l.a.Fragment,{key:t},l.a.createElement(C.If,{condition:"all"===c.displayFilter},l.a.createElement("tr",null,l.a.createElement("td",null," ",e++," "),l.a.createElement("td",null,l.a.createElement("i",{className:"mdi mdi-email-variant"})," ",l.a.createElement("code",null,a.email)," "),l.a.createElement("td",null,l.a.createElement(y.CopyToClipboard,{text:a.email,onCopy:function(){return L(t,a.email)}},l.a.createElement("button",{className:"btn btn-rounded btn-icon "+(a.isCopied?"btn-success":"btn-danger")},l.a.createElement("i",{className:"mdi mdi-content-paste"}))),a.isCopied?l.a.createElement("i",{className:"ml-2 text-success mdi mdi-check"}):""))),l.a.createElement(C.If,{condition:"copied"===c.displayFilter},l.a.createElement(C.If,{condition:a.isCopied},l.a.createElement("tr",null,l.a.createElement("td",null," ",e++," "),l.a.createElement("td",null,l.a.createElement("i",{className:"mdi mdi-email-variant"})," ",l.a.createElement("code",null,a.email)," "),l.a.createElement("td",null,l.a.createElement(y.CopyToClipboard,{text:a.email,onCopy:function(){return L(t,a.email)}},l.a.createElement("button",{className:"btn btn-rounded btn-icon "+(a.isCopied?"btn-success":"btn-danger")},l.a.createElement("i",{className:"mdi mdi-content-paste"}))),a.isCopied?l.a.createElement("i",{className:"ml-2 text-success mdi mdi-check"}):"")))),l.a.createElement(C.If,{condition:"not-copied"===c.displayFilter},l.a.createElement(C.If,{condition:!a.isCopied},l.a.createElement("tr",null,l.a.createElement("td",null," ",e++," "),l.a.createElement("td",null,l.a.createElement("i",{className:"mdi mdi-email-variant"})," ",l.a.createElement("code",null,a.email)," "),l.a.createElement("td",null,l.a.createElement(y.CopyToClipboard,{text:a.email,onCopy:function(){return L(t,a.email)}},l.a.createElement("button",{className:"btn btn-rounded btn-icon "+(a.isCopied?"btn-success":"btn-danger")},l.a.createElement("i",{className:"mdi mdi-content-paste"}))),a.isCopied?l.a.createElement("i",{className:"ml-2 text-success mdi mdi-check"}):"")))))}))}()))))))))))))},T=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"container-scroller"},l.a.createElement("div",{className:"container-fluid page-body-wrapper full-page-wrapper"},l.a.createElement("div",{className:"content-wrapper d-flex align-items-center text-center error-page bg-primary"},l.a.createElement("div",{className:"row flex-grow"},l.a.createElement("div",{className:"col-lg-7 mx-auto text-white"},l.a.createElement("div",{className:"row align-items-center d-flex flex-row"},l.a.createElement("div",{className:"col-lg-6 text-lg-right pr-lg-4"},l.a.createElement("h1",{className:"display-1 mb-0"},"404")),l.a.createElement("div",{className:"col-lg-6 error-page-divider text-lg-left pl-lg-4"},l.a.createElement("h2",null,"SORRY!"),l.a.createElement("h3",{className:"font-weight-light"},"The page you\u2019re looking for was not found."))),l.a.createElement("div",{className:"row mt-5"},l.a.createElement("div",{className:"col-12 text-center mt-xl-2"},l.a.createElement(i.b,{className:"text-white font-weight-medium",to:"/"},"Back to home")))))))))};var R=function(){return l.a.createElement(i.a,null,l.a.createElement(s.c,null,l.a.createElement(s.a,{exact:!0,path:"/",component:F}),l.a.createElement(s.a,{component:T})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[199,1,2]]]);
//# sourceMappingURL=main.614cb469.chunk.js.map