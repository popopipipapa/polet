document.addEventListener('DOMContentLoaded', function() {
    let scrollTimeout;
    const lazy = (this.documentURI == 'http://127.0.0.1:5500/index.html')
    const header_button = document.getElementById('header-button');
    const nav_button1 = document.getElementById("1");
    const nav_button2 = document.getElementById("2");

    const targetSection_head = document.getElementById('all-services');
    const target_faq = document.getElementById('faq');
    const target_form = document.getElementById('form');

    const header = document.querySelector('header')
    const headerHeight = header.offsetHeight;

    const submit_button = document.querySelector(".submit")
    
    if (lazy){
    const s1 = document.getElementById("s1")
    const s2 = document.getElementById("s2")
    const s3 = document.getElementById("s3")

    const sb1 = document.getElementById("sb1")
    const sb2 = document.getElementById("sb2")
    const sb3 = document.getElementById("sb3")

    s1.addEventListener('click', function() {
        scrollToElement(sb1);
    });

    s2.addEventListener('click', function() {
        scrollToElement(sb2);
    });

    s3.addEventListener('click', function() {
        scrollToElement(sb3);
    });


    }


    header_button.addEventListener('click', function() {
        scrollToElement(target_form);
    });

    nav_button1.addEventListener('click', function() {
        scrollToElement(targetSection_head);
    });

    nav_button2.addEventListener('click', function() {
        scrollToElement(target_faq);
    });

    
    submit_button.addEventListener('click', function() { // Добавляем обработчик события 'click' для элемента submit_button
        let is_send = true; // Инициализируем переменную is_send значением true, которая будет использоваться для проверки, можно ли отправить форму
        const inputs = document.querySelectorAll("input"); // Выбираем все элементы input на странице и сохраняем их в переменную inputs
        
        inputs.forEach(item => { // Перебираем каждый элемент input из переменной inputs
            
            if (item.value.trim() == "") { // Проверяем, пустое ли значение в поле
                item.style.backgroundColor = "#C41E3A"; // Если значение пустое, то делаем фон элемента красным
                item.style.borderColor = 'rgba(0, 0, 0, 1)'; // Устанавливаем цвет границы элемента input в черный
                is_send = false; // Устанавливаем переменную is_send в false, так как форма не может быть отправлена из-за пустого поля
            } else {
                item.style.backgroundColor = "#E3EEFF"; // Если значение не пустое, устанавливаем фон элемента input в голубой цвет
                item.style.borderColor = 'rgba(0, 0, 0, 0.25)'; // Устанавливаем цвет границы элемента input в полупрозрачный черный
            }
        });

        
        if (is_send) { // Проверяем значение переменной is_send
            submit_button.textContent = "Отправлено!"; // Если is_send равно true, изменяем текст кнопки submit_button на "Отправлено!"
        } else {
            submit_button.textContent = "Заполните пустые поля"; // Если is_send равно false, изменяем текст кнопки submit_button на "Заполните пустые поля"
        }
    });

    
    
    let is_scrolling = false; // Инициализируем переменную is_scrolling значением false, которая будет использоваться для отслеживания состояния прокрутки
    function scrollToElement(element) { // Определяем функцию scrollToElement, которая принимает элемент в качестве аргумента
        let topOffset = element.getBoundingClientRect().top + window.scrollY - headerHeight; // Вычисляем вертикальное смещение элемента относительно верхней части окна браузера, учитывая высоту заголовка
        window.scrollTo({ // Прокручиваем окно браузера до вычисленного смещения с плавной анимацией
            top: topOffset,
            behavior: 'smooth'
        });
        is_scrolling = true; // Устанавливаем переменную is_scrolling в true, чтобы указать, что прокрутка началась
        if (scrollTimeout) { // Проверяем, существует ли таймер scrollTimeout
            clearTimeout(scrollTimeout); // Если таймер существует, очищаем его, чтобы предотвратить выполнение предыдущего таймера
        }
        scrollTimeout = setTimeout(() => { // Устанавливаем новый таймер scrollTimeout, который через 750 миллисекунд выполнит функцию
            is_scrolling = false; // Устанавливаем переменную is_scrolling в false, чтобы указать, что прокрутка завершена
            updateActiveButton(); // Вызываем функцию updateActiveButton для обновления состояния активной кнопки
        }, 750);
    }


    

    function updateActiveButton() {
        if (!is_scrolling && lazy){
            let all_serv_top = document.getElementById('all-services').getBoundingClientRect().top + scrollY - headerHeight
            let faq_top = document.getElementById('faq').getBoundingClientRect().top + scrollY - headerHeight
            let form_top = document.getElementById('form').getBoundingClientRect().top + scrollY - headerHeight
            
            if (window.scrollY < faq_top - 10){
                nav_button1.style.backgroundColor = "#E3EEFF";
                nav_button1.style.borderColor = "#E3EEFF";
                
                nav_button2.style.backgroundColor = "transparent";
                nav_button2.style.borderColor = "transparent";
            }
            else if (window.scrollY < all_serv_top - 1){
                nav_button1.style.backgroundColor = "#E3EEFF";
                nav_button1.style.borderColor = "#E3EEFF";

                nav_button2.style.backgroundColor = "transparent";
                nav_button2.style.borderColor = "transparent";
            }else if (window.scrollY <= form_top + 10){
                
                nav_button1.style.backgroundColor = "transparent";
                nav_button1.style.borderColor = "transparent"; 

                nav_button2.style.backgroundColor = "#E3EEFF";
                nav_button2.style.borderColor = "#E3EEFF";
            }else{
                nav_button1.style.backgroundColor = "transparent";
                nav_button1.style.borderColor = "transparent";
                
                nav_button2.style.backgroundColor = "transparent";
                nav_button2.style.borderColor = "transparent";
            }
        }
    }




// Выбираем все элементы с классом 'faq-item' и сохраняем их в переменную faqItems
const faqItems = document.querySelectorAll('.faq-item');
// Перебираем каждый элемент из faqItems
faqItems.forEach(item => {
    // Внутри каждого элемента faq-item находим элемент с классом 'faq-question' и сохраняем его в переменную toggleButton
    const toggleButton = item.querySelector('.faq-question');
    // Внутри каждого элемента faq-item находим элемент с классом 'faq-toggle' и сохраняем его в переменную plus
    const plus = item.querySelector('.faq-toggle');
    // Внутри каждого элемента faq-item находим элемент с классом 'faq-answer' и сохраняем его в переменную answer
    const answer = item.querySelector('.faq-answer'); 
    toggleButton.addEventListener('click', () => { // Добавляем обработчик события 'click' для элемента toggleButton
        // Проверяем, есть ли у элемента answer стиль maxHeight
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null; // Если стиль maxHeight существует, сбрасываем его, чтобы скрыть ответ
            plus.textContent = '+'; // Меняем текст элемента plus на '+'
        } else {
            // Если стиль maxHeight не существует, устанавливаем его равным scrollHeight элемента answer, чтобы показать ответ
            answer.style.maxHeight = answer.scrollHeight + 'px';
            // Меняем текст элемента plus на '-'
            plus.textContent = '-';
        }
    });
});

    
    
    window.addEventListener('scroll', updateActiveButton);
    window.addEventListener('resize', updateActiveButton);
    updateActiveButton(); 
    
});
