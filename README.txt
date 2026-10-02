# Nayyouvak Sporting Club Adri — Management Website

## Included
- Club dashboard: player count, total income, expenses, available balance
- Player profiles: add, edit, archive/inactivate, search/filter
- Income & fees ledger: monthly fees, registration fees, donations, sponsorships, prizes
- Expenses ledger: ground, kit, travel, refreshments, equipment, tournament/referee, medical, maintenance and other costs
- Match/tournament records
- Match fixture planner: choose up to 15 active players from the squad roster, add date/time/venue/report time/instructions, and publish a visible selected-squad card
- Animated football-themed hero banner with a built-in illustration placeholder; use “Set Team Photo” to select your real group photo
- Coaches and club members
- Club settings and opening balance
- JSON backup and restore
- Responsive desktop/mobile UI

## Run it
1. Extract the ZIP.
2. Open the extracted `club` folder in VS Code and use the Live Server extension (right-click `index.html` > Open with Live Server). Do not double-click the HTML file to open it with `file://`, because Firebase module imports may fail.
3. Add players, then record actual income and expenses. The balance is calculated as:
   `opening balance + total income - total expenses`.
4. Use **Export Backup** regularly and keep the JSON file somewhere safe.

## Firebase setup (required before use)
This project now contains Firebase Authentication + Cloud Firestore integration, but you must connect it to YOUR Firebase project before login will work. It is not connected to a Firebase project automatically.

1. Open https://console.firebase.google.com/ and create/select a Firebase project.
2. A Web app has already been registered and its config has been added to `js/firebase-config.js`.
3. In Authentication > Sign-in method, make sure Email/Password is enabled.
4. In Authentication > Users, create your own admin account (email + strong password). Open that user and copy its UID.
5. `js/firebase-config.js` is already filled with the Firebase config and Admin UID you provided. Verify the Admin UID matches the UID shown in Authentication > Users.
6. `firestore.rules` is already filled with that same UID and matches this app’s `club/public` and `club/private` documents. Copy the full file contents into Firestore Database > Rules and click Publish again if your current rules differ.
7. In Firestore Database, create the database if not already created, open the Rules tab, paste the contents of `firestore.rules`, and click Publish. The rules must match `club/public` and `club/private`; generic `/players` rules will not work with this app.
8. Create player/user accounts in Firebase Authentication > Users (do not share the admin login). Any registered UID other than the configured admin UID is read-only.
9. Host the site on Firebase Hosting or another HTTPS host. Do not rely on `file://` to test Firebase modules; use VS Code Live Server for local testing.
10. Sign in once with the admin account. On first login, this browser's existing local data is uploaded to Firestore. Then sign in from another device to verify shared data.

### What is protected
- `club/private`: full roster fields, income, expenses and club settings; admin UID only can read/write.
- `club/public`: sanitized players, coaches/members, fixtures and match information; signed-in users can read, only admin can write.
- Firestore rules deny all other documents by default.
- Users need Firebase accounts. There is no public self-signup button; create accounts in Firebase Console.

Important: Never put an admin password in JavaScript. Firebase web config is designed to be public; the UID-based Firestore rule is the actual access control. Keep the admin account secure. The current version syncs club data as Firestore documents; avoid embedding large base64 photos in records. For production, use Firebase Storage for photos and consider separating very large collections into individual documents.

## Team photo
On the home banner, click “Set Team Photo” and select a group photo (up to 3 MB). The photo is stored only in the current browser. The ZIP includes a stylized football team illustration as a placeholder; replace it with your club's real group photo for the authentic club banner.

