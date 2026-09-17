const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co";
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey)

console.log(client);


// logout btn
const logOutBtn = document.querySelector("#logoutBtn")
logOutBtn.addEventListener("click", async () => {
  const { error } = await client.auth.signOut()

  if (error) {
    console.log(error.message);
    return;
  }

  localStorage.clear()
  sessionStorage.clear();

  window.location.href = "../index.html"
})


// get user name on main section
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

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('open');
}
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
}

menuToggle.addEventListener('click', openSidebar);
overlay.addEventListener('click', closeSidebar);

window.addEventListener('resize', () => {
  if (window.innerWidth > 950) closeSidebar();
});



// get all data/card
if (window.location.pathname.endsWith("/dashboard.html")) {

  const getAllData = async () => {
    try {
      const { data, error } = await client
        .from('blog_data')
        .select();

      let blogData = document.getElementById("blogPost");

      if (error) {
        console.log(error);
        return;
      }

      // Purana dynamic content clear karo (sirf jo pehle is JS ne banaya tha)
      blogData.querySelectorAll('.post-card.dynamic').forEach(card => card.remove());

      data.forEach((blogPost) => {
        const statusColor = blogPost.status === 'published' ? '#ECFDF3' : '#FEF3C7';
        const statusText  = blogPost.status === 'published' ? '#16A34A' : '#B45309';
        const statusLabel = blogPost.status === 'published' ? 'Published' : 'Draft';

        const card = document.createElement('div');
        card.className = 'post-card dynamic';

        card.innerHTML = `
         
          <img src="${blogPost.image_url || 'https://placehold.co/400x220/EEE/999?text=No+Image'}"
               alt="${blogPost.title || ''}"
               onerror="this.src='https://placehold.co/400x220/EEE/999?text=No+Image'">
          <div class="post-body">
            <div class="post-cat">${blogPost.category || 'Uncategorized'}</div>
            <div class="post-title">${blogPost.title || 'Untitled'}</div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
              <span class="progress-pill" style="background:${statusColor}; color:${statusText};">${statusLabel}</span>
            </div>
            <div style="display:flex; gap:8px; margin-top:12px;">
              <button onclick="update('${blogPost.id}')"
                      style="flex:1; padding:8px 10px; border:1px solid #E5E7EB; background:#fff; border-radius:8px; cursor:pointer; font-size:12.5px; font-weight:600; color:#111827;">
                Edit
              </button>
              <button onclick="removePost('${blogPost.id}')"
                      style="flex:1; padding:8px 10px; border:1px solid #FCA5A5; background:#FEF2F2; color:#DC2626; border-radius:8px; cursor:pointer; font-size:12.5px; font-weight:600;">
                Delete
              </button>
            </div>
          </div>
         
        `;

        blogData.appendChild(card);
      });

      // ---- EDIT ----
      window.update = async (id) => {

        const { data } = await client
          .from('blog_data')
          .select()
          .eq("id", id);

        let { title, category, content, image_url } = data[0];

        const { value: formValues } = await Swal.fire({
          title: "Edit Blog Post",
          html: `
            Title: <input id="swal-input1" class="swal2-input" value="${title || ''}">
            Category: <input id="swal-input2" class="swal2-input" value="${category || ''}">
            Content: <textarea id="swal-input3" class="swal2-textarea">${content || ''}</textarea>
          `,
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById("swal-input1").value,
              document.getElementById("swal-input2").value,
              document.getElementById("swal-input3").value
            ];
          },
        });

        if (!formValues) return;

        const updateData = {
          title: formValues[0],
          category: formValues[1],
          content: formValues[2]
        };

        const { error } = await client
          .from('blog_data')
          .update(updateData)
          .eq('id', id);

        if (error) {
          console.log(error);
          return;
        }

        location.reload();
      };

      // ---- DELETE ----
      window.removePost = async (postId) => {
        const confirmResult = await Swal.fire({
          title: "Delete this post?",
          text: "This can't be undone.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it",
          confirmButtonColor: "#DC2626"
        });

        if (!confirmResult.isConfirmed) return;

        const { error } = await client
          .from('blog_data')
          .delete()
          .eq('id', postId);

        if (error) {
          console.log(error);
          return;
        }

        location.reload();
      };

    }
    catch (error) {
      console.log(error);
    }
  };

  getAllData();
}