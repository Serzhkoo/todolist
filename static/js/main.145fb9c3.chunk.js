(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{63:function(t,e,i){},64:function(t,e,i){},70:function(t,e,i){"use strict";i.r(e);var n=i(0),c=i(9),a=i.n(c);i(63),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i(64);var r=i(22),o=i(110),d=i(100),s=i(101),l=i(5);function j(t){var e=Object(n.useState)(""),i=Object(r.a)(e,2),c=i[0],a=i[1],j=Object(n.useState)(""),O=Object(r.a)(j,2),u=O[0],b=O[1],f=function(){""===c.trim()?b("Title is required!"):(t.addItem(c.trim()),a(""))};return Object(l.jsxs)("div",{children:[Object(l.jsx)(o.a,{error:!!u,label:"Type value",helperText:u,variant:"outlined",value:c,onChange:function(t){a(t.currentTarget.value)},onKeyPress:function(t){b(""),"Enter"===t.key&&f()}}),Object(l.jsx)(d.a,{onClick:f,color:"primary",children:Object(l.jsx)(s.a,{})})]})}function O(t){var e=Object(n.useState)(!1),i=Object(r.a)(e,2),c=i[0],a=i[1],d=Object(n.useState)(""),s=Object(r.a)(d,2),j=s[0],O=s[1],u=Object(n.useState)(""),b=Object(r.a)(u,2),f=b[0],h=b[1],T=function(){""===j.trim()?h("Title is required!"):(a(!1),t.onChange(j.trim()))};return c?Object(l.jsx)(o.a,{error:!!f,helperText:f,variant:"outlined",value:j,onChange:function(t){return O(t.currentTarget.value)},onBlur:T,onKeyPress:function(t){h(""),"Enter"===t.key&&T()},autoFocus:!0}):Object(l.jsx)("span",{onDoubleClick:function(){a(!0),O(t.title)},children:t.title})}var u,b=i(112),f=i(103),h=i(102),T=i(20),x=i(34),v=i(11),I=i(18),L=i(111),p=Object(L.a)(),D=Object(L.a)(),m=[{id:p,title:"What to learn",filter:"all"},{id:D,title:"What to buy",filter:"all"}],S=(u={},Object(I.a)(u,p,[{id:Object(L.a)(),title:"HTML and CSS",isDone:!0},{id:Object(L.a)(),title:"JS",isDone:!0},{id:Object(L.a)(),title:"React",isDone:!1},{id:Object(L.a)(),title:"Redux",isDone:!1}]),Object(I.a)(u,D,[{id:Object(L.a)(),title:"Villa",isDone:!1},{id:Object(L.a)(),title:"BMW",isDone:!1},{id:Object(L.a)(),title:"Audi",isDone:!1},{id:Object(L.a)(),title:"Milk",isDone:!0}]),u);function g(t){var e=Object(T.b)(),i=Object(T.c)((function(e){return e.tasksObj[t.id]}));return"completed"===t.filter&&(i=i.filter((function(t){return!0===t.isDone}))),"active"===t.filter&&(i=i.filter((function(t){return!1===t.isDone}))),Object(l.jsxs)("div",{children:[Object(l.jsxs)("h3",{children:[Object(l.jsx)(O,{title:t.title,onChange:function(e){t.changeTodoListTitle(t.id,e)}}),Object(l.jsx)(d.a,{onClick:function(){return t.removeTodoList(t.id)},children:Object(l.jsx)(h.a,{})})]}),Object(l.jsx)(j,{addItem:function(i){var n,c;e((n=i,c=t.id,{type:"ADD-TASK",taskTitle:n,todoListId:c}))}}),Object(l.jsx)("ol",{children:i.map((function(i){return Object(l.jsxs)("li",{children:[Object(l.jsx)(b.a,{onChange:function(){return e((n=i.id,c=t.id,{type:"CHANGE-TASK-STATUS",taskId:n,todoListId:c}));var n,c},checked:i.isDone,color:"primary"}),Object(l.jsx)(O,{title:i.title,onChange:function(n){return e((c=i.id,a=t.id,{type:"CHANGE-TASK-TITLE",taskId:c,todoListId:a,taskTitle:n}));var c,a}}),Object(l.jsx)(d.a,{onClick:function(){return e((n=i.id,c=t.id,{type:"REMOVE-TASK",taskId:n,todoListId:c}));var n,c},children:Object(l.jsx)(h.a,{})})]},i.id)}))}),Object(l.jsxs)("div",{children:[Object(l.jsx)(f.a,{variant:"all"===t.filter?"contained":"text",onClick:function(){return t.changeFilter(t.id,"all")},children:"All"}),Object(l.jsx)(f.a,{variant:"active"===t.filter?"contained":"text",onClick:function(){return t.changeFilter(t.id,"active")},children:"Active"}),Object(l.jsx)(f.a,{variant:"completed"===t.filter?"contained":"text",onClick:function(){return t.changeFilter(t.id,"completed")},children:"Completed"})]})]})}var k=i(104),A=i(105),E=i(107),C=i(108),y=i(109),w=i(71),K=i(106);var N=function(){var t=Object(T.b)(),e=Object(T.c)((function(t){return t.todoLists}));function i(e){t(function(t){return{type:"REMOVE-TODOLIST",todoListId:t}}(e))}function n(e,i){t(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}}(e,i))}function c(e,i){t(function(t,e){return{type:"CHANGE-TODOLIST-FILTER",id:t,filter:e}}(e,i))}return Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)(k.a,{position:"static",children:Object(l.jsxs)(A.a,{children:[Object(l.jsx)(d.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(l.jsx)(K.a,{})}),Object(l.jsx)(E.a,{variant:"h6",children:"News"}),Object(l.jsx)(f.a,{color:"inherit",children:"Login"})]})}),Object(l.jsxs)(C.a,{fixed:!0,children:[Object(l.jsx)(y.a,{container:!0,style:{padding:"10px"},children:Object(l.jsx)(j,{addItem:function(e){t({type:"ADD-TODOLIST",title:e,todoListId:Object(L.a)()})}})}),Object(l.jsx)(y.a,{container:!0,spacing:3,children:e.map((function(t){return Object(l.jsx)(y.a,{item:!0,children:Object(l.jsx)(w.a,{style:{padding:"10px"},elevation:3,children:Object(l.jsx)(g,{id:t.id,title:t.title,changeFilter:c,filter:t.filter,removeTodoList:i,changeTodoListTitle:n},t.id)})})}))})]})]})},H=i(42),R=Object(H.a)({todoLists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return e.todoListId!==t.id}));case"ADD-TODOLIST":return[{id:e.todoListId,title:e.title,filter:"all"}].concat(Object(x.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(v.a)(Object(v.a)({},t),{},{title:e.title}):Object(v.a)({},t)}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(v.a)(Object(v.a)({},t),{},{filter:e.filter}):Object(v.a)({},t)}));default:return t}},tasksObj:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(v.a)(Object(v.a)({},t),{},Object(I.a)({},e.todoListId,t[e.todoListId].filter((function(t){return t.id!==e.taskId}))));case"ADD-TASK":return Object(v.a)(Object(v.a)({},t),{},Object(I.a)({},e.todoListId,[{id:Object(L.a)(),title:e.taskTitle,isDone:!1}].concat(Object(x.a)(t[e.todoListId]))));case"CHANGE-TASK-STATUS":return Object(v.a)(Object(v.a)({},t),{},Object(I.a)({},e.todoListId,t[e.todoListId].map((function(t){return t.id===e.taskId?Object(v.a)(Object(v.a)({},t),{},{isDone:!t.isDone}):t}))));case"CHANGE-TASK-TITLE":return Object(v.a)(Object(v.a)({},t),{},Object(I.a)({},e.todoListId,t[e.todoListId].map((function(t){return t.id===e.taskId?Object(v.a)(Object(v.a)({},t),{},{title:e.taskTitle}):t}))));case"ADD-TODOLIST":return Object(v.a)(Object(v.a)({},t),{},Object(I.a)({},e.todoListId,[]));case"REMOVE-TODOLIST":var i=Object(v.a)({},t);return delete i[e.todoListId],i;default:return t}}}),G=Object(H.b)(R);window.store=G,a.a.render(Object(l.jsx)(T.a,{store:G,children:Object(l.jsx)(N,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[70,1,2]]]);
//# sourceMappingURL=main.145fb9c3.chunk.js.map