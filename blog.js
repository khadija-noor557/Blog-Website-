const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co";
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey)

console.log(client);

const blogPage = document.querySelector("#blogPage");


async function getUserData() {

    const { data: { user }, error } = await client.auth.getUser();

    if (error) {
        console.log(error.message);
        return;
    }

    if (user) {
        document.querySelector("#userName").textContent = user.name;
        document.querySelector("#userEmail").textContent = user.email;
    }
}

getUserData();