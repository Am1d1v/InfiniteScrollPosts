
// https://jsonplaceholder.typicode.com/posts?_limit=3&_page=1
const postsContainer = document.querySelector('#posts-container');
const loading = document.querySelector('.loader');
const filter = document.querySelector('#filter');

// Max number of loading posts
let limit = 5;

// Initial Page Value
let page = 1;

// Fetch posts from API
async function getPosts(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

    const data = await res.json();
    return data;
}

// Show posts in DOM
async function showPosts(){
    const posts = await getPosts();

    posts.forEach((post) => {
        const postEL = document.createElement('div');
        postEL.classList.add('post');
        postEL.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        postsContainer.append(postEL);
    });
}
showPosts();

// Show Loader and fetch more posts
function showLoading(){
    // Show loading circles
    loading.classList.add('show');

    // Hide loading circles
    setTimeout(() => {
        loading.classList.remove('show');

        // Fetch more posts
        setTimeout(() => {
            // Next page of posts
            page++
            showPosts();
        }, 300);

    }, 1000);
}

window.addEventListener('scroll', () => {
    // Document destructuring
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
        //console.log(scrollTop, scrollHeight, clientHeight)
    

    if(scrollTop + clientHeight >= scrollHeight - 5){
        showLoading();
    }
});






