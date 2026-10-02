/* Nayyouvak Sporting Club Adri - Firebase Authentication + Firestore. */
const STORE_KEY = "nsc_adri_management_v1";
const $ = id => document.getElementById(id);
const today = () => new Date().toISOString().slice(0,10);
const money = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:2}).format(Number(n)||0);
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)+Math.random().toString(36).slice(2));
const clean = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let data = loadData();
let currentRole = "";
let firebaseReady = false;
let signedInEmail = "";
function isAdmin(){return currentRole === "admin";}
function requireAdmin(){if(!isAdmin()){toast("Ye kaam sirf Admin kar sakta hai.");return false;}return true;}
function applyRole(){
 const admin=isAdmin(); document.body.classList.toggle("user-mode",!admin);
 $("roleBadge").textContent=admin?"ADMIN MODE":"USER VIEW"; $("roleSwitchBtn").textContent=admin?"Logout Admin":"Switch Role";
 $("roleGate").classList.toggle("show",!currentRole);
 document.querySelectorAll("[data-admin-only]").forEach(el=>el.hidden=!admin);
 if(!admin){["finance","expenses","settings"].forEach(id=>$(id).hidden=true); ["finance","expenses","settings"].forEach(id=>{const a=document.querySelector(`#mainNav a[href="#${id}"]`);if(a)a.hidden=true;});}
 else {["finance","expenses","settings"].forEach(id=>$(id).hidden=false);["finance","expenses","settings"].forEach(id=>{const a=document.querySelector(`#mainNav a[href="#${id}"]`);if(a)a.hidden=false;});}
}

function blankData(){return {settings:{clubName:"Nayyouvak Sporting Club Adri",district:"Mau, Uttar Pradesh",openingBalance:0,phone:""},players:[],income:[],expenses:[],matches:[],staff:[],fixtures:[]};}
function loadData(){try{return {...blankData(),...JSON.parse(localStorage.getItem(STORE_KEY)||"{}")};}catch(e){return blankData();}}
function save(){
 localStorage.setItem(STORE_KEY,JSON.stringify(data)); render();
 if(firebaseReady && isAdmin() && window.clubFirebase?.configured){
   window.clubFirebase.saveClub(data).then(()=>toast("Cloud par save ho gaya")).catch(err=>{console.error(err);toast("Cloud save fail: Firebase Rules / connection check karein");});
 }
}
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2600);}
function openModal(id){if(!requireAdmin())return;$(id).classList.add("open");if(id==="fixtureModal")renderSquadPicker();}
function closeModal(el){el.classList.remove("open");}
function scrollToId(id){$(id).scrollIntoView({behavior:"smooth"});}
function total(arr){return arr.reduce((sum,x)=>sum+(Number(x.amount)||0),0);}
function balance(){return Number(data.settings.openingBalance||0)+total(data.income)-total(data.expenses);}
function initials(name){return (name||"?").trim().split(/\s+/).slice(0,2).map(x=>x[0]||"").join("").toUpperCase();}
function emptyState(id,show){$(id).style.display=show?"block":"none";}
function render(){
  $("clubName").value=data.settings.clubName||"Nayyouvak Sporting Club Adri";$("clubDistrict").value=data.settings.district||"";$("openingBalance").value=data.settings.openingBalance||0;$("clubPhone").value=data.settings.phone||"";
  $("statPlayers").textContent=data.players.filter(p=>p.status!=="Inactive").length;
  $("statIncome").textContent=money(total(data.income));$("statExpenses").textContent=money(total(data.expenses));$("statBalance").textContent=money(balance());
  $("openingBalanceView").textContent=money(data.settings.openingBalance);$("incomeView").textContent=money(total(data.income));$("expenseView").textContent="− "+money(total(data.expenses));$("balanceView").textContent=money(balance());
  renderIncome();renderExpenses();renderPlayers();renderMatches();renderStaff();renderFixtures();
}
function renderIncome(){
  const q=($("incomeSearch").value||"").toLowerCase(),type=$("incomeTypeFilter").value;
  const list=data.income.filter(x=>(!type||x.type===type)&&[x.source,x.type,x.period,x.notes].join(" ").toLowerCase().includes(q)).sort((a,b)=>b.date.localeCompare(a.date));
  $("incomeTable").innerHTML=list.map(x=>`<tr><td>${clean(x.date)}</td><td>${clean(x.type)}</td><td>${clean(x.source||"—")}</td><td>${clean(x.period||x.notes||"—")}</td><td class="amount">${money(x.amount)}</td><td><button class="delete-btn" data-delete="income" data-id="${x.id}">Delete</button></td></tr>`).join("");emptyState("incomeEmpty",!list.length);
}
function renderExpenses(){
  const q=($("expenseSearch").value||"").toLowerCase(),cat=$("expenseCategoryFilter").value;
  const list=data.expenses.filter(x=>(!cat||x.category===cat)&&[x.vendor,x.category,x.details,x.receipt].join(" ").toLowerCase().includes(q)).sort((a,b)=>b.date.localeCompare(a.date));
  $("expenseTable").innerHTML=list.map(x=>`<tr><td>${clean(x.date)}</td><td>${clean(x.category)}</td><td>${clean(x.vendor||"—")}</td><td>${clean(x.details)}${x.receipt?`<br><small>Bill: ${clean(x.receipt)}</small>`:""}</td><td>${clean(x.method)}</td><td class="amount">${money(x.amount)}</td><td><button class="delete-btn" data-delete="expenses" data-id="${x.id}">Delete</button></td></tr>`).join("");emptyState("expenseEmpty",!list.length);
}
function renderPlayers(){
  const q=($("playerSearch").value||"").toLowerCase(),status=$("playerStatusFilter").value;
  const list=data.players.filter(p=>(!status||p.status===status)&&[p.name,p.father,p.position,p.jersey].join(" ").toLowerCase().includes(q)).sort((a,b)=>a.name.localeCompare(b.name));
  $("playerGrid").innerHTML=list.map(p=>`<article class="player-card"><div class="avatar">${p.photo?`<img src="${clean(p.photo)}" alt="" onerror="this.remove()">`:clean(initials(p.name))}</div><div class="player-info"><h3>${clean(p.name)} ${p.jersey?`<small>#${clean(p.jersey)}</small>`:""}</h3><p>${clean(p.position)} · ${clean(p.father||"Father name not added")}</p><p class="private-finance">Monthly fee: <b>${money(p.fee)}</b></p><span class="pill ${p.status.toLowerCase()}">${clean(p.status)}</span><div class="card-actions"><button class="edit-btn" data-edit-player="${p.id}">Edit</button><button class="delete-btn" data-archive-player="${p.id}">${p.status==="Inactive"?"Delete":"Archive"}</button></div></div></article>`).join("");emptyState("playersEmpty",!list.length);
}
function renderFixtures(){
  data.fixtures=data.fixtures||[];
  const list=[...data.fixtures].sort((a,b)=>a.date.localeCompare(b.date));
  $("fixtureCards").innerHTML=list.map(f=>{
    const selected=(f.playerIds||[]).map(id=>data.players.find(p=>p.id===id)).filter(Boolean);
    const dateText=f.date?new Date(f.date+"T12:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"Date not set";
    return `<article class="fixture-card"><div class="fixture-kicker">⚽ MATCH FIXTURE · ${clean(f.status||"SQUAD ANNOUNCED")}</div><h3>Nayyouvak SC vs ${clean(f.opponent)}</h3><div class="fixture-meta"><span>📅 ${clean(dateText)}</span>${f.time?`<span>🕒 Kick-off ${clean(f.time)}</span>`:""}<span>📍 ${clean(f.venue)}</span>${f.reportTime?`<span>⏰ Report ${clean(f.reportTime)}</span>`:""}${f.tournament?`<span>🏆 ${clean(f.tournament)}</span>`:""}</div>${f.notes?`<p class="fixture-notes">${clean(f.notes)}</p>`:""}<strong>Selected Squad (${selected.length})</strong><div class="squad-list">${selected.map(p=>`<div class="squad-player"><b>${clean(p.jersey||"⚽")}</b><span>${clean(p.name)}<br><small>${clean(p.position||"Player")}</small></span></div>`).join("")||"<small>No selected players remain in roster.</small>"}</div><div class="fixture-actions"><small>Players: please note match date and report time.</small><button class="btn btn-glass" data-delete="fixtures" data-id="${f.id}">Remove fixture</button></div></article>`;
  }).join("");
  emptyState("fixturesEmpty",!list.length);
}
function renderSquadPicker(){
  data.fixtures=data.fixtures||[];
  const q=($("fixturePlayerSearch").value||"").toLowerCase();
  const checked=new Set([...document.querySelectorAll("#squadPickerList input:checked")].map(x=>x.value));
  const players=data.players.filter(p=>p.status==="Active"&&[p.name,p.jersey,p.position].join(" ").toLowerCase().includes(q));
  $("squadPickerList").innerHTML=players.map(p=>`<label class="squad-choice"><input type="checkbox" value="${p.id}" ${checked.has(p.id)?"checked":""}><span class="choice-num">#${clean(p.jersey||"—")}</span><span class="choice-name">${clean(p.name)}<small>${clean(p.position||"Position not set")}</small></span></label>`).join("")||`<div class="empty" style="display:block;grid-column:1/-1">Koi active player nahi mila. Pehle player add karein.</div>`;
  $("selectedCount").textContent=`${checked.size} / 15 selected`;
}
$("fixturePlayerSearch").addEventListener("input",renderSquadPicker);
$("squadPickerList").addEventListener("change",e=>{
  if(!e.target.matches('input[type="checkbox"]'))return;
  const selected=[...document.querySelectorAll("#squadPickerList input:checked")];
  if(selected.length>15){e.target.checked=false;toast("Maximum 15 players select kar sakte hain");}
  $("selectedCount").textContent=`${document.querySelectorAll("#squadPickerList input:checked").length} / 15 selected`;
});
$("fixtureForm").addEventListener("submit",e=>{
  e.preventDefault();
  const selected=[...document.querySelectorAll("#squadPickerList input:checked")].map(x=>x.value);
  if(!selected.length){alert("Kam se kam ek player select karein.");return;}
  if(selected.length>15){alert("Maximum 15 players select kar sakte hain.");return;}
  data.fixtures=data.fixtures||[];
  data.fixtures.push({id:uid(),opponent:$("fixtureOpponent").value.trim(),date:$("fixtureDate").value,time:$("fixtureTime").value,venue:$("fixtureVenue").value.trim(),reportTime:$("fixtureReportTime").value,tournament:$("fixtureTournament").value.trim(),notes:$("fixtureNotes").value.trim(),playerIds:selected,status:"SQUAD ANNOUNCED"});
  save();closeModal($("fixtureModal"));resetForm("fixtureForm");$("fixtureDate").value=today();$("fixturePlayerSearch").value="";renderSquadPicker();toast("Match aur selected squad publish ho gaye");
});
function renderMatches(){
  const list=[...data.matches].sort((a,b)=>a.date.localeCompare(b.date));
  $("matchTable").innerHTML=list.map(m=>`<tr><td>${clean(m.date)}</td><td>${clean(m.tournament||"—")}</td><td>${clean(m.opponent)}</td><td>${clean(m.ground||"—")}</td><td>${m.status==="Played"?`${clean(m.ourGoals??0)} – ${clean(m.theirGoals??0)}`:clean(m.status)}</td><td><button class="delete-btn" data-delete="matches" data-id="${m.id}">Delete</button></td></tr>`).join("");emptyState("matchesEmpty",!list.length);
}
function renderStaff(){
  $("staffGrid").innerHTML=data.staff.map(s=>`<article class="staff-card"><div class="avatar">👤</div><div class="staff-info"><h3>${clean(s.name)}</h3><p>${clean(s.role)}</p><p class="private-contact">${clean(s.phone||"No contact added")}</p><span class="pill ${s.status==="Inactive"?"inactive":""}">${clean(s.status)}</span><div class="card-actions"><button class="delete-btn" data-delete="staff" data-id="${s.id}">Remove</button></div></div></article>`).join("");emptyState("staffEmpty",!data.staff.length);
}
function resetForm(id){$(id).reset();}
function formData(ids){return Object.fromEntries(ids.map(id=>[id,$(id).value.trim()]));}
$("playerForm").addEventListener("submit",e=>{e.preventDefault();if(!requireAdmin())return;const id=$("playerId").value;const p={id:id||uid(),name:$("playerName").value.trim(),father:$("fatherName").value.trim(),dob:$("dob").value,jersey:$("jersey").value,position:$("position").value,phone:$("playerPhone").value.trim(),joining:$("joiningDate").value,fee:Number($("monthlyFee").value)||0,status:$("playerStatus").value,photo:$("photoUrl").value.trim(),notes:$("playerNotes").value.trim()};if(id)data.players=data.players.map(x=>x.id===id?p:x);else data.players.push(p);save();closeModal($("playerModal"));resetForm("playerForm");$("playerId").value="";toast(id?"Player updated":"Player added");});
$("incomeForm").addEventListener("submit",e=>{e.preventDefault();if(!requireAdmin())return;data.income.push({id:uid(),date:$("incomeDate").value,type:$("incomeType").value,source:$("incomeSource").value.trim(),amount:Number($("incomeAmount").value),period:$("incomePeriod").value.trim(),method:$("incomeMethod").value,notes:$("incomeNotes").value.trim()});save();closeModal($("incomeModal"));resetForm("incomeForm");$("incomeDate").value=today();toast("Income saved");});
$("expenseForm").addEventListener("submit",e=>{e.preventDefault();if(!requireAdmin())return;data.expenses.push({id:uid(),date:$("expenseDate").value,category:$("expenseCategory").value,vendor:$("expenseVendor").value.trim(),amount:Number($("expenseAmount").value),method:$("expenseMethod").value,receipt:$("expenseReceipt").value.trim(),details:$("expenseDetails").value.trim()});save();closeModal($("expenseModal"));resetForm("expenseForm");$("expenseDate").value=today();toast("Expense saved");});
$("matchForm").addEventListener("submit",e=>{e.preventDefault();if(!requireAdmin())return;data.matches.push({id:uid(),date:$("matchDate").value,tournament:$("tournament").value.trim(),opponent:$("opponent").value.trim(),ground:$("ground").value.trim(),ourGoals:$("ourGoals").value,theirGoals:$("theirGoals").value,status:$("matchStatus").value,notes:$("matchNotes").value.trim()});save();closeModal($("matchModal"));resetForm("matchForm");$("matchDate").value=today();toast("Match saved");});
$("staffForm").addEventListener("submit",e=>{e.preventDefault();if(!requireAdmin())return;data.staff.push({id:uid(),name:$("staffName").value.trim(),role:$("staffRole").value,phone:$("staffPhone").value.trim(),status:$("staffStatus").value,notes:$("staffNotes").value.trim()});save();closeModal($("staffModal"));resetForm("staffForm");toast("Member saved");});
$("settingsForm").addEventListener("submit",e=>{e.preventDefault();if(!requireAdmin())return;data.settings={clubName:$("clubName").value.trim()||"Nayyouvak Sporting Club Adri",district:$("clubDistrict").value.trim(),openingBalance:Math.max(0,Number($("openingBalance").value)||0),phone:$("clubPhone").value.trim()};save();toast("Club settings saved");});
document.addEventListener("click",e=>{
 const close=e.target.closest("[data-close]");if(close){closeModal(close.closest(".modal-backdrop"));return;}
 if(e.target.classList.contains("modal-backdrop"))closeModal(e.target);
 const del=e.target.closest("[data-delete]");if(del){if(!requireAdmin())return;const kind=del.dataset.delete;if(confirm("Is record ko delete karna hai? Backup pehle download kar lein.")){data[kind]=data[kind].filter(x=>x.id!==del.dataset.id);save();toast("Record deleted");}return;}
 const edit=e.target.closest("[data-edit-player]");if(edit){if(!requireAdmin())return;const p=data.players.find(x=>x.id===edit.dataset.editPlayer);if(!p)return;$("playerId").value=p.id;$("playerName").value=p.name;$("fatherName").value=p.father||"";$("dob").value=p.dob||"";$("jersey").value=p.jersey||"";$("position").value=p.position||"Forward";$("playerPhone").value=p.phone||"";$("joiningDate").value=p.joining||"";$("monthlyFee").value=p.fee||0;$("playerStatus").value=p.status||"Active";$("photoUrl").value=p.photo||"";$("playerNotes").value=p.notes||"";openModal("playerModal");return;}
 const archive=e.target.closest("[data-archive-player]");if(archive){if(!requireAdmin())return;const p=data.players.find(x=>x.id===archive.dataset.archivePlayer);if(!p)return;if(p.status!=="Inactive"){if(confirm("Player ko inactive/archive kar dein? Isse fee aur history ka record rahega.")){p.status="Inactive";save();toast("Player archived");}}else if(confirm("Permanently delete? Related financial entries remain unchanged.")){data.players=data.players.filter(x=>x.id!==p.id);save();toast("Player deleted");}}
});
["incomeSearch","incomeTypeFilter"].forEach(id=>$(id).addEventListener("input",renderIncome));
["expenseSearch","expenseCategoryFilter"].forEach(id=>$(id).addEventListener("input",renderExpenses));
["playerSearch","playerStatusFilter"].forEach(id=>$(id).addEventListener("input",renderPlayers));
function downloadBackup(){if(!requireAdmin())return;const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="nayyouvak-club-backup-"+today()+".json";a.click();URL.revokeObjectURL(url);toast("Backup downloaded");}
$("exportBtn").addEventListener("click",downloadBackup);$("exportBtn2").addEventListener("click",downloadBackup);
$("importFile").addEventListener("change",async e=>{if(!requireAdmin()){e.target.value="";return;}const file=e.target.files[0];if(!file)return;try{const parsed=JSON.parse(await file.text());if(!parsed||!Array.isArray(parsed.players)||!Array.isArray(parsed.income)||!Array.isArray(parsed.expenses))throw new Error("Invalid backup");if(confirm("Restore se current browser data replace hoga. Continue?")){data={...blankData(),...parsed};save();toast("Backup restored");}}catch(err){alert("Backup file valid nahi hai.");}e.target.value="";});
$("clearDataBtn").addEventListener("click",()=>{if(!requireAdmin())return;if(confirm("Saara club data is browser se permanently clear ho jayega. Pehle backup liya hai?")){if(confirm("Final confirmation: clear all local records?")){data=blankData();save();toast("Local data cleared");}}});
$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=> $("mainNav").classList.remove("open")));
["incomeDate","expenseDate","matchDate","joiningDate","fixtureDate"].forEach(id=>{if($(id)&&!$(id).value)$(id).value=today();});

// The chosen hero photo is saved locally in this browser (not uploaded online).
$("heroPhotoInput").addEventListener("change",e=>{
 if(!requireAdmin()){e.target.value="";return;} const file=e.target.files[0];if(!file)return;
 if(!file.type.startsWith("image/")){alert("Please choose an image file.");return;}
 if(file.size>3*1024*1024){alert("Please choose an image smaller than 3 MB.");return;}
 const reader=new FileReader();reader.onload=()=>{const hero=$("homeHero");hero.style.backgroundImage=`linear-gradient(90deg,rgba(5,17,31,.91) 0%,rgba(5,17,31,.70) 48%,rgba(5,17,31,.20) 100%),url("${reader.result}")`;try{localStorage.setItem("nsc_adri_hero_photo",reader.result);}catch(err){toast("Photo too large to save. Try a smaller image.");}toast("Team group photo set on this browser");};reader.readAsDataURL(file);
});
try{const savedHero=localStorage.getItem("nsc_adri_hero_photo");if(savedHero)$("homeHero").style.backgroundImage=`linear-gradient(90deg,rgba(5,17,31,.91) 0%,rgba(5,17,31,.70) 48%,rgba(5,17,31,.20) 100%),url("${savedHero}")`;}catch(e){}

$("adminLoginBtn").addEventListener("click",()=>{$("adminLoginForm").hidden=false;$("loginEmail").focus();});
$("userViewBtn").addEventListener("click",()=>{$("adminLoginForm").hidden=false;$("loginEmail").focus();});
$("adminLoginForm").addEventListener("submit",async e=>{
 e.preventDefault();
 try {
   if(!window.clubFirebase) throw new Error("Firebase module load nahi hua. index.html ko file:// se nahi, VS Code Live Server se kholein aur internet connection check karein.");
   if(!window.clubFirebase.configured) throw new Error("Firebase config abhi placeholder hai. Isi extracted folder ki js/firebase-config.js file save karke Ctrl+F5 karein.");
   await window.clubFirebase.login($("loginEmail").value.trim(),$("loginPassword").value);
   $("loginPassword").value="";
 } catch(err) { alert(err.message || "Login fail hua. Email/password aur Firebase Authentication check karein."); }
});
$("roleSwitchBtn").addEventListener("click",async()=>{try{await window.clubFirebase?.logout();}catch(e){console.error(e);}currentRole="";firebaseReady=false;applyRole();$("adminLoginForm").hidden=true;$("loginPassword").value="";});
// Mark management controls as admin-only; database rules independently enforce authorization.
document.querySelectorAll('button[onclick*="openModal"], #exportBtn, #exportBtn2, #clearDataBtn, .hero-photo-upload, .file-label').forEach(el=>el.setAttribute("data-admin-only",""));
applyRole(); render();
window.addEventListener("club-auth-ready", async event=>{
 const detail=event.detail || {}; currentRole=detail.role || ""; signedInEmail=detail.email || ""; firebaseReady=!!detail.configured && !!currentRole;
 if(currentRole && detail.data){data={...blankData(),...detail.data};localStorage.setItem(STORE_KEY,JSON.stringify(data));}
 else if(currentRole==="admin" && !detail.data){
   // First admin sign-in: seed Firestore from this browser's current data (or an empty dataset).
   try { await window.clubFirebase.saveClub(data); } catch(err) { console.error(err); alert("Admin data initialize nahi hua. Firestore Rules aur Admin UID check karein."); }
 }
 else if(currentRole==="user" && !detail.data){data=blankData();}
 applyRole(); render();
 if(currentRole) { $("roleGate").classList.remove("show"); toast(currentRole==="admin"?"Admin signed in securely":"User login successful — read-only view"); }
 else { $("roleGate").classList.add("show"); }
});
window.addEventListener("club-auth-error",event=>{alert("Club data load error: "+(event.detail?.message||"Unknown error"));});
