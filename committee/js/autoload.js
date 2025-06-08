document.addEventListener("DOMContentLoaded", function () {
  fetch("/committee/resources/data.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(".committee-container");

      for (const [category, members] of Object.entries(data)) {
        // Create section for each committee category
        const section = document.createElement("div");
        section.className = "committee-section";

        // Add category title
        const title = document.createElement("h2");
        title.className = "has-text-centered";
        title.textContent = category;
        section.appendChild(title);

        // Create grid for members
        const grid = document.createElement("div");
        grid.className = "members-grid";

        // Add each member to the grid
        members.forEach((member) => {
          const card = document.createElement("div");
          card.className = "member-card";

          const content = `
                        <div class="member-content">
                            <div class="member-header">
                                ${
                                  member.img && member.img !== ""
                                    ? `<img src="${
                                        member.img.search("http") !== 0
                                          ? "/committee/resources/images/"
                                          : ""
                                      }${member.img}" 
                                        alt="${
                                          member.name
                                        }" class="member-image">`
                                    : '<div class="member-image has-background-grey-light"></div>'
                                }
                                <div>
                                    <p class="member-name">${member.name}</p>
                                    <p class="member-designation">${
                                      member.designation
                                    }</p>
                                </div>
                            </div>
                        </div>
                    `;

          card.innerHTML = content;
          grid.appendChild(card);
        });

        section.appendChild(grid);
        container.appendChild(section);
      }
    })
    .catch((error) => {
      console.error("Error loading committee data:", error);
      document.querySelector(".committee-container").innerHTML = `
                <div class="notification is-danger">
                    Failed to load committee data. Please try again later.
                </div>
            `;
    });
});
