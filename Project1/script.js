

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("ccLoginForm");
  const fName = document.getElementById("firstName");
  const lName = document.getElementById("lastName");
  const passBox = document.getElementById("password");
  const phoneBox = document.getElementById("phoneExt");
  const idBox = document.getElementById("catererId");
  const mailBox = document.getElementById("email");
  const confirmCheck = document.getElementById("emailConfirm");
  const transactionBox = document.getElementById("transaction");

  insertPasswordToggle(passBox);

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateInputs(loginForm)) return;

    const verified = checkCaterer(loginForm);
    if (verified) {
      alert(
        `Welcome ${fName.value.trim()} ${lName.value.trim()}!\n` +
        `Transaction: ${transactionBox.value ? labelLookup(transactionBox.value) : "None selected"}`
      );
      loginForm.reset();
      fName.focus();
    } else {
      alert(`No account found for ${fName.value.trim()} ${lName.value.trim()}.`);
      fName.focus();
    }
  });
});

function validateInputs(form) {
  const fName = form.firstName.value.trim();
  const lName = form.lastName.value.trim();
  const passVal = form.password.value;
  const phoneVal = form.phoneExt.value.trim();
  const idVal = form.catererId.value.trim();
  const mailVal = form.email.value.trim();
  const wantsMail = form.emailConfirm.checked;
  const txnVal = form.transaction.value;

  const nameCheck = /^[A-Za-z][A-Za-z' -]{1,49}$/;
  const passCheck = /^(?=.{1,5}$)(?=.*[A-Z])(?=.*\d)(?=^[^A-Za-z0-9]).*$/;
  const idCheck = /^\d{4}$/;
  const phoneCheck = /^(?:\d{3}[- ]?){2}\d{4}(?:\s*(?:ext|x|extension)\s*\d{1,5})$/i;
  const mailCheck = /^[^\s@]+@[^\s@]+\.[A-Za-z]{1,3}$/;

  if (!nameCheck.test(fName)) {
    alert("Enter a valid first name (letters only).");
    form.firstName.focus();
    return false;
  }
  if (!nameCheck.test(lName)) {
    alert("Enter a valid last name (letters only).");
    form.lastName.focus();
    return false;
  }
  if (!passCheck.test(passVal)) {
    alert("Password must be ≤5 chars, start with a symbol, and include 1 uppercase letter + 1 number.");
    form.password.focus();
    return false;
  }
  if (!idCheck.test(idVal)) {
    alert("Caterer ID must be exactly four digits.");
    form.catererId.focus();
    return false;
  }
  if (!phoneCheck.test(phoneVal)) {
    alert("Phone must be 10 digits with an extension (e.g. 555-555-5555 ext 123).");
    form.phoneExt.focus();
    return false;
  }
  if (wantsMail && !mailCheck.test(mailVal)) {
    alert("Enter a valid email address (name@example.com).");
    form.email.focus();
    return false;
  }
  if (!txnVal) {
    alert("Please select a transaction.");
    form.transaction.focus();
    return false;
  }

  return true;
}


const staffList = [
  { first: "Jonas", last: "Reed", password: "!J1on", id: "1023", phone: "555-123-4567 ext 45", email: "jonas@cc.com" },
  { first: "Ella", last: "Choi", password: "#E2ch", id: "1122", phone: "212 555 7890 ext 9", email: "ella@cc.com" },
  { first: "Mason", last: "Torres", password: "$M3to", id: "2233", phone: "973-555-3456 ext 12", email: "mason@cc.com" },
  { first: "Zara", last: "Patel", password: "%Z4pa", id: "3344", phone: "201 555 8888 ext 77", email: "zara@cc.com" },
  { first: "Leo", last: "Gomez", password: "&L5go", id: "4455", phone: "646-555-1010 ext 15", email: "leo@cc.com" },
  { first: "Amir", last: "Brown", password: "*A6br", id: "5566", phone: "718-555-2222 ext 5", email: "amir@cc.com" },
  { first: "Nina", last: "Nguyen", password: "@N7ng", id: "6677", phone: "929-555-3030 ext 11", email: "nina@cc.com" },
  { first: "Owen", last: "Hassan", password: "^O8ha", id: "7788", phone: "862-555-4040 ext 4", email: "owen@cc.com" },
  { first: "Sofia", last: "Kim", password: "?S9ki", id: "8899", phone: "551-555-5050 ext 33", email: "sofia@cc.com" },
  { first: "Eli", last: "Cruz", password: "~E0cr", id: "9900", phone: "908 555 6060 ext 99", email: "eli@cc.com" }
];

function checkCaterer(form) {
  const wantsMail = form.emailConfirm.checked;

  const entry = {
    first: form.firstName.value.trim(),
    last: form.lastName.value.trim(),
    password: form.password.value,
    id: form.catererId.value.trim(),
    phone: cleanPhone(form.phoneExt.value),
    email: form.email.value.trim(),
  };

  const match = staffList.some((staff) => {
    const phoneOk = cleanPhone(staff.phone) === entry.phone;
    const mailOk = wantsMail
      ? staff.email.toLowerCase() === entry.email.toLowerCase()
      : true;
    return (
      staff.first.toLowerCase() === entry.first.toLowerCase() &&
      staff.last.toLowerCase() === entry.last.toLowerCase() &&
      staff.password === entry.password &&
      staff.id === entry.id &&
      phoneOk &&
      mailOk
    );
  });

  return match;
}


function cleanPhone(p) {
  const m = p.match(/(\d{3})[- ]?(\d{3})[- ]?(\d{4}).*?(?:ext|x|extension)\s*(\d{1,5})/i);
  return m ? `${m[1]}${m[2]}${m[3]}ext${m[4]}` : p.replace(/\D/g, "");
}

function labelLookup(val) {
  switch (val) {
    case "search": return "Search Caterer Records";
    case "book": return "Book Client Catering";
    case "cancel": return "Cancel Client Event";
    case "requestAddOns": return "Request Add-On Services";
    case "updateAddOn": return "Update Add-On Services";
    case "createClient": return "Create New Client Account";
    default: return val;
  }
}


function insertPasswordToggle(input) {
  if (!input) return;

  const wrap = document.createElement("div");
  wrap.style.position = "relative";
  input.parentNode.insertBefore(wrap, input);
  wrap.appendChild(input);
  input.style.paddingRight = "36px";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Show or hide password");
  Object.assign(toggle.style, {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "0",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: "1",
  });
  toggle.textContent = "👁";

  toggle.addEventListener("click", () => {
    input.type = input.type === "password" ? "text" : "password";
    toggle.textContent = input.type === "password" ? "👁" : "🙈";
  });

  wrap.appendChild(toggle);
}
