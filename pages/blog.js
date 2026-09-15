




const supabaseUrl = "https://xmexfecjjalkhqtrlzzj.supabase.co";
const supabaseKey = "sb_publishable_MscDQGxX8gej_btcdCaQjA_6qODt-W8";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);


// ---- Image ko Supabase Storage pe upload karne wala function ----
async function uploadCoverImage(file, userId) {
  console.log("running")
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `${userId}/${Date.now()}-${safeName}`;

    const { error: uploadError } = await client
        .storage
        .from("images")       
        .upload(path, file);

    if (uploadError) {
        console.error("Image upload failed:", uploadError.message);
        return null;
    }

    const { data } = client.storage.from("post-images").getPublicUrl(path);
    return data.publicUrl;   // ye URL hi database mein save hoga
}


// ---- Post save karne wala main function ----
async function savePost(status) {

    const { data: { user } } = await client.auth.getUser();
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const tags = [...document.querySelectorAll('.tag-chip')].map(el => el.textContent.replace('×','').trim());

    // ---- Pehle image upload karo (agar select ki hai) ----
    let image_url = null;
    const coverInput = document.getElementById('coverInput');
    const file = coverInput.files[0];

    if (file) {
        image_url = await uploadCoverImage(file, user.id);
    }

    // ---- Ab post insert karo, image_url ke sath ----
    const { error } = await client
        .from('blog_data')
        .insert([{
            title: document.getElementById('blogTitle').value.trim(),
            category: document.getElementById('category').value,
            publish_date: document.getElementById('publishDate').value,
            tags,
            allow_comments: document.getElementById('allowComments').checked,
            content: document.getElementById('blogContent').value,
            image_url,
            status,
            user_id: user.id,
        }]);

    if (error) {
        console.log(error.message);
        Swal.fire({ icon: "error", title: "Failed", text: error.message });
        return;
    }

    Swal.fire({ title: "Post saved successfully!", icon: "success" });
    window.location.href = "dashboard.html";
}


// ---- Publish button ----
const publishBtn = document.querySelector("#publishBtn");
publishBtn.addEventListener("click", (e) => {
    e.preventDefault();
    savePost('published');
});


// ---- Save Draft button ----
const draftBtn = document.querySelector("#saveDraftBtn");
draftBtn.addEventListener("click", (e) => {
    e.preventDefault();
    savePost('draft');
});


// ---- Cover image preview (jaise hi user file select kare, turant dikhaye) ----
const coverInput = document.getElementById('coverInput');
const coverPreview = document.getElementById('coverPreview');
const coverUpload = document.querySelector('.cover-upload');

coverInput.addEventListener('change', () => {

  console.log("okkkk")
    const file = coverInput.files[0];
    if (file) {
        coverPreview.src = URL.createObjectURL(file);
        coverPreview.style.display = 'block';
        coverUpload.querySelectorAll('svg, .u-title, .u-sub').forEach(el => el.style.display = 'none');
    }
});


// ---- Tag chips (Enter dabane pe tag add ho) ----
const tagInput = document.getElementById('tagInput');
const tagsWrap = document.getElementById('tagsWrap');

tagInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && tagInput.value.trim() !== '') {
        e.preventDefault();
        const chip = document.createElement('span');
        chip.className = 'tag-chip';
        chip.innerHTML = tagInput.value.trim() + ' <span onclick="this.parentElement.remove()">×</span>';
        tagsWrap.insertBefore(chip, tagInput);
        tagInput.value = '';
    }
});


// ---- Live word count ----
const contentArea = document.getElementById('blogContent');
const wordCount = document.getElementById('wordCount');

contentArea.addEventListener('input', () => {
    const words = contentArea.value.trim().split(/\s+/).filter(Boolean).length;
    wordCount.textContent = words + ' words';
});