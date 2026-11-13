(() => {
'use strict';
const dialog=document.querySelector('#story-player'), film=document.querySelector('#village-film'),status=document.querySelector('#story-status');
window.openVillageStory=()=>{if(dialog.open)return;window.dispatchEvent(new Event('village-story-open'));dialog.showModal();document.querySelector('#close-story').focus()};
const close=()=>{film.pause();dialog.close()};
document.querySelector('#watch-story').onclick=window.openVillageStory;
document.querySelector('#intro-story').onclick=window.openVillageStory;
document.querySelector('#close-story').onclick=close;
document.querySelector('#return-story').onclick=close;
dialog.addEventListener('close',()=>{film.pause();window.dispatchEvent(new Event('village-story-close'))});
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()});
film.addEventListener('ended',()=>{status.textContent='故事看完了！帶著這些風景，回村落繼續收集記憶吧。';window.dispatchEvent(new Event('village-story-watched'))});
film.addEventListener('error',()=>{status.textContent='影片暫時無法播放，請重試或使用下方「另開影片」。'});
document.querySelector('#explore-website').addEventListener('click',()=>film.pause());
document.addEventListener('visibilitychange',()=>{if(document.hidden)film.pause()});
})();
