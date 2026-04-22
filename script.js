document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    const keyboard = document.querySelector('.keyboard');
    const trackpad = document.querySelector('.trackpad');
    
    let currentInput = '';
    let menuIndex = 0;
    const menuItems = ['Messages', 'Contacts', 'Browser', 'Media'];

    keyboard.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const key = e.target.textContent;
            handleKeyPress(key);
        }
    });

    trackpad.addEventListener('click', () => {
        menuIndex = (menuIndex + 1) % menuItems.length;
        updateScreen();
    });

    function handleKeyPress(key) {
        switch (key) {
            case 'Space':
                currentInput += ' ';
                break;
            case 'Del':
                currentInput = currentInput.slice(0, -1);
                break;
            case 'Enter':
                alert(`You selected: ${menuItems[menuIndex]}\nYou typed: ${currentInput}`);
                currentInput = '';
                break;
            case 'Shift':
            case 'Alt':
                // These keys don't add to the input
                break;
            default:
                currentInput += key;
        }
        updateScreen();
    }

    function updateScreen() {
        content.innerHTML = `
            <h1>BlackBerry</h1>
            <p>Input: ${currentInput}</p>
            <ul class="menu">
                ${menuItems.map((item, index) => 
                    `<li ${index === menuIndex ? 'style="font-weight: bold;"' : ''}>${item}</li>`
                ).join('')}
            </ul>
        `;
    }

    // Update time every minute
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.querySelector('.time').textContent = timeString;
    }

    updateTime();
    setInterval(updateTime, 60000);

    // Initial screen update
    updateScreen();
});