const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co";
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8";

const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey)

console.log(client);


async function savePost(status) {

  // getuser
  const { data: { user } } = await client.auth.getUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // ALL tags
  const tags = [...document.querySelectorAll('.tag-chip')].map(el => el.textContent.replace('x', '').trim())

  // database insertion 
  const { error } = await client
    .from('blog_data')
    .insert([{
      title: document.getElementById('blogTitle').value.trim(),
      category: document.getElementById('category').value,
      publish_date: document.getElementById('publishDate').value,
      tags,
      allow_comments: document.getElementById('allowComments').checked,
      content: document.getElementById('blogContent').value,
      status,
      user_id: user.id,

    }])

  if (error) {
    console.log(error.message);
    Swal.fire({ icon: "error", title: "Failed", text: error.message });
    return;

  }

  Swal.fire({
    title: "Registration successful!",
    icon: "success",
    draggable: true
  });

  window.location.href = "dashboard.html";

}

// publish button
const publishBtn = document.querySelector("#publishBtn")
publishBtn.addEventListener("click", (e) => {
  e.preventDefault()
  savePost('published')
})





// save draft button
const draftBtn = document.querySelector("#saveDraftBtn")
draftBtn.addEventListener("click", (e) => {
  e.preventDefault()
  savePost('draft')
})





// Cover image preview
//   const coverInput = document.getElementById('coverInput');
//   const coverPreview = document.getElementById('coverPreview');
//   const coverUpload = document.querySelector('.cover-upload');
//   coverInput.addEventListener('change', () => {
//     const file = coverInput.files[0];
//     if (file) {
//       coverPreview.src = URL.createObjectURL(file);
//       coverPreview.style.display = 'block';
//       coverUpload.querySelectorAll('svg, .u-title, .u-sub').forEach(el => el.style.display = 'none');
//     }
//   });

// Tag chips
//   const tagInput = document.getElementById('tagInput');
//   const tagsWrap = document.getElementById('tagsWrap');
//   tagInput.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter' && tagInput.value.trim() !== '') {
//       e.preventDefault();
//       const chip = document.createElement('span');
//       chip.className = 'tag-chip';
//       chip.innerHTML = tagInput.value.trim() + ' <span onclick="this.parentElement.remove()">×</span>';
//       tagsWrap.insertBefore(chip, tagInput);
//       tagInput.value = '';
//     }
//   });

// Live word count
//   const contentArea = document.getElementById('blogContent');
//   const wordCount = document.getElementById('wordCount');
//   contentArea.addEventListener('input', () => {
//     const words = contentArea.value.trim().split(/\s+/).filter(Boolean).length;
//     wordCount.textContent = words + ' words';
//   });