const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co";
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey)

console.log(client);



const logOutBtn = document.querySelector("#logoutBtn")
logOutBtn.addEventListener("click", async()=>{
    const { error } = await client.auth.signOut()

    if (error) {
        console.log(error.message);
        return;
    }

    localStorage.clear()
    sessionStorage.clear();

    window.location.href="../index.html"
})

const userDashboard = document.querySelector("#userDashboard");

async function getUserData() {

    const { data: { user }, error } = await client.auth.getUser();

    if (error) {
        console.log(error.message);
        return;
    }

    if (user) {
        
        document.querySelector("#userName").textContent = user.user_metadata.name;;
        document.querySelector("#Name").textContent = user.user_metadata.name;;
        document.querySelector("#userEmail").textContent = user.email;
    }
}

getUserData();



// making responsive dashboard

const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const menuToggle = document.getElementById('menuToggle');

  function openSidebar(){
    sidebar.classList.add('open');
    overlay.classList.add('open');
  }
  function closeSidebar(){
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }

  menuToggle.addEventListener('click', openSidebar);
  overlay.addEventListener('click', closeSidebar);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 950) closeSidebar();
  });