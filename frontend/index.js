let form=document.getElementById('sendUrl');

form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    let url=form.elements['fullUrl'].value;
    let notes=form.elements['note'].value;
    console.log(url + notes);
    const urls= 'http://localhost:5000/shortUrls'; // Replace with your API endpoint

    const data = {
    fullUrl: url,
    note : notes
    };

    const headers = {
    'Content-Type': 'application/json' // Adjust the content type as per your API requirements
    };

    const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
    };
    console.log(requestOptions);
    let response=await fetch(urls, requestOptions);
    response=await response.json();
    let shorts=document.getElementById('short');
    shorts.innerHTML= `<a href="${url}">${response.short}</a>`;
});

let search=document.getElementById('searchUrl');

search.addEventListener("submit",async (e)=>{
    e.preventDefault();
    let searchNotes=search.elements['searchedNote'].value;
    console.log(searchNotes);
    const searchUrls= 'http://localhost:5000/searchUrls'; // Replace with your API endpoint

    const searchData = {
    searchedNote : searchNotes
    };

    const searchHeaders = {
    'Content-Type': 'application/json' // Adjust the content type as per your API requirements
    };

    const requestSearchOptions = {
    method: 'POST',
    headers: searchHeaders,
    body: JSON.stringify(searchData)
    };
    // console.log(requestSearchOptions);
    let searchResponse=await fetch(searchUrls, requestSearchOptions);
    searchResponse=await searchResponse.json();
    let searchOutputs=document.getElementById('searchOutput');
    searchOutputs.innerHTML= `<a href="${searchResponse.full}">${searchResponse.short}</a>`;
});

