(() => {
const book=document.getElementById('book'),openButton=document.getElementById('open-card'),closeButton=document.getElementById('close-card'),invitation=document.getElementById('invitation'),hint=document.getElementById('hint'),announcement=document.getElementById('announcement'),popup=document.getElementById('info-popup'),popupClose=popup.querySelector('.popup-close');
let activeTrigger=null;
function setOpen(open){
book.classList.toggle('open',open);document.body.classList.toggle('is-open',open);
openButton.setAttribute('aria-expanded',String(open));invitation.setAttribute('aria-hidden',String(!open));invitation.inert=!open;openButton.tabIndex=open?-1:0;closeButton.hidden=!open;hint.hidden=open;
if(open){closeButton.focus({preventScroll:true});openButton.setAttribute('aria-hidden','true');}else{openButton.removeAttribute('aria-hidden');openButton.focus({preventScroll:true});}
announcement.textContent=open?'초대카드가 열렸습니다. 밑줄이 있는 도심 캠프, 새로운 캠퍼의 소식, 인더우드를 누르면 자세한 안내가 열립니다.':'';
}
openButton.addEventListener('click',()=>setOpen(true));closeButton.addEventListener('click',()=>setOpen(false));
document.querySelectorAll('[data-popup]').forEach(button=>button.addEventListener('click',()=>{
activeTrigger=button;const name=button.dataset.popup;
['camp','little','map'].forEach(n=>{document.getElementById(n+'-content').hidden=name!==n;});popup.setAttribute('aria-labelledby',name+'-title');
if(name==='map'){const map=document.getElementById('venue-map');if(!map.getAttribute('src'))map.src=map.dataset.src;}
popup.showModal();popupClose.focus({preventScroll:true});
}));
popupClose.addEventListener('click',()=>popup.close());
popup.addEventListener('click',event=>{if(event.target!==popup)return;const b=popup.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)popup.close();});
popup.addEventListener('close',()=>{if(activeTrigger)activeTrigger.focus({preventScroll:true});});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!popup.open&&book.classList.contains('open')&&!event.defaultPrevented)setOpen(false);});
})();