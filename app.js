// Navbar start
const isPages = window.location.pathname.includes("/pages/");

const navbarPath = isPages
    ? "./navbar.html"
    : "./pages/navbar.html";

fetch(navbarPath)
    .then(response => response.text())
    .then(data => {

        document.querySelector("#navbar").innerHTML = data;

        const loginLink = document.querySelector("#loginLink");
        const signupLink = document.querySelector("#signupLink");

        if (loginLink) {
            loginLink.href = isPages
                ? "./login.html"
                : "./pages/login.html";
        }

        if (signupLink) {
            signupLink.href = isPages
                ? "./signup.html"
                : "./pages/signup.html";
        }
    });
// navbar end


const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co";
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey)

console.log(client);


const params = new URLSearchParams(window.location.search);
const emailFromLogin = params.get("email");
if (emailFromLogin) {
    document.querySelector("#email").value = emailFromLogin; // match your input's id/name
}

const signUpForm = document.querySelector("#signupForm");

if (signUpForm) {
    signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const repeatpassword = document.querySelector("#repeatpassword").value;



        let emptyField = false;
        const inputs = document.querySelectorAll("input")
        inputs.forEach((input) => {
            if (input.value === "") {
                input.style.border = "2px solid red"
                emptyField = true;
            }
        })

        if (emptyField) return;

        if (password !== repeatpassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password do not match!",

            });
            return;
        }


        // Authentication
        const { data, error } = await client.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        });

        if (error) {
            console.log(error.message);
            return;
        }

        console.log("USER:", data.user);
console.log("SESSION:", data.session);

        // Database Insertions
        const { error: databaseError } = await client
            .from("blog_data")
            .insert({
                name: name
            });

        if (databaseError) {
            console.log(databaseError.message);
            return;
        }


        Swal.fire({
        title: "Registration successful!",
        icon: "success",
        draggable: true
    });


    }
    catch (error) {
        console.log(error)
    }


    
    window.location.href = "./dashboard.html";
});
}


const inputs = document.querySelectorAll("input")
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        if (input.value !== "") {
            input.style.border = ""

        }
    })

})