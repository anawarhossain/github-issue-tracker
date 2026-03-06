const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const btnAll = document.getElementById("btnAll");
const btnOpen = document.getElementById("btnOpen");
const btnClosed = document.getElementById("btnClosed");
const totalIssues = document.getElementById("totalIssues");

console.log(searchBtn, searchInput, btnAll, btnOpen, btnClosed, totalIssues);

// load all issues data
function allItemLoad() {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayAllItem(data.data));
}

// priority styles
const priorityStyles = {
  high: "bg-pink-50 text-red-500",
  medium: "bg-yellow-50 text-yellow-500",
  low: "bg-gray-100 text-gray-800",
};


// level styles
const levelsStyles = {
  high: "bg-pink-50 text-red-500",
  medium: "bg-yellow-50 text-yellow-500",
  low: "bg-gray-100 text-gray-800",
};



// labels logo
const labelsLogoStyles = {
  bug: "🤖",
  "help wanted": "⚙️",
};

// labels styles
const labelsStyles = {
  bug: "bg-pink-50 text-red-500",
  "help wanted": "bg-yellow-50 text-yellow-500",
};

// labels mapping
const createLebelsElement = (arr) => {
  const htmlElements = arr.map(
    (el) => `

    <div class="flex items-center gap-1 ${labelsStyles[el] || "bg-green-50 text-green-500"} px-3 py-1 rounded-full  font-semibold">
                    <span>${labelsLogoStyles[el] || "✨"}</span>
                    <span class="uppercase text-sm tracking-tight">${el}</span>
                  </div>
  
  `,
  );
  return htmlElements.join("");
};

// display all issues data by card
function displayAllItem(datas) {
  totalIssues.innerText = datas.length;
  const allItemContainer = document.getElementById("allItemContainer");
  allItemContainer.innerHTML = "";
  datas.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = ` 

            <div 
                class="max-w-md mx-auto h-full overflow-hidden bg-white border-t-3 ${item.status === "open" ? "border-[#00A96E]" : "border-[#A855F6]"}  rounded-2xl p-6 shadow-sm font-sans"
              >
                <div class="flex justify-between items-center mb-6">
                  <div>
                    <img src="./assets/${item.status === "open" ? "Open-Status" : "Closed-Status"}.png" alt="" />
                  </div>

                  <span
                    class="${priorityStyles[item.priority] || "bg-green-50 text-green-500"} text-sm font-bold px-6 py-2 rounded-full tracking-wider uppercase"
                  >
                    ${item.priority}
                  </span>
                </div>

                <h2
                  class="text-2xl font-bold text-slate-800 leading-tight mb-3"
                >
                  ${item.title}
                </h2>

                <p class="text-slate-500 text-lg mb-6 line-clamp-2">
                  ${item.description}
                </p>

                <div class="flex gap-3 mb-8">
                  ${createLebelsElement(item.labels)}

                </div>

                <hr class="border-gray-200 mb-6" />

                <div class="text-slate-500 font-medium space-y-1">
                  <p>#${item.id} by ${item.author}</p>
                  <p>${new Date(!item.updatedAt ? item.createdAt : item.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
        
        `;
    allItemContainer.appendChild(div);
  });
}



allItemLoad();
