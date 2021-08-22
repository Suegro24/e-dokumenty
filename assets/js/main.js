let isContrastOn = false;

const services = document.querySelectorAll('.service');

const openServiceSubmenu = (e) => {
    let i = 0;
    let currentService = e.target;
    while(!currentService.classList.contains('service')) {
        currentService = currentService.parentElement;
        i++;

        if (i >= 4) {
            return;
        }
    }

    const currentImage = currentService.querySelector('.image');

    if (currentImage.classList.contains('image--active')) {
        currentImage.classList.remove('image--active');

        const currentList = currentService.querySelector('.service__list');
        currentList.style.opacity = '0';
        currentList.style.zIndex = '0';

        setTimeout(() => {
            currentService.style.minHeight = 'unset';
            currentList.style.display = 'none';
        }, 600);
    }
    else {
        services.forEach(service => {
            const image = service.querySelector('.image');
            image.classList.remove('image--active');

            const list = service.querySelector('.service__list');
            list.style.opacity = '0';
            list.style.zIndex = '0';
            service.style.minHeight = 'unset';
            list.style.display = 'none';
        })

        currentImage.classList.add('image--active');

        const windowWidth = window.innerWidth;

        const currentList = currentService.querySelector('.service__list');
        const TOTAL_LIST_ITEMS = currentList.childElementCount;
        const LIST_ITEM_HEIGHT = windowWidth > 1200 ? 70 : windowWidth > 800 ? 80 : windowWidth > 400 ? 110 : 140;
        const CURRENT_SERVICE_IMAGE_AND_DESCRIPTION_HEIGHT = 300;
        const BORDER_DISTANCE = 50
        const TOTAL_SERVICE_HEIGHT = TOTAL_LIST_ITEMS*LIST_ITEM_HEIGHT + 2*BORDER_DISTANCE + CURRENT_SERVICE_IMAGE_AND_DESCRIPTION_HEIGHT;

        currentService.style.minHeight = `${TOTAL_SERVICE_HEIGHT}px`;

        const servicesContainerLeftAlign = getElementLeft(currentService.parentElement).left;
        const currentServiceLeftAlign = getElementLeft(currentService).left;
        const defaultLeftAlign = windowWidth > 992 ? 100 : windowWidth > 768 ? 50 : windowWidth > 600 ? -25 : windowWidth > 450 ? 60 : 0;
        const currentListLeftAlign = servicesContainerLeftAlign - currentServiceLeftAlign + defaultLeftAlign;

        currentList.style.left = `${currentListLeftAlign}px`;
        currentList.style.display = 'block';
        currentList.style.zIndex = '2';

        setTimeout(() => {
            currentList.style.opacity = '1';
        }, 200);
    }
}

services.forEach(service => {
    service.addEventListener('click', openServiceSubmenu, false)
})

const serviceListItems = document.querySelectorAll('.service__list-item');

const changeItemImage = (color, e) => {
    if (!isContrastOn) {
        const image = e.target.querySelector('img');
        switch(color) {
            case 'green': {
                image.src = './assets/images/up-arrow.png';
                break;
            }
            case 'blue': {
                image.src = './assets/images/up-arrow-blue.png';
                break;
            }
            default: {
                console.error('Unknown property "color". Expected "green" or "blue" but received', color);
                break;
            }
        }
    }
}

serviceListItems.forEach(item => {
    item.addEventListener('mouseenter', changeItemImage.bind(null, 'green'), false);
    item.addEventListener('mouseleave', changeItemImage.bind(null, 'blue'), false);
})

const invalidPerson = document.querySelector('.invalid-person');
const invalidPersonImage = document.querySelector('.invalid-person__image');
let isInvalidPersonMenuOpen = false;

const openInvalidPersonMenu = () => {
    const menu = document.querySelector('.invalid-person__menu');
    if (isInvalidPersonMenuOpen) {
        invalidPerson.style.width = '58px';
    }
    else {
        invalidPerson.style.width = '358px';
    }
    isInvalidPersonMenuOpen = !isInvalidPersonMenuOpen;
}

invalidPersonImage.addEventListener('click', openInvalidPersonMenu, false);

const invalidPersonFontSizeListItems = document.querySelectorAll('.invalid-person__menu-list li');

const changeFontSize = (e) => {
    switch(e.target.dataset.fontsize) {
        case 'small': {
            document.documentElement.style.fontSize = '14px';
            break;
        }
        case 'medium': {
            document.documentElement.style.fontSize = '16px';
            break;
        }
        case 'big': {
            document.documentElement.style.fontSize = '18px';
            break;
        }
    }
}

invalidPersonFontSizeListItems.forEach(item => {
    item.addEventListener('click', changeFontSize, false)
})

const changeContrastButton = document.querySelector('#changeContrastButton');


const changeContrast = () => {
    if (isContrastOn) {
        document.documentElement.style.setProperty('--white', '#ffffff');
        document.documentElement.style.setProperty('--blue', '#324872');
        document.documentElement.style.setProperty('--fontBrown', '#5b5b5b');
        document.documentElement.style.setProperty('--black', '#000000');
        document.documentElement.style.setProperty('--fontGray', '#EBECEC');
        document.documentElement.style.setProperty('--fontDarkBlue', '#212529');
        document.documentElement.style.setProperty('--greenHover', '#A1C426');
    } else {
        document.documentElement.style.setProperty('--white', '#000000');
        document.documentElement.style.setProperty('--blue', '#00ff23');
        document.documentElement.style.setProperty('--fontBrown', '#00ff23');
        document.documentElement.style.setProperty('--black', '#ffffff');
        document.documentElement.style.setProperty('--fontGray', '#00ff23');
        document.documentElement.style.setProperty('--fontDarkBlue', '#00ff23');
        document.documentElement.style.setProperty('--greenHover', '#161616');

        serviceListItems.forEach(item => {
            const image = item.querySelector('img');
            image.src="./assets/images/up-arrow.png";
        })
    }
    isContrastOn = !isContrastOn;
}

changeContrastButton.addEventListener('click', changeContrast, false);

function getElementLeft(el) {
    var rect = el.getBoundingClientRect();
    var docEl = document.documentElement;
    return {
        left: rect.left + (window.pageXOffset || docEl.scrollLeft || 0),
    };
}