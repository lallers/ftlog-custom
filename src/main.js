
import './styles.css'
import _ from 'lodash'
import 'jquery-validation';
import 'jquery-mask-plugin';
const AppSettings = {
    breakPoints: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
    }
}
jQuery(document).ready(function ($) {
    const NavToggler = $(".nav-collapse-toggler");
    const Accordions = accordions($('.collapse-toggle'));
    const NavCollapsible = $(".nav-collapse-content")
    const OpenModal = $('.modal-open')
    const CloseModal = $('#form-cancel, .modal-close')
    const SubmitModal = $('#form-submit, .modal-submit')
    const ModalOverlay = document.querySelector('.modal-overlay')
    let form = undefined;
    let isValid = false;
    let totalVals;
    let validFields = 0;

    NavToggler.click((e) => {
        e.preventDefault();
        if (NavCollapsible.hasClass('block')) {
            NavCollapsible.removeClass('block').addClass('hidden')
        } else {
            NavCollapsible.removeClass('hidden').addClass('block')
        }
    })

    OpenModal.click((e) => {
        e.preventDefault();
        toggleModal()
        form = $('.modal form')
        $('[type="tel"]').mask('(000) 000-0000')

        $(":input", form).change((e) => {
            const target = $(e.target);
            if (!target.valid()) {
                if (target.siblings('.invalid-message').length === 0) {
                    const msg = `<div class="invalid-message"></div>`
                    target.after(msg)
                } else {
                    target.siblings('.invalid-message').text(m)
                }
            } else {
                target.removeClass('invalid')
                if (target.siblings().length > 0) {
                    target.siblings('.invalid-message').empty()
                }
            }

        })


    });

    CloseModal.click((e) => {
        e.preventDefault();
        form = undefined;
        toggleModal()
    })

    SubmitModal.click((e) => {
        e.preventDefault();
        console.log($(e.target.form))
        const test = $(e.target.form).valid();
        console.log(test)
    })



    ModalOverlay.addEventListener('click', toggleModal)


    // close modal when key is pressed anywhere
    document.onkeydown = function (evt) {
        evt = evt || window.event
        var isEscape = false
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc")
        } else {
            isEscape = (evt.keyCode === 27)
        }
        if (isEscape && document.body.classList.contains('modal-active')) {
            form = undefined;
            toggleModal()
        }
    };


    function validateForm(type, val, cb) {
        console.log(val, type)
        let isValid = false;
        let msg = "";
        const validObjects = {
            name: {
                check: (nameVal) => {
                    if (/[A-Za-z]{1,32}/g.test(nameVal)) {
                        return true
                    }
                    return false
                }
            },
            date: {
                check: (dateVal) => {
                    if (/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) {
                        return true
                    }
                    return false
                }
            },
            email: {
                check: (mailVal) => {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailVal)) {
                        return (true)
                    }
                    return false
                }
            }

        }

        switch (type) {
            case 'email':
                isValid = validObjects.email.check(val);
                if (!isValid) {
                    msg = "You have entered an invalid email!"
                }
                break;
            case 'name':
                isValid = validObjects.name.check(val);
                if (!isValid) {
                    msg = "You have entered invalid characters in your name!"
                }
                break;
            case 'date':
                isValid = validObjects.date.check(val);
                if (!isValid) {
                    msg = "You have entered an invalid date!"
                }
                break;
            default:
                isValid = false
                msg = "You have entered an invalid value!"
                break;
        }

        return cb(isValid, msg)


    }


    function toggleModal() {
        const body = document.querySelector('body')
        const modal = document.querySelector('.modal')
        modal.classList.toggle('opacity-0')
        modal.classList.toggle('pointer-events-none')
        body.classList.toggle('modal-active')

    }

    function accordions(items) {
        _.each(items, (v, k) => {
            const accrId = $(v).attr('data-toggle');
            $(v).removeClass('toggled')
            $(v).children('.toggler-icon').text('+')
            if (accrId) {

                const accrItem = $(v).siblings('#' + accrId)
                $(accrItem).addClass('hidden')
                $(v).click((e) => {
                    e.preventDefault()
                    if (innerWidth >= AppSettings.breakPoints.md) { console.log('too big', innerWidth); return }

                    if ($(v).hasClass('toggled')) {
                        $(v).removeClass('toggled')
                        $(v).children('.toggler-icon').text('+')
                    } else {
                        $(v).addClass('toggled')
                        $(v).children('.toggler-icon').text('-')
                    }
                    if ($(accrItem).hasClass('hidden')) {
                        $(accrItem).removeClass('hidden')
                    } else {
                        $(accrItem).addClass('hidden')
                    }
                })
            }
        })
    }
});
