const emptyContainer = document.getElementById('empty-btn-container');
const allBtnContainer = document.getElementById('btn-container');
const newsContainer = document.getElementById('news-container');
const spinnerContainer = document.getElementById('spinner-container');
const loadCategories =async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    data.data.news_category.forEach(item => {
      spinner(true);
        const btn = document.createElement('button');
        btn.innerHTML = `<button id = 'new-btn' onclick ="loadCategoryId('${item.category_id}')" class="hover:bg-blue-200 px-2 py-1 rounded-lg">${item.category_name}</button>`
        allBtnContainer.appendChild(btn);
    });
}
const loadCategoryId =async (id="05") => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    newsContainer.innerHTML = '';
    spinner(false)
    // input field text
    let text = `${data.data.length} items found`
    const inputField = document.getElementById('input-field');
    // clear input field text 
    inputField.value = '';
    if(id === '06'){
      emptyContainer.classList.remove('hidden')
    }else{
      emptyContainer.classList.add('hidden')
    }
    // looping into data
    data.data.forEach((item) =>{
        console.log(item);
        // set the input field text
        inputField.value = `${text}`
        const div = document.createElement('div');
        div.className = `flex gap-10 items-center space-y-5 bg-white p-5 rounded-lg shadow-md`
        div.innerHTML = `
          <div>
            <img src="${item.
                thumbnail_url
                }" alt="">
          </div>
          <div class ="flex-1">
            <h1 class="text-2xl text-black font-bold">${item.title}</h1>
            <p class="text-sm text-[#949494] mt-5">${item.details.slice(0,400)}</p>
            <div class="flex justify-around items-center mt-16">
              <div class="flex gap-5">
                <div>
                  <img class = " w-12 rounded-full" src="${item.author.img}" alt="">
                </div>
                <div>
                  <h3 class="text-[#2B2C34] font-bold">${item.author.name}</h3>
                  <p class="capitalize text-[#718797] text-sm">${item.author.published_date}</p>
                </div>
              </div>
              <div class="flex gap-5">
                <div>
                  <img src="/images/carbon_view.png" alt="">
                </div>
                <div class="text-[#515151] text-lg font-bold">
                  <h1>${item.total_view} M</h1>
                </div>
              </div>
              <div class="flex">
                <img src="./images/bxs_star-half.png" alt="">
                <img src="./images/bxs_star-half.png" alt="">
                <img src="./images/bxs_star-half.png" alt="">
                <img src="./images/bxs_star-half.png" alt="">
                <img src="./images/bxs_star-half.png" alt="">
              </div>
              <div>
                <img src="./images/bi_arrow-right-short.png" alt="">
              </div>
            </div>
          </div>

        `
        newsContainer.appendChild(div);
    })
}
const spinner = (isSpinner) => {
  const spinnerContainer = document.getElementById('spinner-container');
  if(isSpinner){
      spinnerContainer.classList.remove('hidden')
  }else{
      spinnerContainer.classList.add('hidden');
  }
}
loadCategoryId()
loadCategories()