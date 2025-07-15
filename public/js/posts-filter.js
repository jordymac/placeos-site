document.addEventListener("DOMContentLoaded", function() {
    // Data will be injected by the template
    if (typeof window.postsData === 'undefined') {
        console.error('Posts data not found');
        return;
    }

    const posts = window.postsData.posts;
    const categories = window.postsData.categories;
    const postsContent = document.getElementById("posts-content");
    
    // Parse JSON strings if they are strings (happens with Hugo jsonify)
    posts.forEach(post => {
        // Parse title if it's a JSON string
        if (typeof post.title === 'string' && post.title.startsWith('"') && post.title.endsWith('"')) {
            try {
                post.title = JSON.parse(post.title);
            } catch (e) {
                console.error('Error parsing title for post:', post.title, e);
            }
        }
        
        // Parse categories
        if (typeof post.categories === 'string') {
            try {
                post.categories = JSON.parse(post.categories);
            } catch (e) {
                console.error('Error parsing categories for post:', post.title, e);
                post.categories = [];
            }
        }
        
        // Parse post_types
        if (typeof post.post_types === 'string') {
            try {
                post.post_types = JSON.parse(post.post_types);
            } catch (e) {
                console.error('Error parsing post_types for post:', post.title, e);
                post.post_types = [];
            }
        }
        
        // Parse other string fields
        ['summary', 'date', 'permalink', 'year'].forEach(field => {
            if (typeof post[field] === 'string' && post[field].startsWith('"') && post[field].endsWith('"')) {
                try {
                    post[field] = JSON.parse(post[field]);
                } catch (e) {
                    console.error(`Error parsing ${field} for post:`, post.title, e);
                }
            }
        });
    });

    // Parse categories if they are JSON strings
    categories.forEach(cat => {
        // Parse id if it's a JSON string
        if (typeof cat.id === 'string' && cat.id.startsWith('"') && cat.id.endsWith('"')) {
            try {
                cat.id = JSON.parse(cat.id);
            } catch (e) {
                console.error('Error parsing category id:', cat.id, e);
            }
        }
        
        // Parse title if it's a JSON string
        if (typeof cat.title === 'string' && cat.title.startsWith('"') && cat.title.endsWith('"')) {
            try {
                cat.title = JSON.parse(cat.title);
            } catch (e) {
                console.error('Error parsing category title:', cat.title, e);
            }
        }
    });

    // Create a mapping from topic titles to IDs for filtering
    const topicTitleToId = {};
    const topicIdToTitle = {};
    categories.forEach(cat => {
        topicTitleToId[cat.title] = cat.id;
        topicTitleToId[cat.title.toLowerCase()] = cat.id;
        topicIdToTitle[cat.id] = cat.title;
    });

    console.log('Posts loaded:', posts.length);
    console.log('Categories loaded:', categories.length);
    if (posts.length > 0) {
        console.log('Sample post:', posts[0]);
        console.log('Sample post categories:', posts[0].categories);
        console.log('Sample post post_types:', posts[0].post_types);
        console.log('Categories type:', typeof posts[0].categories);
        console.log('Post types type:', typeof posts[0].post_types);
    }
    if (categories.length > 0) {
        console.log('Sample category:', categories[0]);
    }
    console.log('Topic title to ID mapping:', topicTitleToId);

    let selectedCategories = [];
    let currentTab = 'all';

    function renderPosts() {
        let filteredPosts = [...posts]; // Create a copy

        console.log('Starting with posts:', filteredPosts.length);
        console.log('Current tab:', currentTab);
        console.log('Selected categories:', selectedCategories);

        // Filter by post type tab
        if (currentTab !== 'all') {
            filteredPosts = filteredPosts.filter(post => {
                const hasPostType = post.post_types && Array.isArray(post.post_types) && post.post_types.includes(currentTab);
                console.log(`Post "${post.title}" has post_types:`, post.post_types, 'includes', currentTab, '?', hasPostType);
                return hasPostType;
            });
            console.log('After tab filter:', filteredPosts.length);
        }

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            filteredPosts = filteredPosts.filter(post => {
                if (!post.categories || !Array.isArray(post.categories)) {
                    return false;
                }
                
                // Convert post categories to IDs for comparison
                const postCategoryIds = post.categories.map(cat => {
                    // First try direct match (if already in correct format)
                    if (topicIdToTitle[cat]) return cat;
                    // Then try title-to-id mapping (exact match)
                    if (topicTitleToId[cat]) return topicTitleToId[cat];
                    // Try lowercase title-to-id mapping
                    if (topicTitleToId[cat.toLowerCase()]) return topicTitleToId[cat.toLowerCase()];
                    // Finally try converting to lowercase and replacing spaces
                    return cat.toLowerCase().replace(/\s+/g, '-');
                });
                
                console.log(`Post "${post.title}" categories:`, post.categories, '-> IDs:', postCategoryIds);
                
                const hasAnyCategory = selectedCategories.some(category => 
                    postCategoryIds.includes(category)
                );
                return hasAnyCategory;
            });
            console.log('After category filter:', filteredPosts.length);
        }

        // Group posts by year
        const groupedPosts = {};
        filteredPosts.forEach(post => {
            if (!groupedPosts[post.year]) {
                groupedPosts[post.year] = [];
            }
            groupedPosts[post.year].push(post);
        });

        // Sort years in descending order
        const sortedYears = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a));

        postsContent.innerHTML = "";
        
        if (filteredPosts.length === 0) {
            postsContent.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-gray-500 text-lg">No posts match the selected filters.</p>
                </div>
            `;
            return;
        }

        sortedYears.forEach(year => {
            const yearSection = document.createElement("section");
            yearSection.className = "not-prose flex flex-col space-y-4 mb-8";
            
            const yearHeader = document.createElement("h2");
            yearHeader.className = "text-xl font-semibold opacity-60 text-right border-b";
            yearHeader.textContent = year;
            yearSection.appendChild(yearHeader);

            const postsList = document.createElement("div");
            postsList.className = "not-prose";
            
            const postsOl = document.createElement("ol");
            
            groupedPosts[year].forEach(post => {
                const postLi = document.createElement("li");
                postLi.className = "mb-6";
                
                const postArticle = document.createElement("article");
                postArticle.className = "flex flex-col space-y-1";
                
                const postHeader = document.createElement("header");
                
                const postTitle = document.createElement("h3");
                postTitle.className = "text-lg font-semibold";
                
                const postLink = document.createElement("a");
                postLink.href = post.permalink;
                postLink.className = "underline decoration-slate-300 decoration-2 underline-offset-4 hover:decoration-inherit";
                postLink.textContent = post.title;
                
                postTitle.appendChild(postLink);
                postHeader.appendChild(postTitle);
                
                const postTime = document.createElement("time");
                postTime.className = "text-sm italic leading-5 opacity-80";
                postTime.textContent = new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                postHeader.appendChild(postTime);
                
                postArticle.appendChild(postHeader);
                
                const postSummary = document.createElement("div");
                postSummary.className = "text-sm";
                postSummary.textContent = post.summary;
                postArticle.appendChild(postSummary);
                
                postLi.appendChild(postArticle);
                postsOl.appendChild(postLi);
            });
            
            postsList.appendChild(postsOl);
            yearSection.appendChild(postsList);
            postsContent.appendChild(yearSection);
        });
    }

    function createSearchableFilter(containerId, placeholder, allItems, selectedItems, renderCallback) {
        const container = document.getElementById(containerId);
        container.innerHTML = `
            <div class="filter-container">
                <input type="text" class="filter-input" placeholder="${placeholder}">
                <div class="suggestions-dropdown"></div>
            </div>
            <div class="selected-pills"></div>
        `;

        const input = container.querySelector(".filter-input");
        const suggestionsDropdown = container.querySelector(".suggestions-dropdown");
        const selectedPillsContainer = container.querySelector(".selected-pills");
        let suppressDropdown = false;

        function showDropdown() {
            if (suppressDropdown) {
                suppressDropdown = false;
                return;
            }
            const query = input.value.toLowerCase();
            const filteredItems = allItems.filter(item => {
                return (query === "" || item.title.toLowerCase().includes(query)) && 
                       !selectedItems.includes(item.id);
            });
            renderSuggestions(filteredItems);
        }

        input.addEventListener("input", showDropdown);
        input.addEventListener("focus", showDropdown);
        input.addEventListener("click", showDropdown);

        document.addEventListener("click", (e) => {
            if (!container.contains(e.target)) {
                suggestionsDropdown.style.display = "none";
            } else if (e.target === input) {
                // If clicking on the input, ensure dropdown shows
                showDropdown();
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
                suggestionItem.textContent = item.title;
                suggestionItem.addEventListener("click", () => {
                    addPill(item);
                    input.value = "";
                    suggestionsDropdown.style.display = "none";
                    suppressDropdown = true;
                    setTimeout(() => {
                        input.focus();
                    }, 10);
                });
                suggestionsDropdown.appendChild(suggestionItem);
            });
            suggestionsDropdown.style.display = "block";
        }

        function addPill(item) {
            if (selectedItems.includes(item.id)) return;
            selectedItems.push(item.id);

            const pill = document.createElement("span");
            pill.className = "selected-pill";
            pill.textContent = item.title;
            
            const removeBtn = document.createElement("span");
            removeBtn.className = "remove-pill";
            removeBtn.innerHTML = "&times;";
            removeBtn.addEventListener("click", () => {
                const index = selectedItems.indexOf(item.id);
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

    function showTab(tabName) {
        currentTab = tabName;
        
        // Remove active class from all tabs
        const tabs = document.querySelectorAll('.tab-button');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Add active class to selected tab
        const activeTab = document.getElementById('tab-' + tabName);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        renderPosts();
    }

    // Make showTab function global for onclick handlers
    window.showTab = showTab;

    // Initialize category filter
    createSearchableFilter("category-filter-container", "Search categories...", categories, selectedCategories, renderPosts);

    // Initialize with all posts
    showTab('all');
});