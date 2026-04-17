const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');

const username = document.getElementById("username");

username.innerText = localStorage.getItem("username");


const detailes = document.querySelector(".detailes");

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('expanded');
});


async function operation(name) {

    const option = document.getElementById(name);


    const response = await fetch(`/api/auth/${name}`);

    // + localStorage.getItem("token")
    const data = await response.text();


    detailes.innerHTML = data;


}

async function updatepassword(e) {
    e.preventDefault();

    const currpass = document.getElementById("current_password").value;
    const newpass = document.getElementById("newpassword").value;
    const repass = document.getElementById("samepassword").value;

    const result = document.getElementById("resultform");

    // ✅ validation

    if (newpass !== repass) {
        result.style.color = "red";
        result.innerText = "new and conform password or not same";
        return;
    }

    try {
        const response = await fetch('/api/auth/update', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currpass,
                newpass
            })
        });
        const data = await response.json();
        if (!response.ok) {
            result.style.color = "red";
            result.innerText = data.message;
            return;
        }

        result.style.color = "green";
        result.innerText = data.message || "Password updated successfully";

        console.log(data);

    } catch (err) {
        result.style.color = "red";
        result.innerText = "Server error";
        console.error(err);
    }
}


// Logout function
async function logout() {


    console.log("hai");

    const response = await fetch("/api/auth/logout");

    window.location.href = "/login.html";

}