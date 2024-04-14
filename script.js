$(document).ready(() => {
  $("a:not(.poga)").on('click', function (event) {
    event.preventDefault();

    if (this.hash !== "") {
      const hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });

  $(".poga").on('click', function (event) {
    event.preventDefault();
    window.location.href = this.href;
  });
});


// Parallax elementi

const elements = {
  main: document.getElementById('main'),
  kalns: document.getElementById('kalns'),
  kalns2: document.getElementById('kalns2'),
  udens: document.getElementById('udens'),
  text: document.getElementById('text'),
  plane: document.getElementById('plane'),
  kalns3: document.getElementById('kalns3'),
  kalns4: document.getElementById('kalns4'),
};

window.addEventListener('scroll', () => {
  const value = window.scrollY;

  elements.text.style.marginTop = `${value * 2.5}px`;
  elements.plane.style.transform = `translate(${value * 1.5}px, ${value * -0.5}px)`;
});

$(document).ready(() => {
  $("a").on('click', function (event) {
    event.preventDefault();

    if (this.hash !== "") {
      const hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });


  $(".go-top").click(function (e) {
    e.preventDefault();
    $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing', function () {
      window.location.hash = "";
    });
  });
});

// Text and image fade in

const paragraphs = document.querySelectorAll(".section__paragraph");
// add image fade in and review box fade in 

document.addEventListener("scroll", function () {
  paragraphs.forEach((paragraph) => {
    if (isInView(paragraph)) {
      paragraph.classList.add("section__paragraph--visible");
    }
  });
});

function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top <
    (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
  );
}

// Bug fix

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Vairākas valodas opcija

var translations = {
  lv: {
    KSIP: "Kas ir PomoLaiks",
    KSIP_P: "PomoLaiks ir taimeris, kas tev palīdz saorganizēt laiku macībām un atpūtai. Šo taimeri \n mēs uztaisījām kopā ar Klase-E sadarbību, lai berniem un studentiem ir vieglāk saorganizēt un uzņemt \n viņu studēšanas un atpūtas laiku.",
    PM: "Par Mums",
    PT: "PomoLaiks",
    PT_P: "Sāc lietot PomoLaiku jau tagat, lai palidzētu tev fokusēties uz\n mācībām.",
    KSP: "Kas ir 'Pomidoro?'",
    KSP_P: "Pomidoro ir Klases-E jeb © SIA “Sistēmas Izglītibas” projekts/kompānija",
    SKL: "Sākt Lietot",
    MPL: "Mūsu Priecīgie lietotāji",
    Knt: "Kontakti",
  },
  en: {
    KSIP: "What Is PomoTime",
    KSIP_P: "PomoTime is a timer that helps you organize your time for studying and leisure.\n We created this timer in collaboration with Klase-E to make it easier for children and students to organize and manage \ntheir study and leisure time.",
    PM: "About Us",
    PT: "PomoTime",
    PT_P: "Start using PomoTime now, to help you focus on your studies",
    KSP: "Who is 'Pomidoro'?",
    KSP_P: "Pomidoro is Klases-E or © SIA “Sistēmas Izglītibas” project/company",
    SKL: "Start Using",
    MPL: "Our Happy Customers",
    Knt: "Contacts",
  },
  ru: {
    KSIP: "Что такое PomoTime",
    KSIP_P: "PomoTime - это таймер, который помогает вам организовать время для учебы и отдыха.\n Мы создали этот таймер в сотрудничестве с Klase-E, чтобы детям и студентам было легче организовать и управлять \n своим временем учебы и отдыха.",
    PM: "О нас",
    PT: "PomoTime",
    PT_P: "Начните использовать PomoTime прямо сейчас, чтобы сосредоточиться на учебе.",
    KSP: "Кто такой 'Pomidoro'?",
    KSP_P: "Помидоро - это проект/компания Klases-E или © SIA “Sistēmas Izglītibas”",
    SKL: "Начать использовать",
    MPL: "Наши Довольные Клиенты",
    Knt: "контакты",
  },
};

function translatePage(lang) {
  var translatableElements = document.querySelectorAll('[data-translate]');

  translatableElements.forEach(function (element) {
    var key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      var translation = translations[lang][key];
      translation = translation.replace(/\n/g, "<br>"); // Replace \n with <br>
      element.innerHTML = translation;
    }
  });
}

var buttons = document.querySelectorAll('.language');

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    var lang = this.getAttribute('data-lang');
    translatePage(lang);
  });
});

var userLang = navigator.language || navigator.userLanguage;
userLang = userLang.substr(0, 2);

translatePage(userLang);

// cursor

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {

  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.style.left = `${posX}px`;
  cursorOutline.style.top = `${posY}px`;

  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// reviews

const reviews = [
  {
    name: 'Lauris Treimanis',
    username: '@fr1zys',
    review: '"Pretty dog, vieglāk ir izmantot pulksteņa taimeri, bet vel projām reitošu 4 stars."',
    profilePic: './img/placeholder-person.jpg',
    stars: 4,
  },
  {
    name: 'Madars Urtāns',
    username: '@madzhis',
    review: '"Ļoti Laba mājas lapa, viņa palīdz ar laiku organizāciju tik labi ka es nokaveju brāļa kāzas"',
    profilePic: './img/placeholder-person.jpg',
    stars: 5,
  },
  {
    name: 'Ramins Pucko',
    username: '@latvian_warcriminal',
    review: '"Hu*ņa websaits varetu labak uztaisīt."',
    profilePic: './img/placeholder-person.jpg',
    stars: 5,
  },
];

const reviewsContainer = document.getElementById('reviews');

reviews.forEach(review => {
  const reviewCard = document.createElement('div');
  reviewCard.className = 'review-card';

  const header = document.createElement('div');
  header.className = 'header';

  const profilePic = document.createElement('img');
  profilePic.className = 'profile-pic';
  profilePic.src = review.profilePic;

  const nameUsername = document.createElement('div');
  nameUsername.className = 'name-username';

  const name = document.createElement('p');
  name.className = 'name';
  name.textContent = review.name;

  const username = document.createElement('p');
  username.className = 'username';
  username.textContent = review.username;

  nameUsername.appendChild(name);
  nameUsername.appendChild(username);

  const stars = document.createElement('p');
  stars.className = 'stars';
  stars.textContent = '⭐'.repeat(review.stars);

  header.appendChild(profilePic);
  header.appendChild(nameUsername);
  header.appendChild(stars);
  reviewCard.appendChild(header);

  const reviewText = document.createElement('p');
  reviewText.className = 'review';
  reviewText.textContent = review.review;

  reviewCard.appendChild(reviewText);

  reviewsContainer.appendChild(reviewCard);
});

// dropdown menu

$(document).ready(function () {
  $(".dropbtn").click(function (event) {
    event.stopPropagation();
    $(".dropdown-content").toggle();
  });
});

// modal preks kontaktiem
var modal = document.getElementById("KontaktiModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
  setTimeout(function () {
    modal.style.opacity = "1";
    modal.querySelector(".modal-content").style.transform = "scale(1)";
  }, 50);
}

span.onclick = function () {
  modal.style.opacity = "0";
  modal.querySelector(".modal-content").style.transform = "scale(0)";
  setTimeout(function () {
    modal.style.display = "none";
  }, 300);
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.opacity = "0";
    modal.querySelector(".modal-content").style.transform = "scale(0)";
    setTimeout(function () {
      modal.style.display = "none";
    }, 300);
  }
}