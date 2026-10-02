import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { firebaseConfig, ADMIN_UID } from "./firebase-config.js";

const configured = firebaseConfig.apiKey !== "PASTE_FIREBASE_API_KEY_HERE" &&
  firebaseConfig.projectId !== "PASTE_PROJECT_ID_HERE" && ADMIN_UID !== "PASTE_ADMIN_AUTH_UID_HERE";
let auth, db, app;
if (configured) {
  app = initializeApp(firebaseConfig); auth = getAuth(app); db = getFirestore(app);
}
const privateRef = () => doc(db, "club", "private");
const publicRef = () => doc(db, "club", "public");
function publicSnapshot(full) {
  const settings = full.settings || {};
  return {
    settings: { clubName: settings.clubName || "Nayyouvak Sporting Club Adri", district: settings.district || "Mau, Uttar Pradesh", openingBalance: 0, phone: "" },
    players: (full.players || []).map(p => ({ id:p.id, name:p.name, jersey:p.jersey || "", position:p.position || "", status:p.status || "Active", photo:p.photo || "" })),
    income: [], expenses: [],
    matches: (full.matches || []).map(m => ({ id:m.id, date:m.date, tournament:m.tournament || "", opponent:m.opponent || "", ground:m.ground || "", ourGoals:m.ourGoals ?? "", theirGoals:m.theirGoals ?? "", status:m.status || "Upcoming" })),
    staff: (full.staff || []).map(s => ({ id:s.id, name:s.name, role:s.role, status:s.status || "Active" })),
    fixtures: (full.fixtures || []).map(f => ({ id:f.id, opponent:f.opponent, date:f.date, time:f.time || "", venue:f.venue, reportTime:f.reportTime || "", tournament:f.tournament || "", notes:f.notes || "", playerIds:f.playerIds || [], status:f.status || "SQUAD ANNOUNCED" }))
  };
}
async function loadClub(role) {
  const ref = role === "admin" ? privateRef() : publicRef();
  const snap = await getDoc(ref); return snap.exists() ? snap.data() : null;
}
async function saveClub(full) {
  if (!auth?.currentUser || auth.currentUser.uid !== ADMIN_UID) throw new Error("Only the configured admin can save club data.");
  await setDoc(privateRef(), full);
  await setDoc(publicRef(), publicSnapshot(full));
}
async function login(email, password) {
  if (!configured) throw new Error("Firebase setup pending hai. js/firebase-config.js mein apni Firebase config aur Admin UID paste karein.");
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}
async function logout() { if (auth?.currentUser) await signOut(auth); }
window.clubFirebase = { configured, login, logout, loadClub, saveClub, isAdminUid: uid => !!uid && uid === ADMIN_UID };
if (!configured) {
  window.dispatchEvent(new CustomEvent("club-auth-ready", { detail: { configured:false, role:"", data:null } }));
} else {
  onAuthStateChanged(auth, async user => {
    try {
      if (!user) { window.dispatchEvent(new CustomEvent("club-auth-ready", { detail:{ configured:true, role:"", data:null } })); return; }
      const role = user.uid === ADMIN_UID ? "admin" : "user";
      let clubData = await loadClub(role);
      window.dispatchEvent(new CustomEvent("club-auth-ready", { detail:{ configured:true, role, data:clubData, email:user.email || "" } }));
    } catch (error) {
      window.dispatchEvent(new CustomEvent("club-auth-error", { detail:{ message:error.message || "Club data load nahi ho saka." } }));
    }
  });
}
