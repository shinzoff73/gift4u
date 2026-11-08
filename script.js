const CONFIG = { name: "Vartika" }; // Change this to her first name.
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
function setName(){ $$("#heroName, [data-name]").forEach(el => el.textContent = CONFIG.name === "Your Name" ? "you" : CONFIG.name); }
setName();

const intro = $("#intro"), experience = $("#experience"), gift = $("#gift");
function openSurprise(){
  if(!experience.classList.contains("hidden")) return;
  gift.classList.add("open");
  setTimeout(()=>{intro.style.display="none";experience.classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"});},650);
}
$("#openGift").addEventListener("click",openSurprise);
gift.addEventListener("click",openSurprise);
gift.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openSurprise();}});

const music=$("#birthdayMusic"), musicToggle=$("#musicToggle");
musicToggle.addEventListener("click",async()=>{
  try{if(music.paused){await music.play();musicToggle.innerHTML="♫ <span>On</span>";}else{music.pause();musicToggle.innerHTML="♫ <span>Music</span>";}}catch(e){showToast("Add your birthday music in assets/music/birthday.mp3");}
});

const letters = {
  bad: {title:"For the days that feel a little heavy",body:"Hey, take a breath. You don't have to solve everything today. It's okay to slow down, take a break, or simply do one small thing at a time. A difficult day doesn't undo all the good things you've done, and it certainly doesn't define you. Be gentle with yourself today. Better moments are still on their way. ♡"},
  doubt: {title:"A reminder when you doubt yourself",body:"Remember that big dreams are built one small step at a time. You don't need to know every answer right now. Keep learning, keep experimenting, and trust the effort you're putting in. And please remember: your worth is not measured by how productive you are or how quickly you achieve something. I hope you keep believing in the person you're becoming. ✨"},
  smile: {title:"A tiny reason to smile",body:"Breaking news: someone has made an entire website just to wish you a happy birthday. Very serious internet business. 😂 I hope something unexpectedly lovely happens today, your favourite song plays at the right moment, and you find at least one reason to smile for absolutely no reason. Keep that smile around. It suits you. ☀"}
};
const modal=$("#letterModal");
$$(".envelope").forEach(btn=>btn.addEventListener("click",()=>{
  const item=letters[btn.dataset.letter];$("#modalTitle").textContent=item.title;$("#modalBody").textContent=item.body;modal.classList.remove("hidden");
}));
function closeModal(){modal.classList.add("hidden");}
$("#closeModal").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});

const workflow=$("#workflowCanvas"), workflowShell=$(".workflow-shell"), workflowMessage=$("#workflowMessage");
$("#runWorkflow").addEventListener("click",()=>{
  if(workflowShell.classList.contains("running")) return;
  workflowShell.classList.add("running");
  const nodes=$$(".node",workflow);
  nodes.forEach((node,i)=>setTimeout(()=>node.classList.add("active"),i*650+200));
  setTimeout(()=>{workflowMessage.classList.add("show");$("#runWorkflow").textContent="Workflow complete ✓";},nodes.length*650+500);
});

let candles=$$(".candle"), blown=0;
candles.forEach(c=>c.addEventListener("click",()=>{
  if(c.classList.contains("off"))return;
  c.classList.add("off");blown++;
  if(blown===3){$("#wishMessage").textContent="Your wish is on its way. May this year surprise you beautifully. ✨";showToast("Wish sent into the universe ✨");}
}));
function showToast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600);}
$("#replay").addEventListener("click",()=>{
  closeModal();workflowShell.classList.remove("running");$$(".node",workflow).forEach(n=>n.classList.remove("active"));workflowMessage.classList.remove("show");$("#runWorkflow").textContent="Run workflow ↗";
  candles.forEach(c=>c.classList.remove("off"));blown=0;$("#wishMessage").textContent="Make a wish. The best things are still ahead. ✨";
  window.scrollTo({top:0,behavior:"smooth"});intro.style.display="flex";experience.classList.add("hidden");gift.classList.remove("open");
});
