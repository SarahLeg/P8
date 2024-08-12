$(document).ready(function() {
    $('.gallery').mauGallery({
        columns: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3
        },
        lightBox: true,
        lightboxId: 'myAwesomeLightbox',
        showTags: true,
        tagsPosition: 'top'
    });
});

document.addEventListener("DOMContentLoaded", function() {
//le script ne s'éxecute qu'une fois que le DOM est chargé

    const lazyPictures = document.querySelectorAll(".lazy");
    //tous les éléments portant la classe .lazy sont selectionnés

//déclaration de l'observateur
    let observer = new IntersectionObserver(function(pictures, observer) {
    //création de l'objet observer avec IntersectionObserver -> outil du navigateur qui sert à oberver les éléments spécifiés ici dans la NodeList lazyPictures
    //Il est configuré pour surveiller chaque lazyPicture et déclencher la fonction lorsque l'image entre dans le viewport
        pictures.forEach(function(picture) {
        //boucle sur chaque élément dans une liste
            if (picture.isIntersecting) {
            //vérifie si l'image est visible dans le viewport
                let lazyPicture = picture.target;
                lazyPicture.src = lazyPicture.dataset.src;
                //l'image est chargée en remplaçant l'attribut src par la valeur stockée dans data-src, ce qui déclenche le téléchargement de l'image réelle
                lazyPicture.classList.remove("lazy");
                //la classe lazy est retirée, marquant ainsi que l'image a été chargée
                observer.unobserve(lazyPicture);
                //arrête d'observer cette image car elle est maintenant chargée
            }
        });
    });

//attachement de l'observateur à chaque élément de la liste lazyPictures
    lazyPictures.forEach(function(lazyPicture) {
        observer.observe(lazyPicture);
    });

});

//si je travaillais en équipe, j'utiliserais certainement les termes génériques entries, entry, IntersectionObserver, isIntersecting et observerInstance comme ceci:
//let observer = new IntersectionObserver(function(entries, observerInstance) {
//     entries.forEach(function(entry) {
//         if (entry.isIntersecting) {
//             let lazyImage = entry.target;
//             lazyImage.src = lazyImage.dataset.src;
//             lazyImage.classList.remove("lazy");
//             observerInstance.unobserve(lazyImage);
//         }
//     });
// });