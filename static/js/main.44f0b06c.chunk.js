(this["webpackJsonpnot-minesweeper"]=this["webpackJsonpnot-minesweeper"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(6),c=n.n(o),u=(n(12),n(4)),l=n(1),i={too_easy:{grid_w:4,grid_l:4,mine_num:2},easy:{grid_w:10,grid_l:8,mine_num:10},kinda_easy:{grid_w:18,grid_l:14,mine_num:40}};function s(e){var t=e.data,n=e.updateBoard,o=e.flagCard,c=(e.incrementMoveCount,e.incrementFlagCount),u=e.decrementFlagCount,i=Object(a.useState)(!1),s=Object(l.a)(i,2),d=s[0],v=s[1],f=Object(a.useState)(!1),g=Object(l.a)(f,2),y=g[0],E=g[1];var b={color:m(t.value),background:function(e){return e.revealed&&"M"===e.value?function(){var e=Math.round,t=Math.random;return"rgba("+e(255*t())+","+e(255*t())+","+e(255*t())+","+t().toFixed(1)+")"}():e.revealed&&"M"!==e.value?function(e){return(e.x+e.y)%2===0?"#fad3ac":"#c29970"}(e):e.revealed?void 0:function(e){return(e.x+e.y)%2===0?"#6dba54":"#4f8a3d"}(e)}(t)},p=function(e){console.log("rightClicking"),e.preventDefault(),o(t.x,t.y)?c():u()};return r.a.createElement("div",{className:"Card",style:b,onClick:function(e){n(t)},onContextMenu:function(e){return p(e)},onTouchStart:function(e){return function(e){"mouse"!==e.pointerType&&(console.log("longPressPointerDown"),d||(E(!0),setTimeout((function(){v(!0),console.log("lol")}),1e3)))}(e)},onTouchEnd:function(e){return function(e){"mouse"!==e.pointerType&&(d&&y&&(p(e),clearTimeout(d),E(!1),v(!1)),console.log("longPressPointerUp"))}(e)},onPointerLeave:function(e){return console.log("longPressPointerLeave"),void(d&&(clearTimeout(d),v(!1)))}},function(e){return e.flagged&&!e.revealed?r.a.createElement("img",{src:"/Not-Minesweeper/redflag2.png",alt:"flag",id:"card_image"}):e.revealed&&0!==e.value?"M"===e.value?r.a.createElement("img",{src:"/Not-Minesweeper/minesweeper-icon.png",alt:"mine",id:"card_image"}):e.value:""}(t))}var m=function(e){switch(e){case 1:return"#0345fc";case 2:return"#03fc2c";case 3:return"#fc0303";case 4:return"#8403fc";case 5:return"#5afc03";case 6:return"#fc03a1";case 7:return"#fc8c03";case 8:return"#03fc8c";default:return{color:"#03adfc"}}};function d(e){var t=e.gameOver,n=e.sendTime,o=Object(a.useState)((new Date).toLocaleTimeString()),c=Object(l.a)(o,2),u=c[0],i=c[1],s=Object(a.useRef)(0);return Object(a.useEffect)((function(){var e=setTimeout((function(){var e=new Date;s.current=s.current+1,n(s.current),i(e.toLocaleTimeString())}),1e3);return t&&(console.log("game over"),clearTimeout(e),clearInterval(e),s.current=0),function(){clearTimeout(e)}}),[u,t]),r.a.createElement("div",null,r.a.createElement("div",null,"Current Time:",u),r.a.createElement("div",{id:"elapsedTime"},r.a.createElement("span",{role:"img","aria-label":"Timer"},"\u231b")," Elapsed Time: ",s.current))}var v=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)("easy"),m=Object(l.a)(c,2),v=m[0],f=m[1],g=Object(a.useState)([]),y=Object(l.a)(g,2),E=y[0],b=y[1],p=Object(a.useState)(0),_=Object(l.a)(p,2),O=_[0],j=_[1],C=Object(a.useState)(0),M=Object(l.a)(C,2),h=M[0],k=M[1],w=Object(a.useState)(0),T=Object(l.a)(w,2),N=T[0],S=T[1],x=Object(a.useState)(0),L=Object(l.a)(x,2),B=L[0],I=L[1],P=Object(a.useState)(0),F=Object(l.a)(P,2),D=F[0],Y=F[1];Object(a.useEffect)((function(){H(v,!1)}),[]);var H=function(e,t){Y(!0),I(-1);var n=i[e],a=n.grid_w,r=n.grid_l,c=n.mine_num,u=function(e,t,n,a,r){var o=[],c=[];o=function(e,t,n){for(var a=0;a<e;a++){n.push([]);for(var r=0;r<t;r++)n[a].push({value:0,x:a,y:r,revealed:!1,flagged:!1})}return n}(e,t,o),r&&(c=K(e,t,n,o,c,a),o=R(e,t,o));return{board:o,mineLocation:c}}(a,r,c,e,t);o(u.board),b(u.mineLocation),j(0),k(0),S(c)};function J(){j((function(e){return e+1}))}function W(){k((function(e){return e+1}));var e=i[v].mine_num;S(e-h-1)}function q(){k((function(e){return e-1}));var e=i[v].mine_num;S(e-h+1)}var A=function(e,t,n,a){for(var r=e-1;r<=e+1;r++)for(var o=t-1;o<=t+1;o++)if((r!==e||o!==t)&&n===r&&a===o)return!1;return!0};function K(e,t,n,a,r,o,c,u){var l=!1;"too_easy"===o&&(l=!1);for(var i=0;i<n;){var s=a[U(e)][U(t)];0===s.value&&A(c,u,s.x,s.y)&&c!==s.x&&u!==s.y&&(s.value="M",s.revealed=l,r.push([s.x,s.y]),i++)}return r}function R(e,t,n){for(var a=0;a<e;a++)for(var r=0;r<t;r++)if("M"!==n[a][r].value){for(var o=0,c=a-1;c<=a+1;c++)for(var u=r-1;u<=r+1;u++)c<0||c>=e||u<0||u>=t||c===a&&u===r||"M"===n[c][u].value&&o++;n[a][r].value=o}return n}function U(e){return Math.floor(Math.random()*Math.floor(e))}var z=function(e){var t="You suck! You lose!";e&&(t="Damn, You Win!"),document.getElementById("overlay").style.visibility="visible",document.getElementById("end game message").innerHTML=t,document.getElementById("moveCount").innerHTML=O+1,Y(!0)};function G(e,t){if(!e.revealed&&!e.flagged){e.revealed||J();var a=Object(u.a)(n);if(function(e,t,n){if(0===O){var a=i[v],r=a.grid_w,c=a.grid_l,l=a.mine_num,s=[],m=Object(u.a)(e);return s=K(r,c,l,m,s,v,t,n),m=R(r,c,m),o(m),b(s),j(1),Y(!1),!0}}(a,e.x,e.y),"M"===a[e.x][e.y].value)!function(e){for(var t=0;t<E.length;t++)e[E[t][0]][E[t][1]].revealed||(e[E[t][0]][E[t][1]].revealed=!0,o(e))}(a),z(!1);else{if(!(a=X(a,e.x,e.y)))return;(function(){var e=i[v],t=e.grid_w,n=e.grid_l,a=e.mine_num;return Q(t,n)===t*n-a})()&&z(!0)}}}var Q=function(e,t){for(var a=0,r=0;r<e;r++)for(var o=0;o<t;o++)"M"!==n[r][o].value&&!0===n[r][o].revealed&&a++;return a},V=function(e,t){var a=Object(u.a)(n);return a[e][t].flagged=!a[e][t].flagged,o(a),a[e][t].flagged},X=function(e,t,n){var a=e[t][n].value;return 0===a?(!1===e[t][n].revealed&&(e[t][n].revealed=!0),$(e,t,n)):a>=1&&(e[t][n].revealed=!0),e},Z=function(e,t){var n=i[v],a=n.grid_w,r=n.grid_l;return e>=0&&e<a&&t>=0&&t<r},$=function(e,t,n){for(var a=t-1;a<=t+1;a++)for(var r=n-1;r<=n+1;r++)Z(a,r)&&!e[a][r].revealed&&(e=X(e,a,r));return e};return r.a.createElement("div",{className:"game"},r.a.createElement("div",{className:"status-bar"},r.a.createElement("div",{className:"Timer"},r.a.createElement(d,{gameOver:D,sendTime:function(e){I(e)}})),r.a.createElement("div",{className:"Mine Count"},r.a.createElement("span",null,r.a.createElement("span",{role:"img","aria-label":"Flag"},"\ud83d\udea9"),"Mine Count:",N," ")),r.a.createElement("div",{className:"Move Count"},r.a.createElement("span",null,"Move Count:",O," ")),r.a.createElement("div",{className:"level"},r.a.createElement("span",null,"Level:",v," "),r.a.createElement("button",{type:"radio",onClick:function(){f("too_easy"),H("too_easy")}},"Too_Easy"),r.a.createElement("button",{type:"radio",onClick:function(){f("easy"),H("easy")},defaultChecked:!0},"Easy"),r.a.createElement("button",{type:"radio",onClick:function(){f("kinda_easy"),H("kinda_easy")}},"Kinda_Easy"))),r.a.createElement("div",{className:"Board"},n.map((function(e,t){return r.a.createElement("div",{className:"d-flex justify-content-center",key:t},e.map((function(e,t){return r.a.createElement(s,{key:t,data:e,updateBoard:G,flagCard:V,incrementMoveCount:J,incrementFlagCount:W,decrementFlagCount:q})})))}))),r.a.createElement("div",{id:"overlay",onClick:function(){H(v),document.getElementById("overlay").style.visibility="hidden"}},r.a.createElement("div",{id:"overlayin"},r.a.createElement("p",{id:"end game message",className:"big glow"},"Congratulations, you won!!!"),r.a.createElement("p",{className:"darker"},"It took you ",r.a.createElement("span",{id:"moveCount"},"0")," moves."),r.a.createElement("p",{className:"darker"},"It took you ",r.a.createElement("span",{id:"elapsed time"},B+1," ")," Seconds."),r.a.createElement("p",{className:"darker"},"Click/Press anywhere to restart the game."))))};var f=function(){var e=document.querySelector("html");return console.log("Your render area:",e.clientWidth,"x",e.clientHeight),r.a.createElement("div",{className:"App unselectable"},r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"Not MineSweeper"),r.a.createElement(v,null)))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(f,null)),document.getElementById("root"))},7:function(e,t,n){e.exports=n(13)}},[[7,1,2]]]);
//# sourceMappingURL=main.44f0b06c.chunk.js.map