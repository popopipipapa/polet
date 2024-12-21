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

    submit_button.addEventListener('click', function(){
        let is_send = true
        const inputs = document.querySelectorAll("input")
        console.log(inputs)
        inputs.forEach(item =>{
            console.log(item.value.trim())
            if (item.value.trim() == "")
            {
                item.style.backgroundColor = "#C41E3A"
                
                item.style.borderColor = 'rgba(0, 0, 0, 1)'
                is_send = false
            }else{
                item.style.backgroundColor = "#E3EEFF"
                item.style.borderColor = 'rgba(0, 0, 0, 0.25)'
            }
        })
        if (is_send){
            submit_button.textContent = "Отправлено!"
            console.log("хуй")
        }else{
            submit_button.textContent = "Заполните пустые поля" 
        }
    });
    
    let is_scrolling = false
    function scrollToElement(element) {
        let topOffset = element.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
            top: topOffset,
            behavior: 'smooth'
        });
        is_scrolling = true;

        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            is_scrolling = false;
            updateActiveButton()
            console.log('Scrolling has ended');
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


    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggleButton = item.querySelector('.faq-question');
        const plus = item.querySelector('.faq-toggle')
        const answer = item.querySelector('.faq-answer');

        toggleButton.addEventListener('click', () => {
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                plus.textContent = '+';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                plus.textContent = '-';
            }
        });
    });
    
    
    window.addEventListener('scroll', updateActiveButton);
    window.addEventListener('resize', updateActiveButton);
    updateActiveButton(); 
    
});
