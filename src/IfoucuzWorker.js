export default function register() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/IfoucusServiceWorker.js`);
    }

    window.addEventListener('load', () => {

    });

}

