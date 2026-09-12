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

const signUpForm = document.querySelector("#signupForm")

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
        const formData = new FormData(signUpForm)


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

        const data = Object.fromEntries(formData)

        const { name, email, password, repeatpassword } = data


        const { data: signUpData, error } = await client.auth.signUp({
            email,
            password,
        });

        if (error) {
    console.log("Signup Error:", error.message);
    alert(error.message);
    return;
}

console.log("Signup successful:", signUpData);


        const id = signUpData?.user?.id
        console.log(id);

        // database insertion
        const { error: databaseError } = await client
            .from('blog_data')
            .insert({
                name,

            })
        console.log(databaseError)

        if (signUpData) {
            console.log(signUpData);
        }
        else {
            console.log(error.message)
        }
    }
    catch (error) {
        console.log(error)
    }
})

const inputs = document.querySelectorAll("input")
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        if (input.value !== "") {
            input.style.border = ""

        }
    })

})