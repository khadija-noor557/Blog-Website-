const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co";
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey)

console.log(client);



const logOutBtn = document.querySelector("#logoutBtn")
console.log(logOutBtn)
logOutBtn.addEventListener("click", async()=>{
    console.log("running", logOutBtn)
    const { error } = await client.auth.signOut()

    if (error) {
        console.log(error.message);
        return;
    }

    localStorage.clear()
    sessionStorage.clear();

    window.location.href="index.html"
})