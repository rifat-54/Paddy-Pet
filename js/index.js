// console.log("index file added");
const error = document.getElementById("error-image");

const showCategori = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await res.json();

    // console.log(data.categories[0].category)
    const categoriBtn = document.getElementById("category-btn");

    data.categories.forEach((pet) => {
      // console.log(pet.category)
      const btn = document.createElement("button");
      btn.classList.add("px-8", "btn", "btn-active1");
      btn.innerHTML = `
    <div class="flex justify-between items-center">
    <img class="w-2/6" src="${pet.category_icon}" alt="">
    <p>${pet.category}</p>
    </div>
    
    `;
      categoriBtn.appendChild(btn);
      // console.log(btn)

      btn.addEventListener("click", async () => {
        try {
          const response = await fetch(
            `https://openapi.programming-hero.com/api/peddy/category/${pet.category}`
          );
          const data1 = await response.json();

          removeActive();
          btn.classList.add("active");

          document.getElementById("spinner").style.display = "block";
          document.getElementById("error-image").style.display = "none";
          setTimeout(() => {
            spinerShow();
          }, 2000);
          showCard(data1.data);
          // console.log(data1.data)
        } catch (err) {
          console.log(err);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const spinerShow = () => {
  document.getElementById("spinner").style.display = "none";
  document.getElementById("error-image").style.display = "flex";
};

const removeActive = (data) => {
  const btn = document.getElementsByClassName("btn-active1");
  for (let button of btn) {
    button.classList.remove("active");
  }
};

const showCard = (data) => {
  const cardRowContaier = document.getElementById("card-row");

  const colCon = document.getElementById("col-image");

  if (data.length == 0) {
    colCon.classList.remove("border");

    cardRowContaier.innerHTML = "";
    const div = document.createElement("div");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    div1.innerHTML = "";
    div2.innerHTML = "";
    // div.classList.add('w-full','mx-auto')
    // div.className="absolute top-1 l-5"

    div.innerHTML = `
        <img src="./images/error.webp">
        <h1 class="text-4xl font-bold">Has no available Birds</h1>
        `;
    cardRowContaier.append(div1);
    cardRowContaier.append(div);
    cardRowContaier.append(div2);
  } else {
    colCon.classList.add("border");
    // console.log(data);
    cardRowContaier.innerHTML = "";
    data.forEach((pet) => {
      // console.log(pet);

      const {
        image,
        date_of_birth,
        pet_name,
        price,
        breed,
        gender,
        pet_details,
        vaccinated_status,
        petId,
      } = pet;
      const div = document.createElement("div");
      div.innerHTML = `
            
            <div class="card bg-base-100  shadow-xl">
                <figure>
                  <img
                    src=${image}/>
                </figure>
                <div class="card-body">
                  <div class="space-y-2">
                    <h2 class="card-title text-xl font-bold">${
                      pet_name ? pet_name : "Not found"
                    }</h2>
                    <div class="flex gap-2">
                        <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/health-data.png" alt="health-data"/>
                        <p>${breed ? breed : "Not found"}</p>
                    </div>    
                    <div class="flex gap-2">
                        <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar--v1"/>
                        <p>${date_of_birth ? date_of_birth : "Not found"}</p>
                    </div>
                    <div class="flex gap-2">
                        <i class="fa-solid fa-venus-mars"></i>
                        <p>${gender ? gender : "Not found"}</p>
                    </div>
                    <div class="flex gap-2">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <p>${price ? price : "Not found"}</p>
                    </div>  
                  </div>
                  <hr class="my-1">
                  <!-- card button -->
                  <div class="flex justify-between">
                    <button onclick="showImage('${image}')" class="btn font-bold text-[#0E7A81]"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button id="btn-disable" onclick="showCongrats()" class="btn font-bold text-[#0E7A81]">Adopt</button>
                    <button onclick="showDetail('${petId}')" class="btn font-bold text-[#0E7A81]">Details</button>
                  </div>

                </div>
            </div>
            
            `;

      cardRowContaier.appendChild(div);
    });
  }
};

const showCongrats = () => {
  my_modal_2.showModal();
  const cownDown=document.getElementById('cown-down');
  cownDown.innerHTML="";
  
  const showmosL=document.getElementById('my_modal_2');
  
  

  let sum = 3;
  const inervalid = setInterval(() => {
    if(sum<1){
      clearInterval(inervalid);
      
    }
    cownDown.innerText=sum;

    sum--;
    
  }, 1000);


  setTimeout(()=>{
      
      showmosL.close();
    // const btn=  document.getElementById('btn-disable');
    // console.log(btn)
  },3000)

};




const showDetail = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );

    const data = await res.json();
    console.log(data);

    const {
      image,
      date_of_birth,
      pet_name,
      price,
      breed,
      gender,
      pet_details,
      vaccinated_status,
    } = data.petData;

    const showModalContainer = document.getElementById("show-modal-details");
    showModalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    
  <div class="card bg-base-100  shadow-xl">
  <figure>
    <img class="w-full rounded"
      src=${image}/>
  </figure>
  <div class="card-body">
    <div class="space-y-2">
      <h2 class="card-title text-xl font-bold">${
        pet_name ? pet_name : "Not found"
      }</h2>
      
      <div class="flex gap-2">
          <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/health-data.png" alt="health-data"/>
          <p>${breed ? breed : "Not found"}</p>
      </div>    
      <div class="flex gap-2">
          <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar--v1"/>
          <p>${date_of_birth ? date_of_birth : "Not found"}</p>
      </div>
      <div class="flex gap-2">
          <i class="fa-solid fa-venus-mars"></i>
          <p>${gender ? gender : "Not found"}</p>
      </div>
      <div class="flex gap-2">
          <i class="fa-solid fa-dollar-sign"></i>
          <p>${price ? price : "Not found"}</p>
      </div>
      <p>Vaccinated status: ${
        vaccinated_status ? vaccinated_status : "Not found"
      }</p>
       
    </div>
    <hr class="my-1">
    <!-- card button -->
      <div>
      <p>${pet_details ? pet_details : "Not found"}</p>
      </div>
    <div class="modal-action">
      <form method="dialog">
        
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    
    `;

    my_modal_1.showModal();
  } catch (err) {
    console.log(err);
  }
};

const showImage = (img) => {
  const colImage = document.getElementById("col-image");
  const div = document.createElement("div");
  // div.classList.add('flex-start')
  div.innerHTML = `<img class="rounded w-full h-auto object-cover" src="${img}">
    `;
  colImage.appendChild(div);
};

const showAll = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  document.getElementById("error-image").style.display = "flex";

  // console.log(data.pets)
  showCard(data.pets);
};

showAll();
showCategori();


const sortPrice=async()=>{
    try{
      const res=await fetch('https://openapi.programming-hero.com/api/peddy/pets');
      const data=await res.json();
      const pet=data.pets;
      pet.sort((a,b)=>b.price-a.price)
      // console.log(pet);
      showCard(pet);
      

    }catch(err){
      console.log(err);
    }

}
