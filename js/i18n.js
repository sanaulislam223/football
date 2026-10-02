(() => {
  "use strict";
  const translations = {
    "Dashboard":"डैशबोर्ड","Trophies":"ट्रॉफियाँ","Players":"खिलाड़ी","Finance":"वित्त","Expenses":"खर्च","Matches":"मैच","Staff":"स्टाफ","Settings":"सेटिंग्स",
    "Export Backup":"बैकअप डाउनलोड","Switch Role":"रोल बदलें","VIEWER":"दर्शक","AT A GLANCE":"एक नज़र में","Club Dashboard":"क्लब डैशबोर्ड","Live totals · This device":"लाइव कुल · यह डिवाइस",
    "Active Players":"सक्रिय खिलाड़ी","Registered players":"पंजीकृत खिलाड़ी","Club Balance":"क्लब बैलेंस","Income − expenses":"आय − खर्च","Total Income":"कुल आय","Fees, donations, sponsors":"फीस, दान, प्रायोजक","Total Expenses":"कुल खर्च","All recorded spending":"सभी दर्ज खर्च",
    "Club Fund Summary":"क्लब फंड सारांश","Income and spending overview":"आय और खर्च का विवरण","Opening balance":"शुरुआती बैलेंस","Total income":"कुल आय","Total expenses":"कुल खर्च","Available club balance":"उपलब्ध क्लब बैलेंस",
    "Balance = opening balance + recorded income − recorded expenses.":"बैलेंस = शुरुआती बैलेंस + दर्ज आय − दर्ज खर्च।","Quick Actions":"त्वरित कार्य","Common club tasks":"क्लब के आम काम","＋ Register player":"＋ खिलाड़ी रजिस्टर करें","＋ Add income / fees":"＋ आय / फीस जोड़ें","＋ Record expense":"＋ खर्च दर्ज करें","＋ Add match result":"＋ मैच का परिणाम जोड़ें","＋ Add staff member":"＋ स्टाफ सदस्य जोड़ें",
    "MONEY IN":"आय","Income & Player Fees":"आय और खिलाड़ी फीस","Player fee, donations, sponsorship aur anya aamdani ka record.":"खिलाड़ी फीस, दान, स्पॉन्सरशिप और अन्य आय का रिकॉर्ड।","＋ Add Income":"＋ आय जोड़ें","Search income / player...":"आय / खिलाड़ी खोजें...","All income types":"सभी आय के प्रकार","Player Fee":"खिलाड़ी फीस","Registration Fee":"रजिस्ट्रेशन फीस","Donation":"दान","Sponsorship":"स्पॉन्सरशिप","Tournament Prize":"टूर्नामेंट पुरस्कार","Other Income":"अन्य आय","Date":"तारीख","Type":"प्रकार","Player / Source":"खिलाड़ी / स्रोत","Period / Note":"अवधि / नोट","Amount":"राशि",
    "Abhi income record nahi hai. “Add Income” se entry karein.":"अभी आय का रिकॉर्ड नहीं है। “आय जोड़ें” से एंट्री करें।","MONEY OUT":"खर्च","Club Expenses":"क्लब के खर्च","Ground rent, kit, travel, refreshments, referee aur har tarah ke kharch.":"मैदान का किराया, किट, यात्रा, नाश्ता, रेफरी और अन्य सभी खर्च।","＋ Record Expense":"＋ खर्च दर्ज करें","🥅 Ground / pitch":"🥅 मैदान / पिच","👕 Jersey & kit":"👕 जर्सी और किट","🚌 Travel":"🚌 यात्रा","🥤 Refreshments":"🥤 जलपान","🩹 First aid":"🩹 प्राथमिक उपचार","🏆 Tournament fees":"🏆 टूर्नामेंट फीस","⚽ Equipment":"⚽ उपकरण","🧾 Other":"🧾 अन्य","Search expense / vendor...":"खर्च / विक्रेता खोजें...","All categories":"सभी श्रेणियाँ","Ground / Pitch":"मैदान / पिच","Jersey & Kit":"जर्सी और किट","Travel":"यात्रा","Refreshments":"जलपान","Equipment":"उपकरण","Tournament / Referee":"टूर्नामेंट / रेफरी","Medical / First Aid":"चिकित्सा / प्राथमिक उपचार","Maintenance":"रखरखाव","Other Expense":"अन्य खर्च","Category":"श्रेणी","Paid to / Vendor":"भुगतान प्राप्तकर्ता / विक्रेता","Details":"विवरण","Payment":"भुगतान","Abhi expense record nahi hai. Har kharch ko receipt ke saath record karein.":"अभी खर्च का रिकॉर्ड नहीं है। हर खर्च की रसीद के साथ एंट्री करें।",
    "SQUAD MANAGEMENT":"टीम प्रबंधन","Player profile, jersey number, position aur monthly fee.":"खिलाड़ी प्रोफ़ाइल, जर्सी नंबर, पोज़िशन और मासिक फीस।","＋ Add Player":"＋ खिलाड़ी जोड़ें","Search player / father name...":"खिलाड़ी / पिता का नाम खोजें...","All statuses":"सभी स्थितियाँ","Active":"सक्रिय","Injured":"चोटिल","Inactive":"निष्क्रिय","Abhi players add nahi hue hain.":"अभी खिलाड़ी नहीं जोड़े गए हैं।","CLUB HISTORY":"क्लब इतिहास","🏆 Trophy & Achievements":"🏆 ट्रॉफी और उपलब्धियाँ","Club ke cups, championship aur tournament history.":"क्लब के कप, चैंपियनशिप और टूर्नामेंट का इतिहास।","＋ Add Achievement":"＋ उपलब्धि जोड़ें","Total Cups / Titles":"कुल कप / खिताब","District Champion":"जिला चैंपियन","Achievements admin yahan add karega.":"एडमिन यहाँ उपलब्धियाँ जोड़ेगा।",
    "MATCH DAY":"मैच डे","Match Fixtures & Selected Squad":"मैच फिक्स्चर और चुनी गई टीम","Match create karein, 40-player list mein se playing squad select karein aur selected players ko fixture card par dikhayein.":"मैच बनाएँ, खिलाड़ी सूची से अधिकतम 15 खिलाड़ियों की टीम चुनें और उन्हें फिक्स्चर कार्ड पर दिखाएँ।","＋ Create Match & Select Squad":"＋ मैच बनाएँ और टीम चुनें","Abhi koi match fixture nahi hai. Match ki date, venue aur squad select karke publish karein.":"अभी कोई मैच फिक्स्चर नहीं है। तारीख, मैदान और टीम चुनकर प्रकाशित करें।",
    "FIXTURES & RESULTS":"फिक्स्चर और परिणाम","Matches & Tournaments":"मैच और टूर्नामेंट","Opponent, ground, date aur result ka record.":"विपक्षी टीम, मैदान, तारीख और परिणाम का रिकॉर्ड।","＋ Add Match":"＋ मैच जोड़ें","Tournament":"टूर्नामेंट","Opponent":"विपक्षी टीम","Ground":"मैदान","Score / Status":"स्कोर / स्थिति","Abhi match record nahi hai.":"अभी मैच का रिकॉर्ड नहीं है।",
    "PEOPLE BEHIND THE CLUB":"क्लब के लोग","Coaches & Members":"कोच और सदस्य","Coach, manager, president, secretary, treasurer aur committee.":"कोच, मैनेजर, अध्यक्ष, सचिव, कोषाध्यक्ष और समिति।","＋ Add Member":"＋ सदस्य जोड़ें","Abhi staff / members add nahi hue hain.":"अभी स्टाफ / सदस्य नहीं जोड़े गए हैं।",
    "CLUB DETAILS":"क्लब विवरण","Settings & Data":"सेटिंग्स और डेटा","Club display name":"क्लब का नाम","District":"ज़िला","Mau, Uttar Pradesh":"मऊ, उत्तर प्रदेश","Opening balance (₹)":"शुरुआती बैलेंस (₹)","Contact number (optional)":"संपर्क नंबर (वैकल्पिक)","Save Club Settings":"क्लब सेटिंग्स सेव करें","Opening balance sirf pehli baar existing cash/bank amount record karne ke liye use karein. Baad mein income/expense entries se balance update karein.":"शुरुआती बैलेंस में केवल मौजूदा नकद/बैंक राशि दर्ज करें। बाद में आय और खर्च की एंट्री से बैलेंस अपडेट होगा।","Backup & Restore":"बैकअप और रीस्टोर","JSON backup download karke apne computer par safe rakhein. Restore karne se current browser data replace hoga.":"JSON बैकअप डाउनलोड करके सुरक्षित रखें। रीस्टोर करने से मौजूदा ब्राउज़र डेटा बदल जाएगा।","⬇ Download JSON Backup":"⬇ JSON बैकअप डाउनलोड","⬆ Restore Backup":"⬆ बैकअप रीस्टोर","Clear all local data":"सारा लोकल डेटा मिटाएँ","Prototype note: data abhi isi browser/device mein save hota hai. Multi-user online use ke liye Firebase/backend setup aur security rules configure karna zaroori hai.":"ध्यान दें: डेटा अभी इसी ब्राउज़र/डिवाइस में सेव होता है। कई यूज़र्स के लिए Firebase/backend और सुरक्षा नियम ज़रूरी हैं।","Club records ko regularly update karein · Keep receipts for every transaction":"क्लब रिकॉर्ड नियमित अपडेट करें · हर लेन-देन की रसीद रखें",
    "SQUAD":"टीम","Add / Edit Player":"खिलाड़ी जोड़ें / संपादित करें","Player name *":"खिलाड़ी का नाम *","Father's name":"पिता का नाम","Date of birth":"जन्म तिथि","Jersey number":"जर्सी नंबर","Position":"पोज़िशन","Forward":"फॉरवर्ड","Midfielder":"मिडफील्डर","Defender":"डिफेंडर","Goalkeeper":"गोलकीपर","Utility":"बहुउपयोगी","Phone (private)":"फोन (निजी)","Joining date":"जॉइन करने की तारीख","Monthly fee (₹)":"मासिक फीस (₹)","Status":"स्थिति","Photo URL (optional)":"फोटो URL (वैकल्पिक)","Notes (restricted/private)":"नोट्स (निजी)","Cancel":"रद्द करें","Save Player":"खिलाड़ी सेव करें","MONEY IN":"आय","Add Income / Fee":"आय / फीस जोड़ें","Income type *":"आय का प्रकार *","Player / source":"खिलाड़ी / स्रोत","Fee period / reference":"फीस अवधि / संदर्भ","Received via":"प्राप्ति का माध्यम","Cash":"नकद","UPI":"UPI","Bank Transfer":"बैंक ट्रांसफर","Cheque":"चेक","Other":"अन्य","Notes":"नोट्स","Save Income":"आय सेव करें","Record Expense":"खर्च दर्ज करें","Category *":"श्रेणी *","Paid to / vendor":"भुगतान प्राप्तकर्ता / विक्रेता","Payment method":"भुगतान का माध्यम","Receipt / bill number":"रसीद / बिल नंबर","Details / purpose *":"विवरण / उद्देश्य *","What was purchased or paid for?":"क्या खरीदा या भुगतान किया गया?","Save Expense":"खर्च सेव करें",
    "FIXTURE":"फिक्स्चर","Add Match":"मैच जोड़ें","Date *":"तारीख *","Tournament":"टूर्नामेंट","Opponent team *":"विपक्षी टीम *","Ground / venue":"मैदान / स्थान","Our goals":"हमारे गोल","Opponent goals":"विपक्षी के गोल","Upcoming":"आगामी","Played":"खेला गया","Postponed":"स्थगित","Cancelled":"रद्द","Notes":"नोट्स","Save Match":"मैच सेव करें","CLUB PEOPLE":"क्लब सदस्य","Add Coach / Member":"कोच / सदस्य जोड़ें","Name *":"नाम *","Role *":"भूमिका *","Head Coach":"मुख्य कोच","Assistant Coach":"सहायक कोच","President":"अध्यक्ष","Vice President":"उपाध्यक्ष","Secretary":"सचिव","Treasurer":"कोषाध्यक्ष","Team Manager":"टीम मैनेजर","Committee Member":"समिति सदस्य","Physio / Trainer":"फिजियो / ट्रेनर","Experience / notes":"अनुभव / नोट्स","Save Member":"सदस्य सेव करें",
    "MATCH DAY PLANNER":"मैच प्लानर","Create Match & Select Playing Squad":"मैच बनाएँ और खेलने वाली टीम चुनें","Opponent / Match name *":"विपक्षी / मैच का नाम *","Match date *":"मैच की तारीख *","Kick-off time":"मैच शुरू होने का समय","Venue / Ground *":"स्थान / मैदान *","Tournament / Occasion":"टूर्नामेंट / अवसर","Report time":"रिपोर्टिंग समय","Instructions for players":"खिलाड़ियों के लिए निर्देश","Choose playing squad":"खेलने वाली टीम चुनें","Select up to 15 players from your registered squad.":"अपनी पंजीकृत टीम से अधिकतम 15 खिलाड़ी चुनें।","0 / 15 selected":"0 / 15 चुने गए","Search player name / jersey number...":"खिलाड़ी का नाम / जर्सी नंबर खोजें...","Sirf Active players selection mein dikhte hain. Pehle Players section mein roster add karein.":"केवल सक्रिय खिलाड़ी दिखेंगे। पहले खिलाड़ी सेक्शन में नाम जोड़ें।","Publish Match & Squad":"मैच और टीम प्रकाशित करें",
    "Welcome to Club Portal":"क्लब पोर्टल में आपका स्वागत है","Apni access choose karein.":"अपना एक्सेस चुनें।","🔐 Login / Sign in":"🔐 लॉगिन / साइन इन","👥 User / Player Login":"👥 यूज़र / खिलाड़ी लॉगिन","Email address":"ईमेल पता","Password":"पासवर्ड","Your registered email":"आपका रजिस्टर्ड ईमेल","Firebase account password":"Firebase अकाउंट पासवर्ड","Secure Login":"सुरक्षित लॉगिन","Admin role Firebase mein configured Admin UID se milega. Baaki registered accounts read-only User honge.":"एडमिन रोल Firebase में कॉन्फ़िगर किए गए Admin UID से मिलेगा। बाकी अकाउंट केवल डेटा देख सकेंगे।","Set Team Photo":"टीम फोटो सेट करें","📷 Add Team Photos":"📷 टीम की फोटो जोड़ें",
    "👥 Show / Hide Player List":"👥 खिलाड़ी सूची दिखाएँ / छिपाएँ","Choose from Gallery":"गैलरी से चुनें","📁 Choose from Gallery":"📁 गैलरी से चुनें","Remove Photo":"फोटो हटाएँ","Player Photo (optional)":"खिलाड़ी की फोटो (वैकल्पिक)","Or Photo URL (optional)":"या फोटो URL (वैकल्पिक)","Photo preview":"फोटो का प्रीव्यू","Selected player photo":"चुनी गई खिलाड़ी की फोटो","Gallery photo automatically resize/compress hogi, taaki data size kam rahe.":"गैलरी की फोटो अपने-आप छोटी और कम्प्रेस हो जाएगी, ताकि डेटा कम लगे।"
  };
  const originalNodes = new WeakMap();
  const originalAttrs = new WeakMap();
  let language = localStorage.getItem("nsc_language") || "en";
  const normalize = s => (s || "").replace(/\s+/g, " ").trim();
  function translateTextNode(node) {
    if (node.parentElement && node.parentElement.closest(".language-toggle")) return;
    if (!originalNodes.has(node)) originalNodes.set(node, node.nodeValue);
    const original = originalNodes.get(node);
    const key = normalize(original);
    if (!key) return;
    if (language === "hi" && translations[key]) node.nodeValue = original.replace(key, translations[key]);
    else node.nodeValue = original;
  }
  function translateElement(el) {
    const attrs = ["placeholder", "title", "aria-label"];
    for (const attr of attrs) {
      if (!el.hasAttribute(attr)) continue;
      let store = originalAttrs.get(el);
      if (!store) { store = {}; originalAttrs.set(el, store); }
      if (!(attr in store)) store[attr] = el.getAttribute(attr);
      const val = store[attr], key = normalize(val);
      if (language === "hi" && translations[key]) el.setAttribute(attr, translations[key]);
      else el.setAttribute(attr, val);
    }
  }
  function translateTree(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node);
    if (root.nodeType === 1) translateElement(root);
    root.querySelectorAll?.("*").forEach(translateElement);
  }
  function setLanguage(next) {
    language = next;
    localStorage.setItem("nsc_language", language);
    document.documentElement.lang = language === "hi" ? "hi" : "en";
    translateTree();
    document.querySelectorAll(".language-toggle").forEach(button => {
      button.textContent = language === "hi" ? "English" : "हिन्दी";
      button.title = language === "hi" ? "Switch to English" : "हिंदी में बदलें";
    });
  }
  function init() {
    const buttons = document.querySelectorAll(".language-toggle");
    if (!buttons.length) return;
    buttons.forEach(button => button.addEventListener("click", () => setLanguage(language === "hi" ? "en" : "hi")));
    const observer = new MutationObserver(records => {
      if (records.some(r => r.addedNodes.length)) {
        records.forEach(r => r.addedNodes.forEach(n => {
          if (n.nodeType === 1) translateTree(n);
          else if (n.nodeType === 3) translateTextNode(n);
        }));
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setLanguage(language);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();