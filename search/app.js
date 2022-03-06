
const auth="563492ad6f917000010000017728cdd856764615af2a143e391438ed";
const next = document.querySelector(".next");
const input=document.querySelector('input');
const searchbutton= document.querySelector('.searchbutton');

let pagenr=1;
let search=false;
let query= "";

input.addEventListener("input",(e)=>{
  e.preventDefault();
  query=e.target.value;

});

async function CuratedPhotos(pagenr)
{
  const data= await fetch('https://api.pexels.com/v1/curated?per_page=15&${pagenr}',
  {
    method:"GET",
    headers:{
      accept:"application/json",
      Authorization: auth,
    },
  }
);


  const result=await data.json();
  result.photos.forEach((photo) => {
    var a=photo.src.large;

    const pic=document.createElement("img");
    pic.src=a;
   document.querySelector(".gallery").appendChild(pic);
  });
}
async function searchPhotos(query,pagenr)
{
    const q =query
  const data= await fetch('https://api.pexels.com/v1/search?query='+q+'&per_page=15',
  {
    method:"GET",
    headers:{
      accept:"application/json",
      Authorization: auth,
    },
  }
);


  const result=await data.json();
  result.photos.forEach((photo) => {
    var a=photo.src.large;

    const pic=document.createElement("img");
    pic.src=a;
   document.querySelector(".gallery").appendChild(pic);
  });
}

searchbutton.addEventListener("click",()=>{
  if(input.value==="")return;
  clear();
  search=true;

searchPhotos(query,pagenr)
pagenr++;
});

function clear()
{
  input.value="";
  document.querySelector(".gallery").innerHTML="";
  pagenr=1;
}




next.addEventListener("click",()=>{
  if(!search)
  {
    pagenr++;
    CuratedPhotos(pagenr);
  }
  else{
    if(query.value==="")return;
    pagenr++;
    searchPhotos(query,pagenr);
  }
});
CuratedPhotos(pagenr);
