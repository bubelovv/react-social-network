"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[834],{1468:function(e,s,t){var n=t(1413),i=(t(2791),t(6871)),o=t(8687),r=t(3657),a=t(184),l=function(e){return{isAuth:(0,r.O)(e)}};s.Z=function(e){return(0,o.$j)(l)((function(s){return s.isAuth?(0,a.jsx)(e,(0,n.Z)({},s)):(0,a.jsx)(i.Fg,{to:"/login"})}))}},2886:function(e,s,t){t.r(s),t.d(s,{default:function(){return de}});var n=t(2791),i=t(8687),o="ProfileInfo_profileInfo__8nrv4",r="ProfileInfo_aboutMe__rijlA",a="ProfileInfo_profilePhoto__rvv-O",l="ProfileInfo_profileInfoWrap__djq8-",c="ProfileInfo_customInputFile__DHNQf",u="ProfileInfo_aboutMeInfo__yb6JB",d="ProfileInfo_myInfo__NwLRc",f="ProfileInfo_myInfoRed__xqUQ5",h="ProfileInfo_socialIcons__fklsI",x="ProfileInfo_link__vw8lF",m="ProfileInfo_statusWrap__inXoj",p="ProfileInfo_statusSpanWrap__WTSPe",j="ProfileInfo_statusInputWrap__-IHYk",v="ProfileInfo_btnChange__n7AuL",_=t(263),g=t(885),b=t(184),P=function(e){var s=(0,n.useState)(!1),t=(0,g.Z)(s,2),i=t[0],o=t[1],r=(0,n.useState)(e.status),a=(0,g.Z)(r,2),l=a[0],c=a[1];return(0,n.useEffect)((function(){c(e.status)}),[e.status]),(0,b.jsx)("div",{className:m,children:i?(0,b.jsxs)("div",{className:j,children:[(0,b.jsx)("span",{children:"Status:"}),(0,b.jsx)("input",{autoFocus:!0,onChange:function(e){c(e.currentTarget.value)},onBlur:function(){o(!1),e.updateStatus(l)},value:l})]}):(0,b.jsxs)("div",{className:p,children:[(0,b.jsxs)("span",{children:["Status: ",l||"Enter your status"]}),e.isOwner&&(0,b.jsx)("div",{style:{flex:"0 0 70px"},children:(0,b.jsx)("button",{className:v,onClick:function(){o(!0)},children:"change status"})})]})})},k=t(9389),N=t.p+"static/media/fb.9a6e212e214e7aef33e5.png",I=t.p+"static/media/vk.2b1dcb01de20e1a0c44a.png",w=t.p+"static/media/twitter.d94f80536328ce5e9b20.png",y=t.p+"static/media/inst.ac32ec0a111aeba03298.png",S=t.p+"static/media/git.44eee0c4a6c25b0d7347.png",A=function(e){var s=e.contacts,t={facebook:N,vk:I,twitter:w,instagram:y,github:S},n=Object.keys(s).map((function(e){return s[e]&&(0,b.jsx)("a",{href:s[e],className:x,children:(0,b.jsx)("img",{src:t[e]||k,alt:""})},e)}));return(0,b.jsx)("div",{className:h,children:n})},F=function(e){var s=e.profile,t=e.isOwner,n=e.goToEditMode;return(0,b.jsxs)("div",{className:u,children:[(0,b.jsxs)("div",{className:d,children:["Name: ",s.fullName]}),(0,b.jsxs)("div",{className:s.aboutMe?d:f,children:["About me: ",s.aboutMe||" i'm very secretive"]}),(0,b.jsxs)("div",{className:s.lookingForAJob?d:f,children:["Looking for a job: ",s.lookingForAJob?" yes":" no"]}),(0,b.jsxs)("div",{className:s.lookingForAJobDescription?d:f,children:["My skills: ",s.lookingForAJobDescription||"I'm not looking for a job"]}),(0,b.jsx)(A,{contacts:s.contacts}),t&&(0,b.jsx)("div",{style:{flex:"0 0 70px"},children:(0,b.jsx)("button",{className:v,onClick:function(){return n(!0)},children:"change user info"})})]})},T=t(1413),M="AboutUserForm_userForm__073lJ",O="AboutUserForm_userInfoBlocks__n5x3e",C="AboutUserForm_contactName__ckUuv",L="AboutUserForm_userInfoBlock__X0n4x",Z="AboutUserForm_checkBox__mxBd7",U="AboutUserForm_btnChange__0Q0yU",q=t(3896),E=function(e){var s=e.profile,t=e.isOwner,n=e.goToEditMode,i=e.saveInfo,o=(0,q.cI)({defaultValues:s}),r=o.register,a=o.handleSubmit,l=o.setError,c=o.clearErrors,u=o.formState,d=u.errors;u.isValid,u.touchedFields,o.reset;return(0,b.jsxs)("form",{className:M,onSubmit:a((function(e){return function(e,s){i(e,s).then((function(){n(!1)}))}(e,l)})),children:[(0,b.jsxs)("div",{className:O,children:[(0,b.jsxs)("div",{className:L,children:[(0,b.jsx)("div",{children:"Full name:"}),(0,b.jsx)("input",(0,T.Z)({},r("fullName",{required:"This field is required",minLength:3})))]}),(0,b.jsxs)("div",{className:L,children:[(0,b.jsx)("div",{}),(0,b.jsx)("span",{children:"Looking for a job:"}),(0,b.jsx)("input",(0,T.Z)({className:Z,type:"checkbox"},r("lookingForAJob")))]}),(0,b.jsxs)("div",{className:L,children:[(0,b.jsx)("div",{children:"My skills:"}),(0,b.jsx)("textarea",(0,T.Z)({},r("lookingForAJobDescription",{required:"This field is required",minLength:3})))]}),(0,b.jsxs)("div",{className:L,children:[(0,b.jsx)("div",{children:"About me:"}),(0,b.jsx)("textarea",(0,T.Z)({},r("aboutMe",{required:"This field is required",minLength:3})))]}),(0,b.jsx)("div",{children:"CONTACTS:"}),Object.keys(s.contacts).map((function(e){return(0,b.jsxs)("div",{className:L,children:[(0,b.jsxs)("div",{className:C,children:[e,":"]}),(0,b.jsx)("input",(0,T.Z)({onClick:function(){return c(e)}},r("contacts."+e))),d[e]&&(0,b.jsx)("div",{style:{color:"red"},children:d[e].message||"Errors"})]},e)}))]}),t&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:U,children:(0,b.jsx)("button",{type:"submit",children:"save user's information"})}),(0,b.jsx)("div",{className:U,children:(0,b.jsx)("button",{onClick:function(){return n(!1)},children:"X close change area X"})})]})]})},J=function(e){var s=e.profile,t=e.isOwner,i=e.savePhoto,o=e.saveInfo,u=(0,n.useState)(!1),d=(0,g.Z)(u,2),f=d[0],h=d[1];return(0,b.jsxs)("div",{className:r,children:[(0,b.jsxs)("div",{className:a,children:[(0,b.jsx)("img",{src:s.photos.large||k,alt:"bgc"}),t&&(0,b.jsxs)("label",{htmlFor:"file-upload",className:c,children:["Change Photo",(0,b.jsx)("input",{hidden:!0,id:"file-upload",type:"file",onChange:function(e){e.target.files.length&&i(e.target.files[0])}})]})]}),(0,b.jsx)("div",{className:l,children:f?(0,b.jsx)(E,{profile:s,isOwner:t,goToEditMode:h,saveInfo:o}):(0,b.jsx)(F,{profile:s,isOwner:t,goToEditMode:h})})]})},B=function(e){var s=e.profile,t=e.status,n=e.updateStatus,i=e.isOwner,r=e.savePhoto,a=e.saveInfo;return null===s?(0,b.jsx)(_.Z,{}):(0,b.jsxs)("div",{className:o,children:[(0,b.jsx)(J,{profile:s,status:t,isOwner:i,savePhoto:r,saveInfo:a}),(0,b.jsx)(P,{isOwner:i,status:t,updateStatus:n})]})},W=t(6508),V=t(2982),X="Post_post__NbCjo",D="Post_like__49zTZ",Q="Post_dislike__0AaBI",R="Post_count__StFbG",$=function(e){return(0,b.jsxs)("div",{className:X,children:[(0,b.jsx)("img",{src:"https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg",alt:"cat"}),(0,b.jsx)("span",{children:e.message}),(0,b.jsx)("span",{className:R,children:e.count}),(0,b.jsx)("button",{onClick:function(){e.decrementLikes(e.id)},className:Q,children:" dislike"}),(0,b.jsx)("button",{onClick:function(){e.incrementLikes(e.id)},className:D,children:" like"})]})},H="MyPosts_posts__WAVd5",z="MyPosts_add__iA0SX",G="MyPosts_textarea__2smd8",Y="MyPosts_textareaValid__b4BWF",K="MyPosts_errorText__kOy8y",ee=t(4942),se=t(1694),te=t.n(se),ne=function(e){var s,t=e.addPost,n=(0,q.cI)({mode:"onBlur"}),i=n.register,o=n.handleSubmit,r=n.formState,a=r.errors,l=r.isValid,c=r.touchedFields,u=n.reset,d=te()(G,(0,ee.Z)({},Y,c.newPostText&&l));return(0,b.jsxs)("form",{className:z,onSubmit:o((function(e){t(e.newPostText),u()})),children:[(0,b.jsx)("h4",{style:{color:"#000"},children:"New post:"}),(0,b.jsx)("div",{children:(0,b.jsx)("textarea",(0,T.Z)({className:d,placeholder:"Enter your post..."},i("newPostText",{required:"This field is required",minLength:{value:3,message:"Minimum length is 3"}})))}),(0,b.jsx)("div",{className:K,children:(null===a||void 0===a?void 0:a.newPostText)&&(0,b.jsx)("p",{children:(null===a||void 0===a||null===(s=a.newPostText)||void 0===s?void 0:s.message)||"Error!"})}),(0,b.jsx)("div",{children:(0,b.jsx)("button",{disabled:!l,children:"Add post"})})]})},ie=function(e){var s=(0,V.Z)(e.posts).reverse().map((function(s){return(0,b.jsx)($,{id:s.id,message:s.message,count:s.likesCount,incrementLikes:e.incrementLikes,decrementLikes:e.decrementLikes},s.id)}));return(0,b.jsxs)("div",{className:H,children:[(0,b.jsx)(ne,{newMessageText:e.newMessageText,addPost:e.addPost}),(0,b.jsxs)("div",{children:["My posts:",s]})]})},oe=(0,i.$j)((function(e){return{newPostText:e.profilePage.newPostText,posts:e.profilePage.posts}}),{addPost:W.q2,incrementLikes:W.Jc,decrementLikes:W.a_})(ie),re=function(e){var s=e.profile,t=e.status,n=e.updateStatus,i=e.isOwner,o=e.savePhoto,r=e.saveInfo;return(0,b.jsxs)("div",{children:[(0,b.jsx)(B,{profile:s,status:t,updateStatus:n,isOwner:i,savePhoto:o,saveInfo:r}),(0,b.jsx)(oe,{})]})},ae=t(6871),le=t(7781),ce=t(1468),ue=t(3657);var de=(0,le.qC)((0,i.$j)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorisedUserId:e.auth.id,isAuth:(0,ue.O)(e)}}),{getProfile:W.Ai,getStatus:W.lR,updateStatus:W.Nf,savePhoto:W.Ju,saveInfo:W.Mt}),ce.Z)((function(e){var s=(0,ae.UO)(),t=s.userId;return t||(t=e.authorisedUserId),(0,n.useEffect)((function(){e.getProfile(t),e.getStatus(t)}),[s]),(0,b.jsx)(re,{isOwner:t===e.authorisedUserId,profile:e.profile,status:e.status,updateStatus:e.updateStatus,savePhoto:e.savePhoto,saveInfo:e.saveInfo})}))},9389:function(e,s,t){e.exports=t.p+"static/media/avatar.d4f356f805c6fa063bba.jpg"}}]);
//# sourceMappingURL=834.034acbe3.chunk.js.map