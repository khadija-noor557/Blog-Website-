// Navbar
fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("#navbar").innerHTML = data;
    });


const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co";
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey)

console.log(client);

const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const formData = new FormData(loginBtn)
        console.log("running", formData);

        let emptyField = false;
        const inputs = document.querySelectorAll("input")
        inputs.forEach((input) => {
            if (input.value === "") {
                input.style.border = "2px solid red"
                emptyField = true;
            }
        })

        if (emptyField) {
            return
        }
        // Step 1: try to sign in as an existing user
        const { email, password } = Object.fromEntries(formData)
        const { data: signInData, error: signInError } = await client.auth.signInWithPassword({
            email,
            password,
        })


        if (signInData?.user) {
            Swal.fire({
                title: "Login successful!",
                icon: "success",
                draggable: true
            });
            window.location.href = "blogs.html";
            return;
        }

        // Login failed
        console.log("Sign in failed:", signInError?.message);

        if (signInError?.message.toLowerCase().includes("invalid login credentials")) {
            Swal.fire({
                title: "No account found",
                text: "It looks like you don't have an account yet with this email/password. Would you like to sign up?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, sign me up",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = `signup.html?email=${encodeURIComponent(email)}`;
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:  "Something went wrong.",
            });
            
        }


    }
    catch (error) {
        console.log(error)
    }
})