const carousel = document.querySelector('.carousel')
const firstImage = carousel.querySelectorAll('img')[0]
const arrows = document.querySelectorAll('.wrapper button')



let isDragStart = false , prevPageX, prevScrollLeft , positionDiff

// getting first image width & adding 14 margin value

 let scrollWidth = carousel.scrollWidth - carousel.clientWidth
const showHideIcons = () =>{
    // showing and hiding prev/next icon according to carousel scroll left value
     arrows[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block'
     arrows[1].style.display = carousel.scrollLeft == scrollWidth ? 'none' : 'block'
}

arrows.forEach(icon =>{
    
    icon.addEventListener('click', () =>{
    let firstImageWidth = firstImage.clientWidth + 14
 //console.log(icon)
 // if clicked icon is left , reduce width value from the carousel scroll left else add to it
 carousel.scrollLeft += icon.id =='left' ? -firstImageWidth : firstImageWidth
 setTimeout( () =>showHideIcons(),60) // calling showHideIcons after 60 ms
    })
})

const autoSlide = () => {
positionDiff = Math.abs(positionDiff)
let firstImageWidth = firstImage.clientWidth + 14
// getting difference value that needs to add or reduce from carousel left to take middle image center

let valDifference = firstImageWidth - positionDiff

if (carousel.scrollLeft > prevScrollLeft) {
    return carousel.scrollLeft += positionDiff > firstImageWidth / 3 ? valDifference : -positionDiff

}
carousel.scrollLeft -= positionDiff > firstImageWidth / 3 ? valDifference : -positionDiff
}


const dragStart = (e) =>{
    // updating global variables value on mouse down event
    isDragStart = true
    prevPageX = e.pageX || e.touches[0].pageX
    prevScrollLeft = carousel.scrollLeft
}

const dragging = (e) =>{
 // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return 
    e.preventDefault()
    carousel.classList.add('dragging')
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
    carousel.scrollLeft = prevScrollLeft - positionDiff
    showHideIcons()
}

const dragstop =() =>{
    isDragStart = false 
    carousel.classList.remove('dragging')
    autoSlide()
}
carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('touchstart', dragStart)

carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('touchmove', dragging)

carousel.addEventListener('mouseup', dragstop)
carousel.addEventListener('mouseleave', dragstop)
carousel.addEventListener('touchleave', dragstop)