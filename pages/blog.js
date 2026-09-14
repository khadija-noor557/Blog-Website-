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