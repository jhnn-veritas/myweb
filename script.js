document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    const threadsContainer = document.getElementById('threads-container');
    const postText = document.getElementById('post-text');
    const createThreadButton = document.getElementById('create-thread-button');

    // Menu item click handling
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active classes from all menu items and content sections
            menuItems.forEach(i => i.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Add active class to the clicked menu item
            item.classList.add('active');

            // Show the corresponding content section
            const contentId = item.getAttribute('data-content');
            document.getElementById(contentId).classList.add('active');
        });
    });

    // Thread creation
    if (createThreadButton) {
        createThreadButton.addEventListener('click', () => {
            const text = postText.value.trim();
            if (text) {
                const threadDiv = createThreadElement(text);
                threadsContainer.prepend(threadDiv); // Add new thread to the top
                postText.value = '';
            }
        });
    }


    function createThreadElement(text) {
        const threadDiv = document.createElement('div');
        threadDiv.classList.add('thread');

        const postDiv = document.createElement('div');
        postDiv.classList.add('post', 'op');

        const postInfoDiv = document.createElement('div');
        postInfoDiv.classList.add('post-info');

        const postIdSpan = document.createElement('span');
        postIdSpan.classList.add('post-id');
        postIdSpan.textContent = 'OP';

        const postDateSpan = document.createElement('span');
        postDateSpan.classList.add('post-date');
        postDateSpan.textContent = getCurrentDate();

        const postContentDiv = document.createElement('div');
        postContentDiv.classList.add('post-content');
        postContentDiv.textContent = text;

        postInfoDiv.appendChild(postIdSpan);
        postInfoDiv.appendChild(postDateSpan);
        postDiv.appendChild(postInfoDiv);
        postDiv.appendChild(postContentDiv);

        threadDiv.appendChild(postDiv);

        // Add timestamp to the thread element
        threadDiv.dataset.timestamp = Date.now();  // Store timestamp as a data attribute

        return threadDiv;
    }

    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    // Function to check and remove expired threads
    function checkAndRemoveExpiredThreads() {
        if (!threadsContainer) return; // Exit if threadsContainer doesn't exist

        const threads = threadsContainer.querySelectorAll('.thread');
        const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

        threads.forEach(thread => {
            const timestamp = parseInt(thread.dataset.timestamp);
            if (Date.now() - timestamp > oneWeek) {
                thread.remove(); // Remove the thread from the DOM
            }
        });
    }

    // Run the check every few seconds
    if (threadsContainer) {
        setInterval(checkAndRemoveExpiredThreads, 5000); // Check every 5 seconds
    }

    // Optional: Simulate initial threads (for demonstration)
    if (threadsContainer) {
        const initialThreads = [
            "Welcome to the board!",
            "Share your thoughts and ideas.",
            "Discussions about tech are welcome.",
        ];
        initialThreads.forEach(text => {
            const thread = createThreadElement(text);
            threadsContainer.appendChild(thread);
        });
    }
});
