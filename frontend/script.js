const API = "http://localhost:5000";

async function loadBlogs() {

const res = await fetch(`${API}/blogs`);

const blogs = await res.json();

const container = document.getElementById("blogs");

container.innerHTML = "";

blogs.forEach(blog => {

container.innerHTML += `
<div class="blog">

<h2>${blog.title}</h2>

<p>${blog.content}</p>

<input id="comment-${blog._id}"
placeholder="Write comment">

<button onclick="addComment('${blog._id}')">
Comment
</button>

<button onclick="deleteBlog('${blog._id}')">
Delete
</button>

<div>
${blog.comments.map(c =>
`<p class="comment">${c}</p>`
).join("")}
</div>

</div>
`;
});
}

async function addBlog(){

const title =
document.getElementById("title").value;

const content =
document.getElementById("content").value;

await fetch(`${API}/blogs`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title,
content,
comments:[]
})
});

loadBlogs();
}

async function addComment(id){

const comment =
document.getElementById(`comment-${id}`).value;

await fetch(`${API}/blogs/${id}/comment`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({comment})
});

loadBlogs();
}

async function deleteBlog(id){

await fetch(`${API}/blogs/${id}`,{
method:"DELETE"
});

loadBlogs();
}

loadBlogs();