function createYearSelector() {
    const yearSelector = document.getElementById("yearSelector");
    yearSelector.innerHTML = "";

    const years = Object.keys(roundData);
    years.forEach((year, index) => {
        const button = document.createElement("button");
        button.innerHTML = `<i class="fas fa-graduation-cap mr-2"></i>Year ${year}`;
        button.className = `flex items-center px-3 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            index === 0 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`;
        button.onclick = () => {
            showYearContent(year);
            updateYearSelector(year);
        };
        yearSelector.appendChild(button);
    });
}

function updateYearSelector(selectedYear) {
    const buttons = document.querySelectorAll("#yearSelector button");
    buttons.forEach((button) => {
        if (button.textContent.includes(selectedYear)) {
            button.className = button.className.replace("bg-gray-700 text-gray-300", "bg-blue-600 text-white");
        } else {
            button.className = button.className.replace("bg-blue-600 text-white", "bg-gray-700 text-gray-300");
        }
    });
}

function showYearContent(year) {
    const sectionList = document.getElementById("sectionList");
    const sectionContent = document.getElementById("sectionContent");
    sectionList.innerHTML = "";
    sectionContent.innerHTML = "";

    const yearData = roundData[year];

    Object.keys(yearData).forEach((section, index) => {
        const sectionButton = document.createElement("button");
        sectionButton.textContent = `Section ${section}`;
        sectionButton.className = `w-full text-left p-4 mb-2 rounded-lg transition-all duration-300 ${
            index === 0 ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200 hover:bg-gray-500"
        }`;
        sectionButton.onclick = () => {
            document
                .querySelectorAll("#sectionList button")
                .forEach(
                    (btn) =>
                        (btn.className = btn.className.replace("bg-blue-600 text-white", "bg-gray-600 text-gray-200 hover:bg-gray-500"))
                );
            sectionButton.className = sectionButton.className.replace(
                "bg-gray-600 text-gray-200 hover:bg-gray-500",
                "bg-blue-600 text-white"
            );
            showsectionContent(section, yearData[section]);
        };
        sectionList.appendChild(sectionButton);
    });

    showsectionContent("A", yearData["A"]);
}

function showsectionContent(section, sectionData) {
    const sectionContent = document.getElementById("sectionContent");
    sectionContent.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = `Section ${section}`;
    title.className = "text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text";
    sectionContent.appendChild(title);

    if (Array.isArray(sectionData)) {
        const grid = document.createElement("div");
        grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-4";
        sectionData.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "bg-gray-600 rounded-lg p-4 shadow-md transform transition-all duration-300 hover:shadow-lg hover:scale-105";

            const name = document.createElement("h3");
            name.textContent = item.name;
            name.className = "text-lg font-semibold mb-2 text-gray-200";
            card.appendChild(name);

            const link = document.createElement("a");
            link.href = item.link;
            link.innerHTML = '<i class="fas fa-external-link-alt mr-2"></i>Open Form';
            link.className = "text-blue-400 hover:underline flex items-center";
            link.target = "_blank";
            card.appendChild(link);

            grid.appendChild(card);
        });
        sectionContent.appendChild(grid);
    } else {
        const link = document.createElement("a");
        link.href = sectionData;
        link.innerHTML = '<i class="fas fa-trophy mr-2"></i>Open Contest';
        link.className =
            "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-flex items-center";
        link.target = "_blank";
        sectionContent.appendChild(link);
    }
}

createYearSelector();
showYearContent("1");
