const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const editBtn = document.querySelector(".profile__edit");
const popupEdit = document.querySelector(".popup_mode_edit");
const popupEditCloseBtn = document.querySelector(".popup__close_mode_edit");
const inputTitle = document.querySelector(".popup__input_name_title");
const inputSubtitle = document.querySelector(".popup__input_name_subtitle");
const popupEditForm = document.querySelector(".popup__form_mode_edit");

const addBtn = document.querySelector(".profile__add");
const popupAdd = document.querySelector(".popup_mode_add");
const popupAddCloseBtn = document.querySelector(".popup__close_mode_add");
const inputName = document.querySelector(".popup__input_name_name");
const inputLink = document.querySelector(".popup__input_name_link");
const popupAddForm = document.querySelector(".popup__form_mode_add");

const popupView = document.querySelector(".popup_mode_view");
const popupViewCloseBtn = document.querySelector(".popup__close_mode_view");
const popupViewDescription = document.querySelector(".popup__description");
const popupViewImage = document.querySelector(".popup__image");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const cardField = document.querySelector(".elements");
const cardTemplate = document.querySelector('#card').content;

const openPopupEdit = () => {
    inputTitle.value = profileTitle.textContent;
    inputSubtitle.value = profileSubtitle.textContent;
    popupEdit.className = "popup popup_mode_edit popup_opened";
}

const closePopupEdit = () => {
    popupEdit.className = "popup popup_mode_edit";
}

const savePopupEdit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = inputTitle.value;
    profileSubtitle.textContent = inputSubtitle.value;
    closePopupEdit();
}

const openPopupAdd = () => {
    popupAdd.className = "popup popup_mode_add popup_opened";
}

const closePopupAdd = () => {
    popupAdd.className = "popup popup_mode_edit";
}

const savePopupAdd = (evt) => {
    evt.preventDefault();
    addElem(inputName.value, inputLink.value);
    inputName.value = "";
    inputLink.value = "";
    closePopupAdd();
}

const openPopupView = (evt) => {
    evt.preventDefault();
    const elem = evt.target.closest(".element")
    const src = elem.querySelector(".element__photo").src;
    const description = elem.querySelector(".element__title").textContent;
    popupViewImage.src = src;
    popupViewDescription.textContent = description;
    popupView.className = "popup popup_mode_view popup_opened";
}

const closePopupView = () => {
    popupView.className = "popup popup_mode_view";
}

const handleLike = (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle("element__like_action_active");
}

const handleDelete = (evt) => {
    evt.preventDefault();
    evt.target.closest(".element").remove();
}

const createCard = (name, link) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(".element__photo").src = link;
    cardElement.querySelector(".element__title").textContent = name;
    cardElement.querySelector(".element__like").addEventListener("click", handleLike);
    cardElement.querySelector(".element__delete").addEventListener("click", handleDelete);
    cardElement.querySelector(".element__photo").addEventListener("click", openPopupView);
    return cardElement;
}

const addElem = (name, link) => {
    cardField.prepend(createCard(name, link));
}

const init = () => {
    for (const elem of initialCards) {
        cardField.append(createCard(elem.name, elem.link));
    }
}

editBtn.addEventListener('click', openPopupEdit)
popupEditCloseBtn.addEventListener('click', closePopupEdit)
popupEditForm.addEventListener('submit', savePopupEdit)

addBtn.addEventListener("click", openPopupAdd);
popupAddCloseBtn.addEventListener('click', closePopupAdd);
popupAddForm.addEventListener('submit', savePopupAdd);

popupViewCloseBtn.addEventListener("click", closePopupView);

init();