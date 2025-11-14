const token = localStorage.getItem("accessToken");
const role = JSON.parse(localStorage.getItem("user"))?.role;
function isAdmin() {

    if (token && role === "admin") {
        return true;
    }
    return false;
}

if (!isAdmin()) {
    window.location.href = "index.html";
}