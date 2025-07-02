document.addEventListener("DOMContentLoaded", function() {
    // Data will be injected by the template
    if (typeof window.integrationsData === 'undefined') {
        console.error('Integrations data not found');
        return;
    }

    const rawIntegrations = window.integrationsData.integrations;
    const integrations = Object.values(rawIntegrations);
    
    const rawCategories = window.integrationsData.categories;
    const categories = Object.values(rawCategories);

    const integrationsList = document.getElementById("integrations-list");

    let selectedCategories = [];
    let selectedDataOutputs = [];

    function renderIntegrations() {
        let filteredIntegrations = integrations;

        if (selectedCategories.length > 0) {
            filteredIntegrations = filteredIntegrations.filter(integration => {
                return integration.category && selectedCategories.every(category => integration.category.includes(category));
            });
        }

        if (selectedDataOutputs.length > 0) {
            filteredIntegrations = filteredIntegrations.filter(integration => {
                return integration.common_data_available && selectedDataOutputs.every(output => integration.common_data_available.includes(output));
            });
        }

        integrationsList.innerHTML = "";
        if (filteredIntegrations.length === 0) {
            integrationsList.innerHTML = "<p>No integrations match the selected filters.</p>";
        } else {
            filteredIntegrations.forEach(integration => {
                const integrationElement = document.createElement("div");
                integrationElement.className = "mb-4";
                integrationElement.innerHTML = `
                    <div class="border rounded p-4 mb-4 h-full integration-card">
                        <h5 class="font-semibold mb-2">${integration.name}</h5>
                        <p class="text-sm">${integration.description || ''}</p>
                    </div>
                `;
                integrationsList.appendChild(integrationElement);
            });
        }
    }

    function createSearchableFilter(containerId, placeholder, allItems, selectedItems, renderCallback, isCategoryFilter = false) {
        const container = document.getElementById(containerId);
        container.innerHTML = `
            <div class="filter-container">
                <input type="text" class="filter-input" placeholder="${placeholder}">
                <div class="suggestions-dropdown" style="display: none;"></div>
            </div>
            <div class="selected-pills"></div>
        `;

        const input = container.querySelector(".filter-input");
        const suggestionsDropdown = container.querySelector(".suggestions-dropdown");
        const selectedPillsContainer = container.querySelector(".selected-pills");

        input.addEventListener("input", () => {
            const query = input.value.toLowerCase();
            const filteredItems = allItems.filter(item => {
                const itemName = isCategoryFilter ? item.name.toLowerCase() : item.toLowerCase();
                return itemName.includes(query) && (!isCategoryFilter || !selectedItems.includes(item.id));
            });
            renderSuggestions(filteredItems);
        });

        input.addEventListener("focus", () => {
            const query = input.value.toLowerCase();
            const filteredItems = allItems.filter(item => {
                const itemName = isCategoryFilter ? item.name.toLowerCase() : item.toLowerCase();
                return itemName.includes(query) && (!isCategoryFilter || !selectedItems.includes(item.id));
            });
            renderSuggestions(filteredItems);
        });

        document.addEventListener("click", (e) => {
            if (!container.contains(e.target)) {
                suggestionsDropdown.style.display = "none";
            }
        });

        function renderSuggestions(items) {
            suggestionsDropdown.innerHTML = "";
            if (items.length === 0) {
                suggestionsDropdown.style.display = "none";
                return;
            }
            items.forEach(item => {
                const suggestionItem = document.createElement("div");
                suggestionItem.className = "suggestion-item";
                suggestionItem.textContent = isCategoryFilter ? item.name : item;
                suggestionItem.addEventListener("click", () => {
                    addPill(item);
                    input.value = "";
                    suggestionsDropdown.style.display = "none";
                    input.focus();
                });
                suggestionsDropdown.appendChild(suggestionItem);
            });
            suggestionsDropdown.style.display = "block";
        }

        function addPill(item) {
            const itemToAdd = isCategoryFilter ? item.id : item;
            const itemText = isCategoryFilter ? item.name : item;

            if (selectedItems.includes(itemToAdd)) return;
            selectedItems.push(itemToAdd);

            const pill = document.createElement("span");
            pill.className = "selected-pill";
            pill.textContent = itemText;
            
            const removeBtn = document.createElement("span");
            removeBtn.className = "remove-pill";
            removeBtn.innerHTML = "&times;";
            removeBtn.addEventListener("click", () => {
                const index = selectedItems.indexOf(itemToAdd);
                if (index > -1) {
                    selectedItems.splice(index, 1);
                }
                pill.remove();
                renderCallback();
            });

            pill.appendChild(removeBtn);
            selectedPillsContainer.appendChild(pill);
            renderCallback();
        }
    }

    const categoryOptions = Object.entries(rawCategories).map(([id, data]) => ({ id: id, name: data.name })).sort((a, b) => a.name.localeCompare(b.name));
    createSearchableFilter("category-filter-container", "Search categories...", categoryOptions, selectedCategories, renderIntegrations, true);

    const allDataOutputs = [...new Set(integrations.flatMap(i => i.common_data_available || []))].sort();
    createSearchableFilter("data-output-filter-container", "Search data outputs...", allDataOutputs, selectedDataOutputs, renderIntegrations);

    renderIntegrations();
});