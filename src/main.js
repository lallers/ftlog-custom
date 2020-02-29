
import './styles.css'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
jQuery(document).ready(function ($) {
    const navToggler = $(".nav-collapse-toggler");
    const navCollapsible = $(".nav-collapse-content")
    navToggler.click((e) => {
        e.preventDefault();
        if (navCollapsible.hasClass('block')) {
            navCollapsible.removeClass('block').addClass('hidden')
        } else {
            navCollapsible.removeClass('hidden').addClass('block')
        }
    })
    const myAccordions = accordions($('.collapse-toggle'));
    // Listen for new scroll events, here we debounce our `storeScroll` function
    document.addEventListener('scroll', debounce(storeScroll), { passive: true });
    document.documentElement.dataset.header = $('.main-header').position().top + $('.main-header').outerHeight();

    // Update scroll position for first time
    storeScroll();

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
                    if (innerWidth > '640') { console.log('too big', innerWidth); return }

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
    // The debounce function receives our function as a parameter
    function debounce(fn) {

        // This holds the requestAnimationFrame reference, so we can cancel it if we wish
        let frame;

        // The debounce function returns a new function that can receive a variable number of arguments
        return (...params) => {

            // If the frame variable has been defined, clear it now, and queue for next frame
            if (frame) {
                cancelAnimationFrame(frame);
            }

            // Queue our function call for the next frame
            frame = requestAnimationFrame(() => {

                // Call our function and pass any params we received
                fn(...params);
            });

        }
    };


    // Reads out the scroll position and stores it in the data attribute
    // so we can use it in our stylesheets
    function storeScroll() {
        document.documentElement.dataset.scroll = window.scrollY;
    }




});

String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
