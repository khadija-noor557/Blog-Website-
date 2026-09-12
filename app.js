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
